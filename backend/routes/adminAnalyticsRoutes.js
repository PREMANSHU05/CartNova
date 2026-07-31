const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const {
  dashboardAnalytics,
} = require("../controllers/adminAnalyticsController");

router.get("/dashboard", protect, admin, dashboardAnalytics);

module.exports = router;
