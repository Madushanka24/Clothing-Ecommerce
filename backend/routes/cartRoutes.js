const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");


router.get("/", protect, getCart); // user cart
router.post("/",protect,  addToCart);
router.put("/:cartId", updateCartItem);
router.delete("/:cartId/:itemId", removeCartItem);

module.exports = router;