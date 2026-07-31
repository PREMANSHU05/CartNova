const Review = require("../models/Review");
const Product = require("../models/Product");

const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      product: req.params.productId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product",
      });
    }

    const review = await Review.create({
      product: req.params.productId,
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    });

    const reviews = await Review.find({ product: req.params.productId });

    product.numReviews = reviews.length;
    product.rating =
      reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length;

    product.reviews.push(review._id);

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("user", "name");

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await Review.findByIdAndDelete(req.params.reviewId);

    const reviews = await Review.find({ product: review.product });

    const product = await Product.findById(review.product);

    if (product) {
      product.numReviews = reviews.length;
      product.rating =
        reviews.length > 0
          ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
          : 0;
      await product.save();
    }

    res.json({
      success: true,
      message: "Review deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getReviews,
  deleteReview,
};
