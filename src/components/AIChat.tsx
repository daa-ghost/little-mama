import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Ciao! I'm your Little Mamma dining assistant. I can help with menu recommendations, reservation questions, and details about our locations. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    // AI response simulation
    setTimeout(() => {
      const responses = getAIResponse(userMsg);
      setMessages((prev) => [...prev, { role: "assistant", content: responses }]);
      setLoading(false);
    }, 800 + Math.random() * 600);
  };

  const getAIResponse = (msg: string): string => {
    const lower = msg.toLowerCase();
    if (lower.includes("pizza")) {
      return "Our Pizza Napoletana is our signature dish! Cooked in our 485°C wood-fired oven imported from Naples, with San Marzano tomatoes and buffalo mozzarella. Would you like to reserve a table?";
    }
    if (lower.includes("reserv") || lower.includes("book") || lower.includes("table")) {
      return "I'd be happy to help you reserve a table! You can use the reservation form on our website, or call us directly at +212 522 43 21 00. We recommend booking at least 24 hours in advance.";
    }
    if (lower.includes("menu") || lower.includes("food") || lower.includes("dish")) {
      return "Our menu features authentic Italian classics — from wood-fired pizzas and handmade pasta to fresh burrata and saffron risotto. Every dish is prepared with imported Italian ingredients. Would you like a specific recommendation?";
    }
    if (lower.includes("locat") || lower.includes("address") || lower.includes("city")) {
      return "We have four locations across Morocco: Casablanca (128 Boulevard d'Anfa), Marrakech (Rue Yves Saint Laurent), Rabat (Avenue Mohammed VI), and Tangier (Rue de la Plage). Which location would you like to visit?";
    }
    if (lower.includes("hour") || lower.includes("open") || lower.includes("time")) {
      return "We're open daily from 12:00 PM to 11:00 PM (1:00 PM - 11:00 PM in Tangier). Our live jazz evenings run Thursday through Saturday.";
    }
    if (lower.includes("price") || lower.includes("cost") || lower.includes("expensive")) {
      return "Our mains range from 95 MAD to 160 MAD, with our signature antipasti platter at 160 MAD. We offer exceptional value for the quality of imported Italian ingredients and the dining experience we provide.";
    }
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("ciao")) {
      return "Ciao! Welcome to Little Mamma. I'm here to help with anything you need — menu recommendations, reservations, or information about our restaurants. What can I do for you?";
    }
    if (lower.includes("burrata")) {
      return "Our Burrata Fresca is a guest favorite! Fresh Puglian burrata with heirloom tomatoes, basil pesto, aged balsamic, and toasted pine nuts. It's the perfect way to start your meal.";
    }
    if (lower.includes("wine")) {
      return "Our sommelier has curated over 200 Italian wine labels, from Barolo to Etna Rosso. We offer expert wine pairing with every course. Our house red from Puglia is particularly popular!";
    }
    if (lower.includes("thank")) {
      return "Prego! It was my pleasure to help. We look forward to welcoming you at Little Mamma soon. Buon appetito!";
    }
    return "That's a wonderful question! Our team would be delighted to assist you further. You can reach us at hello@littlemamma.ma or call +212 522 43 21 00. Is there anything else I can help with?";
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          open ? "bg-[#2A2A2A]" : "bg-[#E53935] hover:bg-[#B71C1C]"
        }`}
      >
        {open ? <X size={22} className="text-[#FAF7F2]" /> : <MessageCircle size={22} className="text-[#FAF7F2]" />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#EFE7DC]/30 overflow-hidden flex flex-col" style={{ height: "480px" }}>
          {/* Header */}
          <div className="bg-[#2A2A2A] px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E53935] flex items-center justify-center">
              <Bot size={18} className="text-[#FAF7F2]" />
            </div>
            <div>
              <h4 className="font-display text-base text-[#FAF7F2]">Little Mamma Assistant</h4>
              <p className="font-body text-[10px] text-[#EFE7DC]">Always here to help</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "assistant" ? "bg-[#2A2A2A]" : "bg-[#E53935]"
                }`}>
                  {msg.role === "assistant" ? (
                    <Bot size={13} className="text-[#FAF7F2]" />
                  ) : (
                    <User size={13} className="text-[#FAF7F2]" />
                  )}
                </div>
                <div className={`max-w-[75%] px-3.5 py-2.5 rounded-xl font-body text-sm leading-relaxed ${
                  msg.role === "assistant"
                    ? "bg-white border border-[#EFE7DC]/30 text-[#2A2A2A]"
                    : "bg-[#2A2A2A] text-[#FAF7F2]"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                  <Bot size={13} className="text-[#FAF7F2]" />
                </div>
                <div className="bg-white border border-[#EFE7DC]/30 rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#EFE7DC] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#EFE7DC] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-[#EFE7DC] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="px-4 py-3 border-t border-[#EFE7DC]/30 bg-white"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our menu, reservations..."
                className="flex-1 px-3 py-2 rounded-lg border border-[#EFE7DC] font-body text-sm text-[#2A2A2A] placeholder:text-[#6B6560]/50 focus:outline-none focus:border-[#E53935]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-lg bg-[#2A2A2A] flex items-center justify-center text-[#FAF7F2] hover:bg-[#E53935] transition-colors disabled:opacity-40"
              >
                <Send size={14} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
