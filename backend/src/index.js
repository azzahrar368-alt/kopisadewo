const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Muat variabel lingkungan dari berkas .env
dotenv.config();

// Konfigurasi koneksi database
const db = require('./config/db');

const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 5000;

// Daftar origin yang diizinkan untuk CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://localhost:3000',
].filter(Boolean);

// Middleware CORS yang ramah lingkungan pengembangan & produksi
app.use(
  cors({
    origin: (origin, callback) => {
      // Izinkan permintaan tanpa origin (seperti curl, mobile app, Postman, Vercel/Netlify SSR)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV !== 'production' ||
        origin.startsWith('http://localhost:') ||
        origin.startsWith('http://127.0.0.1:') ||
        origin.includes('.vercel.app') ||
        origin.includes('.netlify.app')
      ) {
        return callback(null, true);
      }
      return callback(new Error('Akses diblokir oleh kebijakan CORS Kopi Sadewo'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  })
);

app.use(express.json());

// Sajikan berkas statis publik (misal: gambar produk lokal)
app.use(express.static(path.join(__dirname, '../public')));

// Root Endpoint - Informasi API Kopi Sadewo
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    app: 'API Kopi Sadewo (Pendopo & Roastery)',
    version: '1.0.0',
    database: db.isDbConnected() ? 'PostgreSQL (Connected)' : 'In-Memory Fallback (Ready)',
    endpoints: {
      health: '/api/health',
      auth: {
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
        logout: 'POST /api/auth/logout',
      },
      categories: '/api/categories',
      products: '/api/products',
      productsFilter: '/api/products?category=coffee&search=latte',
    },
  });
});

// Endpoint pemeriksaan kesehatan server
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: db.isDbConnected() ? 'PostgreSQL' : 'in-memory-fallback',
  });
});

// Registrasi Route API
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);

// Penanganan rute yang tidak ditemukan (404)
app.use((req, res) => {
  res.status(404).json({ message: 'Rute tidak ditemukan' });
});

// Middleware penanganan error terpusat
app.use(errorHandler);

// Inisialisasi DB & Jalankan server jika dipanggil langsung
if (require.main === module) {
  db.initDatabase().finally(() => {
    app.listen(port, () => {
      console.log(`✓ Server Kopi Sadewo berjalan pada port ${port}`);
      console.log(`  Alamat: http://localhost:${port}`);
      console.log(`  API Health: http://localhost:${port}/api/health`);
      console.log(`  API Auth: http://localhost:${port}/api/auth/login`);
      console.log(`  API Products: http://localhost:${port}/api/products`);
      console.log(`  API Categories: http://localhost:${port}/api/categories`);
    });
  });
}

module.exports = app;
