module.exports = (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || (err.name === "MulterError" ? 400 : err.code === "P2025" ? 404 : err.code === "P2002" ? 409 : 500);
  res.status(status).json({ success: false, message: status === 500 ? err.message || "Internal server error" : err.message });
};
