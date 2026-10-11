const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Muat variabel lingkungan dari berkas .env
dotenv.config();

// Konfigurasi koneksi PostgreSQL pg Pool dari DATABASE_URL
const pool = require('./config/db');

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 5000;

// Middleware CORS - hanya untuk FRONTEND_URL
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));
app.use(express.json());

// Registrasi Route API
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// Endpoint pemeriksaan kesehatan server
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Penanganan rute yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({ message: 'Rute tidak ditemukan' });
});

// Middleware penanganan error terpusat (tanpa stack trace)
app.use(errorHandler);

// Jalankan server jika dipanggil langsung
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server Kopi Sadewo berjalan pada port ${port}`);
  });
}

module.exports = app;
