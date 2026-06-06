"use client";
import React from "react";
import { 
  Gamepad2, 
  BookOpenCheck, 
  Zap, 
  Target, 
  ChevronRight,
  Layout,
  Trophy
} from "lucide-react";
import Link from "next/link";

export default function PlatformSection() {
  const features = [
    {
      title: "Interactive Training Academy",
      desc: "Comprehensive video lessons and interactive drills to master fundamentals.",
      icon: Layout,
      color: "text-blue-500"
    },
    {
      title: "Tactical Reflex Builder",
      desc: "Speed-training modules designed to help you spot patterns in milliseconds.",
      icon: Zap,
      color: "text-purple-500"
    },
    {
      title: "Smart Assignments & Tests",
      desc: "Personalized homework and weekly quizzes to track your growth curve.",
      icon: BookOpenCheck,
      color: "text-orange-500"
    },
    {
      title: "Daily Mission System",
      desc: "Solve 130+ puzzles weekly, maintain streaks, and climb the leaderboard.",
      icon: Target,
      color: "text-red-500"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden border-t-[8px] border-black">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-[1440px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* --- LEFT: CONTENT --- */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-block px-4 py-1 mb-6 bg-black text-white font-black text-[10px] uppercase tracking-[0.3em]">
                The Learning Ecosystem
              </div>
              <h2 className="text-4xl md:text-5xl font-[1000] text-black uppercase tracking-tighter leading-[0.95] mb-6">
                Not Just a Class. <br />
                <span className="text-yellow-500">A Training Arena.</span>
              </h2>
              <p className="text-gray-600 font-bold text-lg border-l-8 border-black pl-6">
                Our students get exclusive access to a gamified dashboard where learning 
                chess feels like playing an RPG. Track XP, solve puzzles, and level up.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((f, i) => (
                <div key={i} className="group flex gap-5 items-start p-4 transition-all hover:bg-gray-50 border-b-2 border-transparent hover:border-black">
                  <div className={`mt-1 p-2 bg-black shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]`}>
                    <f.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-black uppercase text-sm tracking-wider mb-1">{f.title}</h4>
                    <p className="text-gray-500 text-sm font-medium leading-tight">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="https://classroom.thechessmate.org/" className="inline-block mt-4">

            <button className="flex items-center gap-3 px-8 py-4 bg-black text-white font-black text-xs uppercase tracking-widest hover:bg-yellow-500 hover:text-black transition-all group shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
              Explore the Platform <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            </Link>
          </div>

          {/* --- RIGHT: DASHBOARD IMAGE --- */}
          <div className="lg:col-span-7 relative">
            {/* The "Window" Frame for the UI */}
            <div className="relative z-10 border-[6px] md:border-[10px] border-black shadow-[20px_20px_0px_0px_rgba(234,179,8,1)] bg-[#0f172a] overflow-hidden">
              {/* Window Header */}
              <div className="bg-black py-3 px-6 flex items-center justify-between border-b-4 border-black">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Student_Dashboard_v2.0
                </div>
              </div>
              
              {/* The Actual Image - Point this to your dashboard screenshot path */}
              <img 
                src="/dashboard.jpeg" 
                alt="Student Dashboard UI" 
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Decorative Floating Badges (Emphasizing the UI features) */}
            <div className="absolute -top-10 -right-4 md:-right-8 z-20 bg-white border-4 border-black p-4 hidden sm:block animate-bounce shadow-xl">
               <div className="flex items-center gap-3">
                  <Trophy className="text-yellow-500" size={24} />
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase leading-none">Status</div>
                    <div className="text-sm font-black text-black uppercase leading-none">Level 1 reached</div>
                  </div>
               </div>
            </div>

            <div className="absolute -bottom-6 -left-6 md:-left-12 z-20 bg-yellow-500 border-4 border-black p-4 hidden sm:block shadow-xl">
               <div className="flex items-center gap-3">
                  <Gamepad2 className="text-black" size={24} />
                  <div className="text-sm font-black text-black uppercase tracking-tighter">
                    Play 1 Mini Game <span className="block text-[10px] opacity-70">Daily Mission</span>
                  </div>
               </div>
            </div>

            {/* Background geometric accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gray-100 -z-10 rounded-full blur-[100px]"></div>
          </div>

        </div>
      </div>
    </section>
  );
}