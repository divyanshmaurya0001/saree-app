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
      <div className="top-banner">
        🎉 Free Shipping on orders above ₹999 &nbsp;|&nbsp; 
        Handpicked Premium Sarees &nbsp;|&nbsp; 
        Easy 7-Day Returns
      </div>

      {/* Main Navbar */}
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="nav-logo-icon">🛍️</span>
          <div>
            <div className="nav-logo-text">Sudarshana</div>
            <div className="nav-logo-sub">SAREES</div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>

          {userRole === "admin" && (
            <Link to="/admin" className="nav-admin-link">
              👑 Admin Panel
            </Link>
          )}

          {currentUser ? (
            <>
              <Link to="/cart" className="nav-cart-link">
                🛒 Cart
                {totalItems > 0 && (
                  <span className="nav-badge">{totalItems}</span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="nav-logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-signup-btn">
                Sign Up Free
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link
            to="/"
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            🏠 Home
          </Link>

          {userRole === "admin" && (
            <Link
              to="/admin"
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              👑 Admin Panel
            </Link>
          )}

          {currentUser ? (
            <>
              <Link
                to="/cart"
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                🛒 Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
              <button
                onClick={handleLogout}
                className="mobile-logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                🔑 Login
              </Link>
              <Link
                to="/signup"
                className="mobile-signup-btn"
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

export default Navbar;