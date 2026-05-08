import { useEffect, useRef } from "react";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";

const locations = [
  {
    city: "Casablanca",
    address: "128 Boulevard d'Anfa, Casablanca 20000",
    hours: "Mon – Sun: 12:00 PM – 11:00 PM",
    phone: "+212 522 43 21 00",
    image: "/images/ambiance.jpg",
  },
  {
    city: "Marrakech",
    address: "45 Rue Yves Saint Laurent, Gueliz",
    hours: "Mon – Sun: 12:00 PM – 11:30 PM",
    phone: "+212 524 43 21 00",
    image: "/images/dinner-table.jpg",
  },
  {
    city: "Rabat",
    address: "22 Avenue Mohammed VI, Hassan",
    hours: "Mon – Sun: 12:00 PM – 10:30 PM",
    phone: "+212 537 73 21 00",
    image: "/images/ingredients.jpg",
  },
  {
    city: "Tangier",
    address: "8 Rue de la Plage, Malabata",
    hours: "Mon – Sun: 1:00 PM – 11:00 PM",
    phone: "+212 539 94 21 00",
    image: "/images/wine.jpg",
  },
];

export default function Locations() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = section.querySelectorAll<HTMLElement>(".location-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, i * 120);
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

  return (
    <section ref={sectionRef} className="py-28 lg:py-44 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C7A46C] mb-4">
            Find Us
          </p>
          <div className="flex items-center justify-center gap-4 mb-5" aria-hidden="true">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#EFE7DC]/70" />
            <svg width="8" height="8" viewBox="0 0 10 10" fill="#C7A46C" aria-hidden="true">
              <polygon points="5,0 6.2,3.8 10,3.8 7,6.2 8.1,10 5,7.8 1.9,10 3,6.2 0,3.8 3.8,3.8" />
            </svg>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#EFE7DC]/70" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#2A2A2A] mb-4">
            Our Locations
          </h2>
          <p className="font-body text-sm text-[#6B6560] max-w-lg mx-auto leading-relaxed">
            Four beautiful restaurants across Morocco, each offering the same dedication to
            authentic Italian cuisine.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="location-card group rounded-2xl overflow-hidden border border-[#EFE7DC]/25 bg-white hover:border-[#E53935]/30 transition-all duration-500 opacity-0 translate-y-5"
              style={{
                transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms, box-shadow 0.4s, border-color 0.4s`,
                boxShadow: "0 2px 16px rgba(42,42,42,0.05)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(42,42,42,0.14)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(42,42,42,0.05)"; }}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={loc.image}
                  alt={`Little Mamma ${loc.city}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/65 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <h3 className="font-display text-2xl text-[#FAF7F2]">{loc.city}</h3>
                </div>
              </div>
              <div className="p-5 lg:p-6">
                <ul className="space-y-3 mb-5">
                  <li className="flex items-start gap-3">
                    <MapPin size={15} className="text-[#E53935] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <p className="font-body text-sm text-[#2A2A2A]">{loc.address}</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock size={15} className="text-[#E53935] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <p className="font-body text-sm text-[#6B6560]">{loc.hours}</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone size={15} className="text-[#E53935] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="font-body text-sm text-[#6B6560] hover:text-[#E53935] transition-colors">
                      {loc.phone}
                    </a>
                  </li>
                </ul>
                <button
                  onClick={() => {
                    const el = document.getElementById("reservation");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 font-body text-[10px] tracking-[0.18em] uppercase text-[#E53935] hover:text-[#2A2A2A] transition-colors group/btn"
                >
                  Reserve a Table
                  <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
