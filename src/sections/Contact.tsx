import { useState, useRef, useEffect } from "react";
import { trpc } from "@/providers/trpc";
import { Link } from "react-router";
import { Send, MessageSquare, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    submitContact.mutate(form);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = section.querySelectorAll<HTMLElement>(".contact-reveal");
            items.forEach((item, i) => {
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateY(0)";
              }, i * 120);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const inputClass = "w-full px-4 py-3.5 rounded-xl border border-[#EFE7DC]/50 bg-[#FAF7F2] font-body text-sm text-[#2A2A2A] placeholder:text-[#2A2A2A]/30 focus:outline-none focus:border-[#E53935] focus:ring-2 focus:ring-[#E53935]/10 transition-all duration-300";
  const labelClass = "block font-body text-[10px] tracking-[0.25em] uppercase text-[#6B6560] mb-2";

  return (
    <section id="contact" ref={sectionRef} className="py-28 lg:py-44 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left — Info */}
          <div
            className="contact-reveal opacity-0 translate-y-5 transition-all duration-700"
          >
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C7A46C] mb-4">
              Get In Touch
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-[#2A2A2A] mb-6 leading-tight">
              We Would Love to
              <br />
              <em className="italic">Hear From You</em>
            </h2>
            <p className="font-body text-sm text-[#6B6560] leading-relaxed mb-10 max-w-sm">
              Whether you have a question about our menu, want to plan a private event, or simply
              wish to share your dining experience, our team is here for you.
            </p>

            <ul className="space-y-5 mb-10">
              {[
                { icon: Mail,   label: "Email",   value: "hello@littlemamma.ma",  href: "mailto:hello@littlemamma.ma" },
                { icon: Phone,  label: "Phone",   value: "+212 522 43 21 00",     href: "tel:+2125224321000" },
                { icon: MapPin, label: "Address", value: "128 Boulevard d'Anfa, Casablanca", href: undefined },
              ].map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-[#FAF7F2]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-body text-[10px] text-[#6B6560] uppercase tracking-[0.18em]">{label}</p>
                    {href ? (
                      <a href={href} className="font-body text-sm text-[#2A2A2A] hover:text-[#E53935] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-sm text-[#2A2A2A]">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <Link
              to="/messages"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2A2A2A] text-[#FAF7F2] rounded-full font-body text-xs tracking-[0.18em] uppercase hover:bg-[#E53935] hover:-translate-y-0.5 transition-all duration-400 shadow-lg shadow-[#2A2A2A]/15"
            >
              <MessageSquare size={14} aria-hidden="true" />
              Visit Message Board
            </Link>
          </div>

          {/* Right — Form */}
          <div
            className="contact-reveal opacity-0 translate-y-5 transition-all duration-700"
            style={{ transitionDelay: "120ms" }}
          >
            {sent ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-[#EFE7DC]/20 shadow-sm h-full flex flex-col items-center justify-center">
                <CheckCircle size={44} className="text-[#6B6560] mx-auto mb-4" aria-hidden="true" />
                <h3 className="font-display text-2xl text-[#2A2A2A] mb-2">Message Sent</h3>
                <p className="font-body text-sm text-[#6B6560] leading-relaxed max-w-xs">
                  Thank you for reaching out. We will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-7 lg:p-8 border border-[#EFE7DC]/20"
                style={{ boxShadow: "0 8px 40px rgba(42,42,42,0.06)" }}
                noValidate
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="ct-name" className={labelClass}>Name</label>
                    <input
                      id="ct-name"
                      type="text"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="ct-email" className={labelClass}>Email</label>
                    <input
                      id="ct-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="ct-subject" className={labelClass}>Subject</label>
                    <input
                      id="ct-subject"
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className={inputClass}
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label htmlFor="ct-message" className={labelClass}>Message</label>
                    <textarea
                      id="ct-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitContact.isPending}
                  className="w-full mt-6 py-4 bg-[#2A2A2A] text-[#FAF7F2] rounded-xl font-body text-xs tracking-[0.22em] uppercase hover:bg-[#E53935] hover:-translate-y-0.5 transition-all duration-400 flex items-center justify-center gap-2 shadow-lg shadow-[#2A2A2A]/15 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={13} aria-hidden="true" />
                  {submitContact.isPending ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
