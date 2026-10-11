const pool = require('../config/db');

const getAllProducts = async ({ category, search }) => {
  const conditions = [];
  const params = [];

  if (category && typeof category === 'string' && category.trim() !== '') {
    params.push(category.trim());
    conditions.push(`LOWER(c.slug) = LOWER($${params.length})`);
  }

  if (search && typeof search === 'string' && search.trim() !== '') {
    params.push(`%${search.trim()}%`);
    conditions.push(`(p.name ILIKE $${params.length} OR p.description ILIKE $${params.length})`);
  }

  let query = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.price,
      c.name AS category,
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

  const result = await pool.query(query, params);

  return result.rows.map((row) => ({
    id: Number(row.id),
    name: row.name,
    slug: row.slug,
    price: Number(row.price),
    category: row.category,
    image_url: row.image_url,
    is_available: Boolean(row.is_available),
    is_featured: Boolean(row.is_featured),
  }));
};

const getProductById = async (id) => {
  const query = `
    SELECT 
      p.id,
      p.name,
      p.slug,
      p.price,
      c.name AS category,
      p.image_url,
      p.is_available,
      p.is_featured
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.id = $1
  `;

  const result = await pool.query(query, [id]);

  if (result.rows.length === 0) {
    return null;
  }

  const row = result.rows[0];
  return {
    id: Number(row.id),
    name: row.name,
    slug: row.slug,
    price: Number(row.price),
    category: row.category,
    image_url: row.image_url,
    is_available: Boolean(row.is_available),
    is_featured: Boolean(row.is_featured),
  };
};

module.exports = {
  getAllProducts,
  getProductById,
};
