const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

/**
 * POST /api/upload
 * Mengunggah berkas foto produk (Khusus Admin)
 */
router.post('/', requireAdmin, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: err.message || 'Gagal mengunggah foto produk',
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Harap pilih berkas foto yang ingin diunggah.',
      });
    }

    // Path relatif publik yang dilayani static express
    const relativeUrl = `/images/products/${req.file.filename}`;

    return res.status(200).json({
      status: 'success',
      message: 'Foto produk berhasil diunggah',
      data: {
        url: relativeUrl,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    });
  });
});

module.exports = router;
