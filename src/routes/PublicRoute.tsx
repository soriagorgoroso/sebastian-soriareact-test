import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const PublicRoute: React.FC = () => {
  const { user } = useAuthStore();
  const location = useLocation();

  return !user ? (
    <Outlet />
  ) : (
    <Navigate to="/products" state={{ from: location }} />
  );
};

export default PublicRoute;
