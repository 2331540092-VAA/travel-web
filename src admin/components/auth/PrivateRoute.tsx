import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Kiểm tra token trong localStorage nếu AuthContext chưa kịp load (cho trường hợp reload trang)
  const hasToken = !!localStorage.getItem("admin_token");

  if (!isAuthenticated && !hasToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
