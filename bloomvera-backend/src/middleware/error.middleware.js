// 404 handler
function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}

// Global error handler
function errorHandler(err, req, res, next) {
  // CORS error
  if (err.message && err.message.startsWith("CORS:")) {
    return res.status(403).json({ success: false, message: err.message });
  }

  const statusCode = err.statusCode || err.status || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "An internal server error occurred"
      : err.message || "Internal Server Error";

  console.error(`[ERROR] ${statusCode} — ${err.message}`);
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }

  res.status(statusCode).json({ success: false, message });
}

module.exports = { notFound, errorHandler };
