import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart || cart.items.length === 0)
    return <h3 className="container mt-5">Your cart is empty.</h3>;

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setLoading(true);
    try {
       await API.post("/orders", {
        items: cart.items.map((item) => ({
          product: item.product._id,
          size: item.size,
          quantity: item.quantity
        })),
        totalPrice
      });

      alert("Order placed successfully! Check your email for confirmation.");

      // Redirect to home after checkout
      navigate("/");

    } catch (error) {
      console.log(error);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>

      <table className="table mt-4">
        <thead>
          <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item._id}>
              <td>{item.product.name}</td>
              <td>{item.size}</td>
              <td>{item.quantity}</td>
              <td>${item.product.price}</td>
              <td>${item.product.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Total: ${totalPrice}</h4>

      <button
        className="btn btn-success mt-3"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
}

export default Checkout;