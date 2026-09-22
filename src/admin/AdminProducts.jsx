import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import productsData from "../data/products";

const AdminProducts = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("adminProducts");

    return savedProducts ? JSON.parse(savedProducts) : productsData;
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    rating: "",
    reviews: "",
    image: "",
    description: "",
  });

  // Save products to localStorage
  useEffect(() => {
    localStorage.setItem("adminProducts", JSON.stringify(products));
  }, [products]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Open Add Product form
  const handleAddClick = () => {
    setEditingId(null);

    setFormData({
      name: "",
      category: "",
      price: "",
      oldPrice: "",
      rating: "",
      reviews: "",
      image: "",
      description: "",
    });

    setShowForm(true);
  };

  // Open Edit Product form
  const handleEdit = (product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice,
      rating: product.rating,
      reviews: product.reviews,
      image: product.image,
      description: product.description,
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add or Update Product
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE EXISTING PRODUCT
      setProducts(
        products.map((product) =>
          product.id === editingId
            ? {
                ...product,
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                oldPrice: Number(formData.oldPrice),
                rating: Number(formData.rating),
                reviews: Number(formData.reviews),
                image: formData.image,
                description: formData.description,
              }
            : product
        )
      );
    } else {
      // ADD NEW PRODUCT
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        oldPrice: Number(formData.oldPrice),
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
        image: formData.image,
        description: formData.description,
      };

      setProducts([...products, newProduct]);
    }

    // Clear form
    setFormData({
      name: "",
      category: "",
      price: "",
      oldPrice: "",
      rating: "",
      reviews: "",
      image: "",
      description: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  // Delete Product
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <>
      <AdminNavbar />

      <div style={styles.container}>

        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h1>Product Management</h1>
            <p>Manage BeautyBloom products</p>
          </div>

          <button
            style={styles.addButton}
            onClick={handleAddClick}
          >
            + Add Product
          </button>
        </div>

        {/* ADD / EDIT FORM */}
        {showForm && (
          <div style={styles.formContainer}>

            <h2>
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit}>

              <div style={styles.formGrid}>

                {/* Product Name */}
                <div>
                  <label>Product Name</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                    style={styles.input}
                  />
                </div>

                {/* Category */}
                <div>
                  <label>Category</label>

                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Example: Skincare"
                    required
                    style={styles.input}
                  />
                </div>

                {/* Price */}
                <div>
                  <label>Price</label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Enter price"
                    required
                    style={styles.input}
                  />
                </div>

                {/* Old Price */}
                <div>
                  <label>Old Price</label>

                  <input
                    type="number"
                    name="oldPrice"
                    value={formData.oldPrice}
                    onChange={handleChange}
                    placeholder="Enter old price"
                    required
                    style={styles.input}
                  />
                </div>

                {/* Rating */}
                <div>
                  <label>Rating</label>

                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="Example: 4.5"
                    step="0.1"
                    min="0"
                    max="5"
                    required
                    style={styles.input}
                  />
                </div>

                {/* Reviews */}
                <div>
                  <label>Reviews</label>

                  <input
                    type="number"
                    name="reviews"
                    value={formData.reviews}
                    onChange={handleChange}
                    placeholder="Number of reviews"
                    required
                    style={styles.input}
                  />
                </div>

              </div>

              {/* Image */}
              <div>
                <label>Image URL</label>

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Paste product image URL"
                  required
                  style={styles.input}
                />
              </div>

              {/* Description */}
              <div>
                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product description"
                  required
                  style={styles.textarea}
                />
              </div>

              {/* BUTTONS */}
              <div style={styles.formButtons}>

                <button
                  type="submit"
                  style={styles.saveButton}
                >
                  {editingId ? "Update Product" : "Add Product"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>

              </div>

            </form>
          </div>
        )}

        {/* SUMMARY */}
        <div style={styles.summary}>
          <h3>Total Products: {products.length}</h3>
        </div>

        {/* PRODUCT TABLE */}
        <div style={styles.tableContainer}>

          <table style={styles.table}>

            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Old Price</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (
                <tr key={product.id}>

                  {/* Image */}
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={styles.image}
                    />
                  </td>

                  {/* Product */}
                  <td>
                    <strong>{product.name}</strong>
                  </td>

                  {/* Category */}
                  <td>{product.category}</td>

                  {/* Price */}
                  <td>₹{product.price}</td>

                  {/* Old Price */}
                  <td>₹{product.oldPrice}</td>

                  {/* Rating */}
                  <td>⭐ {product.rating}</td>

                  {/* Actions */}
                  <td>

                    <button
                      style={styles.editButton}
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>

                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
};


const styles = {

  container: {
    padding: "30px",
    background: "#faf7f7",
    minHeight: "calc(100vh - 70px)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  addButton: {
    padding: "12px 20px",
    background: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
  },

  summary: {
    background: "#fff",
    padding: "15px 20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  formContainer: {
    background: "#fff",
    padding: "25px",
    marginBottom: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  input: {
    width: "100%",
    padding: "11px",
    marginTop: "7px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "11px",
    marginTop: "7px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxSizing: "border-box",
    resize: "vertical",
  },

  formButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  saveButton: {
    padding: "11px 20px",
    background: "#222",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  cancelButton: {
    padding: "11px 20px",
    background: "#eee",
    color: "#222",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  tableContainer: {
    background: "#fff",
    borderRadius: "10px",
    overflowX: "auto",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "1000px",
  },

  image: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "8px",
  },

  editButton: {
    padding: "7px 12px",
    marginRight: "6px",
    border: "none",
    borderRadius: "5px",
    background: "#eee",
    color: "#222",
    cursor: "pointer",
  },

  deleteButton: {
    padding: "7px 12px",
    border: "none",
    borderRadius: "5px",
    background: "#222",
    color: "#fff",
    cursor: "pointer",
  },

};

export default AdminProducts;