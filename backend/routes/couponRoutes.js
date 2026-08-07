const express = require("express");

const router = express.Router();

const {
  createCoupon,
  applyCoupon,
} = require("../controllers/couponController");

const protect = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.post("/", protect, admin, createCoupon);

router.post("/apply", protect, applyCoupon);

module.exports = router;
