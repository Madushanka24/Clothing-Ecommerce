import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {

      const res = await API.post("/auth/login",{email,password});
      localStorage.setItem("token",res.data.token)

      navigate("/products")

    } catch(err){

      alert("Login Failed")

    }

  }

  return (

<div className="container d-flex justify-content-center align-items-center vh-100">

<div className="card p-4 shadow" style={{width:"400px"}}>

<h3 className="text-center mb-4">Clothing Store</h3>

<form onSubmit={handleSubmit}>

<div className="mb-3">

<input
type="email"
className="form-control"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
required
/>

</div>

<div className="mb-3">

<input
type="password"
className="form-control"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
required
/>

</div>

<button className="btn btn-dark w-100">

Login

</button>

</form>

<p className="text-center mt-3">

No account? <Link to="/register">Register</Link>

</p>

</div>

</div>

  )

}

export default Login