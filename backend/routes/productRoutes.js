const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const upload = require("../middleware/upload");
const {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  addReview,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/admin/products", protect, admin, getAdminProducts);
router.post("/:id/review", protect, addReview);
router.get("/:id", getSingleProduct);
router.post("/", protect, admin, upload.single("image"), addProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;
