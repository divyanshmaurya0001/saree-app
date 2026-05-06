const BrandStory = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-[#1a0000] text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
        <span className="text-[30rem] leading-none">🪷</span>
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          Our Story
        </p>
        <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Woven with Love,<br />
          <span className="text-[#C9A84C]">Delivered with Pride</span>
        </h2>
        <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
          Sudarshana Sarees was born from a deep love for India's rich textile 
          heritage. We bridge the gap between master weavers in Varanasi, 
          Kanchipuram and Dharmavaram — and women across the country who 
          cherish the art of wearing a saree.
        </p>
        <p className="text-white/70 text-sm md:text-base leading-relaxed mb-10">
          Every saree in our collection tells a story — of skilled hands, 
          generations of craft, and the timeless beauty of Indian tradition. 
          When you wear Sudarshana, you wear a piece of India's soul.
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { number: "500+", label: "Sarees in Collection" },
            { number: "50+", label: "Master Weavers" },
            { number: "10K+", label: "Happy Customers" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#C9A84C]">
                {stat.number}
              </div>
              <div className="text-white/60 text-xs md:text-sm mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStory;