const mongoose = require("mongoose");

// Subdocument schema for each item in the cart
const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  size: { type: String, enum: ["S", "M", "L", "XL"], required: true },
  quantity: { type: Number, default: 1, min: 1 },
});

// Main Cart schema
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // must be linked to a registered user
  },
  items: { type: [cartItemSchema], default: [] }, // cart items
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }, // track last update
});

// Pre-save hook to update updatedAt automatically
cartSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Cart", cartSchema);