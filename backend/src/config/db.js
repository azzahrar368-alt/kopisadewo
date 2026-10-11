const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Koneksi pool database PostgreSQL mengalami error tidak terduga:', err);
});

// Ekspor objek biasa, jangan menimpa fungsi bawaan pool
module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
};