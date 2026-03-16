import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (err) {
      alert("Please login first");
      navigate("/");
    }
  };

  const getTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const placeOrder = async () => {
    try {
      const res = await API.post("/orders", {
        items: cart.items,
      });

      alert("Order placed successfully!");
      navigate("/products");

    } catch (err) {
      console.log(err);
      alert("Order failed. Try again.");
    }
  };

  if (!cart || !cart.items) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">Checkout</h2>

        {cart.items.map((item) => (
          <div
            className="card mb-3 shadow-sm p-3 d-flex flex-row align-items-center"
            key={item._id}
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div className="ms-3 flex-grow-1">
              <h5>{item.product.name}</h5>
              <p className="mb-1">Size: {item.size}</p>
              <p className="mb-1">
                Quantity: {item.quantity} x ${item.product.price}
              </p>
            </div>
          </div>
        ))}

        <div className="mt-4 d-flex justify-content-between align-items-center">
          <h4>Total: ${getTotal()}</h4>
          <button className="btn btn-dark btn-lg" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default Checkout;