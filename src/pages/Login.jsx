import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back! 🙏");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password!");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {/* Left Side — Decorative */}
      <div style={styles.leftPanel}>
        <div style={styles.leftContent}>
          <p style={styles.leftTag}>✨ Welcome Back</p>
          <h2 style={styles.leftTitle}>
            Your Style,<br />Your Saree
          </h2>
          <p style={styles.leftSubtitle}>
            Login to explore our exclusive collection of handpicked sarees
          </p>
          <div style={styles.features}>
            <div style={styles.featureItem}>
              <span>🚚</span>
              <span>Free Shipping above ₹999</span>
            </div>
            <div style={styles.featureItem}>
              <span>💎</span>
              <span>Premium Quality Sarees</span>
            </div>
            <div style={styles.featureItem}>
              <span>🔄</span>
              <span>Easy 7-day Returns</span>
            </div>
          </div>
        </div>
        <div style={styles.decorativeCircle1} />
        <div style={styles.decorativeCircle2} />
      </div>

      {/* Right Side — Form */}
      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <div style={styles.logoArea}>
            <span style={styles.logoEmoji}>🛍️</span>
            <h1 style={styles.logoText}>Sudarshana Sarees</h1>
          </div>

          <h2 style={styles.title}>Login to Your Account</h2>
          <p style={styles.subtitle}>
            Don't have an account?{" "}
            <Link to="/signup" style={styles.link}>
              Sign Up Free
            </Link>
          </p>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>📧 Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>🔒 Password</label>
              <div style={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.passwordInput}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeBtn}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              style={styles.button}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
  },
  leftPanel: {
    flex: 1,
    background: "linear-gradient(135deg, #8B0000 0%, #6B0000 60%, #4a0000 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem",
    position: "relative",
    overflow: "hidden",
  },
  leftContent: {
    color: "white",
    zIndex: 1,
    maxWidth: "400px",
  },
  leftTag: {
    backgroundColor: "rgba(255,215,0,0.2)",
    color: "#FFD700",
    display: "inline-block",
    padding: "0.3rem 1rem",
    borderRadius: "20px",
    fontSize: "0.9rem",
    marginBottom: "1.5rem",
    fontWeight: "600",
    border: "1px solid rgba(255,215,0,0.3)",
  },
  leftTitle: {
    fontSize: "3rem",
    fontWeight: "700",
    fontFamily: "'Playfair Display', serif",
    lineHeight: 1.2,
    marginBottom: "1rem",
  },
  leftSubtitle: {
    fontSize: "1rem",
    opacity: 0.85,
    lineHeight: 1.7,
    marginBottom: "2rem",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    fontSize: "0.95rem",
    opacity: 0.9,
  },
  decorativeCircle1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.1)",
    top: "-100px",
    right: "-100px",
  },
  decorativeCircle2: {
    position: "absolute",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.1)",
    bottom: "-50px",
    left: "-50px",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "#FFF8F0",
  },
  card: {
    backgroundColor: "white",
    padding: "2.5rem",
    borderRadius: "20px",
    boxShadow: "0 4px 30px rgba(0,0,0,0.08)",
    width: "100%",
    maxWidth: "420px",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "2rem",
  },
  logoEmoji: {
    fontSize: "1.8rem",
  },
  logoText: {
    color: "#8B0000",
    fontSize: "1.1rem",
    fontFamily: "'Playfair Display', serif",
    fontWeight: "700",
  },
  title: {
    color: "#333",
    fontSize: "1.6rem",
    marginBottom: "0.5rem",
    fontFamily: "'Playfair Display', serif",
  },
  subtitle: {
    color: "#888",
    fontSize: "0.9rem",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.3rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    color: "#555",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  input: {
    padding: "0.9rem 1rem",
    borderRadius: "10px",
    border: "1.5px solid #eee",
    fontSize: "1rem",
    outline: "none",
    backgroundColor: "#FAFAFA",
    transition: "border-color 0.2s",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    border: "1.5px solid #eee",
    borderRadius: "10px",
    backgroundColor: "#FAFAFA",
    overflow: "hidden",
  },
  passwordInput: {
    flex: 1,
    padding: "0.9rem 1rem",
    border: "none",
    fontSize: "1rem",
    outline: "none",
    backgroundColor: "transparent",
  },
  eyeBtn: {
    backgroundColor: "transparent",
    border: "none",
    padding: "0.9rem",
    cursor: "pointer",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#8B0000",
    color: "white",
    padding: "1rem",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "700",
    marginTop: "0.5rem",
    letterSpacing: "0.5px",
  },
  link: {
    color: "#8B0000",
    fontWeight: "700",
    textDecoration: "none",
  },
};

export default Login;