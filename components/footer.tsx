"use client";

import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Instagram,
  ArrowUp,
  Star,
  Shield,
  ChevronRight,
  BookOpen,
  Brain,
  Monitor,
  Zap,
  Globe
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Exactly matches Header Courses
  const COURSE_LINKS = [
    { name: "All Courses", href: "/courses" },
    { name: "Chess for Adults", href: "/chess-classes-for-adults" },
  ];

  // Exactly matches Header Practice
  const PRACTICE_LINKS = [
    { name: "24/7 Training Platform", href: "/platform" },
    { name: "Daily Tactics & Puzzles", href: "/puzzles" },
    { name: "Beginner Puzzles", href: "/puzzles/beginner" },
    { name: "Intermediate Tactics", href: "/puzzles/intermediate" },
    { name: "Advanced Calculation", href: "/puzzles/advanced" },
    { name: "Classroom Login", href: "https://classroom.thechessmate.org", external: true },
  ];

  // Exactly matches Header Main Nav Items
  const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Blogs", href: "/blog" },
    { name: "Payments", href: "/pay" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="relative bg-[#000000] text-white pt-16 md:pt-24 pb-12 overflow-hidden selection:bg-[#EAB308] selection:text-black border-t-[10px] border-black">
      
      {/* Background Architectural Decal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] font-[1000] text-white/[0.02] leading-none select-none -z-0 tracking-tighter uppercase italic pointer-events-none">
        CHESS
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          
          {/* BRAND COLUMN (Col 4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3.5 group inline-flex">
              <div className="w-14 h-14 bg-white border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] overflow-hidden p-1 transition-all">
                <img 
                  src="/logo.jpg" 
                  alt="Chessmate Academy Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="leading-none">
                <h3 className="text-xl md:text-2xl font-[1000] uppercase tracking-tighter text-white">
                  Chess<span className="text-[#EAB308]">Mate</span>
                </h3>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#EAB308] mt-1">
                  Elite Chess Academy
                </p>
              </div>
            </Link>

            <p className="text-gray-400 text-xs md:text-sm font-bold leading-relaxed max-w-sm">
              Premier international chess academy offering personalized 1-on-1 coaching, 24/7 training software, and FIDE-certified mentorship for children, adults, and tournament aspirants.
            </p>

            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EAB308]">
                Connect With Us
              </p>
              <div className="flex items-center gap-3">
                <a 
                  href="https://www.instagram.com/thechess_mate/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Visit ChessMate on Instagram"
                  title="Follow ChessMate on Instagram"
                  className="w-11 h-11 bg-white flex items-center justify-center text-black border-2 border-black hover:bg-[#EAB308] transition-all shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a 
                  href="https://wa.me/917990775581" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Direct WhatsApp Admission Support"
                  title="Chat with ChessMate on WhatsApp"
                  className="px-4 py-2.5 bg-[#25D366] text-white border-2 border-black font-[1000] text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                >
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMN 2: COURSES (Col 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-[1000] uppercase tracking-widest text-[#EAB308] mb-6 flex items-center gap-2 border-b-2 border-white/10 pb-2">
              <Star className="w-4 h-4 fill-[#EAB308]" /> Courses
            </h4>
            <ul className="space-y-3">
              {COURSE_LINKS.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-400 hover:text-[#EAB308] font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#EAB308] group-hover:translate-x-1 transition-transform shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: PRACTICE & PLATFORM (Col 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-[1000] uppercase tracking-widest text-[#EAB308] mb-6 flex items-center gap-2 border-b-2 border-white/10 pb-2">
              <Brain className="w-4 h-4" /> Practice
            </h4>
            <ul className="space-y-2.5">
              {PRACTICE_LINKS.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-gray-400 hover:text-[#EAB308] font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#EAB308] group-hover:translate-x-1 transition-transform shrink-0" />
                      <span>{link.name} ↗</span>
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-gray-400 hover:text-[#EAB308] font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#EAB308] group-hover:translate-x-1 transition-transform shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: EXPLORE & SUPPORT (Col 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-[1000] uppercase tracking-widest text-[#EAB308] mb-6 flex items-center gap-2 border-b-2 border-white/10 pb-2">
              <Shield className="w-4 h-4" /> Quick Links
            </h4>
            <div className="space-y-5">
              <ul className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="group flex items-center gap-1.5 text-gray-400 hover:text-[#EAB308] font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      <ChevronRight className="w-3 h-3 text-[#EAB308] shrink-0" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="space-y-1 pt-2 border-t border-white/10">
                <p className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Admissions Call</p>
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+917990775581" className="text-xs font-black text-white hover:text-[#EAB308] transition-colors">
                    +91 79907 75581
                  </a>
                  <a href="tel:+918733084949" className="text-xs font-black text-white hover:text-[#EAB308] transition-colors">
                    +91 87330 84949
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase text-gray-400 tracking-wider">Email Inquiry</p>
                <a href="mailto:contact@thechessmate.org" className="text-xs font-black text-white hover:text-[#EAB308] transition-colors break-all">
                  contact@thechessmate.org
                </a>
              </div>

              <div className="pt-2">
                <Link
                  href="/bookdemo"
                  className="inline-block w-full py-2.5 bg-[#EAB308] text-black font-[1000] text-[10px] uppercase tracking-widest text-center border-2 border-black hover:bg-white transition-colors"
                >
                  Book Free Demo
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.25em]">
            © {new Date().getFullYear()} Chessmate Academy. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-wider text-gray-400">
            <Link href="/terms" className="hover:text-[#EAB308]">Terms & Privacy</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-[#EAB308]">Contact Us</Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-[#EAB308]">Sitemap</Link>
          </div>
        </div>

      </div>

      {/* --- FLOATING WHATSAPP BUTTON --- */}
      <a
        href="https://wa.me/917990775581"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Chessmate Academy on WhatsApp"
        title="Chat on WhatsApp"
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

      {/* --- SCROLL TO TOP --- */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        className={`fixed bottom-6 right-6 z-50 p-4 bg-[#EAB308] text-black border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-none active:scale-95 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}
      >
        <ArrowUp className="w-6 h-6 md:w-7 md:h-7" strokeWidth={4} />
      </button>

    </footer>
  );
}