import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    addToCart(product);
    toast.success("Added to cart!");
    setTimeout(() => setAdding(false), 1000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const stockLeft = product.stock || Math.floor(Math.random() * 8) + 2;
  const isLowStock = stockLeft <= 5;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/400x533?text=Saree"}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount && (
            <span className="bg-[#8B0000] text-white text-xs font-bold px-2.5 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {index < 3 && !discount && (
            <span className="bg-[#C9A84C] text-[#1a0000] text-xs font-bold px-2.5 py-1 rounded-full">
              NEW
            </span>
          )}
        </div>

        {/* Stock urgency */}
        {isLowStock && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Only {stockLeft} left!
          </div>
        )}

        {/* Quick Add — Desktop hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#8B0000] text-white py-3.5 text-sm font-bold tracking-wide hover:bg-[#5a0000] transition-colors"
          >
            {adding ? "Added ✓" : "Quick Add to Cart"}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-['Playfair_Display'] text-gray-900 text-sm md:text-base font-semibold leading-snug line-clamp-2 group-hover:text-[#8B0000] transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mt-auto pt-2">
          <span className="text-gray-900 font-bold text-base md:text-lg">
            ₹{product.price?.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through">
              ₹{product.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>

        {/* Mobile Add Button */}
        <button
          onClick={handleAddToCart}
          className="mt-2 md:hidden w-full bg-[#8B0000] text-white py-2.5 rounded-xl text-xs font-bold"
        >
          {adding ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;