import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Al-Fassi",
    role: "Food Blogger, Casablanca",
    text: "Little Mamma is not just a restaurant, it is a love letter to Italian cuisine. The burrata alone is worth the trip — creamy, delicate, and perfectly paired with their estate olive oil.",
    rating: 5,
    initials: "SA",
  },
  {
    name: "Mehdi Bennani",
    role: "Business Executive, Rabat",
    text: "I have dined at restaurants across Milan and Rome. Little Mamma holds its own with the best of them. The wood-fired pizza crust is absolutely perfect — blistered, chewy, and full of flavor.",
    rating: 5,
    initials: "MB",
  },
  {
    name: "Clara Martinez",
    role: "Travel Writer, Barcelona",
    text: "The ambiance is magical. Candlelit tables, jazz in the background, and the most attentive service I have experienced in Morocco. This is where romance meets gastronomy.",
    rating: 5,
    initials: "CM",
  },
  {
    name: "Youssef Idrissi",
    role: "Architect, Marrakech",
    text: "As an Italian food enthusiast, I am always skeptical of 'authentic' Italian abroad. Little Mamma exceeded every expectation. The handmade pasta is simply divine.",
    rating: 5,
    initials: "YI",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    if (index === active || fading) return;
    setFading(true);
    setTimeout(() => {
      setActive(index);
      setFading(false);
    }, 280);
  };

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((active + 1) % testimonials.length);

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      goTo((active + 1) % testimonials.length);
    }, 7000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [active]);

  // Reveal on scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = section.querySelector<HTMLElement>(".testimonial-wrap");
            if (el) {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const t = testimonials[active];

  return (
    <section
      ref={sectionRef}
      className="py-28 lg:py-44 bg-[#2A2A2A] relative overflow-hidden"
    >
      {/* Decorative large quote mark */}
      <div
        aria-hidden="true"
        className="absolute top-16 left-8 opacity-[0.04] select-none pointer-events-none"
        style={{ fontFamily: "'Playfair Display', serif", fontSize: "20rem", lineHeight: 1, color: "#FAF7F2" }}
      >
        "
      </div>

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(229,57,53,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C7A46C] mb-4">
            Guest Stories
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[#FAF7F2]">
            Voices of Little Mamma
          </h2>
        </div>

        {/* Testimonial card wrapper — revealed by IntersectionObserver */}
        <div
          className="testimonial-wrap"
          style={{
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div
            className="relative rounded-2xl p-8 lg:p-12 border border-[#EFE7DC]/15"
            style={{
              background: "rgba(248,244,239,0.04)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 32px 64px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Content — fades out/in on change */}
            <div
              style={{
                opacity: fading ? 0 : 1,
                transform: fading ? "translateY(6px)" : "translateY(0)",
                transition: "opacity 0.28s ease-out, transform 0.28s ease-out",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-[#E53935] fill-[#E53935]" aria-hidden="true" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-cormorant text-xl lg:text-2xl text-[#FAF7F2] leading-relaxed mb-8 italic">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-[#E53935] flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-body text-sm font-semibold text-[#FAF7F2]">{t.initials}</span>
                </div>
                <div>
                  <p className="font-display text-sm text-[#FAF7F2]">{t.name}</p>
                  <p className="font-body text-xs text-[#EFE7DC]/70 mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-7 px-1">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#EFE7DC]/25 flex items-center justify-center text-[#FAF7F2] hover:bg-[#E53935] hover:border-[#E53935] transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={17} />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-400 ${
                    i === active ? "w-5 h-1.5 bg-[#E53935]" : "w-1.5 h-1.5 bg-[#EFE7DC]/30 hover:bg-[#EFE7DC]/60"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === active ? "true" : undefined}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#EFE7DC]/25 flex items-center justify-center text-[#FAF7F2] hover:bg-[#E53935] hover:border-[#E53935] transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
