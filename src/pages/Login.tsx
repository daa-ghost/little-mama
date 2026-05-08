import { useState } from "react";
import { Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, UserPlus, ArrowLeft, Eye, EyeOff } from "lucide-react";

function getOAuthUrl() {
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);
  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_APP_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "profile",
    state,
  });
  return `${import.meta.env.VITE_KIMI_AUTH_URL}/api/oauth/authorize?${params.toString()}`;
}

export default function Login() {
  const { user, isAuthenticated } = useAuth();
  const [mode, setMode] = useState<"signin" | "join">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [signInForm, setSignInForm] = useState({ username: "", password: "" });
  const [joinForm, setJoinForm] = useState({
    username: "",
    password: "",
    displayName: "",
    email: "",
  });

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/";
    },
    onError: (err) => setError(err.message),
  });

  const registerMutation = trpc.localAuth.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/";
    },
    onError: (err) => setError(err.message),
  });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate(signInForm);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    registerMutation.mutate(joinForm);
  };

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center border border-[#EFE7DC]/30 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center mx-auto mb-4">
            <span className="font-display text-xl text-[#FAF7F2]">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          <h2 className="font-display text-2xl text-[#2A2A2A] mb-2">Welcome, {user.name}</h2>
          <p className="font-body text-sm text-[#6B6560] mb-6">You are signed in to Little Mamma.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2A2A2A] text-[#FAF7F2] rounded-full font-body text-sm tracking-[0.1em] uppercase hover:bg-[#E53935] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-body text-sm text-[#6B6560] hover:text-[#2A2A2A] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Little Mamma
        </Link>

        <div className="text-center mb-8">
          <h1 className="flex items-baseline justify-center gap-1.5 mb-2">
            <span className="font-script text-5xl text-[#E53935]" style={{ lineHeight: 1 }}>Little</span>
            <span className="font-brand text-3xl text-[#2A2A2A] tracking-wider" style={{ lineHeight: 1 }}>Mamma</span>
          </h1>
          <p className="font-body text-sm text-[#6B6560]">Italian Cuisine Made With Love</p>
        </div>

        {/* Tab Toggle */}
        <div className="flex mb-6 bg-white rounded-lg p-1 border border-[#EFE7DC]/30">
          <button
            onClick={() => { setMode("signin"); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md font-body text-sm transition-all ${
              mode === "signin" ? "bg-[#2A2A2A] text-[#FAF7F2]" : "text-[#6B6560] hover:text-[#2A2A2A]"
            }`}
          >
            <LogIn size={15} />
            Sign In
          </button>
          <button
            onClick={() => { setMode("join"); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md font-body text-sm transition-all ${
              mode === "join" ? "bg-[#2A2A2A] text-[#FAF7F2]" : "text-[#6B6560] hover:text-[#2A2A2A]"
            }`}
          >
            <UserPlus size={15} />
            Join
          </button>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-[#C62828]/10 border border-[#C62828]/20 rounded-lg font-body text-sm text-[#C62828]">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl p-8 border border-[#EFE7DC]/30 shadow-sm">
          {mode === "signin" ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block font-body text-xs tracking-wider uppercase text-[#6B6560] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={signInForm.username}
                  onChange={(e) => setSignInForm({ ...signInForm, username: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#EFE7DC] bg-[#FAF7F2] font-body text-sm text-[#2A2A2A] focus:outline-none focus:border-[#E53935]"
                  placeholder="Your username"
                />
              </div>
              <div className="relative">
                <label className="block font-body text-xs tracking-wider uppercase text-[#6B6560] mb-2">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={signInForm.password}
                  onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-[#EFE7DC] bg-[#FAF7F2] font-body text-sm text-[#2A2A2A] focus:outline-none focus:border-[#E53935]"
                  placeholder="Your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[2.1rem] text-[#6B6560]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full py-3.5 bg-[#2A2A2A] text-[#FAF7F2] rounded-lg font-body text-sm tracking-[0.15em] uppercase hover:bg-[#E53935] transition-colors disabled:opacity-50"
              >
                {loginMutation.isPending ? "Signing in..." : "Sign In"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <label className="block font-body text-xs tracking-wider uppercase text-[#6B6560] mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  required
                  value={joinForm.username}
                  onChange={(e) => setJoinForm({ ...joinForm, username: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#EFE7DC] bg-[#FAF7F2] font-body text-sm text-[#2A2A2A] focus:outline-none focus:border-[#E53935]"
                  placeholder="Choose a username (min 3 chars)"
                />
              </div>
              <div>
                <label className="block font-body text-xs tracking-wider uppercase text-[#6B6560] mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={joinForm.displayName}
                  onChange={(e) => setJoinForm({ ...joinForm, displayName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#EFE7DC] bg-[#FAF7F2] font-body text-sm text-[#2A2A2A] focus:outline-none focus:border-[#E53935]"
                  placeholder="How should we call you?"
                />
              </div>
              <div>
                <label className="block font-body text-xs tracking-wider uppercase text-[#6B6560] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={joinForm.email}
                  onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-[#EFE7DC] bg-[#FAF7F2] font-body text-sm text-[#2A2A2A] focus:outline-none focus:border-[#E53935]"
                  placeholder="your@email.com"
                />
              </div>
              <div className="relative">
                <label className="block font-body text-xs tracking-wider uppercase text-[#6B6560] mb-2">
                  Password *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={joinForm.password}
                  onChange={(e) => setJoinForm({ ...joinForm, password: e.target.value })}
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-[#EFE7DC] bg-[#FAF7F2] font-body text-sm text-[#2A2A2A] focus:outline-none focus:border-[#E53935]"
                  placeholder="Min 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[2.1rem] text-[#6B6560]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="w-full py-3.5 bg-[#E53935] text-[#FAF7F2] rounded-lg font-body text-sm tracking-[0.15em] uppercase hover:bg-[#B71C1C] transition-colors disabled:opacity-50"
              >
                {registerMutation.isPending ? "Creating account..." : "Create Account"}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-[#EFE7DC]/30">
            <p className="text-center font-body text-xs text-[#6B6560] mb-3">Or sign in with</p>
            <a
              href={getOAuthUrl()}
              className="w-full py-3 border border-[#EFE7DC] rounded-lg font-body text-sm text-[#2A2A2A] hover:bg-[#2A2A2A] hover:text-[#FAF7F2] hover:border-[#2A2A2A] transition-all flex items-center justify-center gap-2"
            >
              <LogIn size={15} />
              Kimi Portal Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
