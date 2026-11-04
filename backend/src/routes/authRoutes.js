const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAdmin } = require('../middlewares/authMiddleware');

// POST /api/auth/login - Masuk sebagai admin
router.post('/login', authController.login);

// GET /api/auth/me - Mendapatkan profil admin yang sedang login
router.get('/me', requireAdmin, authController.getMe);

// POST /api/auth/logout - Keluar sesi admin
router.post('/logout', authController.logout);

module.exports = router;
