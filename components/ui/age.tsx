"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, CheckCircle2, Users, Target, ArrowRight } from "lucide-react";
import { useDemoModal } from "@/context/DemoContext";

export default function AgeInclusiveSection() {
  const { openDemoModal } = useDemoModal();

  const categories = [
    {
      title: "Young Prodigies (Age 5+)",
      desc: "Building focus, patience, and logical reasoning through gamified learning.",
    },
    {
      title: "Competitive Teens",
      desc: "Advanced tactical training and preparation for State & National arenas.",
    },
    {
      title: "Adults & Professionals",
      desc: "Strategic depth, decision-making mastery, and mental sharping for all levels.",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden selection:bg-[#EAB308] border-t-[10px] border-black">
      
      {/* Background Architectural Decal */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[10rem] md:text-[20rem] font-[1000] text-gray-50 leading-none select-none -z-0 tracking-tighter uppercase italic opacity-80 pointer-events-none">
        ANY AGE
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* --- LEFT CONTENT --- */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Users className="text-[#EAB308] w-6 h-6" />
                <span className="text-[10px] md:text-xs font-[1000] uppercase tracking-[0.4em] text-black italic">No Age Barriers</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-[1000] text-black leading-[0.9] uppercase tracking-tighter mb-8">
                CHESS FOR <br />
                <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] [-webkit-text-stroke:2px_black]">EVERY GENERATION.</span>
              </h2>
              
              <p className="text-gray-500 font-bold text-sm md:text-lg leading-relaxed max-w-xl">
                We believe the 64 squares offer a lifetime of learning. 
                We teach kids as young as <span className="text-black underline decoration-[#EAB308] decoration-4">5 years old</span> to 
                adults with <span className="text-black underline decoration-[#EAB308] decoration-4">no age limits.</span>
              </p>
            </div>

            {/* Age Categories List */}
            <div className="space-y-6">
              {categories.map((cat, i) => (
                <div key={i} className="group flex items-start gap-4 p-5 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <div className="bg-[#EAB308] p-2 border-2 border-black shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-black" strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-sm md:text-base font-[1000] uppercase tracking-tight text-black mb-1">{cat.title}</h4>
                    <p className="text-[11px] md:text-xs font-bold text-gray-400 uppercase tracking-widest leading-tight">{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={openDemoModal}
              className="inline-flex items-center gap-4 bg-black text-[#EAB308] px-10 py-5 font-[1000] uppercase text-xs tracking-[0.2em] border-2 border-black shadow-[8px_8px_0px_0px_rgba(234,179,8,1)] hover:bg-[#EAB308] hover:text-black hover:shadow-none transition-all active:scale-95"
            >
              Book Free Demo
              <ArrowRight className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>

          {/* --- RIGHT VISUAL: TWO-IMAGE STAGGERED LAYOUT --- */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-square md:aspect-[4/5] max-w-[500px] mx-auto">
              
              {/* Image 1: Top Right (Adult/Older Student) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute top-0 right-0 w-[80%] h-[60%] border-4 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden z-10"
              >
                <img 
                  src="/adult.webp" 
                  alt="Adult Learning Chess" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                />
              </motion.div>

              {/* Image 2: Bottom Left (Young Kid) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 w-[70%] h-[55%] border-4 border-black shadow-[15px_15px_0px_0px_rgba(234,179,8,1)] bg-white overflow-hidden z-20"
              >
                <img 
                  src="/kid.jpg" 
                  alt="Kid Learning Chess" 
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-[#EAB308] text-black px-3 py-1 font-[1000] text-[9px] uppercase border-2 border-black">
                  Since age 5
                </div>
              </motion.div>

              {/* Floating Decorative Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-black rotate-12 -z-0 opacity-10"></div>
              <Target className="absolute -top-6 -left-6 text-[#EAB308] w-12 h-12 -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}