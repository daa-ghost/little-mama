import { useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const galleryImages = [
  { src: "/images/ambiance.jpg",    alt: "Restaurant interior",  span: "col-span-2 row-span-2" },
  { src: "/images/pizza.jpg",       alt: "Pizza Napoletana",     span: "col-span-1 row-span-1" },
  { src: "/images/dinner-table.jpg",alt: "Romantic dinner",      span: "col-span-1 row-span-2" },
  { src: "/images/burrata.jpg",     alt: "Burrata Fresca",       span: "col-span-1 row-span-1" },
  { src: "/images/wine.jpg",        alt: "Italian wine",         span: "col-span-1 row-span-1" },
  { src: "/images/risotto.jpg",     alt: "Risotto alla Milanese",span: "col-span-1 row-span-1" },
  { src: "/images/pasta.jpg",       alt: "Fresh pasta",          span: "col-span-1 row-span-1" },
  { src: "/images/dessert.jpg",     alt: "Tiramisu Classico",    span: "col-span-2 row-span-1" },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = section.querySelectorAll<HTMLElement>(".gallery-item");
            items.forEach((item, i) => {
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "scale(1)";
              }, i * 70);
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

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightbox === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((prev) => prev !== null ? (prev + 1) % galleryImages.length : null);
      if (e.key === "ArrowLeft") setLightbox((prev) => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null);
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const next = () => setLightbox((p) => p !== null ? (p + 1) % galleryImages.length : null);
  const prev = () => setLightbox((p) => p !== null ? (p - 1 + galleryImages.length) % galleryImages.length : null);

  return (
    <>
      <section id="gallery" ref={sectionRef} className="py-28 lg:py-44 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C7A46C] mb-4">
              Visual Journey
            </p>
            <div className="flex items-center justify-center gap-4 mb-5" aria-hidden="true">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#EFE7DC]/70" />
              <svg width="8" height="8" viewBox="0 0 10 10" fill="#C7A46C" aria-hidden="true">
                <polygon points="5,0 6.2,3.8 10,3.8 7,6.2 8.1,10 5,7.8 1.9,10 3,6.2 0,3.8 3.8,3.8" />
              </svg>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#EFE7DC]/70" />
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-[#2A2A2A] mb-4">
              The Ambiance
            </h2>
            <p className="font-body text-sm text-[#6B6560] max-w-md mx-auto leading-relaxed">
              A glimpse into the Little Mamma experience — where every detail is curated for an
              unforgettable evening.
            </p>
          </div>

          {/* Mosaic grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 lg:gap-3 auto-rows-[180px] md:auto-rows-[210px] lg:auto-rows-[240px]">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className={`gallery-item group relative overflow-hidden rounded-xl cursor-pointer opacity-0 scale-[0.96] focus-visible:ring-2 focus-visible:ring-[#E53935] ${img.span}`}
                style={{
                  transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms`,
                }}
                aria-label={`View ${img.alt} in fullscreen`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#2A2A2A]/0 group-hover:bg-[#2A2A2A]/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <div className="w-10 h-10 rounded-full bg-[#FAF7F2]/90 flex items-center justify-center shadow-lg">
                    <ZoomIn size={16} className="text-[#2A2A2A]" aria-hidden="true" />
                  </div>
                </div>
                {/* Alt text caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-[#2A2A2A]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <p className="font-body text-[10px] tracking-wider text-[#FAF7F2]/90 uppercase">{img.alt}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${galleryImages[lightbox].alt}`}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#1A1A1A]/95 backdrop-blur-sm" />

          {/* Close button */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#E53935] transition-colors"
            aria-label="Close lightbox"
          >
            <X size={18} />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 font-body text-[11px] tracking-[0.3em] uppercase text-white/50">
            {lightbox + 1} / {galleryImages.length}
          </div>

          {/* Prev / Next */}
          <button
            className="absolute left-4 lg:left-8 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#E53935] transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="absolute right-4 lg:right-8 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#E53935] transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
          >
            <ChevronRight size={22} />
          </button>

          {/* Image */}
          <div
            className="relative z-10 max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              style={{ animation: "fadeIn 0.35s ease-out" }}
            />
            <p className="absolute -bottom-8 left-0 right-0 text-center font-body text-[11px] tracking-[0.25em] uppercase text-white/50">
              {galleryImages[lightbox].alt}
            </p>
          </div>

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className={`rounded-full transition-all duration-300 ${i === lightbox ? "w-5 h-1.5 bg-[#E53935]" : "w-1.5 h-1.5 bg-white/30"}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
