const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

const {
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/userController");

// Get Profile
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

// Upload Profile Image
router.put(
  "/profile-image",
  protect,
  upload.single("image"),
  uploadProfileImage,
);

module.exports = router;
