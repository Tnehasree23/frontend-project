import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";

const defaultCategories = [
  "Skincare",
  "Makeup",
  "Haircare",
  "Fragrance",
  "Body Care",
];

const AdminCategories = () => {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("adminCategories");

    return savedCategories
      ? JSON.parse(savedCategories)
      : defaultCategories;
  });

  const [categoryName, setCategoryName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      "adminCategories",
      JSON.stringify(categories)
    );
  }, [categories]);

  // Add / Update Category
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = categoryName.trim();

    if (!name) {
      alert("Please enter a category name");
      return;
    }

    // Update existing category
    if (editingIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editingIndex] = name;

      setCategories(updatedCategories);
      setEditingIndex(null);
      setCategoryName("");

      alert("Category updated successfully!");
      return;
    }

    // Prevent duplicate category
    const alreadyExists = categories.some(
      (category) =>
        category.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
      alert("Category already exists!");
      return;
    }

    // Add new category
    setCategories([...categories, name]);
    setCategoryName("");

    alert("Category added successfully!");
  };

  // Edit Category
  const handleEdit = (index) => {
    setCategoryName(categories[index]);
    setEditingIndex(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete Category
  const handleDelete = (index) => {
    const category = categories[index];

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${category}"?`
    );

    if (!confirmDelete) return;

    const updatedCategories = categories.filter(
      (_, i) => i !== index
    );

    setCategories(updatedCategories);
  };

  // Cancel Edit
  const handleCancel = () => {
    setCategoryName("");
    setEditingIndex(null);
  };

  return (
    <div style={styles.page}>
      <AdminNavbar />

      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Categories</h1>
            <p style={styles.subtitle}>
              Manage your product categories
            </p>
          </div>

          <div style={styles.countBox}>
            <span style={styles.countNumber}>
              {categories.length}
            </span>
            <span style={styles.countText}>
              Total Categories
            </span>
          </div>
        </div>

        {/* Add / Edit Category */}
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>
            {editingIndex !== null
              ? "Edit Category"
              : "Add New Category"}
          </h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) =>
                setCategoryName(e.target.value)
              }
              style={styles.input}
            />

            <button type="submit" style={styles.primaryButton}>
              {editingIndex !== null
                ? "Update Category"
                : "Add Category"}
            </button>

            {editingIndex !== null && (
              <button
                type="button"
                onClick={handleCancel}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Categories List */}
        <div style={styles.tableCard}>
          <h2 style={styles.tableTitle}>
            All Categories
          </h2>

          {categories.length === 0 ? (
            <div style={styles.empty}>
              No categories available.
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Category Name</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td style={styles.td}>
                      {index + 1}
                    </td>

                    <td style={styles.td}>
                      <span style={styles.categoryBadge}>
                        {category}
                      </span>
                    </td>

                    <td style={styles.td}>
                      <button
                        onClick={() => handleEdit(index)}
                        style={styles.editButton}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(index)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
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
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  countNumber: {
    display: "block",
    fontSize: "28px",
    fontWeight: "700",
  },

  countText: {
    fontSize: "13px",
    color: "#777",
  },

  formCard: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  formTitle: {
    marginTop: 0,
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    gap: "12px",
  },

  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
    outline: "none",
  },

  primaryButton: {
    padding: "12px 22px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#222",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },

  cancelButton: {
    padding: "12px 20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    cursor: "pointer",
  },

  tableCard: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  tableTitle: {
    marginTop: 0,
    marginBottom: "20px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "14px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fafafa",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #eee",
  },

  categoryBadge: {
    padding: "7px 12px",
    borderRadius: "20px",
    backgroundColor: "#f3eef1",
    fontWeight: "500",
  },

  editButton: {
    padding: "8px 15px",
    marginRight: "8px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#eee",
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
    padding: "30px",
    textAlign: "center",
    color: "#777",
  },
};

export default AdminCategories;