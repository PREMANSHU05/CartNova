const express = require("express");
const router = express.Router();
const { generateInvoice } = require("../controllers/invoiceController");
const protect = require("../middleware/authMiddleware");

router.get("/:orderId", protect, generateInvoice);

module.exports = router;
