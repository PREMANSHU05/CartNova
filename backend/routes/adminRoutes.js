const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  getAdminStats,
  getAllUsers,
  deleteUser,
  updateUserRole,
  getRecentOrders,
  getLatestUsers,
} = require("../controllers/adminController");

// Dashboard stats
router.get("/stats", protect, admin, getAdminStats);

router.get("/users", protect, admin, getAllUsers);

router.put("/users/:id/role", protect, admin, updateUserRole);

router.delete("/users/:id", protect, admin, deleteUser);
router.get("/recent-orders", protect, admin, getRecentOrders);
router.get("/latest-users", protect, admin, getLatestUsers);
module.exports = router;
