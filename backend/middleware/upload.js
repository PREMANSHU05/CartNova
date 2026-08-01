const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "cartify-products",

    resource_type: "image",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "gif", "avif"],
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new Error("Only image files can be uploaded"));
    }

    callback(null, true);
  },
});

module.exports = upload;
