import { useEffect, useRef } from "react";
import { Leaf, Heart, Award } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const letters = section.querySelectorAll<HTMLElement>(".about-letter");
            letters.forEach((letter, i) => {
              setTimeout(() => {
                letter.style.transform = "translateY(0)";
                letter.style.filter = "blur(0px)";
                letter.style.opacity = "1";
              }, i * 28);
            });
            const underline = section.querySelector<SVGPathElement>(".about-underline path");
            if (underline) {
              setTimeout(() => {
                underline.style.strokeDashoffset = "0";
              }, 380);
            }
            const cards = section.querySelectorAll<HTMLElement>(".about-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, 550 + i * 140);
            });
            const imgEl = section.querySelector<HTMLElement>(".about-img");
            if (imgEl) {
              imgEl.style.opacity = "1";
              imgEl.style.transform = "translateY(0) scale(1)";
            }
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const headline = "Every plate is a story of heritage";
  const words = headline.split(" ");

  const values = [
    {
      icon: Leaf,
      title: "Fresh Ingredients",
      desc: "Sourced daily from local Moroccan markets and imported directly from Italy",
    },
    {
      icon: Heart,
      title: "Made With Love",
      desc: "Handcrafted recipes passed down through generations of Italian families",
    },
    {
      icon: Award,
      title: "Award Winning",
      desc: "Recognized for excellence in authentic Italian dining across North Africa",
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-28 lg:py-44 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image column */}
          <div className="relative">
            {/* Decorative background shape */}
            <div
              aria-hidden="true"
              className="absolute -top-8 -left-8 w-48 h-48 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(229,57,53,0.08) 0%, transparent 70%)" }}
            />

            <div
              className="about-img relative overflow-hidden rounded-2xl"
              style={{
                opacity: 0,
                transform: "translateY(24px) scale(0.98)",
                transition: "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)",
                boxShadow: "0 40px 80px rgba(42,42,42,0.18), 0 8px 24px rgba(42,42,42,0.10)",
              }}
            >
              <img
                src="/images/chef.jpg"
                alt="Chef preparing fresh pasta at Little Mamma"
                className="w-full h-[400px] lg:h-[580px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/35 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-5 -right-4 lg:-right-8 bg-[#E53935] text-[#FAF7F2] px-5 py-4 rounded-xl shadow-xl shadow-[#E53935]/25"
            >
              <p className="font-display text-2xl font-bold leading-none">25+</p>
              <p className="font-body text-[9px] tracking-widest uppercase mt-0.5 opacity-90">Years of tradition</p>
            </div>
          </div>

          {/* Content column */}
          <div className="lg:pl-4">
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C7A46C] mb-5">
              Our Philosophy
            </p>

            <div className="mb-8 overflow-hidden">
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-[#2A2A2A]">
                {words.map((word, wi) => (
                  <span key={wi} className="inline-block overflow-hidden mr-[0.28em] align-top">
                    {word.split("").map((char, ci) => (
                      <span
                        key={ci}
                        className="about-letter inline-block transition-all"
                        style={{ transform: "translateY(105%)", filter: "blur(6px)", opacity: 0, transitionDuration: "1.1s", transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </h2>
              <svg
                className="about-underline w-full max-w-[380px] h-3 mt-3 overflow-visible"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0,6 Q150,-6 300,6"
                  fill="none"
                  stroke="#E53935"
                  strokeWidth="1.5"
                  strokeDasharray="340"
                  strokeDashoffset="340"
                  style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="font-body text-sm text-[#6B6560] leading-relaxed mb-5">
              At Little Mamma, we believe that food is more than sustenance — it is a celebration of
              culture, tradition, and the joy of sharing. Our kitchen is a bridge between Italy and
              Morocco, where centuries-old Italian recipes meet the warmth of Mediterranean hospitality.
            </p>
            <p className="font-body text-sm text-[#6B6560] leading-relaxed mb-10">
              Each dish is prepared with imported Italian ingredients, from San Marzano tomatoes to
              Parmigiano-Reggiano, combined with fresh local produce. Our wood-fired oven, imported
              from Naples, ensures that every pizza carries the authentic taste of Southern Italy.
            </p>

            <div className="space-y-5">
              {values.map((v, i) => (
                <div
                  key={i}
                  className="about-card flex items-start gap-4 opacity-0 translate-y-5 transition-all duration-700 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#2A2A2A] flex items-center justify-center group-hover:bg-[#E53935] transition-colors duration-300">
                    <v.icon size={17} className="text-[#FAF7F2]" aria-hidden="true" />
                  </div>
                  <div className="border-b border-[#EFE7DC]/30 pb-4 flex-1">
                    <h4 className="font-display text-base text-[#2A2A2A] mb-1">{v.title}</h4>
                    <p className="font-body text-[13px] text-[#6B6560] leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
