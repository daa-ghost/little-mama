import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowLeft,
  Users,
  Mail,
  MessageSquare,
  CalendarCheck,
  Trash2,
  Clock,
  Shield,
} from "lucide-react";

export default function AdminDashboard() {
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdmin)) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, isAdmin, navigate]);

  const { data: stats } = trpc.admin.stats.useQuery(undefined, { enabled: isAdmin });
  const { data: contacts } = trpc.contact.list.useQuery(undefined, { enabled: isAdmin });
  const { data: messages } = trpc.message.list.useQuery(undefined, { enabled: isAdmin });
  const { data: reservations } = trpc.reservation.list.useQuery(undefined, { enabled: isAdmin });

  const utils = trpc.useUtils();

  const deleteContact = trpc.contact.delete.useMutation({
    onSuccess: () => utils.contact.list.invalidate(),
  });
  const deleteMessage = trpc.message.delete.useMutation({
    onSuccess: () => utils.message.list.invalidate(),
  });
  const updateReservationStatus = trpc.reservation.updateStatus.useMutation({
    onSuccess: () => utils.reservation.list.invalidate(),
  });

  const formatDate = (date: Date | string | null) => {
    if (!date) return "—";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#EFE7DC] border-t-[#E53935] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const statCards = [
    { label: "OAuth Users", value: stats?.totalUsers ?? 0, icon: Users, color: "bg-[#2A2A2A]" },
    { label: "Local Users", value: stats?.totalLocalUsers ?? 0, icon: Shield, color: "bg-[#6B6560]" },
    { label: "Contact Submissions", value: stats?.totalContacts ?? 0, icon: Mail, color: "bg-[#E53935]" },
    { label: "Board Messages", value: stats?.totalMessages ?? 0, icon: MessageSquare, color: "bg-[#C62828]" },
    { label: "Reservations", value: stats?.totalReservations ?? 0, icon: CalendarCheck, color: "bg-[#2A2A2A]" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-body text-sm text-[#6B6560] hover:text-[#2A2A2A] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Website
          </Link>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-[#E53935]" />
            <span className="font-body text-xs text-[#6B6560] uppercase tracking-wider">
              Admin: {user?.name}
            </span>
          </div>
        </div>

        <h1 className="font-display text-3xl text-[#2A2A2A] mb-8">Management Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {statCards.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 border border-[#EFE7DC]/30 shadow-sm">
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon size={18} className="text-[#FAF7F2]" />
              </div>
              <p className="font-display text-2xl text-[#2A2A2A]">{stat.value}</p>
              <p className="font-body text-xs text-[#6B6560] uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-xl border border-[#EFE7DC]/30 shadow-sm mb-8 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EFE7DC]/20 flex items-center justify-between">
            <h2 className="font-display text-lg text-[#2A2A2A] flex items-center gap-2">
              <CalendarCheck size={18} className="text-[#E53935]" />
              Reservations
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#EFE7DC]/20">
                  <th className="text-left px-6 py-3 font-body text-xs tracking-wider uppercase text-[#6B6560]">Name</th>
                  <th className="text-left px-6 py-3 font-body text-xs tracking-wider uppercase text-[#6B6560]">Date</th>
                  <th className="text-left px-6 py-3 font-body text-xs tracking-wider uppercase text-[#6B6560]">Time</th>
                  <th className="text-left px-6 py-3 font-body text-xs tracking-wider uppercase text-[#6B6560]">Guests</th>
                  <th className="text-left px-6 py-3 font-body text-xs tracking-wider uppercase text-[#6B6560]">Location</th>
                  <th className="text-left px-6 py-3 font-body text-xs tracking-wider uppercase text-[#6B6560]">Status</th>
                  <th className="text-left px-6 py-3 font-body text-xs tracking-wider uppercase text-[#6B6560]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations && reservations.length > 0 ? (
                  reservations.map((r) => (
                    <tr key={r.id} className="border-b border-[#EFE7DC]/10 hover:bg-[#FAF7F2]/50">
                      <td className="px-6 py-3 font-body text-sm text-[#2A2A2A]">{r.name}</td>
                      <td className="px-6 py-3 font-body text-sm text-[#6B6560]">{r.date}</td>
                      <td className="px-6 py-3 font-body text-sm text-[#6B6560]">{r.time}</td>
                      <td className="px-6 py-3 font-body text-sm text-[#6B6560]">{r.guests}</td>
                      <td className="px-6 py-3 font-body text-sm text-[#6B6560]">{r.location}</td>
                      <td className="px-6 py-3">
                        <select
                          value={r.status}
                          onChange={(e) =>
                            updateReservationStatus.mutate({
                              id: r.id,
                              status: e.target.value as "pending" | "confirmed" | "cancelled",
                            })
                          }
                          className={`font-body text-xs px-2 py-1 rounded-full border ${
                            r.status === "confirmed"
                              ? "bg-[#6B6560]/10 text-[#6B6560] border-[#6B6560]/20"
                              : r.status === "cancelled"
                              ? "bg-[#C62828]/10 text-[#C62828] border-[#C62828]/20"
                              : "bg-[#E53935]/10 text-[#E53935] border-[#E53935]/20"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-3">
                        <span className="font-body text-[11px] text-[#EFE7DC] flex items-center gap-1">
                          <Clock size={11} />
                          {formatDate(r.createdAt)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center font-body text-sm text-[#6B6560]">
                      No reservations yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Two Column: Contacts & Messages */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Submissions */}
          <div className="bg-white rounded-xl border border-[#EFE7DC]/30 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#EFE7DC]/20 flex items-center gap-2">
              <Mail size={18} className="text-[#E53935]" />
              <h2 className="font-display text-lg text-[#2A2A2A]">Contact Submissions</h2>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {contacts && contacts.length > 0 ? (
                <div className="divide-y divide-[#EFE7DC]/10">
                  {contacts.map((c) => (
                    <div key={c.id} className="px-6 py-4 hover:bg-[#FAF7F2]/50 group">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-display text-sm text-[#2A2A2A]">{c.name}</p>
                          <p className="font-body text-[11px] text-[#6B6560]">{c.email}</p>
                        </div>
                        <button
                          onClick={() => deleteContact.mutate({ id: c.id })}
                          className="opacity-0 group-hover:opacity-100 text-[#C62828] hover:text-wine transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      {c.subject && (
                        <p className="font-body text-xs text-[#E53935] mb-1">{c.subject}</p>
                      )}
                      <p className="font-body text-sm text-[#6B6560] leading-relaxed">{c.message}</p>
                      <p className="font-body text-[10px] text-[#EFE7DC] mt-1 flex items-center gap-1">
                        <Clock size={10} />
                        {formatDate(c.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center font-body text-sm text-[#6B6560]">
                  No contact submissions yet.
                </div>
              )}
            </div>
          </div>

          {/* Board Messages */}
          <div className="bg-white rounded-xl border border-[#EFE7DC]/30 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#EFE7DC]/20 flex items-center gap-2">
              <MessageSquare size={18} className="text-[#E53935]" />
              <h2 className="font-display text-lg text-[#2A2A2A]">Board Messages</h2>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {messages && messages.length > 0 ? (
                <div className="divide-y divide-[#EFE7DC]/10">
                  {messages.map((m) => (
                    <div key={m.id} className="px-6 py-4 hover:bg-[#FAF7F2]/50 group">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-display text-sm text-[#2A2A2A]">{m.name}</p>
                          <p className="font-body text-[11px] text-[#6B6560]">{m.email}</p>
                        </div>
                        <button
                          onClick={() => deleteMessage.mutate({ id: m.id })}
                          className="opacity-0 group-hover:opacity-100 text-[#C62828] hover:text-wine transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="font-body text-sm text-[#6B6560] leading-relaxed">{m.content}</p>
                      <p className="font-body text-[10px] text-[#EFE7DC] mt-1 flex items-center gap-1">
                        <Clock size={10} />
                        {formatDate(m.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center font-body text-sm text-[#6B6560]">
                  No board messages yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
