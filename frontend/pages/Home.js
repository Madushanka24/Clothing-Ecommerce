import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await API.get("/products");

        setProducts(res.data.products);

      } catch (error) {

        console.log(error);

      }

    };

    fetchProducts();

  }, []);

  return (

    <div className="container mt-4">

      <h2 className="mb-4">Clothing Collection</h2>

      <div className="row">

        {products.map((product) => (

          <div className="col-md-3 mb-4" key={product._id}>

            <div className="card h-100">

              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />

              <div className="card-body">

                <h5 className="card-title">
                  {product.name}
                </h5>

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