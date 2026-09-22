import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const loadDashboardData = () => {
    const savedProducts =
      localStorage.getItem("adminProducts");

    const savedCategories =
      localStorage.getItem("adminCategories");

    const savedOrders =
      localStorage.getItem("adminOrders");

    const savedUsers =
      localStorage.getItem("adminUsers");

    setProducts(
      savedProducts ? JSON.parse(savedProducts) : []
    );

    setCategories(
      savedCategories
        ? JSON.parse(savedCategories)
        : []
    );

    setOrders(
      savedOrders ? JSON.parse(savedOrders) : []
    );

    setUsers(
      savedUsers ? JSON.parse(savedUsers) : []
    );
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Product count
  const totalProducts = products.length;

  // Category count
  const totalCategories = categories.length;

  // Order count
  const totalOrders = orders.length;

  // User count
  const totalUsers = users.length;

  // Revenue
  const totalRevenue = orders.reduce(
    (total, order) =>
      total + Number(order.total || 0),
    0
  );

  // Order status counts
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const shippedOrders = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  return (
    <div style={styles.page}>
      <AdminNavbar />

      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>
              Admin Dashboard
            </h1>

            <p style={styles.subtitle}>
              Welcome back! Here's an overview of your store.
            </p>
          </div>

          <button
            onClick={loadDashboardData}
            style={styles.refreshButton}
          >
            Refresh Data
          </button>
        </div>

        {/* Main Statistics */}
        <div style={styles.statsGrid}>

          {/* Products */}
          <div style={styles.card}>
            <div style={styles.icon}>
              🛍️
            </div>

            <div>
              <p style={styles.cardLabel}>
                Total Products
              </p>

              <h2 style={styles.cardNumber}>
                {totalProducts}
              </h2>
            </div>
          </div>

          {/* Categories */}
          <div style={styles.card}>
            <div style={styles.icon}>
              📂
            </div>

            <div>
              <p style={styles.cardLabel}>
                Total Categories
              </p>

              <h2 style={styles.cardNumber}>
                {totalCategories}
              </h2>
            </div>
          </div>

          {/* Orders */}
          <div style={styles.card}>
            <div style={styles.icon}>
              📦
            </div>

            <div>
              <p style={styles.cardLabel}>
                Total Orders
              </p>

              <h2 style={styles.cardNumber}>
                {totalOrders}
              </h2>
            </div>
          </div>

          {/* Users */}
          <div style={styles.card}>
            <div style={styles.icon}>
              👥
            </div>

            <div>
              <p style={styles.cardLabel}>
                Total Users
              </p>

              <h2 style={styles.cardNumber}>
                {totalUsers}
              </h2>
            </div>
          </div>

        </div>

        {/* Revenue */}
        <div style={styles.revenueCard}>

          <div>
            <p style={styles.revenueLabel}>
              Total Revenue
            </p>

            <h2 style={styles.revenueNumber}>
              ₹{totalRevenue.toLocaleString("en-IN")}
            </h2>
          </div>

          <div style={styles.revenueIcon}>
            💰
          </div>

        </div>

        {/* Order Status */}
        <div style={styles.section}>

          <h2 style={styles.sectionTitle}>
            Order Overview
          </h2>

          <div style={styles.orderGrid}>

            <div style={styles.orderCard}>
              <span style={styles.orderNumber}>
                {pendingOrders}
              </span>

              <span style={styles.orderLabel}>
                Pending
              </span>
            </div>

            <div style={styles.orderCard}>
              <span style={styles.orderNumber}>
                {processingOrders}
              </span>

              <span style={styles.orderLabel}>
                Processing
              </span>
            </div>

            <div style={styles.orderCard}>
              <span style={styles.orderNumber}>
                {shippedOrders}
              </span>

              <span style={styles.orderLabel}>
                Shipped
              </span>
            </div>

            <div style={styles.orderCard}>
              <span style={styles.orderNumber}>
                {deliveredOrders}
              </span>

              <span style={styles.orderLabel}>
                Delivered
              </span>
            </div>

          </div>
        </div>

        {/* Recent Orders */}
        <div style={styles.tableCard}>

          <div style={styles.tableHeader}>
            <h2 style={styles.sectionTitle}>
              Recent Orders
            </h2>

            <span style={styles.orderCount}>
              {orders.length} Orders
            </span>
          </div>

          {orders.length === 0 ? (
            <div style={styles.empty}>
              No orders available.
            </div>
          ) : (
            <div style={styles.tableWrapper}>

              <table style={styles.table}>

                <thead>
                  <tr>
                    <th style={styles.th}>
                      Order ID
                    </th>

                    <th style={styles.th}>
                      Customer
                    </th>

                    <th style={styles.th}>
                      Date
                    </th>

                    <th style={styles.th}>
                      Total
                    </th>

                    <th style={styles.th}>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders
                    .slice()
                    .reverse()
                    .slice(0, 5)
                    .map((order) => (
                      <tr key={order.id}>

                        <td style={styles.td}>
                          <strong>
                            {order.id}
                          </strong>
                        </td>

                        <td style={styles.td}>
                          {order.customer}
                        </td>

                        <td style={styles.td}>
                          {order.date}
                        </td>

                        <td style={styles.td}>
                          ₹
                          {Number(
                            order.total || 0
                          ).toLocaleString("en-IN")}
                        </td>

                        <td style={styles.td}>
                          <span
                            style={{
                              ...styles.status,
                              ...getStatusStyle(
                                order.status
                              ),
                            }}
                          >
                            {order.status}
                          </span>
                        </td>

                      </tr>
                    ))}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return {
        backgroundColor: "#fff3cd",
        color: "#856404",
      };

    case "Processing":
      return {
        backgroundColor: "#e2e3ff",
        color: "#383d8f",
      };

    case "Shipped":
      return {
        backgroundColor: "#d1ecf1",
        color: "#0c5460",
      };

    case "Delivered":
      return {
        backgroundColor: "#d4edda",
        color: "#155724",
      };

    case "Cancelled":
      return {
        backgroundColor: "#f8d7da",
        color: "#721c24",
      };

    default:
      return {
        backgroundColor: "#eee",
        color: "#555",
      };
  }
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8f5f7",
  },

  container: {
    maxWidth: "1250px",
    margin: "0 auto",
    padding: "30px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: "8px",
    color: "#777",
  },

  refreshButton: {
    padding: "11px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#222",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, 1fr)",
    gap: "18px",
    marginBottom: "20px",
  },

  card: {
    backgroundColor: "#fff",
    padding: "22px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    gap: "18px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  },

  icon: {
    width: "48px",
    height: "48px",
    borderRadius: "10px",
    backgroundColor: "#f3eef1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  cardLabel: {
    margin: 0,
    color: "#777",
    fontSize: "13px",
  },

  cardNumber: {
    margin: "5px 0 0",
    fontSize: "28px",
  },

  revenueCard: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },

  revenueLabel: {
    margin: 0,
    color: "#777",
    fontSize: "14px",
  },

  revenueNumber: {
    margin: "5px 0 0",
    fontSize: "30px",
  },

  revenueIcon: {
    fontSize: "35px",
  },

  section: {
    marginBottom: "30px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "20px",
  },

  orderGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, 1fr)",
    gap: "18px",
    marginTop: "18px",
  },

  orderCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  },

  orderNumber: {
    display: "block",
    fontSize: "25px",
    fontWeight: "700",
  },

  orderLabel: {
    display: "block",
    marginTop: "5px",
    color: "#777",
    fontSize: "13px",
  },

  tableCard: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  },

  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  orderCount: {
    color: "#777",
    fontSize: "13px",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "700px",
  },

  th: {
    textAlign: "left",
    padding: "14px",
    backgroundColor: "#fafafa",
    borderBottom: "1px solid #ddd",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #eee",
  },

  status: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
  },

  empty: {
    padding: "40px",
    textAlign: "center",
    color: "#777",
  },
};

export default AdminDashboard;