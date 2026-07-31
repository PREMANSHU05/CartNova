const express = require("express");

const router = express.Router();

const {
  createCoupon,
  applyCoupon,
} = require("../controllers/couponController");

const protect = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// Admin create coupon
router.post("/", protect, admin, createCoupon);

// User apply coupon
router.post("/apply", protect, applyCoupon);

module.exports = router;
