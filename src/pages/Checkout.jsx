import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        items: cartItems,
        totalPrice,
        shippingAddress: form,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      clearCart();
      toast.success("Order placed successfully! 🎉");
      navigate("/");
    } catch (error) {
      toast.error("Failed to place order!");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout 🛍️</h1>

      <div style={styles.layout}>
        {/* Shipping Form */}
        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>Shipping Details</h2>
          <form onSubmit={handlePlaceOrder} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={form.fullName}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Address</label>
              <textarea
                name="address"
                placeholder="House no, Street, Area"
                value={form.address}
                onChange={handleChange}
                style={styles.textarea}
                required
              />
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                value={form.pincode}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {/* Razorpay Ready Button */}
            <button
              type="submit"
              style={styles.orderBtn}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order ✓"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={styles.summary}>
          <h2 style={styles.sectionTitle}>Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.summaryItem}>
              <img
                src={
                  item.images?.[0] ||
                  "https://via.placeholder.com/60x70?text=Saree"
                }
                alt={item.name}
                style={styles.summaryImage}
              />
              <div style={styles.summaryItemDetails}>
                <p style={styles.summaryItemName}>{item.name}</p>
                <p style={styles.summaryItemQty}>Qty: {item.quantity}</p>
              </div>
              <p style={styles.summaryItemPrice}>
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          <div style={styles.divider} />

          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping</span>
            <span style={{ color: "green" }}>FREE</span>
          </div>

          <div style={styles.divider} />

          <div style={styles.summaryTotal}>
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          {/* Razorpay note */}
          <div style={styles.paymentNote}>
            <p style={styles.paymentNoteText}>
              💳 Online payment coming soon via Razorpay
            </p>
          </div>
        </div>
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
  title: {
    color: "#8B0000",
    fontSize: "2rem",
    marginBottom: "2rem",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: "2rem",
    alignItems: "start",
  },
  formSection: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    color: "#8B0000",
    fontSize: "1.3rem",
    marginBottom: "1.5rem",
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
    flex: 1,
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
    minHeight: "80px",
    resize: "vertical",
  },
  row: {
    display: "flex",
    gap: "1rem",
  },
  orderBtn: {
    backgroundColor: "#8B0000",
    color: "white",
    border: "none",
    padding: "1rem",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  summary: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  summaryItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
  },
  summaryImage: {
    width: "60px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "6px",
  },
  summaryItemDetails: {
    flex: 1,
  },
  summaryItemName: {
    color: "#333",
    fontSize: "0.95rem",
    fontWeight: "bold",
  },
  summaryItemQty: {
    color: "#888",
    fontSize: "0.85rem",
  },
  summaryItemPrice: {
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    height: "1px",
    backgroundColor: "#eee",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#555",
    fontSize: "1rem",
  },
  summaryTotal: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: "1.2rem",
    color: "#333",
  },
  paymentNote: {
    backgroundColor: "#FFF8F0",
    borderRadius: "8px",
    padding: "0.8rem",
    border: "1px dashed #8B0000",
  },
  paymentNoteText: {
    color: "#8B0000",
    fontSize: "0.85rem",
    textAlign: "center",
    margin: 0,
  },
};

export default Checkout;