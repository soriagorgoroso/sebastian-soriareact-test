import React, { ComponentType } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface PrivateRouteProps {
  component: ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const { user } = useAuthStore();
  const location = useLocation();

  return user ? (
    <Component />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
