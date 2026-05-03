import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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
    toast.success(`${product.name} added to cart! 🛒`);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div style={styles.centered}>
        <div style={styles.loader}>
          <p style={styles.loadingText}>✨ Loading Sarees...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <p style={styles.heroTag}>✨ New Collection 2025</p>
          <h1 style={styles.heroTitle}>
            Elegance in Every Thread
          </h1>
          <p style={styles.heroSubtitle}>
            Discover our handpicked collection of premium sarees —
            crafted for the modern Indian woman
          </p>
          <div style={styles.heroButtons}>
            <a href="#collection" style={styles.shopNowBtn}>
              Shop Now →
            </a>
          </div>
        </div>
        <div style={styles.heroPattern}>🪷</div>
      </div>

      {/* Features Bar */}
      <div style={styles.featuresBar}>
        <div style={styles.feature}>
          <span style={styles.featureIcon}>🚚</span>
          <span>Free Shipping above ₹999</span>
        </div>
        <div style={styles.feature}>
          <span style={styles.featureIcon}>💎</span>
          <span>Premium Quality</span>
        </div>
        <div style={styles.feature}>
          <span style={styles.featureIcon}>🔄</span>
          <span>Easy Returns</span>
        </div>
        <div style={styles.feature}>
          <span style={styles.featureIcon}>🔒</span>
          <span>Secure Payment</span>
        </div>
      </div>

      {/* Collection Section */}
      <div style={styles.section} id="collection">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Our Collection</h2>
          <p style={styles.sectionSubtitle}>
            Handpicked sarees for every occasion
          </p>
        </div>

        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search sarees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {filtered.length === 0 ? (
          <div style={styles.centered}>
            <div style={styles.emptyBox}>
              <p style={styles.emptyIcon}>🛍️</p>
              <h3 style={styles.emptyTitle}>
                {search ? "No sarees found!" : "No products yet!"}
              </h3>
              <p style={styles.emptySubtitle}>
                {search
                  ? "Try a different search term"
                  : "Check back soon for new arrivals"}
              </p>
            </div>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((product) => (
              <div
                key={product.id}
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(139,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 12px rgba(0,0,0,0.08)";
                }}
              >
                <div style={styles.imageContainer}>
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={
                        product.images?.[0] ||
                        "https://via.placeholder.com/300x400?text=Saree"
                      }
                      alt={product.name}
                      style={styles.image}
                    />
                  </Link>
                  <div style={styles.imageOverlay}>
                    <Link
                      to={`/product/${product.id}`}
                      style={styles.quickView}
                    >
                      Quick View
                    </Link>
                  </div>
                </div>

                <div style={styles.cardBody}>
                  <Link
                    to={`/product/${product.id}`}
                    style={styles.productLink}
                  >
                    <h3 style={styles.productName}>{product.name}</h3>
                  </Link>
                  <p style={styles.description}>
                    {product.description?.slice(0, 65)}...
                  </p>
                  <div style={styles.priceRow}>
                    <p style={styles.price}>₹{product.price}</p>
                    <span style={styles.inStock}>✓ In Stock</span>
                  </div>
                  <div style={styles.buttonGroup}>
                    <Link
                      to={`/product/${product.id}`}
                      style={styles.viewBtn}
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      style={styles.cartBtn}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Banner */}
      <div style={styles.footerBanner}>
        <h2 style={styles.footerBannerTitle}>
          🙏 Crafted with Love, Delivered with Care
        </h2>
        <p style={styles.footerBannerText}>
          Each saree is handpicked by our experts to ensure the finest quality
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#FFF8F0",
  },
  hero: {
    background: "linear-gradient(135deg, #8B0000 0%, #6B0000 60%, #4a0000 100%)",
    color: "white",
    padding: "5rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    maxWidth: "600px",
    zIndex: 1,
  },
  heroTag: {
    backgroundColor: "rgba(255,215,0,0.2)",
    color: "#FFD700",
    display: "inline-block",
    padding: "0.3rem 1rem",
    borderRadius: "20px",
    fontSize: "0.9rem",
    marginBottom: "1rem",
    fontWeight: "600",
    border: "1px solid rgba(255,215,0,0.3)",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "1rem",
    fontFamily: "'Playfair Display', serif",
    lineHeight: 1.2,
  },
  heroSubtitle: {
    fontSize: "1.1rem",
    opacity: 0.85,
    marginBottom: "2rem",
    lineHeight: 1.7,
  },
  heroButtons: {
    display: "flex",
    gap: "1rem",
  },
  shopNowBtn: {
    backgroundColor: "#FFD700",
    color: "#8B0000",
    padding: "0.9rem 2.5rem",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "1rem",
    display: "inline-block",
  },
  heroPattern: {
    fontSize: "12rem",
    opacity: 0.1,
    position: "absolute",
    right: "5%",
    top: "50%",
    transform: "translateY(-50%)",
  },
  featuresBar: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-around",
    padding: "1.2rem 2rem",
    flexWrap: "wrap",
    gap: "1rem",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#555",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  featureIcon: {
    fontSize: "1.2rem",
  },
  section: {
    padding: "3rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "2.2rem",
    color: "#8B0000",
    fontFamily: "'Playfair Display', serif",
    marginBottom: "0.5rem",
  },
  sectionSubtitle: {
    color: "#888",
    fontSize: "1rem",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "30px",
    padding: "0.7rem 1.5rem",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginBottom: "2rem",
    maxWidth: "500px",
    margin: "0 auto 2rem",
    gap: "0.5rem",
    border: "1px solid #eee",
  },
  searchIcon: {
    fontSize: "1.1rem",
  },
  searchInput: {
    border: "none",
    outline: "none",
    fontSize: "1rem",
    width: "100%",
    backgroundColor: "transparent",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1.8rem",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  imageContainer: {
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.3s ease",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(139,0,0,0.85)",
    padding: "0.8rem",
    display: "flex",
    justifyContent: "center",
    transform: "translateY(100%)",
    transition: "transform 0.3s ease",
  },
  quickView: {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  cardBody: {
    padding: "1.2rem",
  },
  productLink: {
    textDecoration: "none",
  },
  productName: {
    color: "#8B0000",
    fontSize: "1.05rem",
    marginBottom: "0.4rem",
    fontFamily: "'Playfair Display', serif",
  },
  description: {
    color: "#888",
    fontSize: "0.85rem",
    marginBottom: "0.8rem",
    lineHeight: 1.5,
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  price: {
    color: "#333",
    fontWeight: "700",
    fontSize: "1.3rem",
  },
  inStock: {
    color: "green",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  buttonGroup: {
    display: "flex",
    gap: "0.5rem",
  },
  viewBtn: {
    flex: 1,
    padding: "0.6rem",
    backgroundColor: "transparent",
    border: "1.5px solid #8B0000",
    color: "#8B0000",
    borderRadius: "8px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  cartBtn: {
    flex: 1,
    padding: "0.6rem",
    backgroundColor: "#8B0000",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "600",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "40vh",
  },
  loader: {
    textAlign: "center",
  },
  loadingText: {
    fontSize: "1.5rem",
    color: "#8B0000",
  },
  emptyBox: {
    textAlign: "center",
    padding: "3rem",
  },
  emptyIcon: {
    fontSize: "4rem",
    marginBottom: "1rem",
  },
  emptyTitle: {
    color: "#8B0000",
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    fontFamily: "'Playfair Display', serif",
  },
  emptySubtitle: {
    color: "#888",
    fontSize: "1rem",
  },
  footerBanner: {
    backgroundColor: "#8B0000",
    color: "white",
    textAlign: "center",
    padding: "3rem 2rem",
    marginTop: "2rem",
  },
  footerBannerTitle: {
    fontSize: "1.8rem",
    marginBottom: "0.8rem",
    fontFamily: "'Playfair Display', serif",
  },
  footerBannerText: {
    opacity: 0.85,
    fontSize: "1rem",
  },
};

export default Home;