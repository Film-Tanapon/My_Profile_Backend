const crypto=require('crypto');const fs=require('fs');const path=require('path');const multer=require('multer');
const uploadRoot = path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), "storage", "uploads"));
const imageDirectory = path.join(uploadRoot, "images");
fs.mkdirSync(imageDirectory, { recursive: true });

const extensions = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, imageDirectory),
  filename: (_req, file, callback) => callback(null, `${Date.now()}-${crypto.randomUUID()}${extensions[file.mimetype]}`),
});

const uploadImage = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!extensions[file.mimetype]) return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "image"));
    callback(null, true);
  },
});


module.exports={uploadImage,uploadRoot};
