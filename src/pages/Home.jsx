import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import UrgencyBar from "../components/UrgencyBar";
import TrustSection from "../components/TrustSection";
import ReviewSection from "../components/ReviewSection";
import BrandStory from "../components/BrandStory";

/* ─── PRODUCT CARD ─────────────────────────────── */
const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addToCart(product);
    toast.success("Added to cart!");
    setTimeout(() => setAdding(false), 1200);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : null;

  const stockLeft = product.stock ?? (Math.floor(Math.random() * 6) + 2);
  const isLow = stockLeft <= 5;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden flex flex-col"
      style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.08)" }}
    >
      {/* ── IMAGE ── */}
      <div className="relative overflow-hidden bg-gray-50" style={{ aspectRatio: "3/4" }}>
        <img
          src={product.images?.[0] || "https://via.placeholder.com/400x533?text=Saree"}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Discount badge */}
        {discount ? (
          <span className="absolute top-2 left-2 bg-[#8B0000] text-white text-[11px] font-bold px-2 py-0.5 rounded">
            -{discount}%
          </span>
        ) : index < 3 ? (
          <span className="absolute top-2 left-2 bg-[#C9A84C] text-[#1a0000] text-[11px] font-bold px-2 py-0.5 rounded">
            NEW
          </span>
        ) : null}

        {/* Quick Add — slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={handleAdd}
            className="w-full bg-[#8B0000] text-white py-3 text-xs font-bold tracking-widest uppercase"
          >
            {adding ? "✓ Added" : "Quick Add"}
          </button>
        </div>
      </div>

      {/* ── INFO ── */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <h3 className="text-gray-800 text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#8B0000] transition-colors">
          {product.name}
        </h3>

        {/* Price row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-900 font-bold text-base">
            ₹{product.price?.toLocaleString()}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-gray-400 text-xs line-through">
                ₹{product.originalPrice?.toLocaleString()}
              </span>
              <span className="text-green-600 text-xs font-semibold">
                Save ₹{(product.originalPrice - product.price)?.toLocaleString()}
              </span>
            </>
          )}
        </div>

        {/* Stock urgency */}
        {isLow && (
          <p className="text-orange-500 text-xs font-semibold">
            🔥 Only {stockLeft} left!
          </p>
        )}

        {/* Mobile add button */}
        <button
          onClick={handleAdd}
          className="mt-auto md:hidden w-full bg-[#8B0000] text-white py-2.5 rounded-lg text-xs font-bold tracking-wide"
        >
          {adding ? "✓ Added" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
};

/* ─── HOME PAGE ─────────────────────────────────── */
const categories = [
  "All", "Silk", "Banarasi", "Cotton",
  "Designer", "Bridal", "Handloom", "Georgette",
];

const occasions = [
  { name: "Wedding",  bg: "from-[#8B0000] to-[#4a0000]" },
  { name: "Festival", bg: "from-[#C9A84C] to-[#8B6914]" },
  { name: "Party",    bg: "from-[#4a0060] to-[#2a0040]" },
  { name: "Casual",   bg: "from-[#006040] to-[#003020]" },
  { name: "Office",   bg: "from-[#003060] to-[#001830]" },
  { name: "Puja",     bg: "from-[#8B4000] to-[#4a2000]" },
];

const Home = () => {
  const [products, setProducts]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail]               = useState("");

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        toast.error("Failed to load products!");
      }
      setLoading(false);
    })();
  }, []);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const bySearch = p.name.toLowerCase().includes(q);
    const byCat =
      activeCategory === "All" ||
      p.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
      p.description?.toLowerCase().includes(activeCategory.toLowerCase());
    return bySearch && byCat;
  });

  const handleNewsletter = (e) => {
    e.preventDefault();
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-white">
        <div className="w-10 h-10 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Loading collection...</p>
      </div>
    );
  }

  return (
    <div className="bg-white">

      {/* ── URGENCY BAR ── */}
      <UrgencyBar />

      {/* ════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════ */}
      <section className="bg-[#fdf8f3] px-4 py-10 md:py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">

          {/* Text */}
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <span className="inline-block bg-[#8B0000]/10 text-[#8B0000] text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              New Arrivals 2025
            </span>
            <h1 className="font-['Playfair_Display'] text-[2rem] md:text-[3.2rem] font-bold text-[#1a0000] leading-tight mb-4">
              Discover the Art of<br />
              <span className="text-[#8B0000]">Indian Sarees</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
              Handpicked directly from India's finest weavers. Each saree carries
              a story of tradition, craft and timeless elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href="#collection"
                className="bg-[#8B0000] text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-[#5a0000] transition-colors text-center"
              >
                Shop Collection
              </a>
              <a
                href="#occasions"
                className="border-2 border-[#8B0000] text-[#8B0000] px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#8B0000] hover:text-white transition-all text-center"
              >
                Browse by Occasion
              </a>
            </div>

            {/* Mini trust */}
            <div className="flex items-center gap-6 mt-8 justify-center md:justify-start flex-wrap">
              {[
                { val: "500+", lbl: "Sarees" },
                { val: "100%", lbl: "Authentic" },
                { val: "Free", lbl: "Shipping ₹999+" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="font-['Playfair_Display'] text-xl font-bold text-[#8B0000]">{s.val}</p>
                  <p className="text-gray-400 text-xs">{s.lbl}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="flex-1 order-1 md:order-2 w-full max-w-xs md:max-w-none mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[#8B0000]/10 to-[#C9A84C]/10 aspect-[3/4] flex items-center justify-center">
              {products[0]?.images?.[0] ? (
                <img
                  src={products[0].images[0]}
                  alt="Featured Saree"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-8">
                  <span className="text-8xl block mb-4">🛍️</span>
                  <p className="text-[#8B0000] font-['Playfair_Display'] text-xl font-bold">
                    New Collection
                  </p>
                  <p className="text-gray-400 text-sm mt-1">2025</p>
                </div>
              )}
              {/* Badge on image */}
              <div className="absolute top-4 right-4 bg-white rounded-xl px-3 py-2 shadow-lg text-center">
                <p className="text-[#8B0000] font-bold text-sm">NEW</p>
                <p className="text-gray-400 text-xs">Arrivals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <div
        className="bg-white border-y border-gray-100"
        style={{ overflowX: "auto", scrollbarWidth: "none" }}
      >
        <div className="flex divide-x divide-gray-100 min-w-max mx-auto">
          {[
            { icon: "🚚", t: "Free Shipping",  s: "Orders above ₹999" },
            { icon: "💎", t: "Premium Quality", s: "Handpicked & verified" },
            { icon: "🔄", t: "Easy Returns",    s: "7-day hassle-free" },
            { icon: "🔒", t: "Secure Payment",  s: "100% safe checkout" },
            { icon: "🧵", t: "Direct Weavers",  s: "No middlemen" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-4 flex-shrink-0">
              <span className="text-xl">{f.icon}</span>
              <div>
                <p className="text-xs font-bold text-gray-800 whitespace-nowrap">{f.t}</p>
                <p className="text-xs text-gray-400 whitespace-nowrap">{f.s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          COLLECTION SECTION
      ════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 px-4 bg-white" id="collection">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-8">
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-2">
              Curated For You
            </p>
            <h2 className="font-['Playfair_Display'] text-2xl md:text-4xl text-[#1a0000] font-bold mb-2">
              Handpicked Sarees
            </h2>
            <p className="text-gray-400 text-sm mb-2">
              Each piece handpicked by our experts for quality &amp; beauty
            </p>
            <p className="text-[#8B0000] text-xs font-semibold animate-pulse">
              🔥 Selling fast — limited pieces available!
            </p>
          </div>

          {/* Category Pills */}
          <div
            className="flex gap-2 mb-6 pb-1"
            style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold border-2 transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#8B0000] text-white border-[#8B0000]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#8B0000] hover:text-[#8B0000]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 max-w-sm mx-auto mb-8 focus-within:border-[#8B0000] transition-colors">
            <svg className="text-gray-400 flex-shrink-0" width="16" height="16"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <button
                onClick={() => setSearch("")}
                className="text-gray-400 text-sm flex-shrink-0"
              >
                ✕
              </button>
            )}
          </div>

          {/* ── PRODUCT GRID ── */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">🛍️</p>
              <h3 className="font-['Playfair_Display'] text-xl text-[#8B0000] mb-2">
                No sarees found
              </h3>
              <p className="text-gray-400 text-sm mb-5">
                Try a different search or category
              </p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="bg-[#8B0000] text-white px-6 py-2.5 rounded-full text-sm font-bold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── TRUST ── */}
      <TrustSection />

      {/* ── BESTSELLERS ── */}
      {products.length > 0 && (
        <section className="py-12 md:py-16 px-4 bg-[#fdf8f3]" id="bestsellers">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-2">
                Most Loved
              </p>
              <h2 className="font-['Playfair_Display'] text-2xl md:text-4xl text-[#1a0000] font-bold">
                Bestsellers
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {products.slice(0, 4).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── REVIEWS ── */}
      <ReviewSection />

      {/* ── BRAND STORY ── */}
      <BrandStory />

      {/* ── OCCASIONS ── */}
      <section className="py-12 md:py-16 px-4 bg-white" id="occasions">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-2">
              Find Your Perfect Saree
            </p>
            <h2 className="font-['Playfair_Display'] text-2xl md:text-4xl text-[#1a0000] font-bold">
              Shop By Occasion
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {occasions.map((occ, i) => (
              <div
                key={i}
                onClick={() => {
                  setSearch(occ.name);
                  setActiveCategory("All");
                  document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`bg-gradient-to-br ${occ.bg} rounded-2xl flex items-center justify-center cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm`}
                style={{ height: "clamp(100px, 20vw, 160px)" }}
              >
                <span className="font-['Playfair_Display'] text-white text-lg md:text-2xl font-bold">
                  {occ.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-12 md:py-16 px-4 bg-[#8B0000]">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Stay in the loop
          </p>
          <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-white font-bold mb-3">
            Join Our Saree Family
          </h2>
          <p className="text-white/60 text-sm mb-7">
            Exclusive offers, new arrivals and styling tips — straight to your inbox.
          </p>
          <form
            onSubmit={handleNewsletter}
            className="flex rounded-full overflow-hidden shadow-xl max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 text-sm outline-none text-gray-800"
              required
            />
            <button
              type="submit"
              className="bg-[#1a0000] text-white px-6 py-3.5 font-bold text-sm whitespace-nowrap hover:bg-black transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0d0000] text-white px-5 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">

          <div className="col-span-2 md:col-span-1">
            <img src="/logo.png" alt="Sudarshana Sarees" className="h-14 w-auto mb-4" />
            <p className="text-white/45 text-xs leading-relaxed mb-5">
              Finest handpicked sarees from India's master weavers. Quality and
              elegance at your doorstep.
            </p>
            <div className="flex gap-2">
              {["📘","📸","🐦","▶️"].map((ic, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C9A84C] hover:text-[#1a0000] flex items-center justify-center text-xs transition-all"
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#C9A84C] font-bold text-xs tracking-widest uppercase mb-5">
              Navigate
            </h4>
            <div className="flex flex-col gap-3">
              {[
                {l:"Home",    to:"/"},
                {l:"Collection",to:"/"},
                {l:"Cart",    to:"/cart"},
                {l:"Login",   to:"/login"},
                {l:"Sign Up", to:"/signup"},
              ].map((lk, i) => (
                <Link key={i} to={lk.to}
                  className="text-white/45 text-xs hover:text-[#C9A84C] transition-colors">
                  {lk.l}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#C9A84C] font-bold text-xs tracking-widest uppercase mb-5">
              Categories
            </h4>
            <div className="flex flex-col gap-3">
              {["Silk","Banarasi","Cotton","Designer","Bridal","Handloom"].map((c,i)=>(
                <button key={i}
                  onClick={() => { setActiveCategory(c); window.scrollTo({top:0,behavior:"smooth"}); }}
                  className="text-white/45 text-xs hover:text-[#C9A84C] transition-colors text-left">
                  {c} Sarees
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#C9A84C] font-bold text-xs tracking-widest uppercase mb-5">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              {[
                {ic:"📍", t:"Varanasi, UP, India"},
                {ic:"📞", t:"+91 79059 07624"},
                {ic:"📧", t:"hello@sudarshanasarees.com"},
                {ic:"🕐", t:"Mon–Sat: 9AM–8PM"},
              ].map((item,i)=>(
                <div key={i} className="flex items-start gap-2 text-white/45 text-xs">
                  <span className="flex-shrink-0">{item.ic}</span>
                  <span>{item.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-white/25 text-xs">
            &copy; 2025 Sudarshana Sarees. All rights reserved.
          </p>
          <p className="text-white/25 text-xs">Made with ❤️ in India</p>
        </div>
      </footer>

      {/* ════════════════════════════════════════════
          FLOATING WHATSAPP CTA
      ════════════════════════════════════════════ */}
      
        <a href="https://wa.me/917905907624?text=Hi! I'm interested in your saree collection."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-4 z-50 flex items-center gap-2.5 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200"
        style={{ boxShadow: "0 8px 32px rgba(37,211,102,0.45)" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="text-sm font-bold">Chat with us</span>
      </a>

    </div>
  );
};

export default Home;