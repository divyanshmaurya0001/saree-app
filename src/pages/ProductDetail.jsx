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
  const [quantity, setQuantity] = useState(1);

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
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#8B0000] text-xl font-['Playfair_Display']">
          Loading...
        </p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <button onClick={() => navigate("/")} className="hover:text-[#8B0000] transition-colors">
            Home
          </button>
          <span>/</span>
          <span className="text-[#8B0000] font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* Images Section */}
          <div className="flex-1">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden bg-gray-50 mb-4">
              <img
                src={
                  product.images?.[selectedImage] ||
                  "https://via.placeholder.com/600x700?text=Saree"
                }
                alt={product.name}
                className="w-full h-[400px] md:h-[550px] object-contain"
              />
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-[#8B0000]"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl text-gray-900 font-bold mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#8B0000]">
                  ₹{product.price?.toLocaleString()}
                </span>
                <span className="text-green-600 text-sm font-semibold bg-green-50 px-3 py-1 rounded-full">
                  ✓ In Stock
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-bold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 text-lg font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-500 text-sm">
                  Total: ₹{(product.price * quantity)?.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 border-2 border-[#8B0000] text-[#8B0000] py-3.5 rounded-xl font-bold text-sm hover:bg-[#8B0000] hover:text-white transition-all"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  handleAddToCart();
                  navigate("/cart");
                }}
                className="flex-1 bg-[#8B0000] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#5a0000] transition-all"
              >
                Buy Now
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[
                { icon: "🚚", text: "Free Shipping above ₹999" },
                { icon: "🔄", text: "Easy 7-Day Returns" },
                { icon: "🔒", text: "Secure Checkout" },
                { icon: "💎", text: "Premium Quality" },
              ].map((badge, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 text-xs text-gray-600"
                >
                  <span className="text-base">{badge.icon}</span>
                  <span className="font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;