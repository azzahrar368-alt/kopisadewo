const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { requireAdmin } = require('../middlewares/authMiddleware');

// Publik: Mengambil daftar produk & detail produk
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Khusus Admin: Menambah, mengubah, dan menghapus produk
router.post('/', requireAdmin, productController.createProduct);
router.put('/:id', requireAdmin, productController.updateProduct);
router.delete('/:id', requireAdmin, productController.deleteProduct);

module.exports = router;
