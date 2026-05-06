const trusts = [
  {
    icon: "🧵",
    title: "Direct from Weavers",
    desc: "We work directly with master weavers across Varanasi, Kanchipuram and Dharmavaram — no middlemen, pure craft.",
  },
  {
    icon: "✋",
    title: "Handpicked Quality",
    desc: "Every saree is handpicked and quality checked by our experts before it reaches your doorstep.",
  },
  {
    icon: "💚",
    title: "Ethical & Sustainable",
    desc: "Supporting local artisans and their families. Your purchase directly empowers Indian weavers.",
  },
  {
    icon: "🔄",
    title: "Hassle-Free Returns",
    desc: "Not happy? Return within 7 days, no questions asked. We make shopping risk-free for you.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-[#fdf8f3]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a0000] font-bold">
            The Sudarshana Promise
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trusts.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
              style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="font-['Playfair_Display'] text-lg text-[#1a0000] font-bold">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;