const reviews = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "Absolutely stunning quality! The Banarasi silk I ordered exceeded my expectations. The fabric is so rich and the zari work is impeccable. Got so many compliments at my sister's wedding!",
    avatar: "P",
    color: "bg-[#8B0000]",
    tag: "Banarasi Silk",
  },
  {
    name: "Rekha Devi",
    location: "Delhi",
    rating: 5,
    text: "I was skeptical about buying sarees online but Sudarshana changed that completely. The packaging was beautiful and the saree looked even better in person. Will order again!",
    avatar: "R",
    color: "bg-[#C9A84C]",
    tag: "Kanjivaram Silk",
  },
  {
    name: "Anitha Rao",
    location: "Bangalore",
    rating: 5,
    text: "The cotton handloom saree is perfect for daily wear. Lightweight, breathable and the colors are vibrant even after multiple washes. Great value for money!",
    avatar: "A",
    color: "bg-[#4a0060]",
    tag: "Cotton Handloom",
  },
  {
    name: "Sunita Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Ordered for my daughter's engagement ceremony. The bridal saree was absolutely gorgeous! Customer service was excellent and delivery was on time.",
    avatar: "S",
    color: "bg-[#006040]",
    tag: "Bridal Collection",
  },
];

const ReviewSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Customer Love
          </p>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a0000] font-bold mb-3">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {"★★★★★".split("").map((s, i) => (
                <span key={i} className="text-[#C9A84C] text-xl">★</span>
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              4.9/5 from 2,400+ reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-[#fdf8f3] rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {"★★★★★".split("").map((s, j) => (
                  <span key={j} className="text-[#C9A84C] text-base">★</span>
                ))}
              </div>

              {/* Tag */}
              <span className="inline-block bg-[#8B0000]/10 text-[#8B0000] text-xs font-semibold px-3 py-1 rounded-full w-fit">
                {review.tag}
              </span>

              {/* Review text */}
              <p className="text-gray-600 text-sm leading-relaxed italic">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className={`${review.color} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-base flex-shrink-0`}>
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {review.name}
                  </p>
                  <p className="text-gray-400 text-xs">
                    📍 {review.location} • Verified Buyer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;