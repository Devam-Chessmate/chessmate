"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Zap, 
  ShieldCheck, 
  Medal, 
  Trophy, 
  Star 
} from 'lucide-react';

import WorldMapInteractive from './WorldMapInteractive';

const COUNTRIES = [
  { name: "USA", code: "us" },
  { name: "India", code: "in" },
  { name: "UK", code: "gb" },
  { name: "Portugal", code: "pt" },
  { name: "Japan", code: "jp" },
  { name: "Italy", code: "it" },
  { name: "Singapore", code: "sg" },
];

const RECOGNITIONS = [
  {
    title: "Certified Federated Coaches",
    desc: "Learn from experienced players with official credentials and competitive backgrounds.",
    icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-[#EAB308]" />
  },
  {
    title: "Level-Based Certifications",
    desc: "Earn structured certificates as you progress through each stage of your chess journey.",
    icon: <Medal className="w-8 h-8 md:w-10 md:h-10 text-[#EAB308]" />
  },
  {
    title: "Performance Recognition",
    desc: "Top performers are consistently recognized through rankings, achievements, and internal rewards.",
    icon: <Trophy className="w-8 h-8 md:w-10 md:h-10 text-[#EAB308]" />
  }
];

export default function AboutInformation() {
  return (
    <div className="bg-white">
      {/* --- GLOBAL PRESENCE SECTION --- */}
      <section className="relative py-20 md:py-32 bg-white font-sans overflow-hidden selection:bg-[#EAB308] border-t-[10px] border-black">
        
        {/* Background Ghost Decal */}
        <div className="absolute top-10 left-10 text-[10rem] md:text-[20rem] font-[1000] text-gray-50 leading-none select-none -z-0 tracking-tighter uppercase italic opacity-80 pointer-events-none">
          GLOBAL
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT CONTENT: TEXT & TAGS */}
            <div className="lg:col-span-5 space-y-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-black text-[#EAB308] px-4 py-1.5 mb-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
                  <Globe className="w-4 h-4" />
                  <span className="text-[10px] font-[1000] uppercase tracking-widest">Student Network</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-[1000] text-black leading-[0.9] uppercase tracking-tighter mb-8">
                  A TRULY <br />
                  <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] [-webkit-text-stroke:2px_black]">INTERNATIONAL</span> <br />
                  COMMUNITY.
                </h2>
                
                <p className="text-gray-500 font-bold text-sm md:text-base leading-relaxed max-w-xl">
                  Chess Mate transcends borders. Our elite coaching sessions connect 
                  aspiring masters from across the globe, fostering a diverse arena 
                  of strategic excellence.
                </p>
              </div>

              {/* Country Tags - White BG Sticker Style with Real Flags */}
              <div className="flex flex-wrap gap-3">
                {COUNTRIES.map((c, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-3 bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] transition-all cursor-default"
                  >
                    <img 
                      src={`https://flagcdn.com/w40/${c.code}.png`} 
                      alt={c.name}
                      className="w-6 h-auto border border-gray-100"
                    />
                    <span className="text-[11px] font-black uppercase tracking-widest text-black">{c.name}</span>
                  </motion.div>
                ))}
                <div className="flex items-center gap-2 bg-[#EAB308] text-black border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Zap className="w-3 h-3 fill-black" />
                  <span className="text-[11px] font-black uppercase tracking-widest">Active Growth</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="pt-8 border-t-2 border-black/5 flex items-center gap-10">
                <div>
                  <p className="text-3xl font-[1000] text-black leading-none">7+</p>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Nations Reached</p>
                </div>
                <div className="w-[1px] h-10 bg-black/10"></div>
                <div>
                  <p className="text-3xl font-[1000] text-black leading-none">24/7</p>
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Global Support</p>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT: FULL COLOR MAP IMAGE */}
            <div className="lg:col-span-7 relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative border-[10px] md:border-[12px] border-black shadow-[20px_20px_0px_0px_rgba(234,179,8,1)] overflow-hidden bg-[#111827] group"
              >
                <img 
                  src="/map.png" 
                  alt="Chessmate Student Global Network" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-black text-[#EAB308] border-2 border-[#EAB308] px-3.5 py-1.5 md:px-4 md:py-2 font-black uppercase text-[9px] md:text-[10px] tracking-widest flex items-center gap-2 shadow-xl">
                  <div className="w-2 h-2 bg-[#EAB308] rounded-full animate-pulse"></div>
                  Live Student Network
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CERTIFICATION & RECOGNITION SECTION --- */}
      <section className="py-20 md:py-32 bg-white border-t-4 border-black selection:bg-[#EAB308]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 md:mb-24">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Star className="text-[#EAB308] w-6 h-6 fill-[#EAB308]" />
              <span className="text-[10px] md:text-xs font-[1000] uppercase tracking-[0.4em] text-black italic">Excellence Standards</span>
              <Star className="text-[#EAB308] w-6 h-6 fill-[#EAB308]" />
            </div>
            <h3 className="text-3xl md:text-5xl font-[1000] text-black uppercase tracking-tighter mb-4">
              RECOGNITION & <span className="text-[#EAB308]">CERTIFICATION</span>
            </h3>
            <div className="w-24 h-2 bg-black mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {RECOGNITIONS.map((r, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group p-8 md:p-12 border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(234,179,8,1)] hover:shadow-none transition-all flex flex-col items-center text-center"
              >
                <div className="mb-8 bg-black p-5 border-2 border-[#EAB308] rotate-3 group-hover:rotate-0 transition-transform">
                  {r.icon}
                </div>
                <h4 className="text-2xl font-[1000] uppercase tracking-tight text-black mb-6 leading-tight">
                  {r.title}
                </h4>
                <p className="text-sm font-bold text-gray-500 leading-relaxed uppercase tracking-wide">
                  {r.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}