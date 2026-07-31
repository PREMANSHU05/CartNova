const Product = require("../models/Product");

// ===============================
// Add Product
// ===============================

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, status } = req.body;

    // Cloudinary Image URL
    const image = req.file ? req.file.path : "https://via.placeholder.com/300";

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    const product = await Product.create({
      name,

      description,

      price,

      category,

      stock,

      image,

      status,

      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,

      message: "Product added successfully",

      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ===============================
// Get User Products
// Search + Filter + Pagination
// ===============================
const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 8;
    const keyword = req.query.keyword || "";
    const category = req.query.category || "";
    const sort = req.query.sort || "";

    const query = {};

    // Search by product name
    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: "i",
      };
    }

    // Filter by category
    if (category && category !== "All") {
      query.category = category;
    }

    // Sorting
    let sortOption = {};

    switch (sort) {
      case "low":
        sortOption = { price: 1 };
        break;
      case "high":
        sortOption = { price: -1 };
        break;
      case "new":
        sortOption = { createdAt: -1 };
        break;
      case "old":
        sortOption = { createdAt: 1 };
        break;
      case "az":
        sortOption = { name: 1 };
        break;
      case "za":
        sortOption = { name: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    console.log("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Single Product
// ===============================

const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,

        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,

      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ===============================
// Update Product
// ===============================

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,

        message: "Product not found",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,

      req.body,

      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,

      message: "Product updated successfully",

      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ===============================
// Delete Product
// ===============================

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,

        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,

      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user?.toString() === req.user._id.toString(),
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this product",
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.reviews.length;

    await product.save();

    res.json({
      success: true,
      message: "Review added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Admin Get All Products
// Active + Inactive
// ===============================

const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,

      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  addProduct,

  getProducts,

  getAdminProducts,

  getSingleProduct,

  updateProduct,

  deleteProduct,
  addReview,
};
