const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail", // or your email provider
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password or real password
  },
});

const sendOrderConfirmationEmail = (toEmail, order) => {
  const itemsList = order.items.map(
    (item) =>
      `${item.product.name} - Size: ${item.size} - Qty: ${item.quantity} - $${item.product.price * item.quantity}`
  ).join("\n");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: `Order Confirmation - Order #${order._id}`,
    text: `
Thank you for your purchase!

Order ID: ${order._id}
Order Date: ${order.orderDate.toDateString()}

Items:
${itemsList}

Total: $${order.totalPrice}

We hope you enjoy your new clothes!
`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log("Email error:", err);
    else console.log("Email sent:", info.response);
  });
};

module.exports = sendOrderConfirmationEmail;