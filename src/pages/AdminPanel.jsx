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
  const [activeTab, setActiveTab] = useState("products");

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
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
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
        const uploadPromises = imageFiles.map((file) => uploadToCloudinary(file));
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
        toast.success("Product updated!");
      } else {
        await addDoc(collection(db, "products"), {
          name: form.name,
          price: Number(form.price),
          description: form.description,
          images: imageUrls,
          createdAt: new Date().toISOString(),
        });
        toast.success("Product added!");
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
    setActiveTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Product deleted!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete!");
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
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-[#8B0000] text-white px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold mb-1">
            Admin Panel
          </h1>
          <p className="text-white/70 text-sm">
            Manage your saree collection
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Products", value: products.length, icon: "🛍️" },
            { label: "Active Listings", value: products.length, icon: "✅" },
            { label: "Categories", value: "8", icon: "📂" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-[#8B0000]">{stat.value}</div>
              <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setActiveTab("products"); setShowForm(false); }}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "products"
                ? "bg-[#8B0000] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Products ({products.length})
          </button>
          <button
  onClick={() => {
    setActiveTab("add");
    setShowForm(true);
    setForm({ name: "", price: "", description: "", images: [] });
    setImageFiles([]);
    setPreviewUrls([]);
    setEditingId(null);
  }}
  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
    activeTab === "add"
      ? "bg-[#8B0000] text-white"
      : "bg-white text-gray-600 hover:bg-gray-100"
  }`}
>
  + Add New Saree
</button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8">
            <h2 className="font-['Playfair_Display'] text-xl text-[#8B0000] font-bold mb-6">
              {editingId ? "Edit Product" : "Add New Saree"}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Saree Name</label>
                <input
                  type="text"
                  placeholder="Enter saree name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 bg-gray-50 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Price (₹)</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 bg-gray-50 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Description</label>
                <textarea
                  placeholder="Enter product description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 bg-gray-50 transition-all resize-none h-28"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">
                  Upload Images (Select multiple)
                </label>
                <label className="border-2 border-dashed border-[#8B0000]/30 rounded-xl p-8 text-center cursor-pointer hover:border-[#8B0000]/60 transition-all bg-gray-50">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <span className="text-4xl block mb-2">📸</span>
                  <span className="text-gray-500 text-sm">
                    Click to select images
                  </span>
                </label>
              </div>

              {/* Image Previews */}
              {previewUrls.length > 0 && (
                <div className="flex gap-3 flex-wrap">
                  {previewUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`preview ${index + 1}`}
                      className="w-24 h-28 object-cover rounded-xl border-2 border-[#8B0000]/30"
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-[#8B0000] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#5a0000] transition-all disabled:opacity-70"
                >
                  {uploading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 border border-gray-200 text-gray-600 py-3.5 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Grid */}
        {activeTab === "products" && (
          <>
            {loading ? (
              <div className="text-center py-20 text-gray-500">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <span className="text-6xl block mb-4">🛍️</span>
                <p className="text-gray-500">No products yet. Add your first saree!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <img
                      src={product.images?.[0] || "https://via.placeholder.com/300x200?text=Saree"}
                      alt={product.name}
                      className="w-full h-52 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-['Playfair_Display'] text-[#8B0000] font-semibold text-base mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-gray-900 font-bold text-lg mb-1">
                        ₹{product.price?.toLocaleString()}
                      </p>
                      <p className="text-gray-400 text-xs mb-1 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="text-gray-400 text-xs mb-4">
                        📷 {product.images?.length || 0} image(s)
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="flex-1 border border-[#8B0000] text-[#8B0000] py-2.5 rounded-xl text-sm font-semibold hover:bg-[#8B0000] hover:text-white transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex-1 border border-red-300 text-red-500 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-50 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;