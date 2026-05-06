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
      toast.success("Welcome to Sudarshana Sarees!");
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

  const strength =
    password.length === 0
      ? 0
      : password.length < 6
      ? 1
      : password.length < 10
      ? 2
      : 3;

  const strengthColor = ["bg-gray-200", "bg-red-400", "bg-yellow-400", "bg-green-500"][strength];
  const strengthText = ["", "Weak", "Medium", "Strong"][strength];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#8B0000] via-[#6B0000] to-[#2a0000] flex-col justify-center px-16 relative overflow-hidden">
        <div className="relative z-10">
          <img src="/logo.png" alt="Sudarshana Sarees" className="h-24 w-auto mb-10" />
          <h2 className="font-['Playfair_Display'] text-4xl text-white font-bold mb-4 leading-tight">
            Begin Your <br />
            <span className="text-[#C9A84C]">Saree Journey</span>
          </h2>
          <p className="text-white/70 text-base leading-relaxed mb-10 max-w-sm">
            Create your free account and explore thousands of handpicked premium sarees.
          </p>
          <div className="flex flex-col gap-4">
            {[
              "Access exclusive collections",
              "Track your orders easily",
              "Get member only discounts",
              "Easy returns and refunds",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#C9A84C] flex items-center justify-center text-[#5a0000] text-xs font-bold flex-shrink-0">
                  ✓
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full border border-white/10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full border border-white/10 translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <img src="/logo.png" alt="Sudarshana Sarees" className="h-20 w-auto" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
            <h2 className="font-['Playfair_Display'] text-2xl text-gray-800 font-bold mb-1">
              Create Your Account
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Already have an account?{" "}
              <Link to="/login" className="text-[#8B0000] font-bold hover:underline">
                Login here
              </Link>
            </p>

            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 bg-gray-50 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 bg-gray-50 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Password</label>
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 focus-within:border-[#8B0000] focus-within:ring-2 focus-within:ring-[#8B0000]/10 transition-all overflow-hidden">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 px-4 py-3 text-sm outline-none bg-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-4 text-gray-400"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {password.length > 0 && (
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${strengthColor}`}
                        style={{ width: `${(strength / 3) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{strengthText}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 bg-gray-50 transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#8B0000] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide hover:bg-[#5a0000] transition-all disabled:opacity-70 mt-2"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-xs text-gray-400">
                By signing up you agree to our{" "}
                <span className="text-[#8B0000] cursor-pointer">Terms of Service</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;