import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const res = await API.get("/cart");
      if (res.data && res.data.items) {
        const count = res.data.items.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(count);
      }
    } catch (err) {
      console.log("Cart not loaded:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/products">
          ClothingStore
        </Link>
        <div>
          <Link className="btn btn-outline-light me-2" to="/products">
            Products
          </Link>
          <Link className="btn btn-outline-light me-2 position-relative" to="/cart">
            Cart
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="btn btn-outline-light" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;