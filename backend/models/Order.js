const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  size: { type: String, enum: ["S","M","L","XL"], required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }, // store price at purchase time
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
},{ timestamps: true });

module.exports = mongoose.model("Order", orderSchema);