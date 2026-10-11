const pool = require('../config/db');

const getAllCategories = async () => {
  const query = `
    SELECT id, name, slug, description
    FROM categories
    ORDER BY id ASC
  `;
  const result = await pool.query(query);

  return result.rows.map((row) => ({
    id: Number(row.id),
    name: row.name,
    slug: row.slug,
    description: row.description,
  }));
};

module.exports = {
  getAllCategories,
};
