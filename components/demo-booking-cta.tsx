"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Zap, Star, Trophy } from "lucide-react";

export default function CompactCTA() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white relative overflow-hidden font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* --- BACKGROUND DECORATIONS --- */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-10 -right-10 opacity-10 text-black pointer-events-none"
      >
        <Trophy className="w-[150px] h-[150px] md:w-[250px] md:h-[250px]" strokeWidth={1} />
      </motion.div>

      {/* Responsive Decal Text */}
      <div className="absolute top-1/2 left-5 md:left-10 -translate-y-1/2 text-[5rem] md:text-[12rem] font-black text-gray-50 leading-none select-none -z-10 tracking-tighter uppercase italic">
        GO!
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-black border-[3px] md:border-4 border-black rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 shadow-[8px_8px_0px_0px_rgba(253,224,71,1)] md:shadow-[14px_14px_0px_0px_rgba(253,224,71,1)] relative overflow-hidden transition-all"
        >
          {/* Animated Background Pulse */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12">
            
            {/* LEFT: TEXT CONTENT */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-yellow-400 border-2 border-white rounded-xl mb-6 -rotate-2 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
                <Star className="w-3.5 h-3.5 text-black fill-current" />
                <span className="text-[10px] font-black uppercase tracking-widest text-black italic">Enrollment Open</span>
              </div>
              
              <h2 className="text-2xl md:text-5xl font-black text-white leading-[1.1] md:leading-none uppercase italic mb-6 tracking-tight">
                Ready to <br className="hidden sm:block" />
                <span className="text-yellow-400 underline decoration-white/30 decoration-4 underline-offset-8">Master</span> the Board?
              </h2>
              
              <p className="text-gray-400 font-bold text-sm md:text-lg max-w-sm mx-auto lg:mx-0 leading-relaxed">
                Join our top students globally. Start your journey from beginner to Grandmaster today.
              </p>
            </div>

            {/* RIGHT: ACTION BOX */}
            <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto">
              <Link
                href="/contact"
                className="group relative w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 bg-yellow-400 border-[3px] md:border-4 border-black text-black font-black uppercase tracking-[0.2em] text-xs md:text-sm rounded-2xl shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                Book Free Demo
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-black bg-gray-800 overflow-hidden shadow-[2px_2px_0px_0px_rgba(253,224,71,1)]">
                      <img src={`https://i.pravatar.cc/100?u=thechessmate${i}`} alt="User" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-[9px] md:text-[10px] font-black uppercase text-white tracking-widest leading-none">
                    Join the Elite
                  </p>
                  <p className="text-[9px] md:text-[10px] font-black uppercase text-yellow-500 tracking-widest mt-1">
                    +12 joined today
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* DECORATIVE STAMP - Scaled for Tablet/Desktop */}
          <div className="absolute -bottom-8 -left-8 hidden lg:block group-hover:rotate-0 transition-transform duration-500">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white border-4 border-black rounded-full flex flex-col items-center justify-center rotate-12 shadow-[6px_6px_0px_0px_rgba(253,224,71,1)]">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-black fill-yellow-400" />
              <p className="text-[9px] md:text-[11px] font-black uppercase mt-1">Instant</p>
              <p className="text-[9px] md:text-[11px] font-black uppercase leading-none">Access</p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}