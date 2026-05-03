import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    images: [],
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    } catch (error) {
      toast.error("Failed to load products!");
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrls = form.images;

      if (imageFiles.length > 0) {
        toast.loading("Uploading images...");
        const uploadPromises = imageFiles.map((file) =>
          uploadToCloudinary(file)
        );
        imageUrls = await Promise.all(uploadPromises);
        toast.dismiss();
      }

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), {
          name: form.name,
          price: Number(form.price),
          description: form.description,
          images: imageUrls,
          updatedAt: new Date().toISOString(),
        });
        toast.success("Product updated successfully!");
      } else {
        await addDoc(collection(db, "products"), {
          name: form.name,
          price: Number(form.price),
          description: form.description,
          images: imageUrls,
          createdAt: new Date().toISOString(),
        });
        toast.success("Product added successfully!");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to save product!");
    }
    setUploading(false);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      images: product.images || [],
    });
    setPreviewUrls(product.images || []);
    setEditingId(product.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product deleted!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product!");
    }
  };

  const resetForm = () => {
    setForm({ name: "", price: "", description: "", images: [] });
    setImageFiles([]);
    setPreviewUrls([]);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Panel 👑</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={styles.addBtn}
        >
          {showForm ? "Cancel" : "+ Add New Saree"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>
            {editingId ? "Edit Product" : "Add New Saree"}
          </h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Saree Name</label>
              <input
                type="text"
                placeholder="Enter saree name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Price (₹)</label>
              <input
                type="number"
                placeholder="Enter price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                placeholder="Enter product description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                style={styles.textarea}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Upload Images (Select multiple)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                style={styles.fileInput}
              />
            </div>

            {/* Image Previews */}
            {previewUrls.length > 0 && (
              <div style={styles.previewGrid}>
                {previewUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`preview ${index + 1}`}
                    style={styles.previewImage}
                  />
                ))}
              </div>
            )}

            <div style={styles.formButtons}>
              <button
                type="submit"
                style={styles.submitBtn}
                disabled={uploading}
              >
                {uploading
                  ? "Saving..."
                  : editingId
                  ? "Update Product"
                  : "Add Product"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>
          All Products ({products.length})
        </h2>

        {loading ? (
          <p style={styles.loadingText}>Loading products...</p>
        ) : products.length === 0 ? (
          <p style={styles.emptyText}>
            No products yet. Add your first saree! 🛍️
          </p>
        ) : (
          <div style={styles.productsGrid}>
            {products.map((product) => (
              <div key={product.id} style={styles.productCard}>
                <img
                  src={
                    product.images?.[0] ||
                    "https://via.placeholder.com/200x250?text=Saree"
                  }
                  alt={product.name}
                  style={styles.productImage}
                />
                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productPrice}>₹{product.price}</p>
                  <p style={styles.productDesc}>
                    {product.description?.slice(0, 80)}...
                  </p>
                  <p style={styles.imageCount}>
                    📷 {product.images?.length || 0} image(s)
                  </p>
                  <div style={styles.cardButtons}>
                    <button
                      onClick={() => handleEdit(product)}
                      style={styles.editBtn}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      style={styles.deleteBtn}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#FFF8F0",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  title: {
    color: "#8B0000",
    fontSize: "2rem",
  },
  addBtn: {
    backgroundColor: "#8B0000",
    color: "white",
    border: "none",
    padding: "0.8rem 1.5rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  formCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
    marginBottom: "2rem",
  },
  formTitle: {
    color: "#8B0000",
    marginBottom: "1.5rem",
    fontSize: "1.3rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  label: {
    color: "#444",
    fontWeight: "bold",
    fontSize: "0.9rem",
  },
  input: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    outline: "none",
  },
  textarea: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    outline: "none",
    minHeight: "100px",
    resize: "vertical",
  },
  fileInput: {
    padding: "0.5rem",
    border: "1px dashed #8B0000",
    borderRadius: "8px",
    cursor: "pointer",
  },
  previewGrid: {
    display: "flex",
    gap: "0.8rem",
    flexWrap: "wrap",
  },
  previewImage: {
    width: "100px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "2px solid #8B0000",
  },
  formButtons: {
    display: "flex",
    gap: "1rem",
  },
  submitBtn: {
    backgroundColor: "#8B0000",
    color: "white",
    border: "none",
    padding: "0.9rem 2rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  cancelBtn: {
    backgroundColor: "transparent",
    color: "#8B0000",
    border: "1px solid #8B0000",
    padding: "0.9rem 2rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  productsSection: {
    marginTop: "1rem",
  },
  sectionTitle: {
    color: "#8B0000",
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
  },
  loadingText: {
    color: "#666",
    fontSize: "1.1rem",
  },
  emptyText: {
    color: "#666",
    fontSize: "1.1rem",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  productImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },
  productInfo: {
    padding: "1rem",
  },
  productName: {
    color: "#8B0000",
    fontSize: "1.1rem",
    marginBottom: "0.3rem",
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: "1.1rem",
    color: "#333",
    marginBottom: "0.4rem",
  },
  productDesc: {
    color: "#666",
    fontSize: "0.85rem",
    marginBottom: "0.4rem",
  },
  imageCount: {
    color: "#888",
    fontSize: "0.8rem",
    marginBottom: "0.8rem",
  },
  cardButtons: {
    display: "flex",
    gap: "0.5rem",
  },
  editBtn: {
    flex: 1,
    padding: "0.5rem",
    backgroundColor: "transparent",
    border: "1px solid #8B0000",
    color: "#8B0000",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "bold",
  },
  deleteBtn: {
    flex: 1,
    padding: "0.5rem",
    backgroundColor: "transparent",
    border: "1px solid #ff4444",
    color: "#ff4444",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "bold",
  },
};

export default AdminPanel;