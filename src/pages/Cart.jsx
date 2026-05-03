import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  const navigate = useNavigate();

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart!`);
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <div style={styles.emptyBox}>
          <div style={styles.emptyIconWrapper}>
            <span style={styles.emptyIcon}>🛒</span>
          </div>
          <h2 style={styles.emptyTitle}>Your Cart is Empty!</h2>
          <p style={styles.emptySubtitle}>
            Looks like you haven't added any sarees yet.
            Explore our beautiful collection!
          </p>
          <Link to="/" style={styles.shopBtn}>
            ✨ Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Shopping Cart 🛒</h1>
          <p style={styles.subtitle}>
            {cartItems.length} item(s) in your cart
          </p>
        </div>
        <button onClick={clearCart} style={styles.clearBtn}>
          🗑️ Clear All
        </button>
      </div>

      <div style={styles.layout}>
        {/* Cart Items */}
        <div style={styles.itemsSection}>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartCard}>
              {/* Product Image */}
              <div style={styles.imageWrapper}>
                <img
                  src={
                    item.images?.[0] ||
                    "https://via.placeholder.com/120x150?text=Saree"
                  }
                  alt={item.name}
                  style={styles.itemImage}
                />
              </div>

              {/* Product Details */}
              <div style={styles.itemDetails}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemPrice}>₹{item.price} per piece</p>

                {/* Quantity Controls */}
                <div style={styles.quantitySection}>
                  <span style={styles.qtyLabel}>Quantity:</span>
                  <div style={styles.quantityControls}>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      style={styles.qtyBtn}
                    >
                      −
                    </button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      style={styles.qtyBtn}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Price + Remove */}
              <div style={styles.itemRight}>
                <p style={styles.itemTotal}>
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => handleRemove(item.id, item.name)}
                  style={styles.removeBtn}
                >
                  Remove
                </button>
                <Link
                  to={`/product/${item.id}`}
                  style={styles.viewLink}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>

          {/* Items breakdown */}
          <div style={styles.summaryItems}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.summaryRow}>
                <span style={styles.summaryItemName}>
                  {item.name.slice(0, 20)}...
                  <span style={styles.summaryQty}> × {item.quantity}</span>
                </span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div style={styles.divider} />

          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Subtotal</span>
            <span style={styles.summaryValue}>
              ₹{totalPrice.toLocaleString()}
            </span>
          </div>

          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Shipping</span>
            <span style={styles.freeShipping}>
              {totalPrice >= 999 ? "FREE 🎉" : `₹${99}`}
            </span>
          </div>

          {totalPrice >= 999 && (
            <div style={styles.freeShippingBanner}>
              🎉 You got free shipping!
            </div>
          )}

          {totalPrice < 999 && (
            <div style={styles.shippingProgress}>
              <p style={styles.progressText}>
                Add ₹{999 - totalPrice} more for FREE shipping!
              </p>
              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${Math.min((totalPrice / 999) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div style={styles.divider} />

          <div style={styles.totalRow}>
            <span style={styles.totalLabel}>Total</span>
            <span style={styles.totalValue}>
              ₹{(totalPrice + (totalPrice >= 999 ? 0 : 99)).toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            style={styles.checkoutBtn}
          >
            Proceed to Checkout →
          </button>

          <Link to="/" style={styles.continueBtn}>
            ← Continue Shopping
          </Link>

          {/* Trust badges */}
          <div style={styles.trustBadges}>
            <div style={styles.badge}>🔒 Secure Checkout</div>
            <div style={styles.badge}>🚚 Fast Delivery</div>
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  title: {
    color: "#8B0000",
    fontSize: "2rem",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "0.3rem",
  },
  subtitle: {
    color: "#888",
    fontSize: "0.95rem",
  },
  clearBtn: {
    backgroundColor: "transparent",
    border: "1.5px solid #ff4444",
    color: "#ff4444",
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 360px",
    gap: "2rem",
    alignItems: "start",
  },
  itemsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  cartCard: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "1.2rem",
    display: "flex",
    gap: "1.2rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    alignItems: "center",
    transition: "box-shadow 0.2s ease",
  },
  imageWrapper: {
    flexShrink: 0,
    borderRadius: "12px",
    overflow: "hidden",
  },
  itemImage: {
    width: "110px",
    height: "130px",
    objectFit: "cover",
    display: "block",
  },
  itemDetails: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  itemName: {
    color: "#8B0000",
    fontSize: "1.1rem",
    fontFamily: "'Playfair Display', serif",
  },
  itemPrice: {
    color: "#888",
    fontSize: "0.9rem",
  },
  quantitySection: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    marginTop: "0.3rem",
  },
  qtyLabel: {
    color: "#555",
    fontSize: "0.9rem",
    fontWeight: "600",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    backgroundColor: "#FFF8F0",
    borderRadius: "8px",
    padding: "0.2rem",
    border: "1px solid #eee",
  },
  qtyBtn: {
    backgroundColor: "#8B0000",
    color: "white",
    border: "none",
    width: "28px",
    height: "28px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  quantity: {
    fontSize: "1rem",
    fontWeight: "700",
    minWidth: "24px",
    textAlign: "center",
    color: "#333",
  },
  itemRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "0.6rem",
    flexShrink: 0,
  },
  itemTotal: {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#333",
  },
  removeBtn: {
    backgroundColor: "transparent",
    border: "1px solid #ff4444",
    color: "#ff4444",
    padding: "0.3rem 0.8rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  viewLink: {
    color: "#8B0000",
    fontSize: "0.8rem",
    textDecoration: "underline",
    fontWeight: "500",
  },
  summary: {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "1.8rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    position: "sticky",
    top: "100px",
  },
  summaryTitle: {
    color: "#8B0000",
    fontSize: "1.3rem",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "0.5rem",
  },
  summaryItems: {
    display: "flex",
    flexDirection: "column",
    gap: "0.6rem",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#555",
    fontSize: "0.9rem",
  },
  summaryItemName: {
    color: "#666",
    fontSize: "0.85rem",
  },
  summaryQty: {
    color: "#888",
    fontSize: "0.8rem",
  },
  summaryLabel: {
    color: "#555",
    fontWeight: "500",
  },
  summaryValue: {
    fontWeight: "600",
    color: "#333",
  },
  freeShipping: {
    color: "green",
    fontWeight: "700",
  },
  freeShippingBanner: {
    backgroundColor: "#f0fff0",
    border: "1px solid green",
    color: "green",
    padding: "0.6rem 1rem",
    borderRadius: "8px",
    fontSize: "0.85rem",
    fontWeight: "600",
    textAlign: "center",
  },
  shippingProgress: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  progressText: {
    fontSize: "0.8rem",
    color: "#888",
  },
  progressBar: {
    backgroundColor: "#eee",
    borderRadius: "4px",
    height: "6px",
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: "#8B0000",
    height: "100%",
    borderRadius: "4px",
    transition: "width 0.3s ease",
  },
  divider: {
    height: "1px",
    backgroundColor: "#eee",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#333",
  },
  totalValue: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#8B0000",
  },
  checkoutBtn: {
    backgroundColor: "#8B0000",
    color: "white",
    border: "none",
    padding: "1rem",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "700",
    width: "100%",
    letterSpacing: "0.5px",
  },
  continueBtn: {
    textAlign: "center",
    color: "#8B0000",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "600",
  },
  trustBadges: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: "#FFF8F0",
    color: "#888",
    padding: "0.4rem 0.8rem",
    borderRadius: "20px",
    fontSize: "0.75rem",
    border: "1px solid #eee",
  },
  emptyContainer: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8F0",
    padding: "2rem",
  },
  emptyBox: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.2rem",
    maxWidth: "400px",
  },
  emptyIconWrapper: {
    backgroundColor: "white",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  emptyIcon: {
    fontSize: "3.5rem",
  },
  emptyTitle: {
    color: "#8B0000",
    fontSize: "1.8rem",
    fontFamily: "'Playfair Display', serif",
  },
  emptySubtitle: {
    color: "#888",
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  shopBtn: {
    backgroundColor: "#8B0000",
    color: "white",
    padding: "0.9rem 2.5rem",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "1rem",
  },
};

export default Cart;