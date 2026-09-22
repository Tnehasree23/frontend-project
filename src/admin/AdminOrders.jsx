import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

const defaultOrders = [
  {
    id: "ORD1001",
    customer: "Neha Sri",
    email: "neha@example.com",
    date: "2026-09-05",
    items: 2,
    total: 1498,
    status: "Pending",
  },
  {
    id: "ORD1002",
    customer: "Sairam",
    email: "sairam@example.com",
    date: "2026-09-04",
    items: 3,
    total: 2297,
    status: "Processing",
  },
  {
    id: "ORD1003",
    customer: "Anjali",
    email: "anjali@example.com",
    date: "2026-09-03",
    items: 1,
    total: 699,
    status: "Delivered",
  },
  {
    id: "ORD1004",
    customer: "Rahul",
    email: "rahul@example.com",
    date: "2026-09-02",
    items: 4,
    total: 3196,
    status: "Shipped",
  },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("adminOrders");

    return savedOrders
      ? JSON.parse(savedOrders)
      : defaultOrders;
  });

  const [filterStatus, setFilterStatus] = useState("All");

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem("adminOrders", JSON.stringify(orders));
  }, [orders]);

  // Change order status
  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);
  };

  // Delete order
  const handleDelete = (id) => {
    const order = orders.find((item) => item.id === id);

    const confirmDelete = window.confirm(
      `Are you sure you want to delete order ${order?.id}?`
    );

    if (!confirmDelete) return;

    const updatedOrders = orders.filter(
      (order) => order.id !== id
    );

    setOrders(updatedOrders);
  };

  // Filter orders
  const filteredOrders =
    filterStatus === "All"
      ? orders
      : orders.filter(
          (order) => order.status === filterStatus
        );

  // Dashboard counts
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  // Total revenue
  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.total),
    0
  );

  return (
    <div style={styles.page}>
      <AdminNavbar />

      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Orders</h1>
            <p style={styles.subtitle}>
              Manage and track customer orders
            </p>
          </div>

          <div style={styles.revenueBox}>
            <span style={styles.revenueLabel}>
              Total Revenue
            </span>

            <span style={styles.revenueValue}>
              ₹{totalRevenue.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div style={styles.statsGrid}>

          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {totalOrders}
            </div>

            <div style={styles.statLabel}>
              Total Orders
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {pendingOrders}
            </div>

            <div style={styles.statLabel}>
              Pending
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {processingOrders}
            </div>

            <div style={styles.statLabel}>
              Processing
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {deliveredOrders}
            </div>

            <div style={styles.statLabel}>
              Delivered
            </div>
          </div>

        </div>

        {/* Filter */}
        <div style={styles.filterCard}>

          <label style={styles.filterLabel}>
            Filter Orders:
          </label>

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
            style={styles.select}
          >
            <option value="All">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Processing">
              Processing
            </option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">
              Delivered
            </option>
            <option value="Cancelled">
              Cancelled
            </option>
          </select>

        </div>

        {/* Orders Table */}
        <div style={styles.tableCard}>

          <h2 style={styles.tableTitle}>
            All Orders
          </h2>

          {filteredOrders.length === 0 ? (
            <div style={styles.empty}>
              No orders found.
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
                      Items
                    </th>

                    <th style={styles.th}>
                      Total
                    </th>

                    <th style={styles.th}>
                      Status
                    </th>

                    <th style={styles.th}>
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id}>

                      {/* Order ID */}
                      <td style={styles.td}>
                        <strong>
                          {order.id}
                        </strong>
                      </td>

                      {/* Customer */}
                      <td style={styles.td}>
                        <div style={styles.customerName}>
                          {order.customer}
                        </div>

                        <div style={styles.email}>
                          {order.email}
                        </div>
                      </td>

                      {/* Date */}
                      <td style={styles.td}>
                        {order.date}
                      </td>

                      {/* Items */}
                      <td style={styles.td}>
                        {order.items}
                      </td>

                      {/* Total */}
                      <td style={styles.td}>
                        <strong>
                          ₹
                          {Number(
                            order.total
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>
                      </td>

                      {/* Status */}
                      <td style={styles.td}>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(
                              order.id,
                              e.target.value
                            )
                          }
                          style={{
                            ...styles.statusSelect,
                            ...getStatusStyle(
                              order.status
                            ),
                          }}
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>
                        </select>
                      </td>

                      {/* Delete */}
                      <td style={styles.td}>
                        <button
                          onClick={() =>
                            handleDelete(order.id)
                          }
                          style={styles.deleteButton}
                        >
                          Delete
                        </button>
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

// Status styling
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
      return {};
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

  revenueBox: {
    backgroundColor: "#fff",
    padding: "18px 25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  revenueLabel: {
    display: "block",
    color: "#777",
    fontSize: "13px",
    marginBottom: "5px",
  },

  revenueValue: {
    display: "block",
    fontSize: "24px",
    fontWeight: "700",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, 1fr)",
    gap: "18px",
    marginBottom: "25px",
  },

  statCard: {
    backgroundColor: "#fff",
    padding: "22px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  },

  statNumber: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "6px",
  },

  statLabel: {
    color: "#777",
    fontSize: "14px",
  },

  filterCard: {
    backgroundColor: "#fff",
    padding: "18px 22px",
    borderRadius: "12px",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  },

  filterLabel: {
    fontWeight: "600",
  },

  select: {
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
  },

  tableCard: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  },

  tableTitle: {
    marginTop: 0,
    marginBottom: "20px",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  },

  th: {
    textAlign: "left",
    padding: "14px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fafafa",
    whiteSpace: "nowrap",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #eee",
    verticalAlign: "middle",
  },

  customerName: {
    fontWeight: "600",
    marginBottom: "4px",
  },

  email: {
    color: "#888",
    fontSize: "12px",
  },

  statusSelect: {
    padding: "7px 10px",
    border: "none",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer",
  },

  deleteButton: {
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#222",
    color: "#fff",
    cursor: "pointer",
  },

  empty: {
    padding: "40px",
    textAlign: "center",
    color: "#777",
  },
};

export default AdminOrders;