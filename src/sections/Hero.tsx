import { useEffect, useRef, useCallback } from "react";
import { ArrowRight, Calendar } from "lucide-react";

interface Star {
  x: number;
  y: number;
  element: SVGGElement;
  baseX: number;
  baseY: number;
}

export default function Hero() {
  const starContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const starsRef = useRef<Star[]>([]);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const shootingStarTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const createStar = useCallback((width: number, height: number) => {
    const container = starContainerRef.current;
    if (!container) return;

    const radius = Math.random() * 1.5 + 0.5;
    const colors = ["#EFE7DC", "#E53935", "#C62828", "#C7A46C", "#D4C4B0"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const rotation = Math.random() * 360;
    const duration = Math.random() * 4 + 3;
    const x = Math.random() * width;
    const y = Math.random() * height;

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "0");
    circle.setAttribute("cy", "0");
    circle.setAttribute("r", radius.toString());
    circle.setAttribute("fill", color);
    circle.setAttribute("opacity", (Math.random() * 0.5 + 0.2).toString());

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", `translate(${x}, ${y}) rotate(${rotation})`);
    (g as HTMLElement).style.animation = `twinkle ${duration}s ease-in-out infinite alternate`;
    (g as HTMLElement).style.animationDelay = `${Math.random() * 5}s`;
    g.appendChild(circle);

    container.appendChild(g);
    starsRef.current.push({ x, y, element: g, baseX: x, baseY: y });
  }, []);

  const animateShootingStar = useCallback((path: SVGPathElement) => {
    let progress = 0;
    const render = () => {
      progress += 0.012;
      const totalLength = path.getTotalLength();
      path.style.strokeDasharray = totalLength.toString();
      path.style.strokeDashoffset = (totalLength * (1 - progress)).toString();
      if (progress < 0.2) {
        path.style.opacity = (progress * 5).toString();
      } else if (progress > 0.7) {
        path.style.opacity = ((1 - progress) * 3.3).toString();
      } else {
        path.style.opacity = "1";
      }
      if (progress < 1) {
        requestAnimationFrame(render);
      } else {
        path.remove();
      }
    };
    requestAnimationFrame(render);
  }, []);

  const launchShootingStar = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const startX = Math.random() * width;
    const startY = Math.random() * (height * 0.3);
    const length = Math.random() * 350 + 200;
    const angle = (Math.random() * 20 + 25) * (Math.PI / 180);
    const endX = startX - Math.cos(angle) * length;
    const endY = startY + Math.sin(angle) * length;
    const midX = (startX + endX) / 2 + (Math.random() * 80 - 40);
    const midY = (startY + endY) / 2 + (Math.random() * 80 - 40);
    const pathData = `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("class", "shooting-star-path");
    path.setAttribute("d", pathData);
    svg.appendChild(path);
    animateShootingStar(path);

    shootingStarTimerRef.current = setTimeout(launchShootingStar, Math.random() * 6000 + 4000);
  }, [animateShootingStar]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const starCount = Math.min(120, Math.floor((width * height) / 10000));

    const container = starContainerRef.current;
    if (!container) return;

    const filterHtml = `<svg style="position:absolute;width:0;height:0;" aria-hidden="true"><defs><filter id="soft-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/><feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -6" result="goo"/><feBlend in="SourceGraphic" in2="goo"/></filter></defs></svg>`;
    container.insertAdjacentHTML("afterbegin", filterHtml);

    for (let i = 0; i < starCount; i++) {
      createStar(width, height);
    }

    const onMouseMove = (e: MouseEvent) => {
      lastMouseRef.current.x = e.clientX;
      lastMouseRef.current.y = e.clientY;
      starsRef.current.forEach((star) => {
        const dx = star.x - e.clientX;
        const dy = star.y - e.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          const angle = Math.atan2(dy, dx);
          const force = (120 - distance) / 120;
          star.element.style.transform = `translate(${star.x + Math.cos(angle) * force * 12}px, ${star.y + Math.sin(angle) * force * 12}px) scale(${1 + force * 0.6})`;
        } else {
          star.element.style.transform = `translate(${star.x}px, ${star.y}px)`;
        }
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    shootingStarTimerRef.current = setTimeout(launchShootingStar, 2500);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (shootingStarTimerRef.current !== null) clearTimeout(shootingStarTimerRef.current);
      starsRef.current = [];
    };
  }, [createStar, launchShootingStar]);

  const scrollToMenu = () => {
    const el = document.getElementById("menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToReservation = () => {
    const el = document.getElementById("reservation");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 120% 90% at 50% 70%, #EFE7DC 0%, #F5EFE6 25%, #FAF7F2 60%, #FFFFFF 100%)",
      }}
    >
      <style>{`
        @keyframes twinkle {
          0%   { transform: scale(0.7); opacity: 0.2; }
          50%  { transform: scale(1.3); opacity: 0.8; }
          100% { transform: scale(0.7); opacity: 0.2; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes floatScroll {
          0%, 100% { transform: translateX(-50%) translateY(0);   }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
        .star { position: absolute; will-change: transform, opacity; }
        .shooting-star-svg {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none; z-index: 2;
        }
        .shooting-star-path {
          fill: none; stroke: #E53935; stroke-width: 1.5;
          stroke-linecap: round; opacity: 0;
          filter: drop-shadow(0 0 5px rgba(229,57,53,0.9));
        }
        .scroll-indicator {
          animation: floatScroll 3s ease-in-out infinite;
        }
      `}</style>

      {/* Ambient warm glow — bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 50% 110%, rgba(229,57,53,0.28) 0%, rgba(229,57,53,0.08) 45%, transparent 72%)",
        }}
      />

      {/* Subtle vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(42,42,42,0.08) 100%)",
        }}
      />

      {/* Grain texture overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          mixBlendMode: "multiply",
        }}
      />

      {/* Star canvas */}
      <div ref={starContainerRef} className="absolute inset-0 z-0 pointer-events-none" />
      {/* Shooting star SVG — no viewBox so JS pixel coords map 1:1 */}
      <svg ref={svgRef} className="shooting-star-svg" aria-hidden="true" />

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <p
          className="font-body text-[10px] tracking-[0.45em] uppercase text-[#6B6560] mb-5 opacity-0"
          style={{ animation: "fadeIn 1s cubic-bezier(0.22,1,0.36,1) 0.35s forwards" }}
        >
          Italian Cuisine Made With Love&nbsp;&nbsp;✦
        </p>

        {/* Ornamental rule */}
        <div
          className="flex items-center justify-center gap-4 mb-7 opacity-0"
          aria-hidden="true"
          style={{ animation: "fadeIn 1s cubic-bezier(0.22,1,0.36,1) 0.55s forwards" }}
        >
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#E53935]/50" />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="#C7A46C" aria-hidden="true">
            <polygon points="5,0 6.2,3.8 10,3.8 7,6.2 8.1,10 5,7.8 1.9,10 3,6.2 0,3.8 3.8,3.8" />
          </svg>
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#E53935]/50" />
        </div>

        {/* Main headline */}
        <h1
          className="font-display leading-[0.88] text-[#2A2A2A] mb-8 opacity-0"
          style={{
            fontSize: "clamp(4.5rem,15vw,11rem)",
            animation: "fadeIn 1.1s cubic-bezier(0.22,1,0.36,1) 0.7s forwards",
          }}
        >
          Little
          <br />
          <em className="italic">Mamma</em>
        </h1>

        {/* Subtitle */}
        <p
          className="font-cormorant text-lg md:text-xl lg:text-2xl text-[#6B6560] max-w-md mx-auto mb-12 leading-relaxed italic tracking-wide opacity-0"
          style={{ animation: "fadeIn 1s cubic-bezier(0.22,1,0.36,1) 1s forwards" }}
        >
          A taste of Italy in the heart of Morocco.<br />
          Crafted with passion. Served with love.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
          style={{ animation: "fadeIn 1s cubic-bezier(0.22,1,0.36,1) 1.3s forwards" }}
        >
          <button
            onClick={scrollToMenu}
            className="group flex items-center gap-3 px-9 py-4 bg-[#2A2A2A] text-[#FAF7F2] rounded-full font-body text-xs tracking-[0.22em] uppercase shadow-xl shadow-[#2A2A2A]/20 hover:bg-[#E53935] hover:shadow-[#E53935]/25 hover:-translate-y-0.5 transition-all duration-500"
          >
            Explore Menu
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={scrollToReservation}
            className="group flex items-center gap-3 px-9 py-4 border border-[#2A2A2A]/35 text-[#2A2A2A] rounded-full font-body text-xs tracking-[0.22em] uppercase hover:border-[#E53935] hover:text-[#E53935] hover:-translate-y-0.5 transition-all duration-500 backdrop-blur-sm"
          >
            <Calendar size={13} />
            Reserve a Table
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0"
        style={{ animation: "fadeIn 1s ease-out 2s forwards" }}
        aria-hidden="true"
      >
        <span className="font-body text-[9px] tracking-[0.4em] uppercase text-[#6B6560]/55">
          Scroll
        </span>
        <div className="w-px h-11 bg-gradient-to-b from-[#6B6560]/45 to-transparent" />
      </div>
    </section>
  );
}

