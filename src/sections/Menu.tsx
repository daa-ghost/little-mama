import { useEffect, useRef, useState } from "react";
import { Star, ArrowRight } from "lucide-react";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  tags: string[];
  rating: number;
}

const menuItems: MenuItem[] = [
  {
    name: "Pizza Napoletana",
    description: "San Marzano tomatoes, buffalo mozzarella, fresh basil, extra virgin olive oil on a wood-fired crust",
    price: "95 MAD",
    image: `${import.meta.env.BASE_URL}images/pizza.jpg`,
    tags: ["Wood-Fired", "Vegetarian"],
    rating: 4.9,
  },
  {
    name: "Fresh Tagliatelle",
    description: "Handmade egg pasta ribbons with wild mushroom ragù, truffle oil, and aged Parmigiano",
    price: "120 MAD",
    image: `${import.meta.env.BASE_URL}images/pasta.jpg`,
    tags: ["Handmade", "Signature"],
    rating: 4.8,
  },
  {
    name: "Burrata Fresca",
    description: "Puglian burrata with heirloom tomatoes, basil pesto, aged balsamic, and toasted pine nuts",
    price: "85 MAD",
    image: `${import.meta.env.BASE_URL}images/burrata.jpg`,
    tags: ["Fresh", "Appetizer"],
    rating: 5.0,
  },
  {
    name: "Risotto alla Milanese",
    description: "Saffron-infused carnaroli rice with bone marrow, gold leaf, and Grana Padano shavings",
    price: "140 MAD",
    image: `${import.meta.env.BASE_URL}images/risotto.jpg`,
    tags: ["Premium", "Gold Leaf"],
    rating: 4.7,
  },
  {
    name: "Antipasti Mamma",
    description: "Curated selection of Parma ham, burrata, marinated olives, artichokes, and sun-dried tomatoes",
    price: "160 MAD",
    image: `${import.meta.env.BASE_URL}images/antipasti.jpg`,
    tags: ["For Two", "Sharing"],
    rating: 4.9,
  },
  {
    name: "Tiramisu Classico",
    description: "Layered mascarpone cream, espresso-soaked savoiardi, dusted with Valrhona cocoa",
    price: "65 MAD",
    image: `${import.meta.env.BASE_URL}images/dessert.jpg`,
    tags: ["Classic", "Dessert"],
    rating: 4.8,
  },
];

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="menu-card group relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`,
        boxShadow: hovered
          ? "0 24px 60px rgba(42,42,42,0.18), 0 8px 20px rgba(229,57,53,0.12)"
          : "0 4px 20px rgba(42,42,42,0.07)",
        willChange: "transform, opacity",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-[320px] lg:h-[390px] overflow-hidden bg-[#F5EFE6]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: "linear-gradient(to top, rgba(42,42,42,0.95) 0%, rgba(42,42,42,0.45) 45%, transparent 75%)",
            opacity: hovered ? 1 : 0.75,
          }}
        />

        {/* Rating Badge */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1 bg-[#FAF7F2]/92 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/30 shadow-sm">
          <Star size={11} className="text-[#E53935] fill-[#E53935]" aria-hidden="true" />
          <span className="font-body text-[11px] font-semibold text-[#2A2A2A]">{item.rating}</span>
        </div>

        {/* Tags */}
        <div className="absolute top-3.5 left-3.5 flex gap-1.5 flex-wrap max-w-[60%]">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="font-body text-[9px] tracking-widest uppercase bg-[#E53935]/90 backdrop-blur-sm text-[#FAF7F2] px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Content area */}
        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
          <div
            className="transition-all duration-500 ease-out"
            style={{
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              opacity: hovered ? 1 : 0.88,
            }}
          >
            <div className="flex items-end justify-between gap-2 mb-2.5">
              <h3 className="font-display text-lg lg:text-xl text-[#FAF7F2] leading-tight">
                {item.name}
              </h3>
              <span
                className="font-cormorant text-lg font-semibold whitespace-nowrap transition-colors duration-300"
                style={{ color: hovered ? "#EFE7DC" : "#E53935" }}
              >
                {item.price}
              </span>
            </div>
            <p
              className="font-body text-xs text-[#EFE7DC]/85 leading-relaxed transition-all duration-500"
              style={{
                maxHeight: hovered ? "6rem" : "2.5rem",
                overflow: "hidden",
              }}
            >
              {item.description}
            </p>
          </div>
        </div>

        {/* Hover border glow */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 0 1.5px rgba(229,57,53,0.35)",
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}

export default function Menu() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = section.querySelectorAll<HTMLElement>(".menu-card");
            cards.forEach((card) => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollToReservation = () => {
    const el = document.getElementById("reservation");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="menu" ref={sectionRef} className="py-28 lg:py-44 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C7A46C] mb-4">
            Curated Selections
          </p>
          <div className="flex items-center justify-center gap-4 mb-5" aria-hidden="true">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#EFE7DC]/70" />
            <svg width="8" height="8" viewBox="0 0 10 10" fill="#C7A46C" aria-hidden="true">
              <polygon points="5,0 6.2,3.8 10,3.8 7,6.2 8.1,10 5,7.8 1.9,10 3,6.2 0,3.8 3.8,3.8" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#EFE7DC]/70" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#2A2A2A] mb-5">
            Signature Menu
          </h2>
          <p className="font-body text-sm text-[#6B6560] max-w-md mx-auto leading-relaxed">
            Each dish tells a story of Italian craftsmanship, prepared with imported ingredients and
            the passion of our culinary team.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {menuItems.map((item, i) => (
            <MenuCard key={item.name} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center mt-16 gap-4">
          <p className="font-cormorant text-lg italic text-[#6B6560]">
            Experience more — our full menu awaits
          </p>
          <button
            onClick={scrollToReservation}
            className="group inline-flex items-center gap-3 px-10 py-4 bg-[#2A2A2A] text-[#FAF7F2] rounded-full font-body text-xs tracking-[0.22em] uppercase shadow-lg shadow-[#2A2A2A]/15 hover:bg-[#E53935] hover:shadow-[#E53935]/20 hover:-translate-y-0.5 transition-all duration-500"
          >
            Reserve Your Table
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}

