import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import CascadeLink from "@/components/CascadeLink";
import { Menu, X, MessageSquare, LayoutDashboard, LogOut, User } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = useCallback((id: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, []);

  const navLinks = [
    { label: "Philosophy", target: "about" },
    { label: "Menu", target: "menu" },
    { label: "Ambiance", target: "gallery" },
    { label: "Reserve", target: "reservation" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#FAF7F2]/92 backdrop-blur-xl shadow-sm border-b border-[#EFE7DC]/25"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-baseline gap-1.5 hover:opacity-90 transition-opacity duration-300"
            aria-label="Little Mamma — home"
          >
            <span className="font-script text-3xl lg:text-4xl text-[#E53935] leading-none" style={{ lineHeight: 1 }}>Little</span>
            <span className="font-brand text-xl lg:text-2xl tracking-wider text-[#2A2A2A]" style={{ lineHeight: 1 }}>Mamma</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <button
                key={link.target}
                role="listitem"
                onClick={() => scrollTo(link.target)}
                className="text-[10px] tracking-[0.18em] uppercase text-[#2A2A2A] hover:text-[#E53935] transition-colors duration-300"
              >
                <CascadeLink text={link.label} />
              </button>
            ))}
            <Link
              to="/messages"
              className="text-[10px] tracking-[0.18em] uppercase text-[#2A2A2A] hover:text-[#E53935] transition-colors duration-300"
            >
              <CascadeLink text="Board" />
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-5">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <button
                    onClick={() => navigate("/admin")}
                    className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase text-[#2A2A2A] hover:text-[#E53935] transition-colors duration-300"
                  >
                    <LayoutDashboard size={13} />
                    <CascadeLink text="Dashboard" />
                  </button>
                )}
                <div className="flex items-center gap-2 text-[10px] text-[#6B6560] font-body">
                  <User size={13} />
                  <span className="max-w-[80px] truncate tracking-wider">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase text-[#C62828] hover:text-[#E53935] transition-colors duration-300"
                >
                  <LogOut size={13} />
                  <span>Exit</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-[10px] tracking-[0.18em] uppercase px-6 py-2.5 bg-[#2A2A2A] text-[#FAF7F2] rounded-full hover:bg-[#E53935] hover:-translate-y-0.5 transition-all duration-400 shadow-md shadow-[#2A2A2A]/15"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#2A2A2A] hover:text-[#E53935] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span
              className="transition-all duration-300"
              style={{ transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu — CSS height animation */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: mobileOpen ? "600px" : "0px",
          opacity: mobileOpen ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div className="bg-[#FAF7F2]/98 backdrop-blur-xl border-t border-[#EFE7DC]/20 px-6 pt-2 pb-8">
          <div className="space-y-0.5 mb-4">
            {navLinks.map((link, i) => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className="block w-full text-left font-body text-[11px] tracking-[0.2em] uppercase text-[#2A2A2A] py-3.5 border-b border-[#EFE7DC]/20 hover:text-[#E53935] hover:pl-1 transition-all duration-300"
                style={{
                  transitionDelay: mobileOpen ? `${i * 50}ms` : "0ms",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateX(0)" : "translateX(-8px)",
                }}
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/messages"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 font-body text-[11px] tracking-[0.2em] uppercase text-[#2A2A2A] py-3.5 border-b border-[#EFE7DC]/20 hover:text-[#E53935] transition-colors"
            >
              <MessageSquare size={14} />
              Message Board
            </Link>
            {isAdmin && (
              <button
                onClick={() => { navigate("/admin"); setMobileOpen(false); }}
                className="flex items-center gap-2 font-body text-[11px] tracking-[0.2em] uppercase text-[#2A2A2A] py-3.5 border-b border-[#EFE7DC]/20 hover:text-[#E53935] transition-colors w-full text-left"
              >
                <LayoutDashboard size={14} />
                Dashboard
              </button>
            )}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-[10px] text-[#6B6560]">
                <User size={13} />
                <span className="tracking-wider">{user?.name}</span>
              </div>
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="flex items-center gap-1.5 font-body text-[11px] tracking-[0.15em] uppercase text-[#C62828] hover:text-[#E53935] transition-colors"
              >
                <LogOut size={13} />
                Exit
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="block text-center font-body text-[11px] tracking-[0.2em] uppercase px-6 py-3.5 bg-[#2A2A2A] text-[#FAF7F2] rounded-full mt-4 hover:bg-[#E53935] transition-colors duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
