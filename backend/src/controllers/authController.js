const authService = require('../services/authService');

/**
 * Controller untuk otentikasi login admin
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email dan kata sandi wajib diisi',
      });
    }

    const result = await authService.login(email, password);

    return res.status(200).json({
      status: 'success',
      message: 'Berhasil masuk ke dasbor admin Kopi Sadewo',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Mengambil informasi sesi admin yang sedang aktif
 */
const getMe = async (req, res, next) => {
  try {
    const profile = await authService.getAdminProfile(req.admin.id, req.admin.email);
    return res.status(200).json({
      status: 'success',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Logout admin
 */
const logout = async (req, res) => {
  return res.status(200).json({
    status: 'success',
    message: 'Berhasil keluar dari sesi admin',
  });
};

module.exports = {
  login,
  getMe,
  logout,
};
