import { useEffect, useState } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("/products");
      setProducts(res.data.products);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Clothing Store</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((p) => (
          <div key={p._id} style={{ margin: "10px", border: "1px solid #ccc", padding: "10px" }}>
            <img src={p.image} alt={p.name} width="150" />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <Link to={`/product/${p._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;