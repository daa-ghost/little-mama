import { useState } from "react";
import { Link } from "react-router";
import { Instagram, Facebook, ArrowRight, CheckCircle } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const quickLinks = [
    { label: "Philosophy", target: "about" },
    { label: "Menu", target: "menu" },
    { label: "Ambiance", target: "gallery" },
    { label: "Reserve", target: "reservation" },
    { label: "Contact", target: "contact" },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#2A2A2A] relative overflow-hidden">
      {/* Kinetic Brand Grid */}
      <div className="relative py-16 lg:py-20 overflow-hidden select-none pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2A2A2A] via-transparent to-[#2A2A2A] z-10" />
        <div className="flex flex-col items-center justify-center" style={{ transform: "scale(1.15)" }}>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex"
              style={{
                flexDirection: rowIndex % 2 === 1 ? "row-reverse" : "row",
                marginLeft: rowIndex % 2 === 1 ? "calc(-13rem + 0.5rem)" : "-13rem",
              }}
            >
              {Array.from({ length: 8 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  className="relative"
                  style={{
                    width: "13rem",
                    height: "4.5rem",
                    marginRight: "-0.5rem",
                    perspective: "40rem",
                  }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center font-brand text-xl text-[#EFE7DC]/10"
                    style={{
                      animation: `rotateX 5s infinite`,
                      animationDelay: `-${(colIndex * 0.5 + rowIndex * 0.7) % 5}s`,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <span className="mr-3 tracking-widest">LITTLE</span>
                    <span className="tracking-widest">MAMMA</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Vertical center brand label */}
        <div className="absolute inset-0 flex items-center justify-center z-20" aria-hidden="false">
          <div className="text-center">
            <p className="flex items-baseline justify-center gap-2">
              <span className="font-script text-[clamp(2.5rem,6vw,5rem)] text-[#E53935]/90" style={{ lineHeight: 1 }}>Little</span>
              <span className="font-brand text-[clamp(2rem,5vw,4rem)] text-[#FAF7F2]/85 tracking-widest" style={{ lineHeight: 1 }}>Mamma</span>
            </p>
            <div className="flex items-center gap-3 justify-center mt-1">
              <div className="h-px w-12 bg-[#E53935]/50" />
              <p className="font-cormorant italic text-[#EFE7DC]/60 text-sm tracking-wide">
                Italian Cuisine Made With Love
              </p>
              <div className="h-px w-12 bg-[#E53935]/50" />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes rotateX {
            0%   { transform: rotateX(0deg); }
            50%  { transform: rotateX(180deg); }
            100% { transform: rotateX(360deg); }
          }
        `}</style>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-[#EFE7DC]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <h3 className="flex items-baseline gap-1.5 mb-3">
                <span className="font-script text-4xl text-[#E53935]" style={{ lineHeight: 1 }}>Little</span>
                <span className="font-brand text-2xl text-[#FAF7F2] tracking-wider" style={{ lineHeight: 1 }}>Mamma</span>
              </h3>
              <p className="font-body text-sm text-[#EFE7DC]/60 leading-relaxed mb-6 max-w-[220px]">
                A taste of Italy in the heart of Morocco. Crafted with love, served with passion.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="w-9 h-9 rounded-full border border-[#EFE7DC]/20 flex items-center justify-center text-[#EFE7DC]/70 hover:bg-[#E53935] hover:border-[#E53935] hover:text-[#FAF7F2] transition-all duration-300"
                >
                  <Instagram size={15} aria-hidden="true" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="w-9 h-9 rounded-full border border-[#EFE7DC]/20 flex items-center justify-center text-[#EFE7DC]/70 hover:bg-[#E53935] hover:border-[#E53935] hover:text-[#FAF7F2] transition-all duration-300"
                >
                  <Facebook size={15} aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-body text-[10px] tracking-[0.3em] uppercase text-[#C7A46C] mb-5">
                Explore
              </h4>
              <ul className="space-y-3" role="list">
                {quickLinks.map((link) => (
                  <li key={link.target}>
                    <button
                      onClick={() => scrollTo(link.target)}
                      className="font-body text-sm text-[#EFE7DC]/60 hover:text-[#FAF7F2] hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5 group"
                    >
                      <span className="w-3 h-px bg-[#E53935]/0 group-hover:bg-[#E53935]/70 transition-all duration-300 flex-shrink-0" aria-hidden="true" />
                      {link.label}
                    </button>
                  </li>
                ))}
                <li>
                  <Link
                    to="/messages"
                    className="font-body text-sm text-[#EFE7DC]/60 hover:text-[#FAF7F2] hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5 group"
                  >
                    <span className="w-3 h-px bg-[#E53935]/0 group-hover:bg-[#E53935]/70 transition-all duration-300 flex-shrink-0" aria-hidden="true" />
                    Message Board
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-body text-[10px] tracking-[0.3em] uppercase text-[#C7A46C] mb-5">
                Contact
              </h4>
              <address className="not-italic space-y-3">
                <p>
                  <a
                    href="mailto:hello@littlemamma.ma"
                    className="font-body text-sm text-[#EFE7DC]/60 hover:text-[#FAF7F2] transition-colors"
                  >
                    hello@littlemamma.ma
                  </a>
                </p>
                <p>
                  <a
                    href="tel:+2125224321000"
                    className="font-body text-sm text-[#EFE7DC]/60 hover:text-[#FAF7F2] transition-colors"
                  >
                    +212 522 43 21 00
                  </a>
                </p>
                <p className="font-body text-sm text-[#EFE7DC]/60 leading-relaxed">
                  128 Boulevard d'Anfa
                  <br />
                  Casablanca, Morocco
                </p>
              </address>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-body text-[10px] tracking-[0.3em] uppercase text-[#C7A46C] mb-5">
                Stay Connected
              </h4>
              <p className="font-body text-sm text-[#EFE7DC]/60 mb-4 leading-relaxed">
                Exclusive offers and seasonal menu announcements delivered to your inbox.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-[#EFE7DC]/70">
                  <CheckCircle size={16} className="text-[#6B6560]" aria-hidden="true" />
                  <p className="font-body text-sm">You're subscribed!</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <label htmlFor="footer-email" className="sr-only">Email address</label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-4 py-2.5 rounded-l-xl bg-[#FAF7F2]/[0.06] border border-[#EFE7DC]/20 border-r-0 font-body text-sm text-[#FAF7F2] placeholder:text-[#EFE7DC]/35 focus:outline-none focus:border-[#E53935] transition-colors min-w-0"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="px-4 py-2.5 bg-[#E53935] rounded-r-xl text-[#FAF7F2] hover:bg-[#B71C1C] transition-colors flex items-center"
                  >
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#EFE7DC]/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-body text-[11px] text-[#EFE7DC]/35">
              &copy; {new Date().getFullYear()} Little Mamma. All rights reserved.
            </p>
            <p className="font-cormorant italic text-[#EFE7DC]/35 text-sm">
              Italian Cuisine Made With Love
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
