"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  CheckCircle2,
  Trophy,
  Star,
  Clock,
  Shield,
  ArrowRight,
  TrendingUp,
  Brain,
  Target,
  Swords,
  BookOpen,
  Award,
  Sparkles,
  Layers,
  ChevronDown,
  Monitor,
  Flame,
  BarChart3,
  Lightbulb,
  Crosshair,
  Check,
  Gamepad2,
  RotateCcw,
  Play,
  Cpu,
  RefreshCw,
  FolderCheck,
  CalendarCheck,
  Users,
  Compass
} from "lucide-react";
import { useDemoModal } from "@/context/DemoContext";
import TestimonialSection from "@/components/testimonials-section";

// 4-Step Continuous Improvement Loop: Live Class -> Puzzles -> Solution Analysis -> Adaptive Improvement
const COACHING_LOOP_STEPS = [
  {
    step: "01",
    phase: "LIVE CLASS",
    title: "Live 1-on-1 Coaching",
    desc: "Work in-depth with your FIDE-rated mentor, learning new opening ideas, calculation methods, and middle-game concepts on an interactive digital board.",
    icon: Monitor,
    badge: "1-on-1 Session"
  },
  {
    step: "02",
    phase: "POST-CLASS PUZZLES",
    title: "Targeted Puzzles Assigned After Class",
    desc: "Right after your live lesson ends, your coach pushes curated tactical drills and position puzzles to your dashboard based directly on the topics taught and weaknesses noticed.",
    icon: FolderCheck,
    badge: "Curated Practice"
  },
  {
    step: "03",
    phase: "SOLUTION ANALYSIS",
    title: "Deep Solution & Mistake Analysis",
    desc: "As you solve your puzzles, the platform tracks your calculation speed, move accuracy, and failed branches. Your coach analyzes your solutions to detect recurring blindspots.",
    icon: BarChart3,
    badge: "Diagnostic Review"
  },
  {
    step: "04",
    phase: "ADAPT & IMPROVE",
    title: "Continuous Calibration & Improvement",
    desc: "On the basis of your puzzle solutions, your next class curriculum, homework difficulty, and training roadmap dynamically evolve to eliminate your biggest weaknesses.",
    icon: TrendingUp,
    badge: "Targeted Surge"
  }
];

// Core Features List with Benefit Workflows
const PLATFORM_CORE_FEATURES = [
  {
    id: "assignments",
    tag: "Adaptive Homework",
    title: "Personalized Weekly Assignments",
    icon: BookOpen,
    headline: "Exercises Built Around Your Exact Weaknesses",
    desc: "Generic homework doesn't work. The ChessMate platform connects directly with your coach's lesson notes to deliver custom-selected exercises that target your specific tactical or strategic blindspots.",
    workflow: [
      "Coach identifies weakness during live session",
      "Tailored assignment generated on student portal",
      "Student solves drills with instant move verification",
      "Coach reviews completion metrics & accuracy before next class"
    ],
    features: [
      "Level-appropriate exercise sets (Beginner to Master)",
      "Dynamic difficulty that scales with your rating",
      "Detailed solution walkthroughs and alternative lines",
      "Automated reminder nudges to keep you consistent"
    ],
    image: "/assign.png",
    imageAlt: "Personalized Chess Homework Dashboard"
  },
  {
    id: "puzzles",
    tag: "Tactics Engine",
    title: "10,000+ Curated Puzzle & Calculation Engine",
    icon: Brain,
    headline: "Develop Master-Level Tactical Vision & Calculation Speed",
    desc: "Stop solving random puzzles that don't fit your playing style. Filter over 10,000 hand-curated tactical exercises by specific motifs (Pins, Forks, Deflections, Back-Rank Mates) to build bulletproof pattern recognition.",
    workflow: [
      "Select tactical motif or calculation depth",
      "Solve positions under adaptive timer controls",
      "Review blunder heatmaps to see what you missed",
      "Re-attempt failed puzzles in Spaced Repetition queue"
    ],
    features: [
      "Motif-specific drill filters (100+ tactical themes)",
      "3-to-7 move deep calculation training mode",
      "Spaced repetition engine to eliminate recurring blindspots",
      "Speed rush mode to sharpen blitz and rapid reflexes"
    ],
    image: "/puzzle.png",
    imageAlt: "ChessMate Tactical Calculation Trainer"
  },
  {
    id: "analysis",
    tag: "Game Diagnostics",
    title: "Personal Game Analysis & Mistake Converter",
    icon: BarChart3,
    headline: "Turn Your Real Losses Into Your Best Training Material",
    desc: "The most effective way to improve is to learn from your own games. Import PGNs from Chess.com, Lichess, or OTB tournaments. Our diagnostic engine pinpoints the exact move your position crumbled and turns it into a personalized puzzle.",
    workflow: [
      "1-Click PGN import from Chess.com / Lichess / OTB",
      "Automated blunder and time-trouble identification",
      "Errors converted into custom training cards",
      "Coach provides voice/written commentary on key moments"
    ],
    features: [
      "Deep engine evaluation with graphical accuracy charts",
      "Opening departure point detection",
      "Time management & move-clock discipline tracking",
      "Personal 'Mistake Vault' to re-test your critical turns"
    ],
    image: "/analysis.png",
    imageAlt: "Chess Game Diagnostics and Mistake Analysis"
  },
  {
    id: "gamification",
    tag: "Engagement & Habits",
    title: "Gamified Learning & Daily Streak System",
    icon: Flame,
    headline: "Make Repetitive Practice Addictive and Rewarding",
    desc: "Consistency is the single biggest determinant of chess rating growth. ChessMate gamifies daily practice with XP rewards, streak multipliers, level-up milestones, and friendly leaderboard challenges that keep students hooked.",
    workflow: [
      "Complete 15-minute daily training mission",
      "Earn XP and maintain your daily practice streak",
      "Unlock new achievement badges and avatar titles",
      "Track your weekly position on the academy leaderboard"
    ],
    features: [
      "Daily quest system (Solve 5 tactics, review 1 game)",
      "XP progression & Academy Rank promotions",
      "Streak freeze protection for busy work/school days",
      "Milestone reward certificates signed by grandmasters"
    ],
    image: "/dash.png",
    imageAlt: "Gamified Chess Learning and Daily Streaks"
  },
  {
    id: "minigames",
    tag: "Micro-Practice",
    title: "Interactive Mini-Games & Reflex Sprints",
    icon: Gamepad2,
    headline: "Fast 2-Minute Drills When You Have Limited Time",
    desc: "Busy schedule? You don't always have time for a 60-minute classical game. Our micro-games train board coordinates, piece mobility reflexes, blindfold vision, and endgame checkmating patterns in quick 120-second bursts.",
    workflow: [
      "Pick a 2-minute skill sprint on mobile or desktop",
      "Test coordinate vision, knight hops, or speed mating",
      "Beat your personal high-score and reaction speed",
      "Log daily training credit in less than 5 minutes"
    ],
    features: [
      "Board coordinate speed drill (Find squares in ms)",
      "Knight maze navigation & spatial awareness trainer",
      "Blindfold memory & piece placement challenges",
      "Blitz king & pawn endgame race simulators"
    ],
    image: "/mini.png",
    imageAlt: "Interactive Chess Mini Games and Reflex Sprints"
  },
  {
    id: "tournaments",
    tag: "Competitive Arena",
    title: "Online Tournaments & Sparring Arenas",
    icon: Swords,
    headline: "Pressure-Test Your Skills in a Safe, Fair Environment",
    desc: "Weekly arena tournaments, Swiss cups, and rapid sparring sessions organized exclusively for ChessMate academy students. Play against verified peers, practice your openings, and build real tournament confidence.",
    workflow: [
      "Join weekly Swiss and Arena club tournaments",
      "Compete under standard rapid and blitz clock settings",
      "Receive automated post-tournament performance reports",
      "Analyze your tournament games directly with your coach"
    ],
    features: [
      "Fair-play monitored internal academy matchmaking",
      "Custom time controls (Classical, Rapid, Blitz)",
      "Live leaderboard standings and rating tracking",
      "Direct integration with coach review dashboards"
    ],
    image: "/tour.png",
    imageAlt: "Online Chess Tournaments and Arena Matches"
  }
];

// Built for Different Levels Data
const LEVEL_TRACKS = [
  {
    id: "beginner",
    level: "Beginner",
    rating: "0 - 1000",
    headline: "Building Rock-Solid Fundamentals",
    desc: "The platform emphasizes piece safety, board coordinate familiarity, basic mating patterns, and blunder prevention habits.",
    tasks: [
      "Mate-in-1 and Mate-in-2 pattern drills",
      "Piece capture & hanging piece identification",
      "Basic opening principle checklists",
      "Coordinate trainer mini-games"
    ]
  },
  {
    id: "intermediate",
    level: "Intermediate",
    rating: "1000 - 1500",
    headline: "Calculation & Tactical Sharpness",
    desc: "Focus shifts to 3-move calculation depth, pawn structures, opening repertoire drills, and middle-game plan selection.",
    tasks: [
      "Complex multi-move combination exercises",
      "Personal game blunder pattern elimination",
      "Repertoire quizzer for White and Black openings",
      "Lucena & Philidor rook endgame modules"
    ]
  },
  {
    id: "advanced",
    level: "Advanced",
    rating: "1500 - 1900",
    headline: "Positional Mastery & Deep Calculation",
    desc: "Advanced tactical themes, prophylactic thinking, dynamic sacrifices, and technical endgame conversion practice.",
    tasks: [
      "Candidate move evaluation & tree calculation",
      "Pawn structure imbalance & minority attacks",
      "Master game guess-the-move training",
      "Theoretical rook, knight, and opposite bishop endings"
    ]
  },
  {
    id: "tournament",
    level: "Tournament & FIDE",
    rating: "1900+",
    headline: "Championship Preparation",
    desc: "Grandmaster-level theoretical preparation, clock pressure management, deep opening novelties, and psychological readiness.",
    tasks: [
      "Full tournament PGN database review",
      "Pre-match opponent style preparation drills",
      "Complex tablebase endgame calculations",
      "High-pressure rapid & classical sparring arenas"
    ]
  }
];

export default function PlatformClientPage() {
  const { openDemoModal } = useDemoModal();
  const [selectedFeature, setSelectedFeature] = useState<string>("assignments");
  const [selectedLevel, setSelectedLevel] = useState<string>("beginner");

  const activeFeatureData =
    PLATFORM_CORE_FEATURES.find((f) => f.id === selectedFeature) ||
    PLATFORM_CORE_FEATURES[0];

  const activeLevelData =
    LEVEL_TRACKS.find((l) => l.id === selectedLevel) || LEVEL_TRACKS[0];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#EAB308] selection:text-black pt-20">
      
      {/* =========================================================================
          1. HERO: HIGH-ENERGY PRODUCT POSITIONING
      ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 bg-white border-b-8 border-black">
        
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />

        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-black text-[#EAB308] border-2 border-black shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] text-[10px] md:text-xs font-[1000] uppercase tracking-[0.25em]">
                <Zap className="w-4 h-4 fill-[#EAB308] text-[#EAB308] animate-pulse" />
                The ChessMate 24/7 Training Ecosystem
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-5xl font-[1000] text-black tracking-tighter uppercase leading-[0.95]">
                  YOUR TRAINING DOESN'T END <br />
                  <span className="text-[#EAB308] [-webkit-text-stroke:2px_black] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                    WHEN LIVE CLASS ENDS.
                  </span>
                </h1>
                
                <p className="text-black font-black tracking-[0.2em] text-xs md:text-sm uppercase">
                  Personalized Homework • 10,000+ Tactics Engine • Real Game Diagnostics
                </p>
              </div>

              <p className="text-gray-700 font-bold text-base md:text-xl leading-relaxed max-w-2xl border-l-4 md:border-l-8 border-black pl-5">
                The ChessMate Platform gives students a structured, gamified place to practice, complete coach assignments, and turn mistakes into mastery between weekly live lessons.
              </p>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {[
                  { label: "10,000+", sub: "Curated Puzzles" },
                  { label: "100%", sub: "Coach Aligned" },
                  { label: "24/7", sub: "LMS Access" },
                  { label: "Adaptive", sub: "Difficulty Curves" }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 border-2 border-black bg-gray-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="font-[1000] text-base md:text-lg uppercase text-black leading-tight">
                      {item.label}
                    </div>
                    <div className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">
                      {item.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={openDemoModal}
                  className="group px-8 py-5 bg-black text-[#EAB308] font-[1000] text-xs md:text-sm uppercase tracking-[0.2em] border-4 border-black hover:bg-[#EAB308] hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(234,179,8,1)] active:translate-x-1 active:translate-y-1 flex items-center justify-center gap-3"
                >
                  Get Platform Access in Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <a
                  href="#how-it-works"
                  className="px-8 py-5 bg-white text-black font-[1000] text-xs md:text-sm uppercase tracking-[0.2em] border-4 border-black hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
                >
                  See How It Works
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* Right Dashboard Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative max-w-[520px] mx-auto">
                
                {/* Neobrutalist Window Frame */}
                <div className="relative border-4 md:border-8 border-black bg-[#0f172a] shadow-[18px_18px_0px_0px_rgba(234,179,8,1)] overflow-hidden">
                  
                  {/* Mock Browser Header */}
                  <div className="bg-black py-3 px-4 flex items-center justify-between border-b-4 border-black">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-[10px] font-black text-[#EAB308] uppercase tracking-widest">
                      classroom.thechessmate.org
                    </div>
                  </div>

                  {/* Dashboard Image */}
                  <div className="relative h-[140px] sm:h-[200px] w-full bg-black overflow-hidden group">
                    <img
                      src="/dashboard.jpeg"
                      alt="ChessMate Interactive Student LMS Dashboard"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Live Gamification Overlay Widget */}
              

                    <div className="absolute bottom-4 left-4 bg-white text-black border-2 border-black p-3 font-black text-left shadow-lg">
                      <div className="text-[9px] uppercase tracking-widest text-gray-500">
                        Current Assignment
                      </div>
                      <div className="text-xs font-[1000] uppercase text-black">
                        Tactical Pins & Knight Forks (4/5 Completed)
                      </div>
                    </div>

                  </div>

                </div>

                {/* Decorative Shape */}
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-black -z-10 rotate-6" />
                <div className="absolute -top-6 -right-6 w-24 h-24 border-4 border-[#EAB308] -z-10 rotate-12" />

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. HOW IT WORKS: THE 5-STEP CONTINUOUS COACHING LOOP
      ========================================================================= */}
      <section id="how-it-works" className="py-20 md:py-28 bg-gray-50 border-b-8 border-black">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EAB308] text-black border-2 border-black text-[10px] font-[1000] uppercase tracking-[0.25em]">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
              The Continuous Mastery Engine
            </div>

            <h2 className="text-3xl md:text-5xl font-[1000] text-black uppercase tracking-tight">
              HOW THE CHESSMATE <br />
              <span className="text-[#EAB308] [-webkit-text-stroke:2px_black]">
                TRAINING LOOP WORKS
              </span>
            </h2>

            <p className="text-gray-600 font-bold text-sm md:text-base leading-relaxed">
              We don't treat our software as a standalone puzzle site. The platform is deeply integrated into your coach's weekly curriculum to form an unbroken chain of improvement.
            </p>
          </div>

          {/* 4-Step Process Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COACHING_LOOP_STEPS.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border-3 border-black p-6 flex flex-col justify-between relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(234,179,8,1)] hover:-translate-y-1 transition-all group"
                >
                  <div>
                    {/* Step Number & Badge */}
                    <div className="flex items-center justify-between mb-4 border-b-2 border-black pb-2">
                      <span className="text-2xl font-[1000] text-[#EAB308] group-hover:text-black transition-colors">
                        {step.step}
                      </span>
                      <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-[#EAB308]">
                        {step.badge}
                      </span>
                    </div>

                    <div className="w-12 h-12 bg-gray-100 border-2 border-black flex items-center justify-center mb-3 group-hover:bg-[#EAB308] transition-colors">
                      <IconComp className="w-6 h-6 text-black" />
                    </div>

                    <h3 className="font-[1000] text-sm uppercase tracking-tight text-black mb-2 leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs font-bold text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-gray-400">
                    <span>Phase {step.phase}</span>
                    <span className="text-black font-[1000]">Step {idx + 1} of 4</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Workflow Explanation Banner */}
          <div className="mt-12 p-6 md:p-8 bg-black text-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(234,179,8,1)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs font-[1000] uppercase tracking-widest text-[#EAB308]">
                Continuous Feedback Loop
              </div>
              <p className="text-xs md:text-sm font-bold text-gray-300">
                1. Live 1-on-1 Class ➔ 2. Targeted Puzzles Pushed ➔ 3. Solution & Mistake Analysis ➔ 4. Adaptive Improvement on Next Class
              </p>
            </div>
            <button
              onClick={openDemoModal}
              className="px-6 py-3.5 bg-[#EAB308] text-black font-[1000] text-xs uppercase tracking-[0.2em] border-2 border-black hover:bg-white transition-colors shrink-0"
            >
              Experience The Loop in Free Demo →
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. CORE PRODUCT FEATURES WITH DEEP DIVE TABS
      ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b-8 border-black">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-[#EAB308] text-[10px] font-[1000] uppercase tracking-[0.25em]">
              <Cpu className="w-3.5 h-3.5" />
              Comprehensive Platform Capabilities
            </div>

            <h2 className="text-3xl md:text-5xl font-[1000] text-black uppercase tracking-tight">
              DESIGNED TO ACCELERATE <br />
              <span className="text-[#EAB308] [-webkit-text-stroke:2px_black]">
                EVERY ASPECT OF YOUR PLAY
              </span>
            </h2>

            <p className="text-gray-600 font-bold text-sm md:text-base leading-relaxed">
              Explore the dedicated training tools included with your ChessMate student membership:
            </p>
          </div>

          {/* Feature Selector Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {PLATFORM_CORE_FEATURES.map((feat) => {
              const IconC = feat.icon;
              const isActive = selectedFeature === feat.id;
              return (
                <button
                  key={feat.id}
                  onClick={() => setSelectedFeature(feat.id)}
                  className={`p-4 text-left border-3 border-black transition-all flex flex-col justify-between ${
                    isActive
                      ? "bg-black text-white shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] -translate-y-1"
                      : "bg-white text-black hover:bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <IconC
                    className={`w-6 h-6 mb-2 ${
                      isActive ? "text-[#EAB308]" : "text-black"
                    }`}
                  />
                  <div>
                    <div
                      className={`text-[8px] font-black uppercase tracking-wider mb-1 ${
                        isActive ? "text-[#EAB308]" : "text-gray-500"
                      }`}
                    >
                      {feat.tag}
                    </div>
                    <div className="font-[1000] text-xs uppercase tracking-tight leading-snug">
                      {feat.title.split("&")[0]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Feature Spotlight Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFeature}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-gray-50 border-4 border-black p-8 md:p-12 shadow-[14px_14px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Left Feature Description */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAB308] text-black font-[1000] text-[9px] uppercase border border-black tracking-widest">
                    {activeFeatureData.tag}
                  </div>

                  <h3 className="text-2xl md:text-4xl font-[1000] text-black uppercase leading-tight">
                    {activeFeatureData.headline}
                  </h3>

                  <p className="text-gray-700 font-bold text-sm md:text-base leading-relaxed">
                    {activeFeatureData.desc}
                  </p>

                  {/* Workflow Benefit Box */}
                  <div className="p-5 bg-white border-2 border-black space-y-2.5 shadow-sm">
                    <div className="text-[10px] font-[1000] uppercase tracking-widest text-[#EAB308] bg-black px-2 py-0.5 inline-block">
                      The Workflow in Action
                    </div>
                    <ul className="space-y-2">
                      {activeFeatureData.workflow.map((wf, wIdx) => (
                        <li key={wIdx} className="flex items-start gap-2.5 text-xs font-bold text-gray-800">
                          <span className="text-black font-black">0{wIdx + 1}.</span>
                          <span>{wf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-2">
                    <div className="text-xs font-[1000] uppercase tracking-widest text-black">
                      Key Highlights:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeFeatureData.features.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs font-bold text-gray-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={openDemoModal}
                    className="px-8 py-4 bg-black text-[#EAB308] font-[1000] text-xs uppercase tracking-[0.2em] border-2 border-black hover:bg-[#EAB308] hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] flex items-center gap-2"
                  >
                    Experience {activeFeatureData.title.split("&")[0]}
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>

                {/* Right Interactive Visual Frame */}
                <div className="lg:col-span-6">
                  <div className="border-4 border-black bg-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative group">
                    <img
                      src={activeFeatureData.image}
                      alt={activeFeatureData.imageAlt}
                      className="w-full h-[120px] md:h-[200px] object-cover"
                    />
                    <div className="p-4 bg-black text-white flex items-center justify-between border-t-4 border-black">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#EAB308]" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {activeFeatureData.title}
                        </span>
                      </div>
                      <span className="text-[9px] font-bold uppercase text-[#EAB308]">
                        Integrated Platform
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================================================
          4. CONVERSION DRIVER: WHY TRAIN BETWEEN CLASSES?
      ========================================================================= */}
      <section className="py-20 md:py-28 bg-black text-white border-b-8 border-black relative overflow-hidden">
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EAB308] text-black text-[10px] font-[1000] uppercase tracking-[0.25em]">
                <Clock className="w-3.5 h-3.5" />
                The Power of Continuous Practice
              </div>

              <h2 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tight text-white leading-tight">
                WHY LIVE LESSONS ALONE <br />
                <span className="text-[#EAB308]">ARE NOT ENOUGH</span>
              </h2>

              <p className="text-gray-300 font-bold text-sm md:text-lg leading-relaxed max-w-2xl">
                One or two live coaching sessions per week introduce critical concepts, but without deliberate between-class practice, up to 70% of new tactical patterns are forgotten before the next lesson.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  {
                    title: "Neural Memory Reinforcement",
                    desc: "15 minutes of daily puzzle solving cements tactical motifs into subconscious instinct."
                  },
                  {
                    title: "Eliminate Mistakes Immediately",
                    desc: "Fix blunder patterns in practice games instead of repeating them during your next paid coaching hour."
                  },
                  {
                    title: "Maximizes Live Lesson ROI",
                    desc: "Spend live sessions mastering deep positional strategy rather than reviewing elementary calculations."
                  },
                  {
                    title: "Turn Coaching Into an Ongoing Habit",
                    desc: "Transforms isolated weekly tutoring into a continuous, compounding training system."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-6 h-6 bg-[#EAB308] text-black font-[1000] text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-[1000] text-sm uppercase text-white tracking-wider">
                        {item.title}
                      </h4>
                      <p className="text-xs font-bold text-gray-400 mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Stat Callout */}
            <div className="lg:col-span-5">
              <div className="p-8 md:p-10 bg-white text-black border-4 border-[#EAB308] shadow-[14px_14px_0px_0px_rgba(234,179,8,1)] space-y-6 text-center">
                <div className="w-16 h-16 bg-black text-[#EAB308] flex items-center justify-center mx-auto border-2 border-black">
                  <TrendingUp className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-[1000] uppercase tracking-tight text-black">
                  3.4x Faster Rating Growth
                </h3>

                <p className="text-xs md:text-sm font-bold text-gray-700 leading-relaxed">
                  Students who practice on the ChessMate platform for 15+ minutes daily between live classes achieve 3.4x faster rating improvement compared to students who only attend weekly lessons.
                </p>

                <div className="p-4 bg-gray-50 border-2 border-black text-[10px] font-black uppercase tracking-widest text-black">
                  Includes All 10k+ Puzzles • Zero Extra Fees
                </div>

                <button
                  onClick={openDemoModal}
                  className="w-full py-4 bg-black text-[#EAB308] font-[1000] text-xs uppercase tracking-[0.2em] border-2 border-black hover:bg-[#EAB308] hover:text-black transition-colors"
                >
                  Get Full Platform Access Now
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          5. BUILT FOR DIFFERENT LEVELS: ADAPTIVE PLATFORM CURRICULUM
      ========================================================================= */}
      <section className="py-20 md:py-28 bg-gray-50 border-b-8 border-black">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EAB308] text-black border-2 border-black text-[10px] font-[1000] uppercase tracking-[0.25em]">
              <Layers className="w-3.5 h-3.5" />
              Dynamic Difficulty Scaling
            </div>

            <h2 className="text-3xl md:text-5xl font-[1000] text-black uppercase tracking-tight">
              BUILT FOR EVERY STAGE <br />
              <span className="text-[#EAB308] [-webkit-text-stroke:2px_black]">
                OF YOUR CHESS JOURNEY
              </span>
            </h2>

            <p className="text-gray-600 font-bold text-sm md:text-base leading-relaxed">
              The platform automatically calibrates exercise complexity, time limits, and task formats to match your current rating tier:
            </p>
          </div>

          {/* Level Switcher Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {LEVEL_TRACKS.map((lvl) => {
              const isSelected = selectedLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`p-5 border-3 border-black text-left transition-all ${
                    isSelected
                      ? "bg-black text-white shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] -translate-y-1"
                      : "bg-white text-black hover:bg-gray-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <div className="text-base font-[1000] uppercase">{lvl.level}</div>
                  <div
                    className={`text-[10px] font-black uppercase tracking-wider mt-1 ${
                      isSelected ? "text-[#EAB308]" : "text-gray-500"
                    }`}
                  >
                    Rating: {lvl.rating}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Level Detail Box */}
          <div className="p-8 md:p-10 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-4">
                <span className="px-3 py-1 bg-[#EAB308] text-black font-[1000] text-[10px] uppercase border border-black">
                  {activeLevelData.level} Module (Rating {activeLevelData.rating})
                </span>
                <h3 className="text-2xl md:text-3xl font-[1000] uppercase text-black">
                  {activeLevelData.headline}
                </h3>
                <p className="text-sm font-bold text-gray-700 leading-relaxed">
                  {activeLevelData.desc}
                </p>
              </div>

              <div className="lg:col-span-6 bg-gray-50 border-2 border-black p-6 space-y-3">
                <div className="text-xs font-[1000] uppercase tracking-widest text-black border-b border-gray-300 pb-2">
                  Sample Weekly Platform Drills:
                </div>
                <div className="space-y-2">
                  {activeLevelData.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-3 text-xs font-bold text-gray-800">
                      <div className="w-5 h-5 bg-black text-[#EAB308] flex items-center justify-center text-[10px] font-black shrink-0">
                        {tIdx + 1}
                      </div>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          6. STUDENT TESTIMONIALS & REVIEWS (AUTOSCROLLING)
      ========================================================================= */}
      <TestimonialSection />

      {/* =========================================================================
          7. FINAL CALL TO ACTION: HIGH-CONVERTING BOTTOM BANNER
      ========================================================================= */}
      <section className="py-20 md:py-28 px-6 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black border-4 border-black p-8 md:p-14 shadow-[16px_16px_0px_0px_rgba(234,179,8,1)] text-white relative overflow-hidden">
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
              <div className="space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAB308] text-black text-[10px] font-[1000] uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  Included Free with All Coaching Packages
                </div>
                
                <h3 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tight text-white leading-tight">
                  READY TO TRAIN <br />
                  <span className="text-[#EAB308]">ON THE CHESSMATE PLATFORM?</span>
                </h3>

                <p className="text-gray-400 font-bold text-sm md:text-base max-w-md">
                  Book a free assessment session. Get evaluated by a certified coach and receive full access to our interactive puzzle engine and student LMS.
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-end gap-4 w-full lg:w-auto">
                <button
                  onClick={openDemoModal}
                  className="w-full sm:w-auto px-10 py-5 bg-[#EAB308] text-black font-[1000] text-xs md:text-sm uppercase tracking-[0.2em] border-3 border-black hover:bg-white transition-all shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] flex items-center justify-center gap-3 active:scale-95"
                >
                  Book Free Assessment
                  <ArrowRight className="w-5 h-5" />
                </button>

                <a
                  href="https://classroom.thechessmate.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-[1000] uppercase tracking-widest text-gray-300 underline hover:text-[#EAB308]"
                >
                  Already a student? Enter Classroom →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
