const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const products = require("./products");

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    // Delete existing products
    await Product.deleteMany();

    // Insert demo products
    await Product.insertMany(products);

    console.log("Products seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();