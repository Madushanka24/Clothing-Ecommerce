const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const cartController = require("../controllers/cartController");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");


router.get("/", protect, cartController.getCart); // user cart
router.post("/",protect,  cartController.addToCart);
router.put("/:cartId",protect, cartController.updateCartItem);
router.delete("/:cartId/:itemId", protect, cartController.removeCartItem);

module.exports = router;