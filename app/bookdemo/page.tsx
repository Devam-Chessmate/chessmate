"use client";

import React from "react";
import { 
  Calendar, 
  Clock, 
  Target,
  BookOpen,
  Trophy,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { useDemoModal } from "@/context/DemoContext";
import TestimonialSection from "@/components/testimonials-section";
import Link from "next/link";

export default function BookDemoPage() {
  const { openDemoModal } = useDemoModal();

  const features = [
    { icon: <Clock className="w-6 h-6 md:w-8 md:h-8" />, text: "30-Min Session", subtext: "Live with an expert coach", color: "bg-white" },
    { icon: <Target className="w-6 h-6 md:w-8 md:h-8" />, text: "Skill Assessment", subtext: "Personalized feedback", color: "bg-yellow-400" },
    { icon: <BookOpen className="w-6 h-6 md:w-8 md:h-8" />, text: "Sample Lesson", subtext: "Experience our teaching", color: "bg-white" },
    { icon: <Trophy className="w-6 h-6 md:w-8 md:h-8" />, text: "Growth Roadmap", subtext: "Custom learning plan", color: "bg-yellow-400" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-yellow-400 selection:text-black overflow-hidden pt-20">
      
      {/* --- BACKGROUND DECOR --- */}
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-10 left-[5%] w-12 h-12 md:w-16 md:h-16 rounded-full bg-yellow-400 border-[3px] md:border-4 border-black z-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute bottom-10 right-[5%] w-24 h-24 md:w-32 md:h-32 rounded-full border-2 md:border-4 border-dashed border-black/10 z-0" />
      
      {/* Ghost Decal - Responsive Sizing */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[6rem] md:text-[15rem] font-black text-gray-50 leading-none select-none -z-10 tracking-tighter uppercase italic text-center opacity-60">
        DEMO
      </div>

      {/* --- FEATURES SECTION --- */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="text-yellow-500 fill-current w-5 h-5 md:w-6 md:h-6" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-black italic">Preview Mastery</span>
            </div>
            
            {/* Heading: 2xl on mobile, 5xl on desktop */}
            <h2 className="text-2xl md:text-5xl font-black text-black leading-tight md:leading-none uppercase italic tracking-tighter">
              Experience Professional <br className="hidden md:block" />
              <span className="bg-black text-white px-4 py-1 border-[3px] md:border-4 border-black shadow-[6px_6px_0px_0px_rgba(253,224,71,1)] md:shadow-[8px_8px_0px_0px_rgba(253,224,71,1)] inline-block mt-3 md:mt-0 transform -rotate-1">
                Chess Training.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -8 }}
                className={`relative p-8 border-[3px] md:border-4 border-black rounded-[2rem] md:rounded-[2.5rem] transition-all duration-300 ${feature.color} ${index % 2 === 0 ? 'shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : 'shadow-[8px_8px_0px_0px_rgba(253,224,71,1)]'} hover:shadow-none hover:translate-x-1 hover:translate-y-1`}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl border-2 border-black flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] bg-white text-black">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black uppercase italic leading-none mb-3">{feature.text}</h3>
                <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">{feature.subtext}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVIEWS & TESTIMONIALS (AUTOSCROLLING) --- */}
      <TestimonialSection />

      {/* --- FINAL CTA SECTION --- */}
      <section className="py-16 md:py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(white 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <motion.div 
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center gap-2 bg-yellow-400 border-[3px] border-black px-4 py-1.5 md:px-6 md:py-2 rounded-xl mb-10 shadow-[4px_4px_0px_0px_white] md:shadow-[6px_6px_0px_0px_white]"
          >
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-black fill-current" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-black italic">Limited Slots Available</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic leading-[1.1] md:leading-[0.9] mb-12 tracking-tight">
            Ready to <span className="text-yellow-400 underline decoration-white/30 decoration-8 underline-offset-8">Transform</span> Your Game?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={openDemoModal}
              className="w-full sm:w-auto group bg-yellow-400 text-black border-[3px] md:border-4 border-black font-black uppercase italic py-5 md:py-6 px-10 md:px-12 rounded-2xl text-base md:text-lg flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_white] md:shadow-[8px_8px_0px_0px_white] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95"
            >
              <Calendar className="w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
              <span>Book Free Demo Now</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <Link
  href="/courses"   // change to your actual route
  className="w-full sm:w-auto inline-flex group border-[3px] md:border-4 border-white text-white font-black uppercase italic py-5 md:py-6 px-10 md:px-12 rounded-2xl text-base md:text-lg items-center justify-center gap-3 hover:bg-white hover:text-black transition-all active:scale-95 text-center"
>
  <span>View Programs</span>
  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
</Link>
          </div>
        </div>
      </section>
    </div>
  );
}