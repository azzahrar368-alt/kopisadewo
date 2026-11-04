const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan direktori penyimpanan foto produk publik ada
const uploadDir = path.join(__dirname, '../../public/images/products');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi penyimpanan disk multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path
      .basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/^-+|-+$/g, '') || 'menu';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e5)}`;
    cb(null, `prod-${cleanName}-${uniqueSuffix}${ext || '.jpg'}`);
  },
});

// Filter hanya format foto/gambar
const fileFilter = (req, file, cb) => {
  const allowedExtensions = /jpeg|jpg|png|webp|gif/;
  const mimeMatch = file.mimetype.startsWith('image/');
  const extMatch = allowedExtensions.test(path.extname(file.originalname).toLowerCase());

  if (mimeMatch && extMatch) {
    return cb(null, true);
  }
  cb(new Error('Format berkas tidak didukung. Harap unggah foto berekstensi JPG, PNG, WEBP, atau GIF.'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Batas maksimal 5MB
  },
});

module.exports = upload;
