import { Link,useNavigate } from "react-router-dom";

function Navbar(){

const navigate = useNavigate()

const logout = ()=>{

localStorage.removeItem("token")

navigate("/")

}

return(

<nav className="navbar navbar-dark bg-dark">

<div className="container">

<Link className="navbar-brand" to="/products">

ClothingStore

</Link>

<div>

<Link className="btn btn-outline-light me-2" to="/cart">

Cart

</Link>

<button className="btn btn-outline-light" onClick={logout}>

Logout

</button>

</div>

</div>

</nav>

)

}

export default Navbar