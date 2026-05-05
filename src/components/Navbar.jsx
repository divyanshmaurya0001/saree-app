import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const categories = [
  "Silk Sarees",
  "Cotton Sarees", 
  "Banarasi",
  "Designer",
  "Bridal",
  "Handloom",
  "Sale",
];

const Navbar = () => {
  const { currentUser, userRole, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* ===== TOP ANNOUNCEMENT BANNER ===== */}
      <div style={styles.banner}>
        Free Shipping on orders above &#8377;999 &nbsp;&#8226;&nbsp; 
        Easy 7-Day Returns &nbsp;&#8226;&nbsp; 
        Authentic Handpicked Sarees
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <nav style={styles.nav}>

        {/* LEFT — Logo */}
<Link to="/" style={styles.logoWrap}>
  <img
    src="/src/assets/logo.png"
    alt="Sudarshana Sarees"
    style={styles.logoImg}
  />
</Link>

        {/* CENTER — Navigation Links */}
        <div style={styles.navCenter}>
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/?category=${cat}`}
              style={styles.navItem}
              onMouseEnter={(e) => {
                e.target.style.color = "rgba(255,255,255,1)";
                e.target.style.borderBottom = "2px solid #C9A84C";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "rgba(255,255,255,0.85)";
                e.target.style.borderBottom = "2px solid transparent";
              }}
            >
              {cat.toUpperCase()}
            </Link>
          ))}
          {userRole === "admin" && (
            <Link
              to="/admin"
              style={{...styles.navItem, color: "#C9A84C"}}
            >
              ADMIN
            </Link>
          )}
        </div>

        {/* RIGHT — Icons */}
        <div style={styles.navRight}>

          {/* Search Icon */}
          <button
            style={styles.iconBtn}
            onClick={() => setSearchOpen(!searchOpen)}
            title="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* Login / Account Icon */}
          {currentUser ? (
            <button
              style={styles.iconBtn}
              onClick={handleLogout}
              title="Logout"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          ) : (
            <Link to="/login" style={styles.iconBtn} title="Login">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
          )}

          {/* Cart Icon */}
          <Link to="/cart" style={styles.cartIconBtn} title="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span style={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>

          {/* Mobile Hamburger */}
          <button
            style={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ===== SEARCH BAR DROPDOWN ===== */}
      {searchOpen && (
        <div style={styles.searchBar}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Search for sarees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
              autoFocus
            />
            <button type="submit" style={styles.searchSubmit}>
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              style={styles.searchClose}
            >
              &#10005;
            </button>
          </form>
        </div>
      )}

      {/* ===== MOBILE MENU ===== */}
      {menuOpen && (
  <div style={styles.mobileMenu}>
    {/* Logo in mobile menu */}
    <div style={styles.mobileMenuHeader}>
      <img
        src="/src/assets/logo.png"
        alt="Sudarshana Sarees"
        style={{ height: "55px", width: "auto" }}
      />
    </div>
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/?category=${cat}`}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {cat}
            </Link>
          ))}

          <div style={styles.mobileDivider} />

          {currentUser ? (
            <>
              <Link
                to="/cart"
                style={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
              {userRole === "admin" && (
                <Link
                  to="/admin"
                  style={{...styles.mobileLink, color: "#C9A84C"}}
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                style={styles.mobileLogout}
              >
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
                Login
              </Link>
              <Link
                to="/signup"
                style={styles.mobileSignup}
                onClick={() => setMenuOpen(false)}
              >
                Sign Up Free
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

const styles = {
  banner: {
    backgroundColor: "#C9A84C",
    color: "#5a0000",
    textAlign: "center",
    padding: "0.45rem 1rem",
    fontSize: "0.8rem",
    fontWeight: "600",
    letterSpacing: "0.3px",
  },
  nav: {
    backgroundColor: "#8B0000",
    padding: "0 2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "80px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
  },
  logoWrap: {
  textDecoration: "none",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
},
logoImg: {
  height: "65px",
  width: "auto",
  objectFit: "contain",
  filter: "brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
  transition: "all 0.2s ease",
},
  logoBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  logoMain: {
    color: "#ffffff",
    fontSize: "1.35rem",
    fontFamily: "'Playfair Display', serif",
    fontWeight: "700",
    letterSpacing: "0.15em",
    lineHeight: 1.1,
  },
  logoSub: {
    color: "#C9A84C",
    fontSize: "0.55rem",
    letterSpacing: "0.5em",
    fontWeight: "500",
    marginTop: "2px",
  },
  navCenter: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
  },
  navItem: {
    color: "rgba(255,255,255,0.85)",
    textDecoration: "none",
    fontSize: "0.78rem",
    fontWeight: "600",
    letterSpacing: "0.12em",
    paddingBottom: "4px",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    flexShrink: 0,
  },
  iconBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.9)",
    cursor: "pointer",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    textDecoration: "none",
  },
  cartIconBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.9)",
    cursor: "pointer",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    textDecoration: "none",
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: "0px",
    right: "0px",
    backgroundColor: "#C9A84C",
    color: "#5a0000",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.65rem",
    fontWeight: "700",
  },
  hamburger: {
    display: "none",
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    padding: "0.3rem",
  },
  searchBar: {
    backgroundColor: "white",
    padding: "1rem 2rem",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    position: "sticky",
    top: "80px",
    zIndex: 999,
    borderBottom: "1px solid #eee",
  },
  searchForm: {
    display: "flex",
    maxWidth: "600px",
    margin: "0 auto",
    gap: "0.5rem",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    padding: "0.7rem 1.2rem",
    border: "1.5px solid #8B0000",
    borderRadius: "30px",
    fontSize: "0.95rem",
    outline: "none",
    fontFamily: "'Poppins', sans-serif",
  },
  searchSubmit: {
    backgroundColor: "#8B0000",
    color: "white",
    border: "none",
    padding: "0.7rem 1.5rem",
    borderRadius: "30px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
  },
  searchClose: {
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    color: "#888",
    padding: "0.5rem",
  },
  mobileMenu: {
    backgroundColor: "#6B0000",
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem 0",
    position: "sticky",
    top: "80px",
    zIndex: 998,
    maxHeight: "80vh",
    overflowY: "auto",
  },
  mobileLink: {
    color: "rgba(255,255,255,0.9)",
    padding: "0.9rem 1.5rem",
    fontSize: "0.95rem",
    fontWeight: "500",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    textDecoration: "none",
    display: "block",
    letterSpacing: "0.05em",
  },
  mobileDivider: {
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.15)",
    margin: "0.3rem 0",
  },
  mobileMenuHeader: {
  padding: "1rem 1.5rem",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
  display: "flex",
  alignItems: "center",
},
  mobileLogout: {
    backgroundColor: "transparent",
    color: "rgba(255,255,255,0.8)",
    border: "none",
    padding: "0.9rem 1.5rem",
    fontSize: "0.95rem",
    textAlign: "left",
    cursor: "pointer",
    fontFamily: "'Poppins', sans-serif",
    width: "100%",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  mobileSignup: {
    backgroundColor: "#C9A84C",
    color: "#5a0000",
    padding: "0.9rem 1.5rem",
    fontSize: "0.95rem",
    fontWeight: "700",
    textAlign: "center",
    textDecoration: "none",
    display: "block",
    margin: "0.5rem 1rem",
    borderRadius: "8px",
  },
};

export default Navbar;