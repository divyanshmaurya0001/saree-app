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
    <header className="sticky top-0 z-50">

      {/* ===== TOP BANNER ===== */}
      <div className="bg-[#C9A84C] text-[#5a0000] text-center py-2 px-4 text-xs font-semibold tracking-wide">
        Free Shipping above ₹999 &nbsp;•&nbsp; Easy 7-Day Returns &nbsp;•&nbsp; Authentic Handpicked Sarees
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <nav className="bg-[#8B0000] px-4 md:px-10 h-20 flex items-center justify-between shadow-lg">

        {/* LEFT — Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src="/logo.png"
            alt="Sudarshana Sarees"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* CENTER — Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/?category=${cat}`}
              className="text-white/80 hover:text-white text-xs font-semibold tracking-widest uppercase border-b-2 border-transparent hover:border-[#C9A84C] pb-1 transition-all duration-200 whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
          {userRole === "admin" && (
            <Link
              to="/admin"
              className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase"
            >
              ADMIN
            </Link>
          )}
        </div>

        {/* RIGHT — Icons */}
        <div className="flex items-center gap-3">

          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-white/90 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
            title="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Login / Account Icon — hidden on mobile */}
          {currentUser ? (
            <button
              onClick={handleLogout}
              className="hidden md:flex text-white/90 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
              title="Logout"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex text-white/90 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
              title="Login"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          )}

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative text-white/90 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all"
            title="Cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C9A84C] text-[#5a0000] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* ===== SEARCH BAR ===== */}
      {searchOpen && (
        <div className="bg-white px-4 py-3 shadow-md border-b border-gray-100">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 max-w-2xl mx-auto"
          >
            <input
              type="text"
              placeholder="Search for sarees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-5 py-2.5 border-2 border-[#8B0000] rounded-full text-sm outline-none font-[Poppins]"
              autoFocus
            />
            <button
              type="submit"
              className="bg-[#8B0000] text-white px-6 py-2.5 rounded-full text-sm font-semibold"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-gray-400 hover:text-gray-600 p-2 text-lg"
            >
              ✕
            </button>
          </form>
        </div>
      )}

      {/* ===== MOBILE MENU ===== */}
      {menuOpen && (
        <div className="lg:hidden bg-[#6B0000] flex flex-col max-h-[80vh] overflow-y-auto">

          {/* Logo in mobile menu */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center">
            <img
              src="/logo.png"
              alt="Sudarshana Sarees"
              className="h-12 w-auto"
            />
          </div>

          {/* Category Links */}
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/?category=${cat}`}
              className="text-white/90 px-6 py-4 text-sm font-medium border-b border-white/5 hover:bg-white/10 transition-all tracking-wide"
              onClick={() => setMenuOpen(false)}
            >
              {cat}
            </Link>
          ))}

          <div className="h-px bg-white/15 my-1" />

          {currentUser ? (
            <>
              <Link
                to="/cart"
                className="text-white/90 px-6 py-4 text-sm font-medium border-b border-white/5 hover:bg-white/10 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
              {userRole === "admin" && (
                <Link
                  to="/admin"
                  className="text-[#C9A84C] px-6 py-4 text-sm font-semibold border-b border-white/5"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-white/80 px-6 py-4 text-sm text-left border-b border-white/5 hover:bg-white/10 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white/90 px-6 py-4 text-sm font-medium border-b border-white/5 hover:bg-white/10 transition-all"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <div className="px-4 py-3">
                <Link
                  to="/signup"
                  className="block bg-[#C9A84C] text-[#5a0000] text-center py-3 rounded-lg font-bold text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up Free
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;