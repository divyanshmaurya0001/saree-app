import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { currentUser, userRole, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/");
      setMenuOpen(false);
    } catch (error) {
      toast.error("Failed to logout!");
    }
  };

  return (
    <>
      {/* Top Banner */}
      <div style={styles.topBanner}>
        🎉 Free Shipping on all orders above ₹999 | Handpicked Sarees
      </div>

      <nav style={styles.nav}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🛍️</span>
          <div>
            <div style={styles.logoText}>Sudarshana</div>
            <div style={styles.logoSub}>SAREES</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div style={styles.links}>
          <Link to="/" style={styles.link}>
            Home
          </Link>

          {userRole === "admin" && (
            <Link to="/admin" style={styles.adminLink}>
              👑 Admin Panel
            </Link>
          )}

          {currentUser ? (
            <>
              <Link to="/cart" style={styles.cartLink}>
                <span style={styles.cartIcon}>🛒</span>
                <span>Cart</span>
                {totalItems > 0 && (
                  <span style={styles.badge}>{totalItems}</span>
                )}
              </Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
              <Link to="/signup" style={styles.signupBtn}>
                Sign Up Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <Link
            to="/"
            style={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            🏠 Home
          </Link>

          {userRole === "admin" && (
            <Link
              to="/admin"
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              👑 Admin Panel
            </Link>
          )}

          {currentUser ? (
            <>
              <Link
                to="/cart"
                style={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                🛒 Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
              <button onClick={handleLogout} style={styles.mobileLogoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                🔑 Login
              </Link>
              <Link
                to="/signup"
                style={styles.mobileSignupBtn}
                onClick={() => setMenuOpen(false)}
              >
                ✨ Sign Up Free
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

const styles = {
  topBanner: {
    backgroundColor: "#FFD700",
    color: "#8B0000",
    textAlign: "center",
    padding: "0.4rem",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#8B0000",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
  },
  logoIcon: {
    fontSize: "2rem",
  },
  logoText: {
    fontSize: "1.3rem",
    fontWeight: "700",
    fontFamily: "'Playfair Display', serif",
    lineHeight: 1.1,
  },
  logoSub: {
    fontSize: "0.65rem",
    letterSpacing: "0.3em",
    opacity: 0.85,
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
    opacity: 0.9,
    transition: "opacity 0.2s",
  },
  adminLink: {
    color: "#FFD700",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "600",
  },
  cartLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "0.95rem",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    fontWeight: "500",
  },
  cartIcon: {
    fontSize: "1.1rem",
  },
  badge: {
    backgroundColor: "#FFD700",
    color: "#8B0000",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
    fontWeight: "bold",
    position: "absolute",
    top: "-8px",
    right: "-10px",
  },
  logoutBtn: {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid rgba(255,255,255,0.5)",
    padding: "0.4rem 1rem",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  signupBtn: {
    backgroundColor: "#FFD700",
    color: "#8B0000",
    padding: "0.5rem 1.2rem",
    borderRadius: "20px",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "0.9rem",
  },
  hamburger: {
    display: "none",
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    fontSize: "1.5rem",
    cursor: "pointer",
    "@media (max-width: 768px)": {
      display: "block",
    },
  },
  mobileMenu: {
    backgroundColor: "#6B0000",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    gap: "0.5rem",
    position: "sticky",
    top: "80px",
    zIndex: 999,
  },
  mobileLink: {
    color: "white",
    textDecoration: "none",
    padding: "0.8rem 1rem",
    borderRadius: "8px",
    fontSize: "1rem",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  mobileLogoutBtn: {
    backgroundColor: "transparent",
    color: "white",
    border: "1px solid white",
    padding: "0.8rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    textAlign: "left",
  },
  mobileSignupBtn: {
    backgroundColor: "#FFD700",
    color: "#8B0000",
    padding: "0.8rem 1rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "1rem",
    textAlign: "center",
  },
};

export default Navbar;