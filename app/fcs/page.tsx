"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Search,
  Target,
  MessageSquare,
  BookOpen,
  Users,
  Trophy,
  Star,
  ChevronRight,
} from "lucide-react";
import FCSBanner from "@/components/ui/FCSBanner";
import { useDemoModal } from "@/context/DemoContext";

// ---------- Section: Hero CTA (top booking strip) ----------
function FCSHeroCTA() {
  const { openDemoModal } = useDemoModal();
  return (
    <section className="bg-[#EAB308] py-6 md:py-8 px-5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-black/60 mb-1">
            Fayetteville Chess Society × ChessMate Academy
          </p>
          <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
            FCS Members: Get a FREE 45-Minute Chess Coaching Session
          </h2>
          <p className="text-black/70 text-xs md:text-sm font-bold mt-1">
            Exclusive offer for Fayetteville Chess Society members. No payment required and no obligation to continue.
          </p>
        </div>
        <button
          id="fcs-hero-cta"
          onClick={openDemoModal}
          className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-3 px-7 py-4 bg-black text-[#EAB308] font-black text-[11px] uppercase tracking-[0.2em] border-2 border-black hover:bg-[#EAB308] hover:text-black transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-none"
        >
          Book My Free Session
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

// ---------- Section 1: Free Session Breakdown ----------
function WhatHappensDuringSession() {
  const { openDemoModal } = useDemoModal();

  const steps = [
    {
      icon: Search,
      title: "Analyze Your Recent Game",
      description:
        "We'll analyze one of your recent games from Chess.com or Lichess and go through the critical moments together. You'll get to understand not just where you went wrong, but why the mistake happened and what you could have done differently.",
    },
    {
      icon: Target,
      title: "Identify Your Strengths & Weaknesses",
      description:
        "We'll look for recurring patterns in your games, including tactical mistakes, strategic decisions, time-management issues, opening problems, or other areas that may be holding you back.",
    },
    {
      icon: MessageSquare,
      title: "Get Personalized Feedback",
      description:
        "Based on your game and current playing level, you'll receive practical recommendations about what you should work on next.",
    },
    {
      icon: BookOpen,
      title: "Experience the ChessMate Approach",
      description:
        "We'll also briefly introduce you to our coaching methodology and training platform so you can see how ChessMate approaches long-term chess improvement.",
    },
  ];

  return (
    <section className="py-14 md:py-28 px-5 sm:px-6 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Label */}
        <div className="flex items-center gap-4 mb-4">
          <span className="h-[2px] w-10 bg-[#EAB308]" />
          <span className="text-[#EAB308] text-[10px] font-black uppercase tracking-[0.4em]">Section 1</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-black uppercase tracking-tighter leading-tight mb-4">
          What Happens During Your{" "}
          <span className="text-[#EAB308]">Free</span> Chess Coaching Session?
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-medium max-w-3xl mb-14 leading-relaxed">
          Your free 45-minute session is designed to give you a practical understanding of where your chess currently stands and what you can do to improve.
        </p>
        <p className="text-gray-600 text-sm md:text-lg font-medium max-w-3xl mb-10 leading-relaxed border-l-4 border-black pl-4 -mt-4 md:-mt-8">
          Rather than giving you generic chess advice, we'll use one of your own recent games to understand your strengths, weaknesses, and recurring mistakes.
        </p>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-14">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group border-2 border-black p-5 md:p-8 hover:bg-black transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] hover:shadow-none active:bg-black active:shadow-none"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-12 h-12 bg-[#EAB308] flex items-center justify-center group-hover:bg-white transition-colors">
                  <step.icon className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-black text-black group-hover:text-white uppercase tracking-tight mb-2 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 group-hover:text-gray-300 text-sm md:text-base leading-relaxed transition-colors">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            id="fcs-session-cta"
            onClick={openDemoModal}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-black text-[#EAB308] font-black text-[12px] uppercase tracking-[0.25em] border-2 border-black hover:bg-[#EAB308] hover:text-black transition-all duration-300 shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] hover:shadow-none active:bg-[#EAB308] active:text-black"
          >
            Book My Free Session
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 2: Chess Improvement Beyond Puzzles ----------
function BeyondPuzzles() {
  const coachingItems = [
    "Personal game analysis",
    "Classical game study",
    "Tactical and calculation training",
    "Strategic understanding",
    "Opening preparation",
    "Endgame training",
    "Personalized weekly assignments",
    "Live playing with coach feedback",
  ];

  return (
    <section className="py-14 md:py-28 px-5 sm:px-6 bg-[#050505] relative overflow-hidden">
      {/* Chessboard bg */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(45deg, #EAB308 25%, transparent 25%, transparent 75%, #EAB308 75%, #EAB308),
                            linear-gradient(45deg, #EAB308 25%, transparent 25%, transparent 75%, #EAB308 75%, #EAB308)`,
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0, 30px 30px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-[2px] w-10 bg-[#EAB308]" />
          <span className="text-[#EAB308] text-[10px] font-black uppercase tracking-[0.4em]">Section 2</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
          Chess Improvement{" "}
          <span className="font-serif italic font-light text-[#EAB308] normal-case">Beyond</span>{" "}
          Puzzles & Opening Memorization
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mt-8 md:mt-12">
          {/* Left: explanation */}
          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              At ChessMate Academy, we believe that improving at chess isn't simply about solving puzzles or memorizing opening moves.
            </p>
            <p className="text-gray-400 leading-relaxed">
              We focus heavily on helping students understand how chess concepts actually work in real games.
            </p>
            <div className="border-l-4 border-[#EAB308] pl-6 py-2">
              <p className="text-gray-300 italic leading-relaxed">
                "For example, if we're studying a concept such as weak squares, we won't simply give you a collection of puzzles about weak squares. Instead, we may study a classical game where a Grandmaster identified and exploited a weak square to build an advantage and eventually win the game."
              </p>
            </div>
            <p className="text-gray-400 leading-relaxed">
              This helps students understand not only <em>what</em> a chess concept is, but also <em>how</em> and <em>when</em> to apply it in their own games.
            </p>
            <p className="text-gray-400 leading-relaxed font-medium">
              Our goal is to help students understand chess deeply enough that they can apply what they learn in their own games.
            </p>
          </div>

          {/* Right: what coaching can include */}
          <div className="bg-white/5 border border-white/10 p-5 md:p-8">
            <h3 className="text-white font-black uppercase tracking-widest text-sm mb-6 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-[#EAB308]" />
              Our coaching can include:
            </h3>
            <ul className="space-y-4">
              {coachingItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-4 text-gray-300 text-sm md:text-base"
                >
                  <CheckCircle className="w-5 h-5 text-[#EAB308] shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 3: Platform ----------
function PlatformSection() {
  const cycle = [
    { label: "Learn", desc: "Live coaching sessions" },
    { label: "Practice", desc: "Personalized platform assignments" },
    { label: "Apply", desc: "Real game performance" },
  ];

  return (
    <section className="py-14 md:py-28 px-5 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-[2px] w-10 bg-[#EAB308]" />
          <span className="text-[#EAB308] text-[10px] font-black uppercase tracking-[0.4em]">Section 3</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-black uppercase tracking-tighter leading-tight mb-6">
          More Than Just a{" "}
          <span className="text-[#EAB308]">Weekly</span> Chess Class
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mt-8 md:mt-12">
          <div className="space-y-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              ChessMate students also receive access to our <strong className="text-black">gamified training platform</strong>, allowing them to continue practicing and reinforcing what they learn between live sessions.
            </p>
            <p className="text-gray-500 leading-relaxed">
              The platform includes personalized assignments, calculation training, tactical practice, mini-games, and additional training resources.
            </p>
            <p className="text-gray-600 font-medium leading-relaxed">
              This allows students to follow a simple cycle:
            </p>

            {/* Cycle visualization */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-6 md:mt-8 overflow-x-auto pb-2">
              {cycle.map((step, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center text-center min-w-[80px] sm:min-w-[100px]">
                    <div className="w-14 h-14 bg-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] mb-3">
                      <span className="text-[#EAB308] text-xs font-black uppercase">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="text-black font-black text-sm uppercase tracking-widest">{step.label}</p>
                    <p className="text-gray-400 text-[10px] font-medium mt-1 max-w-[90px]">{step.desc}</p>
                  </div>
                  {i < cycle.length - 1 && (
                    <ChevronRight className="w-6 h-6 text-[#EAB308] shrink-0 mx-1" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Platform dashboard image */}
          <div className="border-2 border-black shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] md:shadow-[8px_8px_0px_0px_rgba(234,179,8,1)] overflow-hidden">
            <img
              src="/dashboard.jpeg"
              alt="ChessMate Training Platform Dashboard"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 4: Meet Your Coach ----------
function CoachSection() {
  const stats = [
    { value: "12+", label: "Years Competitive Chess Experience" },
    { value: "2600+", label: "Peak Online Rating" },
    { value: "2×", label: "Represented India at International Events" },
    { value: "FIDE", label: "Rated Chess Coach" },
  ];

  return (
    <section className="py-14 md:py-28 px-5 sm:px-6 bg-[#050505] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(45deg, #EAB308 25%, transparent 25%, transparent 75%, #EAB308 75%, #EAB308),
                            linear-gradient(45deg, #EAB308 25%, transparent 25%, transparent 75%, #EAB308 75%, #EAB308)`,
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0, 30px 30px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-[2px] w-10 bg-[#EAB308]" />
          <span className="text-[#EAB308] text-[10px] font-black uppercase tracking-[0.4em]">Section 4</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-8 md:mb-12">
          Meet Your{" "}
          <span className="font-serif italic font-light text-[#EAB308] normal-case">Coach</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start lg:items-center">
          {/* Coach info */}
          <div className="space-y-5">
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap sm:flex-nowrap">
              <div className="w-20 h-20 border-2 border-[#EAB308] bg-[#111] flex items-center justify-center shrink-0">
                <Trophy className="w-8 h-8 text-[#EAB308]" />
              </div>
              <div>
                <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight uppercase">Devam Makwana</h3>
                <p className="text-[#EAB308] text-sm font-bold uppercase tracking-widest mt-1">
                  Founder & Head Coach, ChessMate Academy
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed">
              A competitive chess player and FIDE-rated chess coach with more than 12 years of competitive chess experience.
            </p>
            <p className="text-gray-500 leading-relaxed">
              ChessMate Academy provides personalized online chess coaching for both children and adults, from beginners to advanced competitive players.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-[#EAB308]/30 bg-white/5 p-4 md:p-6 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-[#EAB308] font-black text-2xl md:text-4xl mb-2 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 5: Who Is This For ----------
function WhoIsThisFor() {
  const audiences = [
    {
      icon: Star,
      title: "Beginners",
      description:
        "Build a strong foundation and understand the fundamentals of chess properly.",
    },
    {
      icon: Target,
      title: "Improving Players",
      description:
        "Identify recurring weaknesses, overcome rating plateaus, and develop a more structured approach to improvement.",
    },
    {
      icon: Trophy,
      title: "Tournament Players",
      description:
        "Improve calculation, strategy, preparation, decision-making, and practical performance.",
    },
  ];

  return (
    <section className="py-14 md:py-28 px-5 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <span className="h-[2px] w-10 bg-[#EAB308]" />
          <span className="text-[#EAB308] text-[10px] font-black uppercase tracking-[0.4em]">Section 5</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-black uppercase tracking-tighter leading-tight mb-4">
          Who Is This{" "}
          <span className="text-[#EAB308]">Session</span> For?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12">
          {audiences.map((aud, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group border-2 border-black p-6 md:p-8 hover:bg-black transition-all duration-300 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] hover:shadow-none active:bg-black active:shadow-none text-center"
            >
              <div className="w-16 h-16 bg-[#EAB308] flex items-center justify-center mx-auto mb-6 group-hover:bg-white transition-colors">
                <aud.icon className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-black group-hover:text-white font-black text-xl uppercase tracking-tight mb-3 transition-colors">
                {aud.title}
              </h3>
              <p className="text-gray-500 group-hover:text-gray-300 text-sm leading-relaxed transition-colors">
                {aud.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 border-l-4 border-[#EAB308] pl-6 py-2">
          <p className="text-gray-600 text-lg font-medium">
            You don't need to be a highly rated player to benefit from the session. The assessment is designed around your current level and your individual goals.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- Section 6: Final CTA ----------
function FinalCTA() {
  const { openDemoModal } = useDemoModal();

  return (
    <section className="py-14 md:py-28 px-5 sm:px-6 bg-[#050505] relative overflow-hidden">
      {/* Chessboard bg */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(45deg, #EAB308 25%, transparent 25%, transparent 75%, #EAB308 75%, #EAB308),
                            linear-gradient(45deg, #EAB308 25%, transparent 25%, transparent 75%, #EAB308 75%, #EAB308)`,
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0, 30px 30px",
        }}
      />
      <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[#EAB308]/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-[1px] w-10 bg-[#EAB308]" />
          <span className="text-[#EAB308] text-[10px] font-black uppercase tracking-[0.4em]">Section 6</span>
          <span className="h-[1px] w-10 bg-[#EAB308]" />
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
          Ready to Find Out Where Your{" "}
          <span className="font-serif italic font-light text-[#EAB308] normal-case">Chess</span>{" "}
          Can Improve?
        </h2>

        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-6">
          Book your free 45-minute one-on-one chess coaching session with ChessMate Academy.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 md:gap-4 mb-8 md:mb-10 text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#EAB308]" />
            Analyze your game
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#EAB308]" />
            Identify your weaknesses
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#EAB308]" />
            Get a clearer direction
          </div>
        </div>

        <button
          id="fcs-final-cta"
          onClick={openDemoModal}
          className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 md:px-12 md:py-6 bg-[#EAB308] text-black font-black text-[12px] md:text-[13px] uppercase tracking-[0.2em] md:tracking-[0.25em] border-2 border-[#EAB308] hover:bg-transparent hover:text-[#EAB308] transition-all duration-300 shadow-[5px_5px_0px_0px_rgba(234,179,8,0.4)] hover:shadow-none active:bg-transparent active:text-[#EAB308]"
        >
          Book My Free Session
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <p className="text-gray-600 text-xs font-bold uppercase tracking-widest mt-6">
          Your first session is completely free. No payment required and no obligation to continue.
        </p>
      </div>
    </section>
  );
}

// ---------- Main Page ----------
export default function FCSPage() {
  return (
    <div className="min-h-screen">
      {/* Banner — matching other pages */}
      <FCSBanner />

      {/* Hero strip with partnership intro */}
      <FCSHeroCTA />

      {/* Body sections */}
      <WhatHappensDuringSession />
      <BeyondPuzzles />
      <PlatformSection />
      <CoachSection />
      <WhoIsThisFor />
      <FinalCTA />
    </div>
  );
}
