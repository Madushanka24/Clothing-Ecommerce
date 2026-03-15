const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

dotenv.config();

const seedCart = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for Cart seeding");

    // Delete existing carts
    await Cart.deleteMany();

    // Fetch products
    const products = await Product.find();

    if (products.length === 0) {
      console.log("No products found to add to cart");
      process.exit();
    }

    // Create a demo cart using first 2 products
    const cart = {
      items: [
        { product: products[0]._id, quantity: 1 },
        { product: products[1]._id, quantity: 2 }
      ]
    };

    await Cart.create(cart);

    console.log("Cart seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedCart();