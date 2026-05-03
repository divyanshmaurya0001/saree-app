import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const categories = [
  "All", "Silk", "Banarasi", "Cotton", "Designer", "Bridal", "Handloom", "Georgette", "Chiffon"
];

const occasions = [
  { name: "Wedding", bg: "linear-gradient(135deg, #8B0000, #4a0000)" },
  { name: "Festival", bg: "linear-gradient(135deg, #C9A84C, #8B6914)" },
  { name: "Party", bg: "linear-gradient(135deg, #4a0060, #2a0040)" },
  { name: "Casual", bg: "linear-gradient(135deg, #006040, #003020)" },
  { name: "Office", bg: "linear-gradient(135deg, #003060, #001830)" },
  { name: "Puja", bg: "linear-gradient(135deg, #8B4000, #4a2000)" },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const { addToCart } = useCart();

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
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "All" ||
      p.name.toLowerCase().includes(activeCategory.toLowerCase()) ||
      p.description?.toLowerCase().includes(activeCategory.toLowerCase());
    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <div className="loading-screen">
        <p style={{ fontSize: "3rem" }}>🛍️</p>
        <p className="loading-text">Loading collection...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--cream)" }}>

      {/* ===== HERO ===== */}
      <div className="hero">
        <div className="hero-content">
          <p className="hero-tag">New Collection 2025</p>
          <h1 className="hero-title">
            Elegance Woven in<br />
            <span>Every Thread</span>
          </h1>
          <p className="hero-subtitle">
            Discover our handpicked collection of premium sarees —
            crafted for the modern Indian woman.
          </p>
          <div className="hero-buttons">
            <a href="#collection" className="hero-btn-primary">
              Shop Now
            </a>
            <a href="#occasions" className="hero-btn-secondary">
              Browse Occasions
            </a>
          </div>
        </div>
        <div className="hero-decoration">&#127799;</div>
      </div>

      {/* ===== FEATURES BAR ===== */}
      <div className="features-bar">
        {[
          { icon: "🚚", text: "Free Shipping above ₹999" },
          { icon: "💎", text: "Premium Quality" },
          { icon: "🔄", text: "Easy 7-Day Returns" },
          { icon: "🔒", text: "Secure Payments" },
          { icon: "📞", text: "24/7 Support" },
        ].map((f, i) => (
          <div className="feature-item" key={i}>
            <div className="feature-icon">{f.icon}</div>
            <span>{f.text}</span>
          </div>
        ))}
      </div>

      {/* ===== PRODUCTS COLLECTION ===== */}
      <div
        style={{ backgroundColor: "var(--cream-dark)" }}
        id="collection"
      >
        <div className="section">
          <div className="section-header">
            <p className="section-tag">Handpicked For You</p>
            <h2 className="section-title">Our Collection</h2>
            <p className="section-subtitle">
              Each saree is carefully selected for quality and beauty
            </p>
          </div>

          {/* Category Pills */}
          <div className="categories-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search sarees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  color: "var(--text-light)",
                }}
              >
                &#10005;
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filtered.length === 0 ? (
            <div className="empty-state">
              <p className="empty-icon">🛍️</p>
              <h3 className="empty-title">
                {search ? "No sarees found!" : "No products yet!"}
              </h3>
              <p className="empty-subtitle">
                {search
                  ? "Try a different search term"
                  : "Check back soon for new arrivals"}
              </p>
              {(search || activeCategory !== "All") && (
                <button
                  onClick={() => { setSearch(""); setActiveCategory("All"); }}
                  style={{
                    marginTop: "1rem",
                    background: "var(--primary)",
                    color: "white",
                    border: "none",
                    padding: "0.7rem 2rem",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map((product, index) => (
                <div className="product-card" key={product.id}>
                  {index < 4 && (
                    <div className="product-badge">New</div>
                  )}
                  <div className="product-image-wrap">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={
                          product.images?.[0] ||
                          "https://via.placeholder.com/300x400?text=Saree"
                        }
                        alt={product.name}
                        className="product-image"
                      />
                    </Link>
                    <div className="product-overlay">
                      <Link
                        to={`/product/${product.id}`}
                        className="overlay-btn overlay-btn-view"
                      >
                        Quick View
                      </Link>
                      <button
                        className="overlay-btn overlay-btn-cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="product-body">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="product-name">{product.name}</h3>
                    </Link>
                    <p className="product-desc">
                      {product.description?.slice(0, 65)}...
                    </p>
                    <div className="product-price-row">
                      <span className="product-price">
                        &#8377;{product.price?.toLocaleString()}
                      </span>
                      <span className="product-in-stock">&#10003; In Stock</span>
                    </div>
                    <div className="product-buttons">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn-view"
                      >
                        View Details
                      </Link>
                      <button
                        className="btn-cart"
                        onClick={() => handleAddToCart(product)}
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
      <div className="section" id="occasions">
        <div className="section-header">
          <p className="section-tag">Shop By Occasion</p>
          <h2 className="section-title">What is the Occasion?</h2>
          <p className="section-subtitle">
            We have the perfect saree for every moment
          </p>
        </div>
        <div className="occasions-grid">
          {occasions.map((occ, i) => (
            <div
              className="occasion-card"
              key={i}
              onClick={() => {
                setActiveCategory("All");
                setSearch(occ.name);
                document.getElementById("collection")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <div
                className="occasion-bg"
                style={{ background: occ.bg }}
              >
                <span className="occasion-name">{occ.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== NEWSLETTER ===== */}
      <div className="newsletter-section">
        <h2 className="newsletter-title">Join Our Saree Family</h2>
        <p className="newsletter-subtitle">
          Subscribe for exclusive offers, new arrivals and styling tips
        </p>
        <form className="newsletter-form" onSubmit={handleNewsletter}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="newsletter-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="newsletter-btn">
            Subscribe
          </button>
        </form>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">Sudarshana Sarees</div>
            <p className="footer-brand-desc">
              Bringing you the finest handpicked sarees from across India.
              Quality, trust and elegance — delivered to your doorstep.
            </p>
            <div className="footer-social">
              {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                <button key={i} className="footer-social-btn">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Quick Links</div>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/" className="footer-link">Collections</Link>
              <Link to="/cart" className="footer-link">Cart</Link>
              <Link to="/login" className="footer-link">Login</Link>
              <Link to="/signup" className="footer-link">Sign Up</Link>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Categories</div>
            <div className="footer-links">
              {categories.filter(c => c !== "All").map((cat, i) => (
                <span
                  key={i}
                  className="footer-link"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setActiveCategory(cat);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {cat} Sarees
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Contact Us</div>
            <div className="footer-contact-item">
              <span>&#128205;</span>
              <span>Varanasi, Uttar Pradesh, India</span>
            </div>
            <div className="footer-contact-item">
              <span>&#128222;</span>
              <span>+91 79059 07624</span>
            </div>
            <div className="footer-contact-item">
              <span>&#128231;</span>
              <span>hello@sudarshanasarees.com</span>
            </div>
            <div className="footer-contact-item">
              <span>&#9200;</span>
              <span>Mon-Sat: 9AM - 8PM</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2025 Sudarshana Sarees. All rights reserved.
            Made with love in India.
          </p>
        </div>
      </footer>

      {/* ===== WHATSAPP ===== */}
      <a
        href="https://wa.me/917905907624"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        title="Chat with us on WhatsApp"
      >
        &#128172;
      </a>
    </div>
  );
};

export default Home;