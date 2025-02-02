import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  return user ? <>{children}</> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
