const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

router.post("/add", protect, addToCart);

router.get("/", protect, getCart);

router.put("/update/:productId", protect, updateCartQuantity);

router.delete("/remove/:productId", protect, removeFromCart);

router.delete("/clear", protect, clearCart);

module.exports = router;
