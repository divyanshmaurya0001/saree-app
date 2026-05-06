import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const categories = [
  "All Sarees", "Silk", "Banarasi", "Cotton",
  "Designer", "Bridal", "Handloom", "Sale",
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
      toast.success("Logged out!");
      navigate("/");
      setMenuOpen(false);
    } catch {
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
      {/* ── ANNOUNCEMENT BANNER ── */}
      <div className="bg-[#8B0000] text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        🎉 Free Shipping on orders above ₹999 &nbsp;•&nbsp; Easy 7-Day Returns
      </div>

      {/* ── MAIN HEADER ── */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          {/* LEFT — Menu + Search */}
          <div className="flex items-center gap-1">
            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="8" x2="21" y2="8" />
                  <line x1="3" y1="16" x2="21" y2="16" />
                </svg>
              )}
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>

          {/* CENTER — Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <img
              src="/logo.png"
              alt="Sudarshana Sarees"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* RIGHT — Profile + Cart */}
          <div className="flex items-center gap-1">
            {/* Profile */}
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                title="Logout"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                title="Login"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              title="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#8B0000] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Admin */}
            {userRole === "admin" && (
              <Link
                to="/admin"
                className="hidden md:flex items-center px-3 py-1.5 bg-[#8B0000] text-white text-xs font-semibold rounded-lg"
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        {/* ── SEARCH BAR ── */}
        {searchOpen && (
          <div className="border-t border-gray-100 bg-white px-4 py-3">
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 max-w-xl mx-auto"
            >
              <div className="flex-1 flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 focus-within:border-[#8B0000] transition-colors">
                <svg className="text-gray-400 flex-shrink-0" width="16" height="16"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search sarees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm text-gray-700 w-full"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="bg-[#8B0000] text-white px-5 py-2.5 rounded-full text-sm font-semibold flex-shrink-0"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 p-1 flex-shrink-0"
              >
                ✕
              </button>
            </form>
          </div>
        )}

        {/* ── DESKTOP NAV LINKS ── */}
        <div className="hidden md:block border-t border-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-center gap-8 py-2">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/?category=${cat}`}
                  className="text-gray-600 hover:text-[#8B0000] text-xs font-medium tracking-wide transition-colors whitespace-nowrap py-1 border-b-2 border-transparent hover:border-[#8B0000]"
                >
                  {cat.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER MENU ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="relative w-72 bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <img src="/logo.png" alt="Sudarshana" className="h-10 w-auto" />
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-gray-500"
              >
                ✕
              </button>
            </div>

            {/* Categories */}
            <div className="flex-1 py-2">
              <p className="px-5 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Categories
              </p>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/?category=${cat}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#8B0000] transition-colors border-b border-gray-50"
                >
                  {cat}
                </Link>
              ))}

              <div className="h-2 bg-gray-50 my-2" />

              <p className="px-5 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Account
              </p>

              {currentUser ? (
                <>
                  <Link
                    to="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-50"
                  >
                    <span>My Cart</span>
                    {totalItems > 0 && (
                      <span className="bg-[#8B0000] text-white text-xs px-2 py-0.5 rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                  {userRole === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center px-5 py-3.5 text-sm text-[#8B0000] font-semibold hover:bg-gray-50 border-b border-gray-50"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center px-5 py-3.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-50"
                  >
                    Login
                  </Link>
                  <div className="px-5 py-4">
                    <Link
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="block w-full bg-[#8B0000] text-white text-center py-3 rounded-xl text-sm font-bold"
                    >
                      Sign Up Free
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Contact */}
            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500 mb-1">Need help?</p>
              <a
                href="https://wa.me/917905907624"
                className="text-sm font-semibold text-[#25D366]"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;