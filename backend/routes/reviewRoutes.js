const express = require("express");

const router = express.Router();

const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

const protect = require("../middleware/authMiddleware");

router.post("/:productId", protect, addReview);

router.get("/:productId", getReviews);

router.delete("/:reviewId", protect, deleteReview);

module.exports = router;
