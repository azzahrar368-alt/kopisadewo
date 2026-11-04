const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { requireAdmin } = require('../middlewares/authMiddleware');

// Publik
router.get('/', categoryController.getCategories);

// Khusus Admin
router.post('/', requireAdmin, categoryController.createCategory);
router.put('/:id', requireAdmin, categoryController.updateCategory);
router.delete('/:id', requireAdmin, categoryController.deleteCategory);

module.exports = router;
