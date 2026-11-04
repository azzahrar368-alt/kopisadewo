const db = require('../config/db');
const { products: mockProducts, categories: mockCategories } = require('./mockData');

/**
 * Buat slug ramah URL dari nama produk
 */
const generateSlug = (name) => {
  return String(name || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Mengambil seluruh daftar produk
 * Mendukung filter kategori (slug) dan pencarian kata kunci (nama & deskripsi)
 */
const getAllProducts = async ({ category, search } = {}) => {
  if (db.isDbConnected()) {
    try {
      const conditions = [];
      const params = [];

      // Filter Kategori
      if (
        category &&
        typeof category === 'string' &&
        category.trim() !== '' &&
        category.trim().toLowerCase() !== 'all'
      ) {
        params.push(category.trim().toLowerCase());
        conditions.push(`LOWER(c.slug) = $${params.length}`);
      }

      // Pencarian kata kunci
      if (search && typeof search === 'string' && search.trim() !== '') {
        params.push(`%${search.trim()}%`);
        conditions.push(
          `(p.name ILIKE $${params.length} OR p.description ILIKE $${params.length})`
        );
      }

      let query = `
        SELECT 
          p.id,
          p.name,
          p.slug,
          p.description,
          p.price,
          p.category_id,
          c.name AS category,
          c.slug AS category_slug,
          p.image_url,
          p.is_available,
          p.is_featured
        FROM products p
        JOIN categories c ON p.category_id = c.id
      `;

      if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
      }

      query += ` ORDER BY p.id ASC`;

      const result = await db.query(query, params);

      return result.rows.map((row) => ({
        id: Number(row.id),
        name: row.name,
        slug: row.slug,
        description: row.description || '',
        price: Number(row.price),
        category_id: Number(row.category_id),
        category: row.category,
        category_slug: row.category_slug,
        image_url: row.image_url,
        is_available: Boolean(row.is_available),
        is_featured: Boolean(row.is_featured),
      }));
    } catch (error) {
      console.warn('[ProductService] Fallback ke produk lokal:', error.message);
    }
  }

  // Fallback in-memory
  let filtered = [...mockProducts];

  if (
    category &&
    typeof category === 'string' &&
    category.trim() !== '' &&
    category.trim().toLowerCase() !== 'all'
  ) {
    const catSlug = category.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.category_slug?.toLowerCase() === catSlug ||
        p.category?.toLowerCase() === catSlug
    );
  }

  if (search && typeof search === 'string' && search.trim() !== '') {
    const q = search.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }

  return filtered;
};

/**
 * Mengambil detail produk berdasarkan ID
 */
const getProductById = async (id) => {
  const numericId = Number(id);

  if (db.isDbConnected()) {
    try {
      const query = `
        SELECT 
          p.id,
          p.name,
          p.slug,
          p.description,
          p.price,
          p.category_id,
          c.name AS category,
          c.slug AS category_slug,
          p.image_url,
          p.is_available,
          p.is_featured
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE p.id = $1
      `;

      const result = await db.query(query, [numericId]);

      if (result.rows.length === 0) {
        return null;
      }

      const row = result.rows[0];
      return {
        id: Number(row.id),
        name: row.name,
        slug: row.slug,
        description: row.description || '',
        price: Number(row.price),
        category_id: Number(row.category_id),
        category: row.category,
        category_slug: row.category_slug,
        image_url: row.image_url,
        is_available: Boolean(row.is_available),
        is_featured: Boolean(row.is_featured),
      };
    } catch (error) {
      console.warn('[ProductService] Fallback getProductById:', error.message);
    }
  }

  const found = mockProducts.find((p) => p.id === numericId);
  return found ? { ...found } : null;
};

/**
 * Menambahkan Produk Baru (Create)
 */
const createProduct = async (productData) => {
  const {
    name,
    description = '',
    price,
    category_id,
    category_slug,
    category: categoryName,
    image_url = '',
    is_available = true,
    is_featured = false,
  } = productData;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    const err = new Error('Nama produk wajib diisi');
    err.status = 400;
    throw err;
  }

  const numericPrice = Number(price);
  if (isNaN(numericPrice) || numericPrice < 0) {
    const err = new Error('Harga produk harus berupa angka valid dan tidak negatif');
    err.status = 400;
    throw err;
  }

  const baseSlug = generateSlug(name) || `produk-${Date.now()}`;
  let slug = baseSlug;

  // Resolusi Kategori ID
  let resolvedCategoryId = Number(category_id);
  if (!resolvedCategoryId) {
    const foundCat = mockCategories.find(
      (c) =>
        c.slug === category_slug ||
        c.name.toLowerCase() === (categoryName || '').toLowerCase()
    );
    resolvedCategoryId = foundCat ? foundCat.id : 1;
  }

  if (db.isDbConnected()) {
    try {
      // Pastikan slug unik
      const slugCheck = await db.query('SELECT id FROM products WHERE slug = $1', [slug]);
      if (slugCheck.rows.length > 0) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }

      const insertQuery = `
        INSERT INTO products (
          category_id, name, slug, description, price, image_url, is_available, is_featured
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, name, slug, description, price, category_id, image_url, is_available, is_featured
      `;
      const insertResult = await db.query(insertQuery, [
        resolvedCategoryId,
        name.trim(),
        slug,
        description.trim(),
        numericPrice,
        image_url.trim() || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
        Boolean(is_available),
        Boolean(is_featured),
      ]);

      const inserted = insertResult.rows[0];
      return await getProductById(inserted.id);
    } catch (error) {
      console.warn('[ProductService] Gagal simpan ke DB, menyimpan ke in-memory fallback:', error.message);
    }
  }

  // Fallback in-memory
  const newId = mockProducts.length > 0 ? Math.max(...mockProducts.map((p) => p.id)) + 1 : 1;
  const targetCategory = mockCategories.find((c) => c.id === resolvedCategoryId) || mockCategories[0];

  const newProduct = {
    id: newId,
    name: name.trim(),
    slug,
    description: description.trim(),
    price: numericPrice,
    category_id: targetCategory.id,
    category: targetCategory.name,
    category_slug: targetCategory.slug,
    image_url:
      image_url.trim() ||
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    is_available: is_available !== undefined ? Boolean(is_available) : true,
    is_featured: Boolean(is_featured),
  };

  mockProducts.push(newProduct);
  return { ...newProduct };
};

/**
 * Memperbarui Produk (Update)
 */
const updateProduct = async (id, updateData) => {
  const numericId = Number(id);
  const existing = await getProductById(numericId);
  if (!existing) {
    const err = new Error(`Produk dengan ID ${numericId} tidak ditemukan`);
    err.status = 404;
    throw err;
  }

  const name = updateData.name !== undefined ? updateData.name.trim() : existing.name;
  const description = updateData.description !== undefined ? updateData.description.trim() : existing.description;
  const price = updateData.price !== undefined ? Number(updateData.price) : existing.price;
  const image_url = updateData.image_url !== undefined ? updateData.image_url.trim() : existing.image_url;
  const is_available = updateData.is_available !== undefined ? Boolean(updateData.is_available) : existing.is_available;
  const is_featured = updateData.is_featured !== undefined ? Boolean(updateData.is_featured) : existing.is_featured;

  let category_id = existing.category_id || 1;
  if (updateData.category_id) {
    category_id = Number(updateData.category_id);
  } else if (updateData.category_slug) {
    const cat = mockCategories.find((c) => c.slug === updateData.category_slug);
    if (cat) category_id = cat.id;
  }

  if (isNaN(price) || price < 0) {
    const err = new Error('Harga produk harus berupa angka valid dan tidak negatif');
    err.status = 400;
    throw err;
  }

  let slug = existing.slug;
  if (name !== existing.name && updateData.slug) {
    slug = generateSlug(updateData.slug);
  } else if (name !== existing.name) {
    slug = generateSlug(name);
  }

  if (db.isDbConnected()) {
    try {
      const updateQuery = `
        UPDATE products
        SET
          name = $1,
          slug = $2,
          description = $3,
          price = $4,
          category_id = $5,
          image_url = $6,
          is_available = $7,
          is_featured = $8,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $9
        RETURNING id
      `;

      await db.query(updateQuery, [
        name,
        slug,
        description,
        price,
        category_id,
        image_url,
        is_available,
        is_featured,
        numericId,
      ]);

      return await getProductById(numericId);
    } catch (error) {
      console.warn('[ProductService] Gagal update di DB, memperbarui ke fallback lokal:', error.message);
    }
  }

  // Fallback in-memory
  const index = mockProducts.findIndex((p) => p.id === numericId);
  const targetCategory = mockCategories.find((c) => c.id === category_id) || mockCategories[0];

  const updatedItem = {
    ...mockProducts[index],
    name,
    slug,
    description,
    price,
    category_id: targetCategory.id,
    category: targetCategory.name,
    category_slug: targetCategory.slug,
    image_url,
    is_available,
    is_featured,
  };

  if (index !== -1) {
    mockProducts[index] = updatedItem;
  }

  return { ...updatedItem };
};

/**
 * Menghapus Produk (Delete)
 */
const deleteProduct = async (id) => {
  const numericId = Number(id);
  const existing = await getProductById(numericId);
  if (!existing) {
    const err = new Error(`Produk dengan ID ${numericId} tidak ditemukan`);
    err.status = 404;
    throw err;
  }

  if (db.isDbConnected()) {
    try {
      await db.query('DELETE FROM products WHERE id = $1', [numericId]);
      return { success: true, id: numericId, message: 'Produk berhasil dihapus' };
    } catch (error) {
      console.warn('[ProductService] Gagal hapus dari DB, menghapus dari fallback lokal:', error.message);
    }
  }

  const index = mockProducts.findIndex((p) => p.id === numericId);
  if (index !== -1) {
    mockProducts.splice(index, 1);
  }

  return { success: true, id: numericId, message: 'Produk berhasil dihapus dari sistem' };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
