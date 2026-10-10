exports.create = (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "image is required" });
  res.status(201).json({
    success: true,
    data: {
      filename: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      url: `/uploads/images/${req.file.filename}`,
    },
  });
};
