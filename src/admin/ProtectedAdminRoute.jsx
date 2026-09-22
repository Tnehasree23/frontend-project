import React from "react";
import { DiOnedrive } from "react-icons/di";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const location = useLocation();

  const isLoggedIn =
    localStorage.getItem("adminLoggedIn") === "true";

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default ProtectedAdminRoute;