import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

const defaultUsers = [
  {
    id: 1,
    name: "Neha Sri",
    email: "neha@example.com",
    date: "2026-09-05",
    status: "Active",
  },
  {
    id: 2,
    name: "Sairam",
    email: "sairam@example.com",
    date: "2026-09-04",
    status: "Active",
  },
  {
    id: 3,
    name: "Anjali",
    email: "anjali@example.com",
    date: "2026-09-03",
    status: "Active",
  },
  {
    id: 4,
    name: "Rahul",
    email: "rahul@example.com",
    date: "2026-09-02",
    status: "Inactive",
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("adminUsers");

    return savedUsers
      ? JSON.parse(savedUsers)
      : defaultUsers;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Save users to localStorage
  useEffect(() => {
    localStorage.setItem(
      "adminUsers",
      JSON.stringify(users)
    );
  }, [users]);

  // Change user status
  const handleStatusChange = (id, newStatus) => {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? { ...user, status: newStatus }
        : user
    );

    setUsers(updatedUsers);
  };

  // Delete user
  const handleDelete = (id) => {
    const user = users.find(
      (item) => item.id === id
    );

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user?.name}?`
    );

    if (!confirmDelete) return;

    const updatedUsers = users.filter(
      (user) => user.id !== id
    );

    setUsers(updatedUsers);
  };

  // Search + filter
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" ||
      user.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Statistics
  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  return (
    <div style={styles.page}>
      <AdminNavbar />

      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Users</h1>

            <p style={styles.subtitle}>
              Manage registered customers
            </p>
          </div>

          <div style={styles.countBox}>
            <span style={styles.countNumber}>
              {totalUsers}
            </span>

            <span style={styles.countText}>
              Total Users
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div style={styles.statsGrid}>

          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {totalUsers}
            </div>

            <div style={styles.statLabel}>
              Total Users
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {activeUsers}
            </div>

            <div style={styles.statLabel}>
              Active Users
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statNumber}>
              {inactiveUsers}
            </div>

            <div style={styles.statLabel}>
              Inactive Users
            </div>
          </div>

        </div>

        {/* Search and Filter */}
        <div style={styles.filterCard}>

          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            style={styles.searchInput}
          />

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
            style={styles.select}
          >
            <option value="All">All Users</option>
            <option value="Active">Active</option>
            <option value="Inactive">
              Inactive
            </option>
          </select>

        </div>

        {/* Users Table */}
        <div style={styles.tableCard}>

          <h2 style={styles.tableTitle}>
            Registered Users
          </h2>

          {filteredUsers.length === 0 ? (
            <div style={styles.empty}>
              No users found.
            </div>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>

                <thead>
                  <tr>
                    <th style={styles.th}>
                      #
                    </th>

                    <th style={styles.th}>
                      User
                    </th>

                    <th style={styles.th}>
                      Email
                    </th>

                    <th style={styles.th}>
                      Registered Date
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
                  {filteredUsers.map(
                    (user, index) => (
                      <tr key={user.id}>

                        {/* Number */}
                        <td style={styles.td}>
                          {index + 1}
                        </td>

                        {/* User */}
                        <td style={styles.td}>
                          <div
                            style={
                              styles.userInfo
                            }
                          >
                            <div
                              style={
                                styles.avatar
                              }
                            >
                              {user.name
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div
                              style={
                                styles.userName
                              }
                            >
                              {user.name}
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td style={styles.td}>
                          {user.email}
                        </td>

                        {/* Date */}
                        <td style={styles.td}>
                          {user.date}
                        </td>

                        {/* Status */}
                        <td style={styles.td}>
                          <select
                            value={user.status}
                            onChange={(e) =>
                              handleStatusChange(
                                user.id,
                                e.target.value
                              )
                            }
                            style={{
                              ...styles.statusSelect,
                              ...(user.status ===
                              "Active"
                                ? styles.activeStatus
                                : styles.inactiveStatus),
                            }}
                          >
                            <option value="Active">
                              Active
                            </option>

                            <option value="Inactive">
                              Inactive
                            </option>
                          </select>
                        </td>

                        {/* Delete */}
                        <td style={styles.td}>
                          <button
                            onClick={() =>
                              handleDelete(
                                user.id
                              )
                            }
                            style={
                              styles.deleteButton
                            }
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    )
                  )}
                </tbody>

              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f8f5f7",
  },

  container: {
    maxWidth: "1200px",
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

  countBox: {
    backgroundColor: "#fff",
    padding: "15px 25px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  },

  countNumber: {
    display: "block",
    fontSize: "28px",
    fontWeight: "700",
  },

  countText: {
    display: "block",
    fontSize: "13px",
    color: "#777",
    marginTop: "4px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, 1fr)",
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
    padding: "18px",
    borderRadius: "12px",
    marginBottom: "25px",
    display: "flex",
    gap: "15px",
    alignItems: "center",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  },

  searchInput: {
    flex: 1,
    padding: "12px 15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
  },

  select: {
    padding: "12px 15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    backgroundColor: "#fff",
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
    minWidth: "800px",
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

  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  avatar: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    backgroundColor: "#eee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
  },

  userName: {
    fontWeight: "600",
  },

  statusSelect: {
    padding: "7px 12px",
    border: "none",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer",
  },

  activeStatus: {
    backgroundColor: "#d4edda",
    color: "#155724",
  },

  inactiveStatus: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
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

export default AdminUsers;