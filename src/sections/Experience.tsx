import { useEffect, useRef } from "react";
import { Flame, Wheat, Wine, Music, ChefHat, Clock } from "lucide-react";

const experiences = [
  {
    icon: Flame,
    title: "Wood-Fired Cooking",
    desc: "Our traditional brick oven imported from Naples reaches 485°C, creating the perfect char on every pizza in just 90 seconds.",
  },
  {
    icon: Wheat,
    title: "Imported Italian Flour",
    desc: "Tipo 00 flour from Campania, combined with our 48-hour cold fermentation process for the perfect dough texture.",
  },
  {
    icon: Wine,
    title: "Curated Wine Selection",
    desc: "Over 200 labels from Italy's finest regions — from Barolo to Etna Rosso — expertly paired with every course.",
  },
  {
    icon: Music,
    title: "Live Jazz Evenings",
    desc: "Every Thursday through Saturday, enjoy smooth jazz performances while savoring your authentic Italian dinner.",
  },
  {
    icon: ChefHat,
    title: "Master Chef Team",
    desc: "Head Chef Marco Bellini brings 25 years of experience from Michelin-starred kitchens in Rome and Florence.",
  },
  {
    icon: Clock,
    title: "Open Kitchen Experience",
    desc: "Watch our artisans at work. The open kitchen design lets you witness the magic of Italian cooking firsthand.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = section.querySelectorAll<HTMLElement>(".exp-item");
            items.forEach((item, i) => {
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
              }, i * 90);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 lg:py-44 bg-[#2A2A2A] relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 opacity-[0.07]">
        <img
          src={`${import.meta.env.BASE_URL}images/ingredients.jpg`}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Ambient gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 80% 50%, rgba(229,57,53,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header row */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div>
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C7A46C] mb-5">
              The Experience
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#FAF7F2] mb-6 leading-tight">
              More Than
              <br />
              <em className="italic text-[#EFE7DC]">a Meal</em>
            </h2>
            <p className="font-body text-sm text-[#EFE7DC]/75 leading-relaxed max-w-md">
              Dining at Little Mamma is an immersive journey. From the moment you step through our
              doors, the aromas of wood-fired pizza, fresh basil, and aged Parmesan transport you to
              a family trattoria in the heart of Tuscany.
            </p>
          </div>

          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}images/oven.jpg`}
              alt="Wood-fired oven at 485°C"
              className="rounded-2xl shadow-2xl w-full h-64 lg:h-auto object-cover"
              loading="lazy"
              style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.4)" }}
            />
            <div className="absolute -bottom-5 -left-4 bg-[#E53935] text-[#FAF7F2] px-5 py-4 rounded-xl shadow-xl shadow-[#E53935]/30">
              <p className="font-display text-2xl font-bold leading-none">485°C</p>
              <p className="font-body text-[9px] tracking-widest uppercase mt-0.5 opacity-90">Oven Temperature</p>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="exp-item group p-6 rounded-2xl border border-[#EFE7DC]/12 bg-white/[0.04] hover:bg-white/[0.07] hover:border-[#E53935]/30 transition-all duration-500 opacity-0 translate-y-5 cursor-default"
              style={{
                transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1), background 0.4s, border-color 0.4s`,
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="w-11 h-11 rounded-xl bg-[#E53935]/15 flex items-center justify-center mb-4 group-hover:bg-[#E53935] transition-all duration-400">
                <exp.icon
                  size={20}
                  className="text-[#E53935] group-hover:text-[#FAF7F2] transition-colors duration-300"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-display text-base text-[#FAF7F2] mb-2">{exp.title}</h3>
              <p className="font-body text-xs text-[#EFE7DC]/65 leading-relaxed">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
