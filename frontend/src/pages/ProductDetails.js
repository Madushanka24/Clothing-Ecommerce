import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async () => {
    try {
      await API.post("/cart", {
        productId: product._id,
        size,
        quantity,
      });
      alert("Added to Cart");
      navigate("/cart");
    } catch (err) {
      alert("Please login first");
      navigate("/");
    }
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid shadow"
            />
          </div>

          <div className="col-md-6">
            <h2>{product.name}</h2>
            <p className="text-muted">{product.category}</p>
            <h4 className="mb-3">${product.price}</h4>
            <p>{product.description}</p>

            <div className="mb-3">
              <label className="form-label">Size</label>
              <select
                className="form-select"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              >
                {product.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                value={quantity}
                min="1"
                max="10"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            <button className="btn btn-dark me-2" onClick={addToCart}>
              Add to Cart
            </button>

            <Link to="/products" className="btn btn-outline-dark">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;