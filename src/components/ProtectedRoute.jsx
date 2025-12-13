import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("ProtectedRoute token:", token);

  if (!token) {
    console.log("No token → redirect");
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);

    const isExpired = decoded.exp * 1000 < Date.now();
    console.log("Is expired?", isExpired);

    if (isExpired) {
      localStorage.removeItem("token");
      console.log("Token expired → redirect");
      return <Navigate to="/login" replace />;
    }
  } catch (err) {
    console.log("Token invalid:", err);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
