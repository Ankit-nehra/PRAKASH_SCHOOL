import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  // If token exists, allow access; otherwise redirect to login
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default PrivateRoute;