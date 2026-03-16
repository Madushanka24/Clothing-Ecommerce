const Cart = require("../models/Cart");

// GET cart (by user or guest)
exports.getCart = async (req, res) => {
  try {
    let cart;
    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    } else {
      // For guest, use cartId query param
      cart = req.query.cartId
        ? await Cart.findById(req.query.cartId).populate("items.product")
        : null;
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
  const { productId, size, quantity, cartId } = req.body;

  try {
    let cart;

    if (req.user) {
      cart = await Cart.findOne({ user: req.user._id });
      if (!cart) {
        cart = await Cart.create({ user: req.user._id, items: [] });
      }
    } else {
      // Guest user
      cart = cartId
        ? await Cart.findById(cartId)
        : await Cart.create({ items: [] });
    }

    // Convert quantity to number
    const qty = Number(quantity);

    // Check if item with same product & size exists
    const existingItem = cart.items.find(
      (i) => i.product.toString() === productId && i.size === size
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({ product: productId, size, quantity: qty });
    }

    await cart.save();

    // Populate product details before sending response
    const populatedCart = await cart.populate("items.product");
    res.json(populatedCart);

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

    item.quantity = Number(quantity);
    await cart.save();

    const populatedCart = await cart.populate("items.product");
    res.json(populatedCart);

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

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.remove();
    await cart.save();

    const populatedCart = await cart.populate("items.product");
    res.json(populatedCart);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};