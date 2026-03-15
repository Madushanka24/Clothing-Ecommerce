const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");

// GET cart
router.get("/", protect, getCart); // user cart
// POST add item
router.post("/", addToCart);
// PUT update item
router.put("/:cartId", updateCartItem);
// DELETE remove item
router.delete("/:cartId/:itemId", removeCartItem);

module.exports = router;