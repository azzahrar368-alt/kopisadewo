const authService = require('../services/authService');

/**
 * Middleware untuk memvalidasi token JWT Admin
 * Melindungi rute sensitif seperti POST/PUT/DELETE Produk & Kategori
 */
const requireAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Akses ditolak. Token otentikasi admin diperlukan.',
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Akses ditolak. Token otentikasi tidak ditemukan.',
      });
    }

    const decoded = authService.verifyToken(token);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Sesi admin telah berakhir atau token tidak valid. Silakan masuk kembali.',
      detail: error.message,
    });
  }
};

module.exports = {
  requireAdmin,
};
