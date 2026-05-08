import { useState, useRef, useEffect } from "react";
import { trpc } from "@/providers/trpc";
import { Calendar, Clock, Users, MapPin, CheckCircle } from "lucide-react";

export default function Reservation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    location: "Casablanca",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const createReservation = trpc.reservation.create.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time) return;
    createReservation.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone,
      date: form.date,
      time: form.time,
      guests: form.guests,
      location: form.location,
      notes: form.notes,
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const form = section.querySelector<HTMLElement>(".reservation-form");
            if (form) {
              form.style.opacity = "1";
              form.style.transform = "translateY(0)";
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const locations = ["Casablanca", "Marrakech", "Rabat", "Tangier"];
  const timeSlots = [
    "12:00", "12:30", "13:00", "13:30", "14:00",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
  ];

  const inputClass = "w-full px-4 py-3.5 rounded-xl border border-[#EFE7DC]/50 bg-white/70 font-body text-sm text-[#2A2A2A] placeholder:text-[#2A2A2A]/30 focus:outline-none focus:border-[#E53935] focus:ring-2 focus:ring-[#E53935]/10 transition-all duration-300";
  const labelClass = "block font-body text-[10px] tracking-[0.25em] uppercase text-[#6B6560] mb-2";

  return (
    <section
      id="reservation"
      ref={sectionRef}
      className="py-28 lg:py-44 bg-[#2A2A2A] relative overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 opacity-[0.06]">
        <img src={`${import.meta.env.BASE_URL}images/ambiance.jpg`} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" />
      </div>

      {/* Ambient gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(229,57,53,0.1) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#C7A46C] mb-4">
            Book Your Table
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,3.75rem)] text-[#FAF7F2] mb-4 leading-tight">
            Reserve Your
            <br />
            <em className="italic text-[#EFE7DC]">Italian Experience</em>
          </h2>
        </div>

        {submitted ? (
          <div className="bg-[#FAF7F2] rounded-2xl p-10 text-center">
            <CheckCircle size={44} className="text-[#6B6560] mx-auto mb-4" aria-hidden="true" />
            <h3 className="font-display text-2xl text-[#2A2A2A] mb-2">Reservation Confirmed</h3>
            <p className="font-body text-sm text-[#6B6560] leading-relaxed">
              We look forward to welcoming you at Little Mamma. A confirmation has been noted.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="reservation-form rounded-2xl p-7 lg:p-10 bg-[#FAF7F2]/98 shadow-[0_40px_80px_rgba(0,0,0,0.35)] opacity-0 translate-y-8 transition-all duration-700"
            style={{ backdropFilter: "blur(12px)" }}
            noValidate
          >
            <div className="grid md:grid-cols-2 gap-4 lg:gap-5">
              <div>
                <label htmlFor="res-name" className={labelClass}>Full Name</label>
                <input
                  id="res-name"
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
                <label htmlFor="res-email" className={labelClass}>Email</label>
                <input
                  id="res-email"
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
                <label htmlFor="res-phone" className={labelClass}>Phone</label>
                <input
                  id="res-phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputClass}
                  placeholder="+212 ..."
                />
              </div>
              <div>
                <label htmlFor="res-location" className={labelClass}>
                  <MapPin size={11} className="inline mr-1" aria-hidden="true" />
                  Location
                </label>
                <div className="relative">
                  <select
                    id="res-location"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className={`${inputClass} appearance-none pr-8`}
                  >
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6560]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 8L1 3h10z"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="res-date" className={labelClass}>
                  <Calendar size={11} className="inline mr-1" aria-hidden="true" />
                  Date
                </label>
                <input
                  id="res-date"
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={inputClass}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label htmlFor="res-time" className={labelClass}>
                  <Clock size={11} className="inline mr-1" aria-hidden="true" />
                  Time
                </label>
                <div className="relative">
                  <select
                    id="res-time"
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className={`${inputClass} appearance-none pr-8`}
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6560]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 8L1 3h10z"/></svg>
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="md:col-span-2">
                <label className={labelClass}>
                  <Users size={11} className="inline mr-1" aria-hidden="true" />
                  Guests
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm({ ...form, guests: n })}
                      aria-pressed={form.guests === n}
                      className={`w-11 h-11 rounded-xl font-body text-sm font-medium transition-all duration-300 ${
                        form.guests === n
                          ? "bg-[#2A2A2A] text-[#FAF7F2] shadow-md"
                          : "bg-white border border-[#EFE7DC]/50 text-[#2A2A2A] hover:border-[#E53935] hover:text-[#E53935]"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special requests */}
              <div className="md:col-span-2">
                <label htmlFor="res-notes" className={labelClass}>Special Requests</label>
                <textarea
                  id="res-notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Allergies, celebrations, seating preferences..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={createReservation.isPending}
              className="w-full mt-6 py-4 bg-[#2A2A2A] text-[#FAF7F2] rounded-xl font-body text-xs tracking-[0.22em] uppercase hover:bg-[#E53935] hover:-translate-y-0.5 transition-all duration-400 shadow-lg shadow-[#2A2A2A]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createReservation.isPending ? "Confirming…" : "Reserve Table"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
