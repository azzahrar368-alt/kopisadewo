const categoryService = require('../services/categoryService');

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json({
      data: categories,
      meta: {
        total: categories.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    return res.status(201).json({
      status: 'success',
      message: 'Kategori berhasil dibuat',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryService.updateCategory(Number(id), req.body);
    return res.status(200).json({
      status: 'success',
      message: 'Kategori berhasil diperbarui',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await categoryService.deleteCategory(Number(id));
    return res.status(200).json({
      status: 'success',
      message: 'Kategori berhasil dihapus',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
