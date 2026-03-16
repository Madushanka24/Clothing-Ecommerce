import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check if user logged in
  if (!token) {
    return <Navigate to="/login" replace />; // redirect to login
  }
  return children; // user is logged in, show page
};

export default PrivateRoute;