import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    // Admin credentials
    const adminEmail = "admin@beautybloom.com";
    const adminPassword = "admin123";

    if (
      email.trim() === adminEmail &&
      password === adminPassword
    ) {
      // Save admin login status
      localStorage.setItem("adminLoggedIn", "true");

      // Go to dashboard
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin email or password");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.loginCard}>

        {/* Logo / Title */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            BeautyBloom
          </h1>

          <p style={styles.subtitle}>
            Admin Panel
          </p>
        </div>

        <h2 style={styles.loginTitle}>
          Admin Login
        </h2>

        <p style={styles.description}>
          Sign in to manage your BeautyBloom store.
        </p>

        {/* Error */}
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={styles.input}
              required
            />
          </div>

          {/* Password */}
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={styles.input}
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={styles.loginButton}
          >
            Login
          </button>

        </form>

        {/* Demo Credentials */}
        <div style={styles.credentials}>
          <p style={styles.credentialsTitle}>
            Demo Admin Credentials
          </p>

          <p>
            Email:{" "}
            <strong>
              admin@beautybloom.com
            </strong>
          </p>

          <p>
            Password:{" "}
            <strong>
              admin123
            </strong>
          </p>
        </div>

      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8f5f7",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  loginCard: {
    width: "100%",
    maxWidth: "430px",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow:
      "0 4px 20px rgba(0,0,0,0.10)",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  title: {
    margin: 0,
    fontSize: "30px",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: "5px",
    color: "#777",
    fontSize: "14px",
  },

  loginTitle: {
    margin: 0,
    fontSize: "24px",
  },

  description: {
    color: "#777",
    fontSize: "14px",
    marginBottom: "25px",
  },

  error: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "18px",
    fontSize: "14px",
  },

  formGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    fontWeight: "600",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
  },

  loginButton: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#222",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "5px",
  },

  credentials: {
    marginTop: "25px",
    padding: "15px",
    backgroundColor: "#f8f5f7",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#666",
  },

  credentialsTitle: {
    fontWeight: "700",
    color: "#333",
    marginTop: 0,
  },
};

export default AdminLogin;