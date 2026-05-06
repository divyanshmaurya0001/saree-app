import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const categories = [
  "All", "Silk", "Banarasi", "Cotton",
  "Designer", "Bridal", "Handloom", "Georgette",
];

const occasions = [
  { name: "Wedding", bg: "from-[#8B0000] to-[#4a0000]" },
  { name: "Festival", bg: "from-[#C9A84C] to-[#8B6914]" },
  { name: "Party", bg: "from-[#4a0060] to-[#2a0040]" },
  { name: "Casual", bg: "from-[#006040] to-[#003020]" },
  { name: "Office", bg: "from-[#003060] to-[#001830]" },
  { name: "Puja", bg: "from-[#8B4000] to-[#4a2000]" },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
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
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "All" ||
      p.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
      p.description?.toLowerCase().includes(activeCategory.toLowerCase());
    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">🛍️</span>
        <p className="text-[#8B0000] text-xl font-['Playfair_Display']">
          Loading collection...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white">

     {/* ===== HERO ===== */}
      <div className="bg-gradient-to-br from-[#8B0000] via-[#6B0000] to-[#2a0000] text-white px-5 py-14 md:py-28 relative overflow-hidden text-center md:text-left">
        <div className="max-w-2xl mx-auto md:mx-0 relative z-10">
          <span className="inline-block bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/40 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            New Collection 2025
          </span>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold leading-tight mb-4">
            Elegance Woven in{" "}
            <span className="text-[#C9A84C]">Every Thread</span>
          </h1>
          <p className="text-white/80 text-sm md:text-base mb-7 leading-relaxed max-w-md mx-auto md:mx-0">
            Discover our handpicked collection of premium sarees —
            crafted for the modern Indian woman.
          </p>
          <div className="flex gap-3 justify-center md:justify-start flex-wrap">
            <a
              href="#collection"
              className="bg-[#C9A84C] text-[#5a0000] px-6 py-3 rounded-full font-bold text-sm hover:bg-[#f0d080] transition-all"
            >
              Shop Now
            </a>
            <a
              href="#occasions"
              className="border border-white/50 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition-all"
            >
              Browse Occasions
            </a>
          </div>
        </div>
      </div>

      {/* ===== FEATURES BAR ===== */}
      <div className="bg-white border-b border-gray-100 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-0 min-w-max mx-auto">
          {[
            { icon: "🚚", text: "Free Shipping above ₹999" },
            { icon: "💎", text: "Premium Quality" },
            { icon: "🔄", text: "Easy 7-Day Returns" },
            { icon: "🔒", text: "Secure Payments" },
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-gray-600 text-xs font-medium px-4 py-3 border-r border-gray-100 last:border-r-0 flex-shrink-0"
            >
              <span className="text-base">{f.icon}</span>
              <span className="whitespace-nowrap">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== COLLECTION ===== */}
      <div className="bg-gray-50" id="collection">
        <div className="max-w-7xl mx-auto px-4 py-12">

          {/* Section Header */}
          <div className="text-center mb-8">
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              Handpicked For You
            </p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#8B0000] mb-3">
              Our Collection
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Each saree is carefully selected for quality and beauty
            </p>
          </div>

          {/* Category Pills */}
          <div
            className="flex gap-2 mb-6 pb-2"
            style={{
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ flexShrink: 0 }}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#8B0000] text-white border-[#8B0000]"
                    : "bg-white text-[#8B0000] border-[#8B0000]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-full px-5 py-3 shadow-sm border border-gray-200 max-w-lg mx-auto mb-8 gap-3">
            <span className="text-gray-400">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search sarees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🛍️</p>
              <h3 className="font-['Playfair_Display'] text-2xl text-[#8B0000] mb-2">
                {search ? "No sarees found!" : "No products yet!"}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                {search ? "Try a different search term" : "Check back soon!"}
              </p>
              {(search || activeCategory !== "All") && (
                <button
                  onClick={() => { setSearch(""); setActiveCategory("All"); }}
                  className="bg-[#8B0000] text-white px-6 py-2.5 rounded-full text-sm font-semibold"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5">
              {filtered.map((product, index) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={
                          product.images?.[0] ||
                          "https://via.placeholder.com/300x400?text=Saree"
                        }
                        alt={product.name}
                        className="w-full h-44 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    {index < 4 && (
                      <span className="absolute top-3 left-3 bg-[#8B0000] text-white text-xs px-3 py-1 rounded-full font-semibold">
                        New
                      </span>
                    )}
                    {/* Hover overlay — desktop only */}
                    <div className="hidden md:flex absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#8B0000]/90 to-transparent p-4 gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 bg-white text-[#8B0000] text-xs font-bold py-2 rounded-lg text-center"
                      >
                        Quick View
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-[#C9A84C] text-[#5a0000] text-xs font-bold py-2 rounded-lg"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-2 md:p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-['Playfair_Display'] text-[#8B0000] text-sm md:text-base font-semibold mb-1 line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-400 text-xs mb-2 line-clamp-1 hidden md:block">
                      {product.description?.slice(0, 50)}...
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-900 font-bold text-base md:text-lg">
                        ₹{product.price?.toLocaleString()}
                      </span>
                      <span className="text-green-600 text-xs font-semibold">
                        ✓ In Stock
                      </span>
                    </div>
                    {/* Mobile — always show buttons */}
                    <div className="flex gap-2 md:hidden">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 border border-[#8B0000] text-[#8B0000] text-xs font-semibold py-2 rounded-lg text-center"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-[#8B0000] text-white text-xs font-semibold py-2 rounded-lg"
                      >
                        Add to Cart
                      </button>
                    </div>
                    {/* Desktop — show buttons too */}
                    <div className="hidden md:flex gap-2">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 border border-[#8B0000] text-[#8B0000] text-xs font-semibold py-2 rounded-lg text-center hover:bg-[#8B0000] hover:text-white transition-all"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-[#8B0000] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#5a0000] transition-all"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== OCCASIONS ===== */}
      <div className="max-w-7xl mx-auto px-4 py-12" id="occasions">
        <div className="text-center mb-8">
          <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
            Shop By Occasion
          </p>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#8B0000]">
            What is the Occasion?
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {occasions.map((occ, i) => (
            <div
              key={i}
              onClick={() => {
                setSearch(occ.name);
                setActiveCategory("All");
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`bg-gradient-to-br ${occ.bg} rounded-2xl h-32 md:h-44 flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300 shadow-md`}
            >
              <span className="text-white font-['Playfair_Display'] text-xl md:text-2xl font-bold tracking-wide">
                {occ.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== NEWSLETTER ===== */}
      <div className="bg-gradient-to-br from-[#8B0000] to-[#4a0000] py-16 px-4 text-center text-white">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl mb-3">
          Join Our Saree Family
        </h2>
        <p className="text-white/75 text-sm mb-8 max-w-md mx-auto">
          Subscribe for exclusive offers, new arrivals and styling tips
        </p>
        <form
          onSubmit={handleNewsletter}
          className="flex max-w-md mx-auto overflow-hidden rounded-full shadow-xl"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-3.5 text-sm outline-none text-gray-800 font-[Poppins]"
            required
          />
          <button
            type="submit"
            className="bg-[#C9A84C] text-[#5a0000] px-6 py-3.5 font-bold text-sm whitespace-nowrap hover:bg-[#f0d080] transition-all"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#1a0000] text-white/80 pt-12 pb-6 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-white/10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img
              src="/logo.png"
              alt="Sudarshana Sarees"
              className="h-16 w-auto mb-4"
            />
            <p className="text-sm leading-relaxed text-white/60 mb-4">
              Bringing you the finest handpicked sarees from across India.
              Quality and elegance delivered to your doorstep.
            </p>
            <div className="flex gap-3">
              {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#C9A84C] hover:text-[#5a0000] flex items-center justify-center transition-all text-sm"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#C9A84C] font-semibold text-sm mb-4 tracking-wide">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2.5">
              {["Home", "Collections", "Cart", "Login", "Sign Up"].map((item, i) => (
                <Link
                  key={i}
                  to={i === 0 ? "/" : i === 2 ? "/cart" : i === 3 ? "/login" : i === 4 ? "/signup" : "/"}
                  className="text-white/60 text-sm hover:text-[#C9A84C] hover:pl-1 transition-all"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[#C9A84C] font-semibold text-sm mb-4 tracking-wide">
              Categories
            </h4>
            <div className="flex flex-col gap-2.5">
              {categories.filter(c => c !== "All").map((cat, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveCategory(cat);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-white/60 text-sm hover:text-[#C9A84C] hover:pl-1 transition-all text-left"
                >
                  {cat} Sarees
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#C9A84C] font-semibold text-sm mb-4 tracking-wide">
              Contact Us
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { icon: "📍", text: "Varanasi, Uttar Pradesh, India" },
                { icon: "📞", text: "+91 79059 07624" },
                { icon: "📧", text: "hello@sudarshanasarees.com" },
                { icon: "🕐", text: "Mon-Sat: 9AM - 8PM" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-6 text-white/30 text-xs">
          &copy; 2025 Sudarshana Sarees. All rights reserved. Made with love in India.
        </div>
      </footer>

      {/* ===== WHATSAPP ===== */}
      <a
        href="https://wa.me/917905907624"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-all z-50"
        title="Chat on WhatsApp"
      >
        💬
      </a>
    </div>
  );
};

export default Home;