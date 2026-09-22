import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };



  return (
    <nav
      style={{
        padding: "15px 25px",
        background: "#222",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h2>BeautyBloom Admin</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/admin/dashboard" style={linkStyle}>
          Dashboard
        </Link>

        <Link to="/admin/products" style={linkStyle}>
          Products
        </Link>

        <Link to="/admin/orders" style={linkStyle}>
          Orders
        </Link>

        <Link to="/admin/users" style={linkStyle}>
          Users
        </Link>

        <Link to="/admin/categories" style={linkStyle}>
          Categories
        </Link>

        <button onClick={handleLogout}>
         Logout
        </button>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

const buttonStyle = {
  border: "none",
  padding: "8px 14px",
  cursor: "pointer",
};

export default AdminNavbar;