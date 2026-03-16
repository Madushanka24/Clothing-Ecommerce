import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart"); // get user cart
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (itemId, quantity) => {
    try {
      await API.put(`/cart/${cart._id}`, { itemId, quantity: Number(quantity) });
      fetchCart(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await API.delete(`/cart/${cart._id}/${itemId}`);
      fetchCart(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  if (!cart || cart.items.length === 0)
    return <h3 className="container mt-5">Your cart is empty.</h3>;

  const totalPrice = cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2>Shopping Cart</h2>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Product</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map((item) => (
            <tr key={item._id}>
              <td>{item.product.name}</td>
              <td>{item.size}</td>
              <td>${item.product.price}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  className="form-control"
                  style={{ width: "80px" }}
                  onChange={(e) => updateQuantity(item._id, e.target.value)}
                />
              </td>
              <td>${item.product.price * item.quantity}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Total: ${totalPrice}</h4>

      <Link to="/checkout" className="btn btn-success mt-3">
        Proceed to Checkout
      </Link>
    </div>
  );
}

export default Cart;