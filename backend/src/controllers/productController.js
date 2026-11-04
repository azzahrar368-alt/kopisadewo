const productService = require('../services/productService');

/**
 * Mengambil semua produk dengan filter kategori & pencarian kata kunci
 */
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

/**
 * Mengambil detail produk berdasarkan ID
 */
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        message: 'ID produk tidak valid, harus berupa angka',
      });
    }

    const product = await productService.getProductById(Number(id));

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

/**
 * Menambahkan produk baru (Khusus Admin)
 */
const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json({
      status: 'success',
      message: 'Produk berhasil ditambahkan ke menu Kopi Sadewo',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Memperbarui produk (Khusus Admin)
 */
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        message: 'ID produk tidak valid, harus berupa angka',
      });
    }

    const updated = await productService.updateProduct(Number(id), req.body);
    return res.status(200).json({
      status: 'success',
      message: 'Produk berhasil diperbarui',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Menghapus produk (Khusus Admin)
 */
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        message: 'ID produk tidak valid, harus berupa angka',
      });
    }

    const result = await productService.deleteProduct(Number(id));
    return res.status(200).json({
      status: 'success',
      message: 'Produk berhasil dihapus dari menu',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
