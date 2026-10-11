"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter the admin password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Incorrect password. Access denied.");
        setLoading(false);
        return;
      }

      // Redirect to main admin dashboard
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError("Connection error. Please check your internet connection.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Decorative Chess Motif Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex flex-wrap gap-8 justify-around items-center text-8xl font-black text-black">
        <span>♞</span>
        <span>♚</span>
        <span>♛</span>
        <span>♜</span>
        <span>♝</span>
        <span>♞</span>
        <span>♚</span>
        <span>♛</span>
        <span>♜</span>
        <span>♝</span>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Top Brand Tag */}
        <div className="text-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-black text-white border-2 border-black font-black uppercase text-xs tracking-wider shadow-[3px_3px_0px_0px_#EAB308] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <span className="w-5 h-5 bg-[#EAB308] text-black font-black flex items-center justify-center text-xs">
              ♞
            </span>
            <span>ChessMate Academy</span>
            <span className="text-[10px] text-gray-400">← Back to Site</span>
          </Link>
        </div>

        {/* Main Brutalist Card */}
        <div className="bg-white border-4 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
          {/* Top Yellow Ribbon */}
          <div className="absolute -top-3.5 right-6 bg-[#EAB308] border-2 border-black px-3 py-0.5 font-black text-[11px] uppercase tracking-widest shadow-[2px_2px_0px_0px_black] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Secure Access</span>
          </div>

          <div className="mb-6">
            <div className="w-14 h-14 bg-[#EAB308] border-3 border-black flex items-center justify-center font-black text-black text-2xl mb-4 shadow-[4px_4px_0px_0px_black]">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl md:text-3xl font-[1000] tracking-tight text-black uppercase">
              Admin Portal
            </h1>
            <p className="text-sm font-bold text-gray-600 mt-1">
              Enter your master password to access the blog CMS & media dashboard.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-100 border-2 border-red-600 text-red-900 text-xs font-black flex items-start gap-2 shadow-[3px_3px_0px_0px_rgba(220,38,38,1)]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-700" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-black uppercase tracking-wider text-black mb-1.5"
              >
                Master Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password..."
                  required
                  autoFocus
                  className="w-full bg-[#FAF9F5] border-3 border-black px-4 py-3 pr-12 text-black font-bold placeholder:text-gray-400 placeholder:font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#EAB308] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:text-black transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 bg-[#EAB308] hover:bg-[#FACC15] text-black border-3 border-black font-black uppercase tracking-wider text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Unlock Admin Panel</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-8 pt-5 border-t-2 border-black/10 text-center">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>Session stays active for 7 days on this browser</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
