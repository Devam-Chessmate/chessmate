"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Handshake, MapPin, Shield } from "lucide-react";
import Link from "next/link";

const FCSBanner: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-[#050505] overflow-hidden">

      {/* --- BACKGROUND ARCHITECTURE --- */}
      {/* 1. Chessboard Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(45deg, #EAB308 25%, transparent 25%, transparent 75%, #EAB308 75%, #EAB308),
                            linear-gradient(45deg, #EAB308 25%, transparent 25%, transparent 75%, #EAB308 75%, #EAB308)`,
          backgroundSize: "80px 80px",
          backgroundPosition: "0 0, 40px 40px",
        }}
      />

      {/* 2. Gold Light Leak */}
      <div className="absolute top-0 right-0 w-full md:w-[50%] h-full bg-gradient-to-b md:bg-gradient-to-l from-[#EAB308]/10 to-transparent pointer-events-none" />

      {/* 3. Subtle accent for FCS identity */}
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-tr from-teal-900/20 to-transparent pointer-events-none" />

      {/* --- MAIN LAYOUT --- */}
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10 pt-26 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="max-w-2xl text-left order-2 lg:order-1 w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Partnership badge */}
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <span className="h-[1px] w-8 md:w-12 bg-[#EAB308]"></span>
                <span className="text-[#EAB308] text-[9px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em]">
                  Exclusive Partnership Offer
                </span>
              </div>

              {/* Logo lockup */}
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <img
                  src="/logo.webp"
                  alt="ChessMate Academy"
                  className="h-10 md:h-12 object-contain"
                />
                <div className="flex items-center gap-3">
                  <span className="text-[#EAB308] text-2xl md:text-3xl font-semibold">×</span>
                  <div className="flex items-center gap-3">
                    <img
                      src="/fcs-logo.png"
                      alt="Fayetteville Chess Society"
                      className="h-10 md:h-12 w-auto object-contain rounded-md"
                    />
                    <span className="text-white text-[28px] md:text-[36px] font-black uppercase tracking-[0.3em] leading-none">
                      FCS
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] md:leading-tight tracking-tighter mb-4 md:mb-6 uppercase">
                FCS Members:{" "}
                <span className="font-serif italic font-light text-[#EAB308] normal-case">
                  Free
                </span>{" "}
                Chess Coaching
              </h1>

              <p className="text-gray-400 text-sm md:text-xl font-medium leading-relaxed mb-6 md:mb-10 max-w-lg border-l-4 border-[#EAB308]/50 pl-4">
                Improve your chess with a personalized 45-minute one-on-one session
                from ChessMate Academy — exclusively for Fayetteville Chess Society
                members.
              </p>

              {/* Hero CTA Button */}
              <div className="mb-8 md:mb-12">
                <a
                  href="https://cal.com/devam-makwana-chessmate/free-45-minute-chess-coaching-session-for-fcs-members"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#EAB308] text-black font-black text-xs uppercase tracking-[0.2em] border-2 border-[#EAB308] hover:bg-transparent hover:text-[#EAB308] transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(234,179,8,0.4)] hover:shadow-none"
                >
                  Book My Free Session
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Breadcrumbs */}
              <nav className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                <Link href="/" className="text-gray-500 hover:text-[#EAB308] transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-[#EAB308]" />
                <span className="text-white">FCS Partnership</span>
              </nav>
            </motion.div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="relative order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative h-[260px] sm:h-[340px] md:h-[400px] lg:h-auto lg:aspect-[4/5] max-w-[450px] mx-auto lg:ml-auto"
            >
              {/* Main Image Frame */}
              <div className="absolute inset-0 border border-[#EAB308]/30 p-2 md:p-4">
                <div className="relative w-full h-full overflow-hidden bg-[#111]">
                  <img
                    src="/1.webp"
                    alt="Chess Coaching Session"
                    className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all duration-1000"
                  />
                  {/* Partnership overlay badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm border border-[#EAB308]/40 p-3 md:p-4">
                    <p className="text-[#EAB308] text-[9px] font-black uppercase tracking-[0.3em] mb-1">
                      Fayetteville Chess Society × ChessMate Academy
                    </p>
                    <p className="text-white text-xs md:text-sm font-medium">
                      Free 45-Minute Coaching Session for FCS Members
                    </p>
                  </div>
                </div>
              </div>

              {/* Architectural accents — hidden on very small screens to avoid overflow */}
              <div className="hidden sm:block absolute -top-4 -right-4 md:-top-10 md:-right-10 w-12 h-12 md:w-32 md:h-32 border-t-2 border-r-2 border-[#EAB308] opacity-40"></div>
              <div className="hidden sm:block absolute -bottom-4 -left-4 md:-bottom-10 md:-left-10 w-12 h-12 md:w-32 md:h-32 border-b-2 border-l-2 border-[#EAB308] opacity-40"></div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* --- BOTTOM STATS BAR --- */}
      <div className="absolute bottom-0 left-0 w-full bg-white/5 border-t border-white/10 py-4 hidden md:block">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center text-white/40">
            <div className="flex items-center gap-3">
              <Handshake className="w-5 h-5 text-[#EAB308]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Official Partnership
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#EAB308]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                No Payment Required
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#EAB308]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Fayetteville, NC
              </span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default FCSBanner;
