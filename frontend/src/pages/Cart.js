import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate, Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token"); // logged-in JWT
      const cartId = localStorage.getItem("cartId"); // guest cart

      const res = token
        ? await API.get("/cart") // logged-in user
        : await API.get("/cart", { params: { cartId } }); // guest user

      setCart(res.data.cart || { items: [] });

      // Save guest cartId in localStorage if not logged in
      if (!token && res.data.cartId) {
        localStorage.setItem("cartId", res.data.cartId);
      }
    } catch (err) {
      console.error(err);
      setCart({ items: [] }); // fallback
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const res = await API.put(`/cart/${cart._id}`, { itemId, quantity });
      setCart(res.data.cart || res.data); // handle both guest & logged-in
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const res = await API.delete(`/cart/${cart._id}/${itemId}`);
      setCart(res.data.cart || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  // Loading state
  if (!cart || !cart.items) return <p className="text-center mt-5">Loading...</p>;

  // Empty cart state
  if (cart.items.length === 0)
    return (
      <>
        <Navbar />
        <div className="container mt-5 text-center">
          <h3>Your cart is empty</h3>
          <Link to="/products" className="btn btn-dark mt-3">
            Go to Products
          </Link>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-4">Your Cart</h2>
        {cart.items.map((item) => (
          <div
            className="card mb-3 shadow-sm p-3 d-flex flex-row align-items-center"
            key={item._id}
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <div className="ms-3 flex-grow-1">
              <h5>{item.product.name}</h5>
              <p className="mb-1">Size: {item.size}</p>
              <p className="mb-1">Price: ${item.product.price}</p>

              <div className="d-flex align-items-center">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  max="10"
                  className="form-control me-2"
                  style={{ width: "80px" }}
                  onChange={(e) =>
                    updateQuantity(item._id, Number(e.target.value))
                  }
                />
                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 d-flex justify-content-between align-items-center">
          <h4>Total: ${getTotal()}</h4>
          <Link to="/checkout" className="btn btn-dark btn-lg">
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
}

export default Cart;