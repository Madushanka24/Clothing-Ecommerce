import { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Products() {

  const [products,setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{

    fetchProducts()

  },[])

  const fetchProducts = async()=>{

    try{

      const res = await API.get("/products")

      setProducts(res.data)

    }catch(err){

      console.log(err)

    }

  }

  const addToCart = async(productId)=>{

    try{

      await API.post("/cart",{
        productId:productId,
        size:"M",
        quantity:1
      })

      alert("Added to Cart")

    }catch(err){

      alert("Login required")

      navigate("/")

    }

  }

  return(

<div className="container mt-5">

<h2 className="mb-4 text-center">Clothing Collection</h2>

<div className="row">

{products.map((product)=>(

<div className="col-md-3 mb-4" key={product._id}>

<div className="card h-100 shadow-sm">

<img
src={product.image}
className="card-img-top"
style={{height:"250px",objectFit:"cover"}}
/>

<div className="card-body d-flex flex-column">

<h5 className="card-title">{product.name}</h5>

<p className="text-muted">{product.category}</p>

<h6 className="mb-3">${product.price}</h6>

<div className="mt-auto">

<Link
to={`/product/${product._id}`}
className="btn btn-outline-dark w-100 mb-2"
>

View Details

</Link>

<button
className="btn btn-dark w-100"
onClick={()=>addToCart(product._id)}
>

Add To Cart

</button>

</div>

</div>

</div>

</div>

))}

</div>

</div>

  )

}

export default Products