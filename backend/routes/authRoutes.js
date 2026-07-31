const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
  adminDashboard,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password", resetPassword);

// Profile
router.get("/profile", protect, getProfile);

// Admin
router.get("/admin", protect, admin, adminDashboard);

module.exports = router;
