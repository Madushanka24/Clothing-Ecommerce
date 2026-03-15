const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { checkout } = require("../controllers/orderController");

// POST checkout
router.post("/checkout", protect, checkout);

module.exports = router;
