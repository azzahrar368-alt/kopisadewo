const { Pool } = require('pg');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

let isDatabaseConnected = false;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/kopisadewodev',
  connectionTimeoutMillis: 3000,
});

pool.on('error', (err) => {
  console.warn('[DB] Peringatan koneksi PostgreSQL pool:', err.message);
});

/**
 * Inisialisasi dan pengujian koneksi database
 */
const initDatabase = async () => {
  try {
    const client = await pool.connect();
    isDatabaseConnected = true;
    console.log('✓ [DB] Berhasil terhubung ke database PostgreSQL.');

    // Periksa apakah tabel admins, categories & products sudah ada
    const tableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name IN ('admins', 'categories', 'products');
    `);

    if (tableCheck.rows.length < 3) {
      console.log('[DB] Menginisialisasi skema tabel & data awal...');
      const schemaPath = path.join(__dirname, '../../sql/schema.sql');
      const seedPath = path.join(__dirname, '../../sql/seed.sql');

      if (fs.existsSync(schemaPath)) {
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await client.query(schemaSql);
        console.log('✓ [DB] Skema tabel berhasil dibuat.');
      }

      if (fs.existsSync(seedPath)) {
        const seedSql = fs.readFileSync(seedPath, 'utf8');
        await client.query(seedSql);
        console.log('✓ [DB] Data awal (seed) produk, kategori & admin berhasil dimuat.');
      }
    }

    client.release();
    return true;
  } catch (error) {
    isDatabaseConnected = false;
    console.warn(`! [DB] Database PostgreSQL belum aktif atau belum dapat diakses (${error.message}).`);
    console.log('ℹ [DB] Mengaktifkan mode data mandiri (In-Memory Fallback) agar server backend tetap berjalan normal.');
    return false;
  }
};

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
  initDatabase,
  isDbConnected: () => isDatabaseConnected,
};
