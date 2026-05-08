import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { ArrowLeft, Send, MessageSquare, User, Clock } from "lucide-react";

export default function MessageBoard() {
  const [form, setForm] = useState({ name: "", email: "", content: "" });
  const [submitted, setSubmitted] = useState(false);

  const { data: messages, isLoading } = trpc.message.list.useQuery();
  const utils = trpc.useUtils();

  const createMessage = trpc.message.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setForm({ name: "", email: "", content: "" });
      utils.message.list.invalidate();
      setTimeout(() => setSubmitted(false), 3000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.content) return;
    createMessage.mutate(form);
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm text-[#6B6560] hover:text-[#2A2A2A] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Little Mamma
        </Link>

        <div className="text-center mb-12">
          <div className="w-14 h-14 rounded-full bg-[#2A2A2A] flex items-center justify-center mx-auto mb-4">
            <MessageSquare size={24} className="text-[#FAF7F2]" />
          </div>
          <h1 className="font-display text-[clamp(2rem,4vw,3rem)] text-[#2A2A2A] mb-2">
            Message Board
          </h1>
          <p className="font-body text-[#6B6560] max-w-md mx-auto">
            Share your thoughts, dining experiences, or kind words with our community. No account required.
          </p>
        </div>

        {/* Submit Form */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-[#EFE7DC]/30 shadow-sm mb-10">
          {submitted ? (
            <div className="text-center py-6">
              <p className="font-display text-xl text-[#6B6560]">Thank you for your message!</p>
              <p className="font-body text-sm text-[#6B6560]/70 mt-1">Your voice has been added to our board.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 className="font-display text-lg text-[#2A2A2A] mb-4">Leave a Message</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-body text-xs tracking-wider uppercase text-[#6B6560] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#EFE7DC] bg-[#FAF7F2] font-body text-sm text-[#2A2A2A] focus:outline-none focus:border-[#E53935]"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-body text-xs tracking-wider uppercase text-[#6B6560] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-[#EFE7DC] bg-[#FAF7F2] font-body text-sm text-[#2A2A2A] focus:outline-none focus:border-[#E53935]"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block font-body text-xs tracking-wider uppercase text-[#6B6560] mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#EFE7DC] bg-[#FAF7F2] font-body text-sm text-[#2A2A2A] focus:outline-none focus:border-[#E53935] resize-none"
                  placeholder="Share your thoughts..."
                />
              </div>
              <button
                type="submit"
                disabled={createMessage.isPending}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2A2A2A] text-[#FAF7F2] rounded-lg font-body text-sm tracking-[0.1em] uppercase hover:bg-[#E53935] transition-colors disabled:opacity-50"
              >
                <Send size={14} />
                {createMessage.isPending ? "Posting..." : "Post Message"}
              </button>
            </form>
          )}
        </div>

        {/* Messages List */}
        <div>
          <h3 className="font-display text-xl text-[#2A2A2A] mb-6">
            Community Messages
            {messages && (
              <span className="font-body text-sm text-[#6B6560] ml-2">({messages.length})</span>
            )}
          </h3>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-6 h-6 border-2 border-[#EFE7DC] border-t-[#E53935] rounded-full animate-spin mx-auto" />
            </div>
          ) : messages && messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white rounded-xl p-6 border border-[#EFE7DC]/20 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                        <User size={14} className="text-[#FAF7F2]" />
                      </div>
                      <div>
                        <p className="font-display text-sm text-[#2A2A2A]">{msg.name}</p>
                        <p className="font-body text-[11px] text-[#6B6560]">{msg.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#EFE7DC]">
                      <Clock size={12} />
                      <span className="font-body text-[11px]">{formatDate(msg.createdAt)}</span>
                    </div>
                  </div>
                  <p className="font-body text-sm text-[#6B6560] leading-relaxed">{msg.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-[#EFE7DC]/20">
              <MessageSquare size={32} className="text-[#EFE7DC] mx-auto mb-3" />
              <p className="font-body text-[#6B6560]">No messages yet. Be the first to share!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
