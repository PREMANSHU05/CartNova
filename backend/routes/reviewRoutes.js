const express = require("express");

const router = express.Router();

const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");

// Add Review
router.post("/:productId", protect, addReview);

// Get Product Reviews
router.get("/:productId", getReviews);

// Delete Review
router.delete("/:reviewId", protect, deleteReview);

module.exports = router;
