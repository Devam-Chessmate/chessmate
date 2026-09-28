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
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.5)] border-2 border-white hover:scale-110 active:scale-95 transition-all duration-300 group"
      >
        <span className="absolute left-full ml-3 px-3 py-1.5 bg-black text-white text-xs font-black uppercase tracking-wider rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg border border-white/20">
          Chat on WhatsApp
        </span>
        <svg
          viewBox="0 0 32 32"
          className="w-8 h-8 md:w-9 md:h-9 fill-white drop-shadow"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.002 2C8.28 2 2.02 8.26 2.02 15.982c0 2.62.72 5.17 2.08 7.39L2 30l6.83-2.05c2.16 1.25 4.63 1.91 7.17 1.91 7.72 0 13.98-6.26 13.98-13.98S23.724 2 16.002 2zm0 25.56c-2.22 0-4.39-.59-6.3-1.71l-.45-.27-4.66 1.4 1.42-4.52-.29-.47a11.517 11.517 0 0 1-1.77-6.01c0-6.37 5.19-11.56 11.56-11.56 6.38 0 11.57 5.19 11.57 11.56 0 6.37-5.19 11.58-11.08 11.58zm6.34-8.67c-.35-.17-2.07-1.02-2.39-1.14-.32-.12-.55-.17-.79.17-.23.35-.91 1.14-1.12 1.38-.2.23-.41.26-.76.09-.35-.17-1.47-.54-2.81-1.73-1.04-.93-1.75-2.07-1.95-2.42-.2-.35-.02-.54.15-.71.16-.16.35-.41.52-.61.18-.21.23-.35.35-.58.12-.23.06-.44-.03-.61-.09-.17-.79-1.9-1.08-2.6-.28-.68-.57-.59-.79-.6-.2-.01-.44-.01-.67-.01-.23 0-.61.09-.93.44-.32.35-1.23 1.2-1.23 2.93 0 1.73 1.26 3.4 1.44 3.63.17.23 2.47 3.77 5.98 5.29.84.36 1.49.58 2 .74.84.27 1.61.23 2.22.14.68-.1 2.07-.85 2.36-1.66.29-.82.29-1.52.2-1.66-.08-.14-.32-.23-.67-.4z" />
        </svg>
      </a>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-[#EAB308] text-black border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-none active:scale-95 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}
      >
        <ArrowUp className="w-6 h-6 md:w-7 md:h-7" strokeWidth={4} />
      </button>

    </footer>
  );
}