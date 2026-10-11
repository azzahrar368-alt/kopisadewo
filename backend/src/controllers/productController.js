const productService = require('../services/productService');

const getProducts = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const products = await productService.getAllProducts({ category, search });

    return res.status(200).json({
      data: products,
      meta: {
        total: products.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validasi id bukan angka = 400
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        message: 'ID produk tidak valid, harus berupa angka',
      });
    }

    const product = await productService.getProductById(Number(id));

    // Validasi id tidak ada = 404
    if (!product) {
      return res.status(404).json({
        message: 'Produk tidak ditemukan',
      });
    }

    return res.status(200).json({
      data: product,
      meta: {
        total: 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
};
