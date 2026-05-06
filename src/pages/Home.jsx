import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard";
import UrgencyBar from "../components/UrgencyBar";
import TrustSection from "../components/TrustSection";
import ReviewSection from "../components/ReviewSection";
import BrandStory from "../components/BrandStory";

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

  const handleNewsletter = (e) => {
    e.preventDefault();
    toast.success("Thank you for subscribing!");
    setEmail("");
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "All" ||
      p.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
      p.description?.toLowerCase().includes(activeCategory.toLowerCase());
    return matchSearch && matchCategory;
  });

  const bestsellers = products.slice(0, 4);
  const featured = products.slice(0, 8);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <div className="w-12 h-12 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#8B0000] text-sm font-medium tracking-wide">
          Loading collection...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white">

      {/* ===== URGENCY BAR ===== */}
      <UrgencyBar />

      {/* ===== HERO ===== */}
      <section className="relative bg-gradient-to-br from-[#8B0000] via-[#6B0000] to-[#2a0000] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex items-center justify-end pr-8">
          <span className="text-[28rem] leading-none">🪷</span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-28 flex flex-col items-center md:items-start text-center md:text-left">
          <span className="inline-flex items-center gap-2 bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-pulse" />
            New Collection 2025
          </span>

          <h1 className="font-['Playfair_Display'] text-[2.5rem] md:text-[4.5rem] font-bold text-white leading-[1.15] mb-5 max-w-2xl">
            Where Tradition
            <br />
            Meets{" "}
            <span className="text-[#C9A84C] italic">Elegance</span>
          </h1>

          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8 max-w-md">
            Handpicked sarees from India's finest weavers — delivered
            to your doorstep with love and care.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="#featured"
              className="bg-[#C9A84C] text-[#1a0000] px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-[#f0d080] transition-all text-center"
            >
              Explore Collection
            </a>
            <a
              href="#bestsellers"
              className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-white/10 transition-all text-center"
            >
              View Bestsellers
            </a>
          </div>

          {/* Social proof strip */}
          <div className="flex items-center gap-4 mt-10 flex-wrap justify-center md:justify-start">
            <div className="flex -space-x-2">
              {["P", "R", "A", "S"].map((l, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#8B0000] flex items-center justify-center text-xs font-bold text-white"
                  style={{
                    backgroundColor: ["#8B0000", "#C9A84C", "#4a0060", "#006040"][i],
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-[#C9A84C] text-xs">★</span>
                ))}
              </div>
              <p className="text-white/60 text-xs">
                Loved by 10,000+ customers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <div className="bg-white border-b border-gray-100">
        <div
          className="flex items-stretch divide-x divide-gray-100 overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {[
            { icon: "🚚", title: "Free Shipping", sub: "On orders above ₹999" },
            { icon: "💎", title: "Premium Quality", sub: "Handpicked & verified" },
            { icon: "🔄", title: "Easy Returns", sub: "7-day hassle-free" },
            { icon: "🔒", title: "Secure Payment", sub: "100% safe checkout" },
            { icon: "🧵", title: "From Weavers", sub: "No middlemen" },
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
            >
              <span className="text-xl">{f.icon}</span>
              <div>
                <p className="text-xs font-bold text-gray-800 whitespace-nowrap">{f.title}</p>
                <p className="text-xs text-gray-400 whitespace-nowrap">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-14 md:py-20 px-4 bg-white" id="featured">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-2">
                Handpicked For You
              </p>
              <h2 className="font-['Playfair_Display'] text-2xl md:text-4xl text-[#1a0000] font-bold">
                Featured Collection
              </h2>
            </div>
            <Link
              to="/"
              className="text-[#8B0000] text-xs md:text-sm font-semibold underline underline-offset-4 hidden md:block"
            >
              View All
            </Link>
          </div>

          {/* Category Filter */}
          <div
            className="flex gap-2 mb-8 pb-1"
            style={{ overflowX: "auto", scrollbarWidth: "none" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold border-2 transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#8B0000] text-white border-[#8B0000]"
                    : "bg-transparent text-[#8B0000] border-[#8B0000]/30 hover:border-[#8B0000]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 max-w-sm mb-8">
            <svg className="text-gray-400 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search sarees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-700 w-full"
            />
            {search && (
              <button onClick={() => setSearch("")} className="text-gray-400 text-lg flex-shrink-0">
                ✕
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🛍️</p>
              <h3 className="font-['Playfair_Display'] text-xl text-[#8B0000] mb-2">
                No sarees found
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Try a different search or category
              </p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="bg-[#8B0000] text-white px-6 py-2.5 rounded-full text-sm font-semibold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== TRUST SECTION ===== */}
      <TrustSection />

      {/* ===== BESTSELLERS ===== */}
      <section className="py-14 md:py-20 px-4 bg-white" id="bestsellers">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Most Loved
            </p>
            <h2 className="font-['Playfair_Display'] text-2xl md:text-4xl text-[#1a0000] font-bold">
              Bestsellers
            </h2>
          </div>
          {bestsellers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {bestsellers.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 py-12">
              Products coming soon!
            </p>
          )}
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <ReviewSection />

      {/* ===== BRAND STORY ===== */}
      <BrandStory />

      {/* ===== OCCASIONS ===== */}
      <section className="py-14 md:py-20 px-4 bg-[#fdf8f3]" id="occasions">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              Find Your Saree
            </p>
            <h2 className="font-['Playfair_Display'] text-2xl md:text-4xl text-[#1a0000] font-bold">
              Shop By Occasion
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {occasions.map((occ, i) => (
              <div
                key={i}
                onClick={() => {
                  setSearch(occ.name);
                  setActiveCategory("All");
                  document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`bg-gradient-to-br ${occ.bg} rounded-2xl h-28 md:h-40 flex items-center justify-center cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm`}
              >
                <span className="font-['Playfair_Display'] text-white text-lg md:text-2xl font-bold tracking-wide">
                  {occ.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-14 md:py-20 px-4 bg-[#8B0000]">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Stay Connected
          </p>
          <h2 className="font-['Playfair_Display'] text-2xl md:text-4xl text-white font-bold mb-3">
            Join Our Saree Family
          </h2>
          <p className="text-white/65 text-sm mb-8">
            Get exclusive offers, new arrivals and styling tips straight to your inbox.
          </p>
          <form
            onSubmit={handleNewsletter}
            className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto rounded-full overflow-hidden shadow-xl"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 text-sm outline-none text-gray-800"
              required
            />
            <button
              type="submit"
              className="bg-[#1a0000] text-white px-6 py-4 font-bold text-sm hover:bg-black transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#0d0000] text-white">
        <div className="max-w-6xl mx-auto px-5 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <img src="/logo.png" alt="Sudarshana Sarees" className="h-16 w-auto mb-4" />
              <p className="text-white/50 text-xs leading-relaxed mb-5">
                Bringing you the finest handpicked sarees from India's
                master weavers since 2009.
              </p>
              <div className="flex gap-2.5">
                {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C9A84C] hover:text-[#1a0000] flex items-center justify-center text-xs transition-all"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-[#C9A84C] font-semibold text-xs tracking-widest uppercase mb-5">
                Quick Links
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Home", to: "/" },
                  { label: "Collection", to: "/" },
                  { label: "Cart", to: "/cart" },
                  { label: "Login", to: "/login" },
                  { label: "Sign Up", to: "/signup" },
                ].map((link, i) => (
                  <Link
                    key={i}
                    to={link.to}
                    className="text-white/50 text-xs hover:text-[#C9A84C] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-[#C9A84C] font-semibold text-xs tracking-widest uppercase mb-5">
                Categories
              </h4>
              <div className="flex flex-col gap-3">
                {["Silk Sarees", "Banarasi", "Cotton", "Designer", "Bridal", "Handloom"].map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveCategory(cat);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-white/50 text-xs hover:text-[#C9A84C] transition-colors text-left"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#C9A84C] font-semibold text-xs tracking-widest uppercase mb-5">
                Contact
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  { icon: "📍", text: "Varanasi, UP, India" },
                  { icon: "📞", text: "+91 79059 07624" },
                  { icon: "📧", text: "hello@sudarshanasarees.com" },
                  { icon: "🕐", text: "Mon-Sat: 9AM - 8PM" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-white/50 text-xs">
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/30 text-xs">
              &copy; 2025 Sudarshana Sarees. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </footer>

      {/* ===== STICKY WHATSAPP CTA ===== */}
      
      <a
        href="https://wa.me/917905907624?text=Hi! I'm interested in your saree collection."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:shadow-green-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
        style={{ boxShadow: "0 8px 32px rgba(37,211,102,0.4)" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-sm font-bold">Chat with us</span>
      </a>
    </div>
  );
};

export default Home;