import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // TODO: Replace with your real auth logic
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
