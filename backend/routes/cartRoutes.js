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

// Add product
router.post("/add", protect, addToCart);

// Get cart
router.get("/", protect, getCart);

// Update quantity
router.put("/update/:productId", protect, updateCartQuantity);

// Remove product
router.delete("/remove/:productId", protect, removeFromCart);

// Clear cart
router.delete("/clear", protect, clearCart);

module.exports = router;
