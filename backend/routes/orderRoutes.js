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

router.post("/", protect, placeOrder);

router.get("/my-orders", protect, getMyOrders);

router.get("/", protect, admin, getAllOrders);

router.put("/:id/status", protect, admin, updateOrderStatus);

router.put("/cancel/:id", protect, cancelOrder);

router.put("/return/:id", protect, requestReturn);

router.get("/:id", protect, getSingleOrder);

module.exports = router;
