import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          toast.error("Product not found!");
          navigate("/");
        }
      } catch (error) {
        toast.error("Failed to load product!");
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div style={styles.centered}>
        <p style={styles.loadingText}>Loading product... 🛍️</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        ← Back
      </button>

      <div style={styles.productContainer}>
        {/* Images Section */}
        <div style={styles.imagesSection}>
          <img
            src={
              product.images?.[selectedImage] ||
              "https://via.placeholder.com/500x600?text=Saree"
            }
            alt={product.name}
            style={styles.mainImage}
          />
          {product.images?.length > 1 && (
            <div style={styles.thumbnails}>
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`view ${index + 1}`}
                  style={{
                    ...styles.thumbnail,
                    border:
                      selectedImage === index
                        ? "2px solid #8B0000"
                        : "2px solid transparent",
                  }}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div style={styles.detailsSection}>
          <h1 style={styles.productName}>{product.name}</h1>
          <p style={styles.price}>₹{product.price}</p>
          <div style={styles.divider} />
          <h3 style={styles.descTitle}>Description</h3>
          <p style={styles.description}>{product.description}</p>
          <div style={styles.divider} />
          <div style={styles.buttonGroup}>
            <button onClick={handleAddToCart} style={styles.cartBtn}>
              🛒 Add to Cart
            </button>
            <button
              onClick={() => {
                handleAddToCart();
                navigate("/cart");
              }}
              style={styles.buyBtn}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#FFF8F0",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  backBtn: {
    backgroundColor: "transparent",
    border: "1px solid #8B0000",
    color: "#8B0000",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    marginBottom: "2rem",
  },
  productContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "3rem",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
  },
  imagesSection: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  mainImage: {
    width: "100%",
    height: "500px",
    objectFit: "contain",
    borderRadius: "8px",
    backgroundColor: "#FFF8F0",
    padding: "0.5rem",
  },
  thumbnail: {
    width: "80px",
    height: "90px",
    objectFit: "contain",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#FFF8F0",
    padding: "2px",
  },
  thumbnail: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "6px",
    cursor: "pointer",
  },
  detailsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  productName: {
    fontSize: "2rem",
    color: "#8B0000",
    marginBottom: "0.5rem",
  },
  price: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    height: "1px",
    backgroundColor: "#eee",
    margin: "0.5rem 0",
  },
  descTitle: {
    color: "#444",
    fontSize: "1.1rem",
  },
  description: {
    color: "#666",
    lineHeight: "1.7",
    fontSize: "1rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
  cartBtn: {
    flex: 1,
    padding: "1rem",
    backgroundColor: "transparent",
    border: "2px solid #8B0000",
    color: "#8B0000",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  buyBtn: {
    flex: 1,
    padding: "1rem",
    backgroundColor: "#8B0000",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  centered: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
  },
  loadingText: {
    fontSize: "1.5rem",
    color: "#8B0000",
  },
};

export default ProductDetail;