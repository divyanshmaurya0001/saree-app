import { useEffect, useState } from "react";

const messages = [
  "🔥 Priya from Mumbai just bought Banarasi Silk Saree",
  "⚡ 12 people viewing this collection right now",
  "🛍️ Rekha from Delhi just bought Kanjivaram Silk",
  "🔥 Only 3 left in Peacock Blue Georgette",
  "⚡ Anita from Bangalore just bought Bridal Lehenga Saree",
  "🛍️ 45 orders placed in the last 24 hours",
  "🔥 Sunita from Chennai just bought Cotton Handloom",
  "⚡ Free shipping on your next order above ₹999",
];

const UrgencyBar = () => {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % messages.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1a0000] text-white py-2.5 px-4 text-center overflow-hidden">
      <p
        className="text-xs md:text-sm font-medium tracking-wide transition-all duration-400"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-8px)",
        }}
      >
        {messages[current]}
      </p>
    </div>
  );
};

export default UrgencyBar;