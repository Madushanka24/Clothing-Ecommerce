const Cart = require("../models/Cart");

// GET cart (by user or guest)
exports.getCart = async (req, res) => {
  try {
    let cart;
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    } else {
      // For guest, you can use a query param like cartId
      cart = await Cart.findById(req.query.cartId).populate("items.product");
    }

    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD item to cart
exports.addToCart = async (req, res) => {
  const { productId, size, quantity } = req.body;
  try {
    let cart;

    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
      }
    } else {
      // For guest, use cartId from body
      cart = req.body.cartId
        ? await Cart.findById(req.body.cartId)
        : await Cart.create({ items: [] });
    }

    // Check if item with same product & size exists
    const existingItem = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, size, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE item quantity
exports.updateCartItem = async (req, res) => {
  const { itemId, quantity } = req.body;
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// REMOVE item from cart
exports.removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items.id(req.params.itemId).remove();
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};