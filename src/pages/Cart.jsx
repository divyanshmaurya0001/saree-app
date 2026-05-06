import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  const navigate = useNavigate();

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.success(`${name} removed!`);
  };

  const shipping = totalPrice >= 999 ? 0 : 99;
  const finalTotal = totalPrice + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-28 h-28 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">🛒</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-2xl text-[#8B0000] mb-3">
            Your Cart is Empty!
          </h2>
          <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">
            Looks like you haven't added any sarees yet. Explore our beautiful collection!
          </p>
          <Link
            to="/"
            className="bg-[#8B0000] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#5a0000] transition-all inline-block"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#8B0000] font-bold">
              Shopping Cart
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {cartItems.length} item(s) in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-600 text-sm font-medium border border-red-200 hover:border-red-400 px-4 py-2 rounded-lg transition-all"
          >
            Clear All
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm"
              >
                <img
                  src={item.images?.[0] || "https://via.placeholder.com/100x120?text=Saree"}
                  alt={item.name}
                  className="w-24 h-28 md:w-28 md:h-32 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-['Playfair_Display'] text-[#8B0000] font-semibold text-base mb-1 truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-xs mb-3">
                    ₹{item.price?.toLocaleString()} per piece
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <span className="font-bold text-gray-900 text-base">
                    ₹{(item.price * item.quantity)?.toLocaleString()}
                  </span>
                  <Link
                    to={`/product/${item.id}`}
                    className="text-[#8B0000] text-xs underline"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-80 flex flex-col gap-4">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="font-['Playfair_Display'] text-lg text-[#8B0000] font-bold mb-5">
                Order Summary
              </h2>

              {/* Items */}
              <div className="flex flex-col gap-2 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs text-gray-500">
                    <span className="truncate max-w-[160px]">
                      {item.name} x{item.quantity}
                    </span>
                    <span>₹{(item.price * item.quantity)?.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gray-100 mb-4" />

              <div className="flex flex-col gap-3 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-semibold" : ""}>
                    {shipping === 0 ? "FREE 🎉" : `₹${shipping}`}
                  </span>
                </div>
              </div>

              {/* Shipping progress */}
              {totalPrice < 999 && (
                <div className="bg-orange-50 rounded-xl p-3 mb-4">
                  <p className="text-xs text-orange-700 mb-1.5">
                    Add ₹{999 - totalPrice} more for FREE shipping!
                  </p>
                  <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-400 rounded-full transition-all"
                      style={{ width: `${(totalPrice / 999) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {totalPrice >= 999 && (
                <div className="bg-green-50 rounded-xl p-3 mb-4 text-center text-green-700 text-xs font-semibold">
                  🎉 You got FREE shipping!
                </div>
              )}

              <div className="h-px bg-gray-100 mb-4" />

              <div className="flex justify-between font-bold text-base text-gray-900 mb-5">
                <span>Total</span>
                <span className="text-[#8B0000]">₹{finalTotal?.toLocaleString()}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#8B0000] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#5a0000] transition-all mb-3"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/"
                className="block text-center text-[#8B0000] text-sm font-medium hover:underline"
              >
                Continue Shopping
              </Link>

              {/* Trust badges */}
              <div className="flex justify-center gap-4 mt-5 pt-4 border-t border-gray-100">
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  🔒 Secure
                </span>
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  🚚 Fast Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;