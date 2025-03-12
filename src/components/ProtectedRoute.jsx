import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // const { isAuthenticated } = useAuthStore();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const location = useLocation();

  // Store the attempted URL in sessionStorage before redirecting
  useEffect(() => {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectUrl", location.pathname);
    }
  }, [isAuthenticated, location]);

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
