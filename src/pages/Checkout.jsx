import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const shipping = totalPrice >= 999 ? 0 : 99;
  const finalTotal = totalPrice + shipping;

  const [form, setForm] = useState({
    fullName: "",
    email: currentUser?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "orders"), {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        items: cartItems,
        totalPrice: finalTotal,
        shippingAddress: form,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
      clearCart();
      toast.success("Order placed successfully! 🎉");
      navigate("/");
    } catch (error) {
      toast.error("Failed to place order!");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#8B0000] font-bold mb-8">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Shipping Form */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <h2 className="font-['Playfair_Display'] text-lg text-gray-800 font-bold mb-6">
                Shipping Details
              </h2>
              <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-600">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={form.fullName}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 bg-gray-50 transition-all"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-600">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 bg-gray-50 transition-all"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={form.phone}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 bg-gray-50 transition-all"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-600">Full Address</label>
                  <textarea
                    name="address"
                    placeholder="House no, Street, Area"
                    value={form.address}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 bg-gray-50 transition-all resize-none h-20"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-600">City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={form.city}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 bg-gray-50 transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-600">State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={form.state}
                      onChange={handleChange}
                      className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 bg-gray-50 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-600">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    className="px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B0000] focus:ring-2 focus:ring-[#8B0000]/10 bg-gray-50 transition-all"
                    required
                  />
                </div>

                <div className="bg-[#8B0000]/5 border border-[#8B0000]/20 rounded-xl p-4 text-center">
                  <p className="text-[#8B0000] text-sm font-medium">
                    💳 Online payment coming soon via Razorpay
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#8B0000] text-white py-4 rounded-xl font-bold text-base hover:bg-[#5a0000] transition-all disabled:opacity-70 mt-2"
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="font-['Playfair_Display'] text-lg text-[#8B0000] font-bold mb-5">
                Order Summary
              </h2>

              <div className="flex flex-col gap-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.images?.[0] || "https://via.placeholder.com/60?text=S"}
                      alt={item.name}
                      className="w-12 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-900 flex-shrink-0">
                      ₹{(item.price * item.quantity)?.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-100 mb-4" />

              <div className="flex flex-col gap-2.5 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
              </div>

              <div className="h-px bg-gray-100 mb-4" />

              <div className="flex justify-between font-bold text-base text-gray-900">
                <span>Total</span>
                <span className="text-[#8B0000]">₹{finalTotal?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;