"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Star, 
  Users, 
  Zap, 
  CheckCircle2,
  Award,
  Trophy,
  Target,
  Rocket
} from "lucide-react";
import TeamSection from "@/components/ui/team-section";
import TestimonialsSection from "@/components/testimonials-section";
import { useDemoModal } from "@/context/DemoContext";

// --- DATA ---
const MAIN_COACHES = [
  {
    name: "Hariharan N",
    role: "Kids & Beginner Friendly Coach",
    specialty: "Foundations & Engagement",
    bio: "Makes chess fun and accessible for young minds, focusing on building a rock-solid foundation of confidence.",
    color: "bg-white",
    shadow: "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
  },
  {
    name: "Veeramani U",
    role: "Intermediate Coach",
    specialty: "Tactics & Opening Strategy",
    bio: "Bridging the gap to competitive play by sharpening tactical vision and developing a professional opening repertoire.",
    color: "bg-yellow-400",
    shadow: "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
  },
  {
    name: "Barani",
    role: "Advanced Coach",
    specialty: "Endgames & Elite Analysis",
    bio: "High-tier training for tournament players. Master deep positional play and professional endgame execution.",
    color: "bg-black",
    textColor: "text-white",
    shadow: "shadow-[6px_6px_0px_0px_rgba(253,224,71,1)] md:shadow-[8px_8px_0px_0px_rgba(253,224,71,1)]"
  }
];

const WHY_US = [
  { title: "Personalized Feedback", icon: Users },
  { title: "Progress Tracking", icon: Target },
  { title: "Motivational Support", icon: Zap },
  { title: "Tournament Guidance", icon: Trophy },
  { title: "Modern Methods", icon: Rocket },
];

export default function CoachesPage() {
  const { openDemoModal } = useDemoModal();
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-yellow-400">
      
      {/* --- HERO BANNER --- */}
      <section className="relative w-full bg-white overflow-hidden pt-28 md:pt-36 pb-16 md:pb-20 border-b-4 border-black">
        {/* Animated Background Doodles */}
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-10 left-[8%] w-12 h-12 md:w-20 md:h-20 rounded-full bg-yellow-400 border-[3px] md:border-4 border-black z-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-12 right-[12%] w-24 h-24 md:w-32 md:h-32 rounded-full border-2 md:border-4 border-dashed border-black/10 z-0" />
        
        {/* Responsive Ghost Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6rem] md:text-[15rem] font-black text-gray-50 leading-none select-none -z-10 tracking-tighter uppercase italic">
          MENTORS
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-[2px] w-6 md:w-8 bg-yellow-400"></div>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-black italic">Expert Faculty</span>
            <div className="h-[2px] w-6 md:w-8 bg-yellow-400"></div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-black leading-tight uppercase italic mb-8 tracking-tighter">
            Meet Our <span className="text-white [-webkit-text-stroke:1.5px_black] md:[-webkit-text-stroke:2px_black] drop-shadow-[4px_4px_0px_rgba(253,224,71,1)]">Coaches.</span>
          </h1>

          <p className="max-w-2xl text-base md:text-lg font-bold text-gray-600 mb-10">
            At Chessmate Academy, our coaches are passionate mentors committed to turning every student into a Grandmaster in the making.
          </p>
          
          <nav className="inline-flex items-center gap-3 bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl border-[3px] md:border-4 border-black shadow-[5px_5px_0px_0px_rgba(253,224,71,1)] md:shadow-[8px_8px_0px_0px_rgba(253,224,71,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
            <a href="/" className="text-[10px] md:text-xs font-black uppercase tracking-widest hover:text-yellow-400">Home</a>
            <ChevronRight className="w-4 h-4 text-yellow-400" strokeWidth={4} />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-yellow-400">Our Team</span>
          </nav>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <TeamSection/>

      {/* --- MAIN COACHES GRID --- */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {MAIN_COACHES.map((coach, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className={`relative p-6 md:p-8 border-[3px] md:border-[4px] border-black rounded-[2rem] md:rounded-[2.5rem] flex flex-col transition-all ${coach.color} ${coach.textColor || 'text-black'} ${coach.shadow}`}
              >
                {/* Photo Placeholder */}
                <div className="aspect-square mb-6 border-[3px] md:border-4 border-black rounded-3xl bg-gray-200 flex items-center justify-center relative overflow-hidden group">
                  <Users className="w-12 h-12 md:w-16 md:h-16 opacity-20" />
                  <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/10 transition-colors" />
                  <div className="absolute bottom-4 right-4 bg-white border-2 border-black p-2 rounded-xl transform rotate-12">
                    <Star className="w-5 h-5 text-black" fill="currentColor" />
                  </div>
                </div>

                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-60 italic">{coach.specialty}</p>
                <h3 className="text-2xl md:text-3xl font-black uppercase italic leading-none mb-2">{coach.name}</h3>
                <div className={`self-start px-3 py-1 rounded-lg border-2 border-black text-[9px] md:text-[11px] font-black uppercase mb-6 ${idx === 2 ? 'bg-yellow-400 text-black' : 'bg-black text-white'}`}>
                  {coach.role}
                </div>
                
                <p className="text-sm md:text-[15px] font-bold leading-relaxed opacity-80 mb-8 flex-grow">
                  {coach.bio}
                </p>

               <button
  onClick={openDemoModal}
  className={`w-full py-4 rounded-xl border-[3px] border-black font-black text-[10px] md:text-xs uppercase tracking-widest transition-all active:translate-y-1 active:shadow-none text-center
  ${
    idx === 2
      ? "bg-yellow-400 text-black shadow-[4px_4px_0px_0px_white]"
      : "bg-white text-black shadow-[4px_4px_0px_0px_black]"
  }`}
>
  Book Free Demo
</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ASSISTANT COACH SECTION --- */}
      <section className="py-16 md:py-20 border-y-4 border-black bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-yellow-400 border-[3px] md:border-[4px] border-black p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="w-24 h-24 md:w-48 md:h-48 shrink-0 rounded-full border-[3px] md:border-4 border-black bg-white flex items-center justify-center shadow-[4px_4px_0px_0px_black]">
              <Award className="w-10 h-10 md:w-16 md:h-16" />
            </div>
            <div>
              <div className="inline-block px-3 py-1 bg-black text-white text-[9px] md:text-[10px] font-black uppercase rounded-full mb-4">Support Team</div>
              <h2 className="text-2xl md:text-4xl font-black uppercase italic mb-6 leading-tight tracking-tighter">♟️ Assistant Coach – <br/><span className="bg-white px-2 border-2 border-black">Join Our Team</span></h2>
              <ul className="space-y-3 md:space-y-4">
                {["Experience in beginner & intermediate training", "Patient and engaging teaching method", "Focus on fundamentals & confidence building"].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
                    <span className="text-sm md:text-lg font-black uppercase tracking-tight">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY OUR COACHES STAND OUT --- */}
      <section className="py-16 md:py-24 bg-black text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
          <Trophy className="w-48 h-48 md:w-[300px] md:h-[300px]" strokeWidth={1} />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic mb-4 tracking-tighter">
              Why Our Coaches <span className="text-yellow-400 block md:inline">Stand Out.</span>
            </h2>
            <div className="h-1 w-16 md:w-24 bg-yellow-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {WHY_US.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                className="bg-white text-black border-[3px] md:border-4 border-yellow-400 p-5 md:p-6 rounded-2xl flex flex-col items-center text-center shadow-[4px_4px_0px_0px_white] md:shadow-[6px_6px_0px_0px_white]"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 border-2 border-black rounded-xl flex items-center justify-center mb-4 transform -rotate-6">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-tight leading-tight">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REVIEWS & TESTIMONIALS (AUTOSCROLLING) --- */}
      <TestimonialsSection />

      {/* --- FINAL CTA --- */}
      <section className="py-16 md:py-24 bg-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-5xl font-black uppercase italic mb-8 leading-tight tracking-tighter">
          Ready to learn from <br /> the <span className="bg-yellow-400 px-2 border-2 border-black">best?</span>
        </h2>
        
        {/* Updated from Link to button */}
        <button
          onClick={openDemoModal}
          className="inline-flex items-center justify-center px-10 md:px-12 py-5 md:py-6 bg-black text-white border-[3px] md:border-4 border-black rounded-2xl font-black uppercase tracking-widest text-xs md:text-lg shadow-[6px_6px_0px_0px_rgba(253,224,71,1)] md:shadow-[10px_10px_0px_0px_rgba(253,224,71,1)] transition-all hover:translate-x-2 hover:translate-y-2 hover:shadow-none active:scale-95"
        >
          Book a Demo Class
        </button>
      </div>
    </section>

    </div>
  );
}