const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

const {
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/userController");

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.put(
  "/profile-image",
  protect,
  upload.single("image"),
  uploadProfileImage,
);

module.exports = router;
