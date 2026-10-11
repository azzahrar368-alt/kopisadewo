/**
 * Layanan API Kopi Sadewo
 * Menghubungkan antarmuka frontend dengan server backend REST API.
 * Alamat dasar dibaca dari variabel lingkungan import.meta.env.VITE_API_URL.
 */

// Alamat dasar server API (fallback ke http://localhost:5000 jika belum ditentukan)
const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

/**
 * Mengambil daftar produk dari backend.
 * Mendukung filter kategori (slug) dan pencarian (kata kunci).
 *
 * @param {Object} [params={}]
 * @param {string} [params.category] - Slug kategori (contoh: 'coffee', 'non-coffee', 'food')
 * @param {string} [params.search] - Kata kunci pencarian produk
 * @returns {Promise<Array>} Daftar produk
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
      // Abaikan error saat parsing JSON respons error
    }
    throw new Error(errorDetail);
  }

  const result = await response.json();
  return Array.isArray(result?.data) ? result.data : [];
}

/**
 * Mengambil daftar seluruh kategori produk dari backend.
 *
 * @returns {Promise<Array>} Daftar kategori
 */
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
      // Abaikan error saat parsing JSON respons error
    }
    throw new Error(errorDetail);
  }

  const result = await response.json();
  return Array.isArray(result?.data) ? result.data : [];
}

/**
 * Mengambil detail produk tunggal berdasarkan ID.
 *
 * @param {number|string} id - ID produk
 * @returns {Promise<Object>} Data produk
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
      // Abaikan error saat parsing JSON respons error
    }
    throw new Error(errorDetail);
  }

  const result = await response.json();
  return result?.data || null;
}

// Alias fungsi untuk fleksibilitas pemanggilan
export const fetchProducts = getProducts;
export const fetchCategories = getCategories;
export const fetchProductById = getProductById;

export default {
  API_BASE_URL,
  getProducts,
  fetchProducts,
  getCategories,
  fetchCategories,
  getProductById,
  fetchProductById,
};
