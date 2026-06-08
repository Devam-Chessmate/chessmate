"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Instagram,
  ArrowUp,
  MessageCircle,
  Star,
  Shield,
  ChevronRight,
  Heart
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const QUICK_LINKS = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Puzzles", href: "/puzzles" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <footer className="relative bg-[#000000] text-white pt-20 md:pt-32 pb-12 overflow-hidden selection:bg-[#EAB308] selection:text-black border-t-[10px] border-black">
      
      {/* --- BACKGROUND ARCHITECTURAL DECAL --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-[1000] text-white/[0.02] leading-none select-none -z-0 tracking-tighter uppercase italic pointer-events-none">
        MATE
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24 mb-20">
          
          {/* BRAND COLUMN */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 group">
              <div className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] overflow-hidden p-1 transition-all">
                <img 
                  src="/logo.jpg" 
                  alt="Chess Mate Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="leading-none">
                <h3 className="text-xl md:text-2xl font-[1000] uppercase tracking-tighter">
                  Chess<span className="text-[#EAB308]">Mate</span>
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">Elite Academy</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm font-bold leading-relaxed max-w-xs">
              World-class online chess coaching for aspiring grandmasters. Master the art of strategy with FIDE certified trainers.
            </p>

            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EAB308]">Follow Our Journey</p>
              <a 
                href="https://www.instagram.com/thechess_mate/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white flex items-center justify-center text-black border-2 border-black hover:bg-[#EAB308] transition-all shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="lg:pl-10">
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 flex items-center gap-2">
              <Star className="text-[#EAB308] w-5 h-5 fill-[#EAB308]" /> Navigation
            </h4>
            <ul className="grid grid-cols-1 gap-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-2 text-gray-500 hover:text-[#EAB308] font-black uppercase text-[11px] tracking-[0.2em] transition-all">
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ACADEMY SUPPORT */}
          <div className="lg:pl-10">
            <h4 className="text-lg font-black uppercase tracking-widest mb-8 flex items-center gap-2">
              <Shield className="text-[#EAB308] w-5 h-5" /> Support Center
            </h4>
            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 border-2 border-white/10 flex items-center justify-center bg-white/5 shrink-0">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#EAB308]" />
                </div>
                <div>
                    <p className="text-[9px] font-black uppercase text-gray-500 mb-1">Direct Lines</p>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs md:text-sm font-black tracking-widest hover:text-[#EAB308] transition-colors cursor-pointer">+91 79907 75581</span>
                      <span className="text-xs md:text-sm font-black tracking-widest hover:text-[#EAB308] transition-colors cursor-pointer">+91 87330 84949</span>
                    </div>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 border-2 border-white/10 flex items-center justify-center bg-white/5 shrink-0">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#EAB308]" />
                </div>
                <div>
                    <p className="text-[9px] font-black uppercase text-gray-500 mb-1">Inquiry Mail</p>
                    <span className="text-xs md:text-sm font-black tracking-widest uppercase hover:text-[#EAB308] transition-colors cursor-pointer">contact@thechessmate.org</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT AREA */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-2">
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} Chess Mate Academy. All rights reserved.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Online Elite Training</span>
                <div className="w-1 h-1 rounded-full bg-[#EAB308]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">FIDE Focussed</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-700">
              Designed with <Heart className="inline text-red-600 fill-red-600 w-3 h-3 mx-1" /> for Champions
            </p>
          </div>
        </div>
      </div>

      {/* --- FLOATING ACTION UI --- */}
      <a
         href="https://wa.me/917990775581"
         target="_blank"
         rel="noopener noreferrer"
         className="fixed bottom-8 left-8 z-50 bg-[#25D366] text-white p-4 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95 group"
      >
         <MessageCircle className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" fill="currentColor" />
      </a>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-[#EAB308] text-black border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-none active:scale-95 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}
      >
        <ArrowUp className="w-6 h-6 md:w-7 md:h-7" strokeWidth={4} />
      </button>

    </footer>
  );
}