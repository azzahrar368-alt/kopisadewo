// Middleware penanganan error terpusat tanpa menampilkan stack trace
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Terjadi kesalahan internal pada server';

  // Pastikan respons error bersih dan tidak menyertakan stack trace
  res.status(statusCode).json({
    message,
  });
};

module.exports = errorHandler;
