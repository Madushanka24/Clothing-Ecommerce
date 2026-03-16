const Order = require("../models/Order");
const Cart = require("../models/Cart");
const nodemailer = require("nodemailer");
const sendOrderConfirmationEmail = require("../utils/mailer");

// MOCK CHECKOUT & SAVE ORDER
exports.checkout = async (req, res) => {
  try {
    const { cartId } = req.body;

    const cart = await Cart.findById(cartId).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    let totalPrice = 0;
    cart.items.forEach(item => {
      totalPrice += item.product.price * item.quantity;
    });

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map(item => ({
        product: item.product._id,
        size: item.size,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalPrice,
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    // Send confirmation email
    await sendOrderEmail(req.user.email, order);

    res.json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Nodemailer function
const sendOrderEmail = async (toEmail, order) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const itemsHtml = order.items.map(i => `
    <li>${i.product.name} - Size: ${i.size} - Qty: ${i.quantity} - $${i.price}</li>
  `).join("");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: `Order Confirmation - ${order._id}`,
    html: `
      <h2>Thank you for your order!</h2>
      <p>Order ID: ${order._id}</p>
      <p>Order Date: ${order.createdAt.toLocaleString()}</p>
      <ul>${itemsHtml}</ul>
      <p>Total: $${order.totalPrice}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};