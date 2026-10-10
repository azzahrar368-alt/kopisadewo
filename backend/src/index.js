const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Muat variabel lingkungan dari berkas .env
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware dasar
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());

// Endpoint pemeriksaan kesehatan server
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server Kopi Sadewo berjalan pada port ${port}`);
});
