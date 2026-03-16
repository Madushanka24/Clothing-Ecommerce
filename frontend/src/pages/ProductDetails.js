import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ProductDetails() {

  const { id } = useParams(); // get product id from URL

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();

  }, [id]);

  const addToCart = async () => {
    if (!size) {
      alert("Please select a size");
      return;
    }

    try {
      const res = await API.post("/cart", {
        productId: id,
        size,
        quantity: Number(quantity)
      });

      alert("Added to cart!");
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) return <h2 className="container mt-5">Loading...</h2>;

  return (
    <div className="container mt-5">
      <div className="row">

        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid"/>
        </div>

        <div className="col-md-6">

          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h4>${product.price}</h4>

          <div className="mb-3">
            <label>Select Size:</label>
            <select className="form-control" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">Choose Size</option>
              {product.sizes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Quantity:</label>
            <input
              type="number"
              className="form-control"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <button className="btn btn-success" onClick={addToCart}>
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductDetails;