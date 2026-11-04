/**
 * Layanan API Kopi Sadewo
 * Menghubungkan antarmuka frontend dengan server backend REST API.
 * Mendukung pembacaan publik & operasi CRUD khusus admin terproteksi JWT.
 */

const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

const TOKEN_KEY = 'sadewo_admin_token';
const ADMIN_USER_KEY = 'sadewo_admin_user';

// =============================================================================
// Helper Manajemen Token & Sesi Admin
// =============================================================================

/**
 * Helper untuk mendapatkan URL gambar lengkap
 * Mendukung URL eksternal (Unsplash, https://...) maupun berkas lokal yang diunggah (/images/products/...)
 */
export function getFullImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${API_BASE_URL}${cleanUrl}`;
}

export function getAdminToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || null;
  } catch {
    return null;
  }
}

export function setAdminToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {
    // Abaikan kegagalan localStorage
  }
}

export function removeAdminToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
  } catch {
    // Abaikan kegagalan localStorage
  }
}

export function getAdminUser() {
  try {
    const raw = localStorage.getItem(ADMIN_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAdminUser(user) {
  try {
    if (user) {
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(ADMIN_USER_KEY);
    }
  } catch {
    // Abaikan kegagalan localStorage
  }
}

/**
 * Helper permintaan fetch terotentikasi
 */
async function authFetch(endpoint, options = {}) {
  const token = getAdminToken();
  const headers = {
    'Accept': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorDetail = `Terjadi kesalahan (HTTP ${response.status})`;
    try {
      const errorJson = await response.json();
      if (errorJson && (errorJson.message || errorJson.error)) {
        errorDetail = errorJson.message || errorJson.error;
      }
    } catch {
      // Abaikan error saat parsing respons error
    }

    if (response.status === 401) {
      // Sesi telah kedaluwarsa
      removeAdminToken();
    }

    const err = new Error(errorDetail);
    err.status = response.status;
    throw err;
  }

  return await response.json();
}

// =============================================================================
// Layanan Autentikasi Admin
// =============================================================================

export async function loginAdmin(email, password) {
  const endpoint = `${API_BASE_URL}/api/auth/login`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Gagal masuk. Periksa kembali email dan kata sandi Anda.');
  }

  if (data?.data?.token) {
    setAdminToken(data.data.token);
    setAdminUser(data.data.admin);
  }

  return data.data;
}

export async function getAdminProfile() {
  const endpoint = `${API_BASE_URL}/api/auth/me`;
  const result = await authFetch(endpoint, { method: 'GET' });
  return result?.data || null;
}

export async function logoutAdmin() {
  try {
    const endpoint = `${API_BASE_URL}/api/auth/logout`;
    await authFetch(endpoint, { method: 'POST' });
  } catch {
    // Tetap bersihkan penyimpanan lokal meski server tidak merespons
  } finally {
    removeAdminToken();
  }
}

// =============================================================================
// Layanan Produk (Publik & Admin CRUD)
// =============================================================================

/**
 * Mengambil daftar produk (Publik)
 */
export async function getProducts({ category, search } = {}) {
  const queryParams = new URLSearchParams();

  if (category && typeof category === 'string' && category.trim() !== '' && category !== 'all') {
    queryParams.append('category', category.trim());
  }

  if (search && typeof search === 'string' && search.trim() !== '') {
    queryParams.append('search', search.trim());
  }

  const queryString = queryParams.toString();
  const endpoint = `${API_BASE_URL}/api/products${queryString ? `?${queryString}` : ''}`;

  const response = await fetch(endpoint, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    let errorDetail = `Gagal memuat produk (HTTP ${response.status})`;
    try {
      const errorJson = await response.json();
      if (errorJson && errorJson.message) {
        errorDetail = errorJson.message;
      }
    } catch {
      // Abaikan error parsing JSON
    }
    throw new Error(errorDetail);
  }

  const result = await response.json();
  return Array.isArray(result?.data) ? result.data : [];
}

/**
 * Mengambil detail produk tunggal (Publik)
 */
export async function getProductById(id) {
  if (!id) {
    throw new Error('ID produk wajib diisi');
  }

  const endpoint = `${API_BASE_URL}/api/products/${id}`;
  const response = await fetch(endpoint, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    let errorDetail = `Produk tidak ditemukan (HTTP ${response.status})`;
    try {
      const errorJson = await response.json();
      if (errorJson && errorJson.message) {
        errorDetail = errorJson.message;
      }
    } catch {
      // Abaikan error parsing JSON
    }
    throw new Error(errorDetail);
  }

  const result = await response.json();
  return result?.data || null;
}

/**
 * Mengunggah berkas foto produk dari perangkat lokal (Khusus Admin)
 * @param {File} file - Berkas foto gambar
 * @returns {Promise<{ url: string, filename: string, size: number }>}
 */
export async function uploadProductImage(file) {
  if (!file) {
    throw new Error('Harap pilih berkas foto terlebih dahulu');
  }

  const formData = new FormData();
  formData.append('image', file);

  const token = getAdminToken();
  const headers = {
    Accept: 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const endpoint = `${API_BASE_URL}/api/upload`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Gagal mengunggah foto produk');
  }

  return data.data; // { url: '/images/products/prod-...', ... }
}

/**
 * Menambahkan produk baru (Khusus Admin)
 */
export async function createProduct(productData) {
  const endpoint = `${API_BASE_URL}/api/products`;
  const result = await authFetch(endpoint, {
    method: 'POST',
    body: productData,
  });
  return result?.data;
}

/**
 * Memperbarui produk yang ada (Khusus Admin)
 */
export async function updateProduct(id, productData) {
  const endpoint = `${API_BASE_URL}/api/products/${id}`;
  const result = await authFetch(endpoint, {
    method: 'PUT',
    body: productData,
  });
  return result?.data;
}

/**
 * Menghapus produk (Khusus Admin)
 */
export async function deleteProduct(id) {
  const endpoint = `${API_BASE_URL}/api/products/${id}`;
  const result = await authFetch(endpoint, {
    method: 'DELETE',
  });
  return result?.data || result;
}

// =============================================================================
// Layanan Kategori (Publik & Admin CRUD)
// =============================================================================

export async function getCategories() {
  const endpoint = `${API_BASE_URL}/api/categories`;
  const response = await fetch(endpoint, {
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    let errorDetail = `Gagal memuat kategori (HTTP ${response.status})`;
    try {
      const errorJson = await response.json();
      if (errorJson && errorJson.message) {
        errorDetail = errorJson.message;
      }
    } catch {
      // Abaikan error parsing JSON
    }
    throw new Error(errorDetail);
  }

  const result = await response.json();
  return Array.isArray(result?.data) ? result.data : [];
}

export async function createCategory(categoryData) {
  const endpoint = `${API_BASE_URL}/api/categories`;
  const result = await authFetch(endpoint, {
    method: 'POST',
    body: categoryData,
  });
  return result?.data;
}

export async function updateCategory(id, categoryData) {
  const endpoint = `${API_BASE_URL}/api/categories/${id}`;
  const result = await authFetch(endpoint, {
    method: 'PUT',
    body: categoryData,
  });
  return result?.data;
}

export async function deleteCategory(id) {
  const endpoint = `${API_BASE_URL}/api/categories/${id}`;
  const result = await authFetch(endpoint, {
    method: 'DELETE',
  });
  return result?.data || result;
}

// Alias fungsi
export const fetchProducts = getProducts;
export const fetchCategories = getCategories;
export const fetchProductById = getProductById;

export default {
  API_BASE_URL,
  getFullImageUrl,
  uploadProductImage,
  getAdminToken,
  setAdminToken,
  removeAdminToken,
  getAdminUser,
  setAdminUser,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
  getProducts,
  fetchProducts,
  getProductById,
  fetchProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
