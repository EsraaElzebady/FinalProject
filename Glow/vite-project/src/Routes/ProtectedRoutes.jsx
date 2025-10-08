// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("jwt");
  const location = useLocation();

  if (!token) {
    // if not logged in, redirect to login but remember the original page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
