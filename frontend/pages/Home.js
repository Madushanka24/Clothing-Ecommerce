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
    <div className="container mt-4">

      <h2 className="mb-4">Clothing Store</h2>

      <div className="row">

        {products.map((product) => (

          <div key={product._id} className="col-md-3 mb-4">

            <div className="card h-100">

              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />

              <div className="card-body">

                <h5 className="card-title">{product.name}</h5>

                <p className="card-text">
                  ${product.price}
                </p>

                <Link
                  to={`/product/${product._id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Home;