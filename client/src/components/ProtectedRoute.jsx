import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If logged in → render child component
  return children;
};

export default ProtectedRoute;
