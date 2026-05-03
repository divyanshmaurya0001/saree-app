import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    setLoading(true);
    try {
      await signup(email, password, name);
      toast.success("Welcome to Sudarshana Sarees! 🎉");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use!");
      } else {
        toast.error("Failed to create account!");
      }
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {/* Left Side — Decorative */}
      <div style={styles.leftPanel}>
        <div style={styles.leftContent}>
          <p style={styles.leftTag}>🎉 Join Us Today</p>
          <h2 style={styles.leftTitle}>
            Begin Your<br />Saree Journey
          </h2>
          <p style={styles.leftSubtitle}>
            Create your free account and explore thousands
            of handpicked premium sarees
          </p>
          <div style={styles.benefits}>
            <div style={styles.benefitItem}>
              <span style={styles.benefitIcon}>✓</span>
              <span>Access exclusive collections</span>
            </div>
            <div style={styles.benefitItem}>
              <span style={styles.benefitIcon}>✓</span>
              <span>Track your orders easily</span>
            </div>
            <div style={styles.benefitItem}>
              <span style={styles.benefitIcon}>✓</span>
              <span>Save items to wishlist</span>
            </div>
            <div style={styles.benefitItem}>
              <span style={styles.benefitIcon}>✓</span>
              <span>Get exclusive member discounts</span>
            </div>
          </div>
        </div>
        <div style={styles.decorativeCircle1} />
        <div style={styles.decorativeCircle2} />
        <div style={styles.decorativeText}>🪷</div>
      </div>

      {/* Right Side — Form */}
      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <div style={styles.logoArea}>
            <span style={styles.logoEmoji}>🛍️</span>
            <h1 style={styles.logoText}>Sudarshana Sarees</h1>
          </div>

          <h2 style={styles.title}>Create Your Account</h2>
          <p style={styles.subtitle}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Login here
            </Link>
          </p>

          <form onSubmit={handleSignup} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>👤 Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                required
              />
            </div>

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
                  placeholder="Minimum 6 characters"
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

            <div style={styles.inputGroup}>
              <label style={styles.label}>🔒 Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            {/* Password strength indicator */}
            {password.length > 0 && (
              <div style={styles.strengthBar}>
                <div
                  style={{
                    ...styles.strengthFill,
                    width:
                      password.length < 6
                        ? "30%"
                        : password.length < 10
                        ? "60%"
                        : "100%",
                    backgroundColor:
                      password.length < 6
                        ? "#ff4444"
                        : password.length < 10
                        ? "#FFD700"
                        : "green",
                  }}
                />
                <span style={styles.strengthText}>
                  {password.length < 6
                    ? "Weak"
                    : password.length < 10
                    ? "Medium"
                    : "Strong"}{" "}
                  password
                </span>
              </div>
            )}

            <button
              type="submit"
              style={styles.button}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>

            <p style={styles.terms}>
              By signing up you agree to our{" "}
              <span style={styles.termsLink}>Terms of Service</span> and{" "}
              <span style={styles.termsLink}>Privacy Policy</span>
            </p>
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
    background:
      "linear-gradient(135deg, #8B0000 0%, #6B0000 60%, #4a0000 100%)",
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
  benefits: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  benefitItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
    fontSize: "0.95rem",
    opacity: 0.9,
  },
  benefitIcon: {
    backgroundColor: "#FFD700",
    color: "#8B0000",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: "bold",
    flexShrink: 0,
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
  decorativeText: {
    position: "absolute",
    fontSize: "10rem",
    opacity: 0.07,
    bottom: "5%",
    right: "5%",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "#FFF8F0",
    overflowY: "auto",
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
    marginBottom: "1.5rem",
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
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.1rem",
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
  strengthBar: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  strengthFill: {
    height: "4px",
    borderRadius: "4px",
    transition: "all 0.3s ease",
  },
  strengthText: {
    fontSize: "0.8rem",
    color: "#888",
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
    letterSpacing: "0.5px",
  },
  terms: {
    fontSize: "0.8rem",
    color: "#aaa",
    textAlign: "center",
    lineHeight: 1.6,
  },
  termsLink: {
    color: "#8B0000",
    cursor: "pointer",
    fontWeight: "600",
  },
  link: {
    color: "#8B0000",
    fontWeight: "700",
    textDecoration: "none",
  },
};

export default Signup;