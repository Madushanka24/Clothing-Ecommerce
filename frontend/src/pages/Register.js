import { useState } from "react";
import API from "../services/api";
import { useNavigate,Link } from "react-router-dom";

function Register(){

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const navigate = useNavigate()

const handleSubmit = async(e)=>{

e.preventDefault()

try{

await API.post("/auth/register",{name,email,password})

alert("Account Created")

navigate("/")

}catch(err){

alert("Register Failed")

}

}

return(

<div className="container d-flex justify-content-center align-items-center vh-100">

<div className="card p-4 shadow" style={{width:"400px"}}>

<h3 className="text-center mb-4">Register</h3>

<form onSubmit={handleSubmit}>

<input className="form-control mb-3" placeholder="Name" onChange={(e)=>setName(e.target.value)} />

<input className="form-control mb-3" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />

<input className="form-control mb-3" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

<button className="btn btn-dark w-100">

Register

</button>

</form>

<p className="text-center mt-3">

Already have account? <Link to="/">Login</Link>

</p>

</div>

</div>

)

}

export default Register