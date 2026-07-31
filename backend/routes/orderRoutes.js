const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  placeOrder,
  getMyOrders,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  requestReturn,
} = require("../controllers/orderController");

// Create order
router.post("/", protect, placeOrder);

// User orders
// IMPORTANT: keep before /:id
router.get("/my-orders", protect, getMyOrders);

// Admin get all orders
router.get("/", protect, admin, getAllOrders);

// Admin update order status
router.put("/:id/status", protect, admin, updateOrderStatus);

// Cancel order
router.put("/cancel/:id", protect, cancelOrder);

// Return request
router.put("/return/:id", protect, requestReturn);

// Single order
// Keep at bottom
router.get("/:id", protect, getSingleOrder);

module.exports = router;
