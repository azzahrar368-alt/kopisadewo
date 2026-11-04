const db = require('../config/db');
const { categories: mockCategories, products: mockProducts } = require('./mockData');

const generateSlug = (name) => {
  return String(name || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Mengambil seluruh daftar kategori
 */
const getAllCategories = async () => {
  if (db.isDbConnected()) {
    try {
      const query = `
        SELECT id, name, slug, description
        FROM categories
        ORDER BY id ASC
      `;
      const result = await db.query(query);

      return result.rows.map((row) => ({
        id: Number(row.id),
        name: row.name,
        slug: row.slug,
        description: row.description || '',
      }));
    } catch (error) {
      console.warn('[CategoryService] Menggunakan fallback kategori lokal:', error.message);
    }
  }

  return [...mockCategories];
};

/**
 * Tambah Kategori Baru (Khusus Admin)
 */
const createCategory = async ({ name, slug, description = '' }) => {
  if (!name || typeof name !== 'string' || name.trim() === '') {
    const err = new Error('Nama kategori wajib diisi');
    err.status = 400;
    throw err;
  }

  const resolvedSlug = (slug ? generateSlug(slug) : generateSlug(name)) || `kategori-${Date.now()}`;

  if (db.isDbConnected()) {
    try {
      const query = `
        INSERT INTO categories (name, slug, description)
        VALUES ($1, $2, $3)
        RETURNING id, name, slug, description
      `;
      const result = await db.query(query, [name.trim(), resolvedSlug, description.trim()]);
      return result.rows[0];
    } catch (error) {
      console.warn('[CategoryService] Gagal simpan ke DB, menggunakan fallback:', error.message);
    }
  }

  const newId = mockCategories.length > 0 ? Math.max(...mockCategories.map((c) => c.id)) + 1 : 1;
  const newCat = {
    id: newId,
    name: name.trim(),
    slug: resolvedSlug,
    description: description.trim(),
  };
  mockCategories.push(newCat);
  return { ...newCat };
};

/**
 * Update Kategori (Khusus Admin)
 */
const updateCategory = async (id, { name, slug, description }) => {
  const numericId = Number(id);

  if (db.isDbConnected()) {
    try {
      const query = `
        UPDATE categories
        SET
          name = COALESCE($1, name),
          slug = COALESCE($2, slug),
          description = COALESCE($3, description)
        WHERE id = $4
        RETURNING id, name, slug, description
      `;
      const result = await db.query(query, [
        name ? name.trim() : null,
        slug ? generateSlug(slug) : null,
        description !== undefined ? description.trim() : null,
        numericId,
      ]);

      if (result.rows.length === 0) {
        const err = new Error('Kategori tidak ditemukan');
        err.status = 404;
        throw err;
      }
      return result.rows[0];
    } catch (error) {
      console.warn('[CategoryService] Gagal update di DB, fallback:', error.message);
    }
  }

  const cat = mockCategories.find((c) => c.id === numericId);
  if (!cat) {
    const err = new Error('Kategori tidak ditemukan');
    err.status = 404;
    throw err;
  }

  if (name) cat.name = name.trim();
  if (slug) cat.slug = generateSlug(slug);
  if (description !== undefined) cat.description = description.trim();

  return { ...cat };
};

/**
 * Hapus Kategori (Khusus Admin)
 */
const deleteCategory = async (id) => {
  const numericId = Number(id);

  // Periksa apakah ada produk yang terikat ke kategori ini
  const allProducts = db.isDbConnected() ? [] : mockProducts;
  const inUse = allProducts.some((p) => p.category_id === numericId);
  if (inUse) {
    const err = new Error('Kategori tidak dapat dihapus karena masih ada produk yang menggunakannya');
    err.status = 400;
    throw err;
  }

  if (db.isDbConnected()) {
    try {
      const result = await db.query('DELETE FROM categories WHERE id = $1 RETURNING id', [numericId]);
      if (result.rows.length === 0) {
        const err = new Error('Kategori tidak ditemukan');
        err.status = 404;
        throw err;
      }
      return { success: true, id: numericId };
    } catch (error) {
      console.warn('[CategoryService] Gagal delete di DB, fallback:', error.message);
    }
  }

  const idx = mockCategories.findIndex((c) => c.id === numericId);
  if (idx !== -1) {
    mockCategories.splice(idx, 1);
  }

  return { success: true, id: numericId };
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
