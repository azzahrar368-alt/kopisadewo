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

module.exports = {
  getCategories,
};
