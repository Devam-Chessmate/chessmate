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
  Calendar,
  Shield,
  ArrowRight,
  ChevronRight,
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
  X as XIcon,
  PlayCircle,
  HelpCircle,
  Users
} from "lucide-react";
import { useDemoModal } from "@/context/DemoContext";

// Persona Tracks Data
const PERSONA_TRACKS = [
  {
    id: "scratch",
    title: "Learning from Scratch",
    subtitle: "Complete Beginners (0 - 800 Rating)",
    badge: "Foundation Track",
    icon: Lightbulb,
    headline: "Learn Chess the Right Way from Day One Without Frustration",
    description:
      "Never played before or only know how pieces move? We teach you core board mechanics, essential tactics, opening safety, and elementary checkmates in a supportive, adult-friendly environment without childish metaphors.",
    challenges: [
      "Feeling overwhelmed by complex rules and strategies",
      "Falling into quick opening traps (Scholar's Mate, early Queen attacks)",
      "Uncertainty about what to think on each move",
      "Losing pieces due to simple oversight"
    ],
    curriculum: [
      "Mastery of board geometry, piece values, and coordination",
      "Core opening rules (Center control, King safety, piece development)",
      "Essential tactical patterns (Pins, Forks, Skewers, Discovered Attacks)",
      "Basic endgame checkmating techniques (King + Queen, King + Rook)"
    ],
    timeline: "Reach comfortable 800–1000 online rating in 6–8 weeks",
    recommendedPace: "1 to 2 sessions/week + 15 mins daily puzzle practice"
  },
  {
    id: "basics",
    title: "Breaking Past Basics",
    subtitle: "Casual Improvers (800 - 1200 Rating)",
    badge: "Breakthrough Track",
    icon: Target,
    headline: "Stop Hanging Pieces & Build Solid Middle-Game Understanding",
    description:
      "You know the rules and play casually on Chess.com or Lichess, but keep getting stuck in the 800–1200 band. We replace random guessing with structured thought processes and blunder-proofing habits.",
    challenges: [
      "Frequent one-move tactical blunders and hanging pieces",
      "Lacking a clear plan after the opening phase (move 10-15)",
      "Struggling against aggressive opponent attacks",
      "Throwing away won positions in the endgame"
    ],
    curriculum: [
      "Two-step blunder-check mental checklist before every move",
      "Compact, reliable opening repertoire for White & Black",
      "Fundamental middle-game planning: outposts, open files, weak pawns",
      "Conversion of material advantages into clean endgame wins"
    ],
    timeline: "Break the 1200 barrier in 8–12 weeks of structured coaching",
    recommendedPace: "2 sessions/week + weekly assigned game analysis"
  },
  {
    id: "plateau",
    title: "Plateau Breaker",
    subtitle: "Stuck Players (1200 - 1600+ Rating)",
    badge: "Rating Surge Track",
    icon: TrendingUp,
    headline: "Systematic Bottleneck Diagnosis & Deep Calculation Mastery",
    description:
      "You've played hundreds of games and watched dozens of YouTube videos, but your rating has stayed flat for months. We dissect your actual games, pinpoint your specific leaks, and train disciplined 3-5 move calculation.",
    challenges: [
      "Stuck at a stubborn rating ceiling despite regular playing",
      "Superficial calculation and missing subtle defensive resources",
      "Time trouble in rapid/blitz due to indecision",
      "Lack of deep positional understanding against solid players"
    ],
    curriculum: [
      "Deep personal game analysis & recurring mistake pattern recognition",
      "Candidate move selection & tree-of-analysis calculation methods",
      "Pawn structure mastery (isolated queen pawns, pawn chains, minority attacks)",
      "Rook & pawn endgame mechanics (Lucena & Philidor positions)"
    ],
    timeline: "Add +150 to +300 Elo rating points in 3–4 months",
    recommendedPace: "2 sessions/week + targeted 10k puzzle engine homework"
  },
  {
    id: "returning",
    title: "Returning to Chess",
    subtitle: "Reactivating Old Passion (Any Rating)",
    badge: "Comeback Track",
    icon: Flame,
    headline: "Modernize Your Repertoire & Rebuild Sharp Tactical Reflexes",
    description:
      "Played in school, college, or decades ago and want to get back into the game? We help you catch up on modern digital chess theory, revitalize tactical reflexes, and get tournament-ready on your own terms.",
    challenges: [
      "Rusty tactical intuition and calculating speed",
      "Outdated opening knowledge compared to modern engine theory",
      "Unfamiliarity with modern online platforms, analysis tools, and clocks",
      "Balancing high personal expectations with limited free time"
    ],
    curriculum: [
      "Tactical speed calibration drills to regain quick visual recognition",
      "Streamlined opening systems suited for rapid/blitz improvers",
      "Modern analysis tools walkthrough (Chess.com, Lichess, ChessBase)",
      "Strategic brush-up on dynamic pawn play and piece imbalances"
    ],
    timeline: "Regain and exceed peak former strength within 4–6 weeks",
    recommendedPace: "1 to 2 sessions/week with flexible weekend scheduling"
  },
  {
    id: "tournament",
    title: "OTB & Tournament Prep",
    subtitle: "Competitive Aspirants (1500 - 2000+ Rating)",
    badge: "Championship Track",
    icon: Swords,
    headline: "FIDE Rating Preparation, Repertoire Hardening & Psychology",
    description:
      "Preparing for your first local classical tournament or hunting official FIDE rating norms? Train with titled masters on opening preparation against specific styles, clock psychology, and rigorous score-sheet analysis.",
    challenges: [
      "Managing physical fatigue and nerves over 4-hour classical games",
      "Facing deep home opening preparation from ambitious opponents",
      "Complex multi-piece endgame conversions under time controls",
      "Navigating psychological pressure in must-win tournament rounds"
    ],
    curriculum: [
      "Robust, Grandmaster-level opening repertoire with transpositions",
      "Prophylaxis, dynamic initiative, and piece sacrifice evaluation",
      "High-pressure time management & clock discipline strategies",
      "Full tournament game review and post-mortem breakdown"
    ],
    timeline: "Achieve official FIDE rating or gain +100 to +200 OTB points",
    recommendedPace: "2 to 3 sessions/week + intensive sparring sessions"
  },
  {
    id: "specialist",
    title: "Targeted Skill Mastery",
    subtitle: "Focused Modules (Openings / Tactics / Endgames)",
    badge: "Precision Track",
    icon: Crosshair,
    headline: "Laser-Focused Coaching on Your Single Biggest Weakness",
    description:
      "Don't need a full syllabus, but want to fix your specific Achilles' heel? Choose a modular 1-on-1 sprint dedicated to bulletproof Opening Repertoires, Middle-game Calculation, or Master-Level Endgames.",
    challenges: [
      "Getting bad positions out of the opening every single game",
      "Blundering tactics in complicated, sharp tactical positions",
      "Converting winning piece advantages into drawn endgames",
      "Lack of deep positional understanding in closed positions"
    ],
    curriculum: [
      "Custom repertoire construction matching your natural playing style",
      "Visual calculation blind-spot elimination & deflection tactics",
      "Essential theoretical endgames (King+Pawn, Rook, Opposite Bishops)",
      "Mastery of positional pawn sacrifices and space advantages"
    ],
    timeline: "Eliminate your biggest weakness in 4–8 targeted sessions",
    recommendedPace: "Modular 4 to 8 session sprint with deep homework"
  }
];

// Deliverables
const WHAT_STUDENTS_GET = [
  {
    icon: Monitor,
    title: "Live 1-on-1 Online Masterclasses",
    desc: "Interactive 60-minute live sessions with FIDE-rated coaches over interactive digital boards with voice/video."
  },
  {
    icon: BarChart3,
    title: "Deep Personal Game Analysis",
    desc: "Your coach imports and analyzes your actual Chess.com / Lichess / OTB games to identify hidden mistakes."
  },
  {
    icon: Crosshair,
    title: "Root-Cause Weakness Diagnosis",
    desc: "We pinpoint your recurring blunder patterns, time-trouble triggers, and positional blindspots with precision."
  },
  {
    icon: BookOpen,
    title: "Personalized Weekly Assignments",
    desc: "Custom-curated calculation worksheets, thematic puzzle sets, and master game studies tailored to your level."
  },
  {
    icon: Brain,
    title: "Tactical & Calculation Training",
    desc: "Learn disciplined candidate-move calculation, visualization methods, and tactical motif recognition."
  },
  {
    icon: Swords,
    title: "Tailored Opening Repertoires",
    desc: "Build sound, aggressive, and easy-to-remember repertoires for White and Black that fit your natural style."
  },
  {
    icon: Layers,
    title: "Positional & Endgame Mastery",
    desc: "Master pawn structures, open files, piece outposts, and essential theoretical endgame conversion techniques."
  },
  {
    icon: TrendingUp,
    title: "Progress Reviews & Rating Tracking",
    desc: "Periodic milestone reviews tracking your rating progression, accuracy score, and tactical speed metrics."
  }
];

// Platform Differentiators
const PLATFORM_FEATURES = [
  {
    icon: Brain,
    title: "ChessMate 24/7 Training Platform",
    desc: "Full premium access to our digital training platform with structured interactive lessons and drill modules."
  },
  {
    icon: Sparkles,
    title: "10,000+ Curated Puzzle Engine",
    desc: "Filter tactical drills by motif, difficulty, and theme to reinforce concepts learned during live sessions."
  },
  {
    icon: Flame,
    title: "Continuous Training Between Classes",
    desc: "Learning doesn't stop when class ends. Get asynchronous feedback on games and daily practice streaks."
  },
  {
    icon: TrendingUp,
    title: "Dynamically Evolving Curriculum",
    desc: "Your training roadmap automatically upgrades and deepens as your rating climbs and goals evolve."
  }
];

// Testimonials Data
const ADULT_TESTIMONIALS = [
  {
    name: "Vikram R.",
    role: "Senior Software Engineer (34 yrs)",
    ratingGain: "950 → 1520 Chess.com Rapid",
    timeframe: "4 Months",
    quote:
      "As a working developer with limited free time, standard group classes never worked for me. ChessMate's 1-on-1 coaching focused directly on my recurring blunder patterns. My coach analyzed my actual blitz games, and my calculation discipline completely transformed!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    name: "Dr. Ananya S.",
    role: "Cardiologist & Returning Player (41 yrs)",
    ratingGain: "1150 → 1680 Lichess Classical",
    timeframe: "5 Months",
    quote:
      "I played chess in medical school and wanted to get back into it. The flexibility of late-night and weekend slots was crucial for my hospital shifts. The coaching is mature, intellectually stimulating, and zero fluff. Best learning investment I've made.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    name: "Rohan M.",
    role: "Management Consultant (29 yrs)",
    ratingGain: "1350 → 1840 + 1st OTB Trophy",
    timeframe: "6 Months",
    quote:
      "I had plateaued at 1350 for over two years. My coach at ChessMate restructured my entire opening repertoire and taught me how to calculate properly in critical positions. I just played my first corporate OTB championship and finished 2nd place!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  }
];

// Comparison Matrix Data
const COMPARISON_DATA = [
  {
    feature: "Scheduling Flexibility",
    chessmate: "100% custom time slots (Early mornings, evenings & weekends)",
    generic: "Fixed rigid batch schedules with zero reschedule options"
  },
  {
    feature: "Peer Environment",
    chessmate: "Dedicated 1-on-1 adult mentorship; no kid-batch dynamics",
    generic: "Mixed batches with children; generic kindergarten pedagogy"
  },
  {
    feature: "Game Analysis",
    chessmate: "Deep personal game review of your real Chess.com/Lichess games",
    generic: "Generic textbook lectures with no focus on your actual mistakes"
  },
  {
    feature: "Learning Syllabus",
    chessmate: "Tailored to your specific goal (rapid rating, OTB, casual joy)",
    generic: "Rigid one-size-fits-all syllabus regardless of your needs"
  },
  {
    feature: "Between-Class Practice",
    chessmate: "ChessMate LMS + 10k curated puzzle engine + WhatsApp coach touchpoints",
    generic: "No platform access; training stops the moment class ends"
  },
  {
    feature: "Coach Caliber",
    chessmate: "FIDE-rated international masters & certified adult training mentors",
    generic: "Inexperienced or unrated amateur instructors"
  }
];

// Coaching Tracks Data
const ADULT_PACKAGES = [
  {
    name: "Starter Track",
    planType: "Foundation & Tune-up",
    sessions: "4 Sessions (1-on-1)",
    duration: "4 Weeks (1 Session/week)",
    badge: "Great for Beginners",
    popular: false,
    desc: "Ideal for beginners or returning players wanting a quick diagnostic and opening tune-up.",
    features: [
      "4 Live 1-on-1 Masterclasses (60 mins)",
      "Initial Rating & Bottleneck Diagnosis",
      "Personal Game Review (5 games)",
      "Personalized Weekly Homework",
      "ChessMate LMS & Puzzle Database Access",
      "Flexible Rescheduling with 24h Notice"
    ]
  },
  {
    name: "Plateau Crusher",
    planType: "Accelerated Rating Surge",
    sessions: "8 Sessions (1-on-1)",
    duration: "8 Weeks (1-2 Sessions/week)",
    badge: "Most Popular for Adults",
    popular: true,
    desc: "Our most comprehensive improvement track designed to break long-standing rating plateaus.",
    features: [
      "8 Live 1-on-1 Masterclasses (60 mins)",
      "Complete Opening Repertoire Formulation",
      "Deep Root-Cause Blunder Pattern Analysis",
      "3-5 Move Calculation & Visualization Training",
      "Customized Weekly Puzzle Worksheets",
      "24/7 WhatsApp Coach Doubt Support",
      "ChessMate LMS 10k+ Engine Access",
      "Milestone Review & Rating Growth Plan"
    ]
  },
  {
    name: "Tournament Immersion",
    planType: "Championship Mastery",
    sessions: "16 Sessions (1-on-1)",
    duration: "12-16 Weeks (Custom Pace)",
    badge: "Serious Competitors",
    popular: false,
    desc: "For serious adult improvers targeting 1800+ online rating or official FIDE tournament championships.",
    features: [
      "16 Live 1-on-1 Masterclasses (60 mins)",
      "Full Grandmaster-Curated Repertoire",
      "Competitive OTB & Clock Psychology Training",
      "Deep Theoretical Endgame Mastery",
      "Pre-Tournament Opponent Scouting Preparation",
      "Priority Coach WhatsApp Direct Line",
      "Lifetime ChessMate Study Material",
      "Tournament Score-Sheet Analysis"
    ]
  }
];

// FAQs Data
const ADULT_FAQS = [
  {
    q: "Is it too late to get good at chess or reach 1500–1800+ as an adult?",
    a: "Absolutely not! Adults possess superior logical reasoning, pattern recognition, and focus compared to children. What adult improvers typically lack is structured guidance and blunder-proofing habits. With targeted 1-on-1 coaching and game analysis, hundreds of our adult students have gained 300 to 500+ Elo rating points within months."
  },
  {
    q: "How flexible are the class timings around busy work and family commitments?",
    a: "Our adult program is engineered specifically around demanding schedules. We offer flexible time slots from 6:00 AM to 11:30 PM across all timezones (India, USA, UK, Europe, Middle East, Australia). If an urgent meeting or personal emergency arises, you can easily reschedule your session with advance notice."
  },
  {
    q: "Will I be put in a class with children?",
    a: "No. All our adult chess lessons are strictly 1-on-1 with a certified master coach. You will never be grouped with kids or subjected to child-oriented teaching methods. Your coaching sessions are mature, respectful, peer-level discussions focused on high-efficiency improvement."
  },
  {
    q: "How are the online chess classes conducted?",
    a: "Sessions take place on our high-speed interactive digital chess platform with real-time video/audio calling. Your coach can move pieces, highlight squares with color-coded arrows, import your past games directly from Chess.com or Lichess with one click, and test your calculation in live positions."
  },
  {
    q: "What happens during the Free Demo / Assessment Session?",
    a: "In your free 45-minute 1-on-1 assessment, a FIDE-rated coach will review 2-3 of your recent games, diagnose your primary rating bottlenecks (openings, calculation, or endgames), evaluate your tactical vision, and give you a clear, personalized roadmap for your goals—with zero sales pressure or obligation."
  },
  {
    q: "How much time do I need to commit each week to see real improvement?",
    a: "We recommend 1 to 2 hours of live 1-on-1 coaching per week, supplemented by 15–20 minutes of daily tactical puzzle solving and 2–3 slow games on our platform. Consistency beats marathon sessions!"
  },
  {
    q: "Do I need to purchase books, software, or specialized hardware?",
    a: "No! All you need is a laptop, desktop, tablet, or smartphone with an internet connection. ChessMate provides all digital study material, interactive PGN files, customized worksheets, and full access to our 10,000+ puzzle engine at no extra cost."
  }
];

export default function AdultsClientPage() {
  const { openDemoModal } = useDemoModal();
  const [activePersona, setActivePersona] = useState<string>("scratch");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Interactive Assessment Widget State
  const [calcLevel, setCalcLevel] = useState<string>("intermediate");
  const [calcGoal, setCalcGoal] = useState<string>("plateau");
  const [calcHours, setCalcHours] = useState<string>("3-5");

  const currentPersonaData =
    PERSONA_TRACKS.find((p) => p.id === activePersona) || PERSONA_TRACKS[0];

  // Calculated roadmap preview
  const getRoadmapRecommendation = () => {
    let ratingTarget = "+200 to +350 Elo";
    let primaryFocus = "Blunder elimination, candidate moves & opening repertoire";
    let timeframe = "10–12 Weeks";

    if (calcLevel === "beginner") {
      ratingTarget = "0 → 1000+ Rating";
      primaryFocus = "Board vision, piece safety & fundamental checkmates";
      timeframe = "8 Weeks";
    } else if (calcLevel === "intermediate") {
      ratingTarget = "+250 Elo Surge";
      primaryFocus = "3-5 Move calculation discipline & personal game diagnostics";
      timeframe = "12 Weeks";
    } else if (calcLevel === "advanced") {
      ratingTarget = "1600 → 1900+ / FIDE Prep";
      primaryFocus = "Positional prophylaxis, dynamic sacrifices & rook endgames";
      timeframe = "16 Weeks";
    }

    return { ratingTarget, primaryFocus, timeframe };
  };

  const recommendation = getRoadmapRecommendation();

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#EAB308] selection:text-black pt-20">
      
      {/* =========================================================================
          1. HERO SECTION: HIGH-CONTRAST NEOBRUTALIST & LUXURY AESTHETICS
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
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gray-200/60 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-black text-[#EAB308] border-2 border-black shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] text-[10px] md:text-xs font-[1000] uppercase tracking-[0.25em]">
                <Zap className="w-4 h-4 fill-[#EAB308] animate-pulse text-[#EAB308]" />
                1-on-1 Online Chess Coaching Exclusively for Adults
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-5xl font-[1000] text-black tracking-tighter uppercase leading-[0.95]">
                  MASTER CHESS AS AN ADULT. <br />
                  <span className="text-[#EAB308] [-webkit-text-stroke:2px_black] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                    ON YOUR SCHEDULE.
                  </span>
                </h1>
                
                <p className="text-black font-black tracking-[0.2em] text-xs md:text-sm uppercase">
                  No Kids Batches • Personalized Game Analysis • FIDE Certified Coaches
                </p>
              </div>

              {/* Subtitle Description */}
              <p className="text-gray-700 font-bold text-base md:text-xl leading-relaxed max-w-2xl border-l-4 md:border-l-8 border-black pl-5">
                Whether you are learning from scratch, returning after decades, or breaking through a stubborn rating plateau, experience tailored 1-on-1 adult chess coaching designed around your busy lifestyle.
              </p>

              {/* Quick Feature Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {[
                  { icon: Clock, label: "Flexible Hours", sub: "Mornings & Nights" },
                  { icon: Target, label: "Your Games", sub: "Deep Analysis" },
                  { icon: Trophy, label: "FIDE Masters", sub: "1:1 Mentorship" },
                  { icon: Sparkles, label: "LMS Platform", sub: "10k+ Puzzles" }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-3 border-2 border-black bg-gray-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <item.icon className="w-5 h-5 text-[#EAB308] mb-1 fill-[#EAB308]/20" />
                    <p className="font-[1000] text-[11px] uppercase tracking-wider text-black leading-tight">
                      {item.label}
                    </p>
                    <p className="text-[9px] font-bold uppercase text-gray-500 tracking-wider">
                      {item.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={openDemoModal}
                  className="group px-8 py-5 bg-black text-[#EAB308] font-[1000] text-xs md:text-sm uppercase tracking-[0.2em] border-4 border-black hover:bg-[#EAB308] hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(234,179,8,1)] active:translate-x-1 active:translate-y-1 flex items-center justify-center gap-3"
                >
                  Book Free Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <a
                  href="#who-is-it-for"
                  className="px-8 py-5 bg-white text-black font-[1000] text-xs md:text-sm uppercase tracking-[0.2em] border-4 border-black hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2"
                >
                  Explore Learning Tracks
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>

              {/* Social Proof Stats */}
              <div className="flex items-center gap-6 pt-4 border-t-2 border-gray-200">
                <div>
                  <div className="text-2xl md:text-3xl font-[1000] text-black">1,200+</div>
                  <div className="text-[9px] font-black uppercase text-gray-500 tracking-widest">
                    Adult Improvers
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-300" />
                <div>
                  <div className="text-2xl md:text-3xl font-[1000] text-[#EAB308] drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                    +260 Elo
                  </div>
                  <div className="text-[9px] font-black uppercase text-gray-500 tracking-widest">
                    Avg Rating Growth (90d)
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-300" />
                <div>
                  <div className="text-2xl md:text-3xl font-[1000] text-black">4.9/5</div>
                  <div className="text-[9px] font-black uppercase text-gray-500 tracking-widest">
                    Student Rating
                  </div>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative max-w-[500px] mx-auto">
                
                {/* Main Hero Card Frame */}
                <div className="relative border-4 md:border-8 border-black bg-white shadow-[18px_18px_0px_0px_rgba(234,179,8,1)] overflow-hidden">
                  <div className="relative h-[360px] sm:h-[420px] w-full bg-black">
                    <img
                      src="/adult-coaching-hero.jpg"
                      alt="Adult 1-on-1 Online Chess Coaching"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Floating Overlay Badge */}
                    <div className="absolute top-4 left-4 bg-black text-[#EAB308] border-2 border-[#EAB308] px-3.5 py-1.5 font-[1000] uppercase text-[9px] tracking-widest shadow-xl flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-[#EAB308]" />
                      Personalized 1:1 Live
                    </div>

                    <div className="absolute bottom-4 right-4 bg-white text-black border-2 border-black p-3 font-black text-left shadow-lg">
                      <div className="text-[9px] uppercase tracking-widest text-gray-500">
                        Flexible Timing
                      </div>
                      <div className="text-xs font-[1000] uppercase text-black">
                        Early AM • Evenings • Weekends
                      </div>
                    </div>
                  </div>

                  {/* Under-Card Micro Bar */}
                  <div className="p-4 bg-black text-white flex items-center justify-between border-t-4 border-black">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-ping" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#EAB308]">
                        Admissions Open • Custom Plans
                      </span>
                    </div>
                    <button
                      onClick={openDemoModal}
                      className="text-[10px] font-black uppercase tracking-wider underline hover:text-[#EAB308]"
                    >
                      Book Free Demo →
                    </button>
                  </div>
                </div>

                {/* Decorative Sharp Geometric Accent */}
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-black -z-10 rotate-6" />
                <div className="absolute -top-6 -right-6 w-24 h-24 border-4 border-[#EAB308] -z-10 rotate-12" />

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. WHO THE CLASSES ARE FOR: INTERACTIVE 6-PERSONA LEARNING TRACKS
      ========================================================================= */}
      <section id="who-is-it-for" className="py-20 md:py-28 bg-gray-50 border-b-8 border-black">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EAB308] text-black border-2 border-black text-[10px] font-[1000] uppercase tracking-[0.25em]">
              <Users className="w-3.5 h-3.5" />
              Tailored For Every Adult Player
            </div>
            
            <h2 className="text-3xl md:text-5xl font-[1000] text-black uppercase tracking-tight">
              WHO OUR ADULT CHESS <br />
              <span className="text-[#EAB308] [-webkit-text-stroke:2px_black]">
                CLASSES ARE FOR
              </span>
            </h2>
            
            <p className="text-gray-600 font-bold text-sm md:text-base leading-relaxed">
              We reject one-size-fits-all instruction. Select your current situation to explore your personalized coaching roadmap:
            </p>
          </div>

          {/* Persona Tab Selectors (Neobrutalist Tabs) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {PERSONA_TRACKS.map((persona) => {
              const IconComponent = persona.icon;
              const isActive = activePersona === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => setActivePersona(persona.id)}
                  className={`p-4 text-left border-3 border-black transition-all flex flex-col justify-between relative ${
                    isActive
                      ? "bg-black text-white shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] -translate-y-1"
                      : "bg-white text-black hover:bg-[#EAB308]/20 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
                  }`}
                >
                  {isActive && (
                    <div className="absolute -top-2.5 -right-2 bg-[#EAB308] text-black px-2 py-0.5 text-[8px] font-[1000] uppercase border border-black">
                      Active
                    </div>
                  )}
                  <div>
                    <IconComponent
                      className={`w-6 h-6 mb-2 ${
                        isActive ? "text-[#EAB308]" : "text-black"
                      }`}
                    />
                    <h3 className="font-[1000] text-xs uppercase tracking-wider leading-snug">
                      {persona.title}
                    </h3>
                  </div>
                  <p
                    className={`text-[9px] font-bold uppercase tracking-wider mt-2 ${
                      isActive ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {persona.subtitle.split("(")[0]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Persona Deep-Dive Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="bg-white border-4 border-black p-8 md:p-12 shadow-[14px_14px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-[#EAB308] text-black font-[1000] text-[10px] uppercase border-2 border-black tracking-widest">
                      {currentPersonaData.badge}
                    </span>
                    <span className="text-xs font-black uppercase text-gray-500 tracking-wider">
                      {currentPersonaData.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-[1000] text-black uppercase leading-tight">
                    {currentPersonaData.headline}
                  </h3>

                  <p className="text-gray-700 font-bold text-sm md:text-base leading-relaxed">
                    {currentPersonaData.description}
                  </p>

                  {/* Common Pain Points */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-[1000] uppercase tracking-widest text-red-600 flex items-center gap-2">
                      <XIcon className="w-4 h-4 text-red-600" /> Key Bottlenecks We Eliminate:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {currentPersonaData.challenges.map((chal, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 bg-red-50/70 border border-red-200 text-xs font-bold text-gray-800"
                        >
                          <span className="text-red-500 font-black">•</span>
                          <span>{chal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Custom Curriculum & Action */}
                <div className="lg:col-span-5 space-y-6 bg-gray-50 border-3 border-black p-6 md:p-8">
                  <h4 className="text-xs font-[1000] uppercase tracking-widest text-black flex items-center gap-2 border-b-2 border-black pb-3">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    Targeted Coaching Focus
                  </h4>

                  <ul className="space-y-3">
                    {currentPersonaData.curriculum.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs md:text-sm font-bold text-gray-900">
                        <div className="w-5 h-5 bg-[#EAB308] border border-black flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-black stroke-[3]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Timeline Badge */}
                  <div className="p-4 bg-black text-white space-y-2 border-2 border-black">
                    <div className="flex items-center gap-2 text-[#EAB308] text-[10px] font-[1000] uppercase tracking-widest">
                      <TrendingUp className="w-4 h-4" /> Expected Trajectory
                    </div>
                    <p className="text-xs font-bold text-gray-200">
                      {currentPersonaData.timeline}
                    </p>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">
                      Pace: {currentPersonaData.recommendedPace}
                    </p>
                  </div>

                  <button
                    onClick={openDemoModal}
                    className="w-full py-4 bg-[#EAB308] text-black font-[1000] text-xs uppercase tracking-[0.2em] border-2 border-black hover:bg-black hover:text-[#EAB308] transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Start on this Track
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================================================
          3. THE ADULT ANGLE: WHY ADULTS CHOOSE CHESSMATE (DIFFERENTIATION MATRIX)
      ========================================================================= */}
      <section className="py-20 md:py-28 bg-black text-white border-b-8 border-black relative overflow-hidden">
        
        {/* Background Architectural Decal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[22rem] font-[1000] text-white/[0.02] leading-none select-none pointer-events-none uppercase tracking-tighter italic">
          ADULT
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EAB308] text-black text-[10px] font-[1000] uppercase tracking-[0.25em]">
                <Shield className="w-3.5 h-3.5" />
                Designed For Working Adults
              </div>

              <h2 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tight text-white leading-tight">
                WHY ADULTS CHOOSE <br />
                <span className="text-[#EAB308]">CHESSMATE OVER GENERIC CLASSES</span>
              </h2>

              <p className="text-gray-300 font-bold text-sm md:text-lg leading-relaxed max-w-2xl">
                Most chess academies are built exclusively for children with rigid batch timings, playful metaphors, and fixed syllabus books. ChessMate provides high-efficiency, personalized 1-on-1 mentorship engineered around adult psychology, analytical thinking, and demanding work-life schedules.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 md:p-8 bg-white/5 border-4 border-[#EAB308] shadow-[10px_10px_0px_0px_rgba(234,179,8,1)] space-y-4">
                <div className="flex items-center gap-3 text-[#EAB308]">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="font-[1000] text-sm md:text-base uppercase tracking-wider text-white">
                    The Adult Improver Philosophy
                  </h3>
                </div>
                <p className="text-xs md:text-sm font-bold text-gray-300 leading-relaxed">
                  "Adults don't fail at chess because of age. They fail because they waste time on irrelevant opening memorization and passive YouTube videos. We replace random tactics with targeted diagnostics of your real game mistakes."
                </p>
                <div className="text-[10px] font-black uppercase text-[#EAB308] tracking-widest">
                  — FIDE Master Training Panel, ChessMate Academy
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Matrix Grid */}
          <div className="border-4 border-white/20 bg-black overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 bg-[#EAB308] text-black p-4 font-[1000] text-xs uppercase tracking-widest border-b-4 border-black">
              <div className="md:col-span-4 font-black">Coaching Dimension</div>
              <div className="md:col-span-4 flex items-center gap-1.5 font-[1000]">
                <CheckCircle2 className="w-4 h-4 fill-black text-[#EAB308]" /> ChessMate Adult Program
              </div>
              <div className="md:col-span-4 flex items-center gap-1.5 font-bold text-gray-800">
                <XIcon className="w-4 h-4 text-red-700" /> Typical Generic / Kids Classes
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {COMPARISON_DATA.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 p-5 gap-3 md:gap-4 items-center hover:bg-white/[0.03] transition-colors"
                >
                  <div className="md:col-span-4 font-[1000] text-xs uppercase tracking-wider text-white">
                    {row.feature}
                  </div>
                  <div className="md:col-span-4 text-xs font-bold text-[#EAB308] flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <span>{row.chessmate}</span>
                  </div>
                  <div className="md:col-span-4 text-xs font-bold text-gray-400 flex items-start gap-2">
                    <XIcon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{row.generic}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Callout */}
          <div className="mt-12 text-center">
            <button
              onClick={openDemoModal}
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#EAB308] text-black font-[1000] text-xs md:text-sm uppercase tracking-[0.2em] border-2 border-black hover:bg-white transition-colors shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
            >
              Experience the Difference — Book Free Demo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. WHAT STUDENTS GET: COMPLETE CURRICULUM & DELIVERABLES
      ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b-8 border-black">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-[#EAB308] text-[10px] font-[1000] uppercase tracking-[0.25em]">
              <Award className="w-3.5 h-3.5" />
              Complete Training Package
            </div>

            <h2 className="text-3xl md:text-5xl font-[1000] text-black uppercase tracking-tight">
              WHAT YOU GET IN EVERY <br />
              <span className="text-[#EAB308] [-webkit-text-stroke:2px_black]">
                1-ON-1 COACHING PROGRAM
              </span>
            </h2>

            <p className="text-gray-600 font-bold text-sm md:text-base leading-relaxed">
              Every aspect of your training is engineered to produce concrete rating gains and deeper board mastery.
            </p>
          </div>

          {/* Deliverables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHAT_STUDENTS_GET.map((item, i) => {
              const IconComp = item.icon;
              return (
                <div
                  key={i}
                  className="p-6 md:p-8 border-3 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(234,179,8,1)] hover:-translate-y-1 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center group-hover:bg-[#EAB308] transition-colors">
                      <IconComp className="w-6 h-6 text-[#EAB308] group-hover:text-black transition-colors" />
                    </div>
                    <h3 className="font-[1000] text-sm md:text-base uppercase tracking-tight text-black">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-[#EAB308]">
                    <span>Included in 1:1</span>
                    <CheckCircle2 className="w-4 h-4 text-black" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. CHESSMATE PLATFORM & CONTINUOUS TRAINING ECOSYSTEM
      ========================================================================= */}
      <section className="py-20 md:py-28 bg-gray-50 border-b-8 border-black">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Visual Screen on Left */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative">
                <div className="border-4 md:border-8 border-black bg-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <img
                    src="/adult-game-analysis.jpg"
                    alt="ChessMate Interactive Game Analysis Platform"
                    className="w-full h-[360px] md:h-[420px] object-cover"
                  />
                  <div className="p-4 bg-black text-white flex items-center justify-between border-t-4 border-black">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#EAB308] fill-[#EAB308]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-white">
                        ChessMate LMS Training Platform
                      </span>
                    </div>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-[#EAB308] text-black">
                      24/7 Access
                    </span>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 bg-[#EAB308] text-black border-2 border-black p-3 font-[1000] text-xs uppercase shadow-md">
                  10,000+ Curated Puzzles
                </div>
              </div>
            </div>

            {/* Content on Right */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EAB308] text-black border-2 border-black text-[10px] font-[1000] uppercase tracking-[0.25em]">
                <Monitor className="w-3.5 h-3.5" />
                Beyond the Live Lesson
              </div>

              <h2 className="text-3xl md:text-5xl font-[1000] text-black uppercase tracking-tight leading-tight">
                TRAINING THAT CONTINUES <br />
                <span className="text-[#EAB308] [-webkit-text-stroke:2px_black]">
                  OUTSIDE LIVE CLASSES
                </span>
              </h2>

              <p className="text-gray-700 font-bold text-sm md:text-base leading-relaxed">
                Improvement doesn't stop when your video call ends. With ChessMate, you receive round-the-clock access to our specialized adult training platform, weekly assigned puzzle drills, and asynchronous coach feedback on your weekend games.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PLATFORM_FEATURES.map((item, idx) => {
                  const IconC = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2"
                    >
                      <div className="flex items-center gap-2 text-black font-[1000] text-xs uppercase tracking-wider">
                        <IconC className="w-4 h-4 text-[#EAB308]" />
                        {item.title}
                      </div>
                      <p className="text-[11px] font-bold text-gray-500 leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={openDemoModal}
                className="px-8 py-4 bg-black text-[#EAB308] font-[1000] text-xs uppercase tracking-[0.2em] border-2 border-black hover:bg-[#EAB308] hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] flex items-center gap-3"
              >
                Test-Drive the Platform in Free Demo
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          6. INTERACTIVE RATING & GOAL ROADMAP CALCULATOR WIDGET
      ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b-8 border-black">
        <div className="container mx-auto px-6 max-w-5xl">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-[#EAB308] text-[10px] font-[1000] uppercase tracking-[0.25em]">
              <Brain className="w-3.5 h-3.5" />
              Personalized Diagnostic
            </div>
            
            <h2 className="text-3xl md:text-5xl font-[1000] text-black uppercase tracking-tight">
              CALCULATE YOUR <br />
              <span className="text-[#EAB308] [-webkit-text-stroke:2px_black]">
                IMPROVEMENT TRAJECTORY
              </span>
            </h2>

            <p className="text-gray-600 font-bold text-xs md:text-sm">
              Select your current experience and available time to generate a customized training roadmap:
            </p>
          </div>

          <div className="border-4 border-black bg-gray-50 p-6 md:p-10 shadow-[14px_14px_0px_0px_rgba(0,0,0,1)] space-y-8">
            
            {/* 1. Current Level */}
            <div>
              <label className="block text-xs font-[1000] uppercase tracking-widest text-black mb-3">
                1. Select Current Chess Level / Rating
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "beginner", label: "Beginner (0-900)", sub: "Learning basics & tactics" },
                  { id: "intermediate", label: "Intermediate (900-1500)", sub: "Stuck at plateau / Casuals" },
                  { id: "advanced", label: "Advanced (1500-2000+)", sub: "Club & OTB tournament prep" }
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setCalcLevel(lvl.id)}
                    className={`p-3.5 border-2 border-black text-left font-bold transition-all ${
                      calcLevel === lvl.id
                        ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    <div className="text-xs font-[1000] uppercase">{lvl.label}</div>
                    <div className={`text-[9px] uppercase ${calcLevel === lvl.id ? "text-gray-300" : "text-gray-500"}`}>
                      {lvl.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Primary Goal */}
            <div>
              <label className="block text-xs font-[1000] uppercase tracking-widest text-black mb-3">
                2. What is Your Primary Objective?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "plateau", label: "Break Rating Plateau" },
                  { id: "tournament", label: "OTB Tournament Prep" },
                  { id: "repertoire", label: "Opening & Repertoire" },
                  { id: "scratch", label: "Learn From Scratch" }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setCalcGoal(g.id)}
                    className={`p-3 border-2 border-black text-center text-xs font-[1000] uppercase tracking-wider transition-all ${
                      calcGoal === g.id
                        ? "bg-[#EAB308] text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Available Time */}
            <div>
              <label className="block text-xs font-[1000] uppercase tracking-widest text-black mb-3">
                3. Weekly Time Commitment (Class + Practice)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "1-2", label: "1-2 Hours/week", sub: "Casual Pace" },
                  { id: "3-5", label: "3-5 Hours/week", sub: "Recommended" },
                  { id: "6+", label: "6+ Hours/week", sub: "Intensive" }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setCalcHours(t.id)}
                    className={`p-3 border-2 border-black text-center transition-all ${
                      calcHours === t.id
                        ? "bg-black text-[#EAB308] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        : "bg-white text-black hover:bg-gray-100"
                    }`}
                  >
                    <div className="text-xs font-[1000] uppercase">{t.label}</div>
                    <div className="text-[9px] font-bold uppercase text-gray-400">{t.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Plan Output Box */}
            <div className="p-6 bg-black text-white border-3 border-black space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-3">
                <div className="text-xs font-[1000] uppercase tracking-widest text-[#EAB308] flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Generated Training Blueprint
                </div>
                <div className="text-[10px] font-black uppercase text-gray-400">
                  Estimated Timeline: {recommendation.timeframe}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                    Projected Rating Growth
                  </div>
                  <div className="text-2xl font-[1000] text-[#EAB308]">
                    {recommendation.ratingTarget}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
                    Core Focus Area
                  </div>
                  <div className="text-xs font-bold text-gray-200 mt-1">
                    {recommendation.primaryFocus}
                  </div>
                </div>
              </div>

              <button
                onClick={openDemoModal}
                className="w-full py-4 bg-[#EAB308] text-black font-[1000] text-xs uppercase tracking-[0.2em] border-2 border-black hover:bg-white transition-colors flex items-center justify-center gap-2"
              >
                Claim This Custom Plan in Free Demo Class
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          7. ADULT IMPROVER TESTIMONIALS & CASE STUDIES
      ========================================================================= */}
      <section className="py-20 md:py-28 bg-gray-50 border-b-8 border-black">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#EAB308] text-black border-2 border-black text-[10px] font-[1000] uppercase tracking-[0.25em]">
              <Star className="w-3.5 h-3.5 fill-black" />
              Real Student Transformations
            </div>

            <h2 className="text-3xl md:text-5xl font-[1000] text-black uppercase tracking-tight">
              HEAR FROM WORKING ADULTS <br />
              <span className="text-[#EAB308] [-webkit-text-stroke:2px_black]">
                WHO TRANSFORMED THEIR GAME
              </span>
            </h2>

            <p className="text-gray-600 font-bold text-sm md:text-base">
              From busy developers to doctors and tournament contenders—see what adult improvers achieve at ChessMate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ADULT_TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="p-8 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Rating Gain Pill */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#EAB308] text-[10px] font-[1000] uppercase tracking-widest">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {t.ratingGain} ({t.timeframe})
                  </div>

                  <p className="text-xs md:text-sm font-bold text-gray-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t-2 border-gray-100">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border-2 border-black object-cover"
                  />
                  <div>
                    <h4 className="font-[1000] text-sm uppercase text-black">{t.name}</h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. FLEXIBLE ADULT COACHING TRACKS (NO RUPEES / NO STATIC PRICING)
      ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b-8 border-black">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-[#EAB308] text-[10px] font-[1000] uppercase tracking-[0.25em]">
              <Trophy className="w-3.5 h-3.5" />
              Tailored Coaching Plans
            </div>

            <h2 className="text-3xl md:text-5xl font-[1000] text-black uppercase tracking-tight">
              FLEXIBLE 1-ON-1 <br />
              <span className="text-[#EAB308] [-webkit-text-stroke:2px_black]">
                ADULT COACHING TRACKS
              </span>
            </h2>

            <p className="text-gray-600 font-bold text-sm md:text-base leading-relaxed">
              No rigid lock-ins. Flexible rescheduling designed for busy working professionals. All tracks include full 24/7 LMS & puzzle engine access.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ADULT_PACKAGES.map((pkg, idx) => (
              <div
                key={idx}
                className={`border-4 border-black p-8 flex flex-col justify-between relative transition-all ${
                  pkg.popular
                    ? "bg-black text-white shadow-[14px_14px_0px_0px_rgba(234,179,8,1)] lg:-translate-y-2"
                    : "bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                }`}
              >
                {/* Popular Stamp */}
                {pkg.popular && (
                  <div className="absolute -top-4 right-6 bg-[#EAB308] text-black px-4 py-1 font-[1000] text-[9px] uppercase tracking-widest border-2 border-black">
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <span
                      className={`text-[9px] font-[1000] uppercase tracking-widest px-2.5 py-1 inline-block mb-3 border ${
                        pkg.popular
                          ? "bg-white/10 text-[#EAB308] border-[#EAB308]/30"
                          : "bg-gray-100 text-black border-black"
                      }`}
                    >
                      {pkg.badge}
                    </span>
                    <h3 className="text-2xl font-[1000] uppercase tracking-tight">
                      {pkg.name}
                    </h3>
                    <p
                      className={`text-xs font-bold mt-2 leading-relaxed ${
                        pkg.popular ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {pkg.desc}
                    </p>
                  </div>

                  {/* Program Info Block (No Rupee / Pricing) */}
                  <div className="py-4 border-y border-current/20 space-y-1">
                    <div className="text-xl md:text-2xl font-[1000] uppercase tracking-tight text-[#EAB308]">
                      {pkg.sessions}
                    </div>
                    <div
                      className={`text-[10px] font-black uppercase tracking-wider ${
                        pkg.popular ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {pkg.duration} • 1-on-1 Mentorship
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs font-bold leading-snug">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            pkg.popular ? "text-[#EAB308]" : "text-green-600"
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-6">
                  <button
                    onClick={openDemoModal}
                    className={`w-full py-4 font-[1000] text-xs uppercase tracking-[0.2em] border-2 border-black transition-all flex items-center justify-center gap-2 ${
                      pkg.popular
                        ? "bg-[#EAB308] text-black hover:bg-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]"
                        : "bg-black text-[#EAB308] hover:bg-[#EAB308] hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    }`}
                  >
                    Select Track & Book Free Demo
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p
                    className={`text-center text-[9px] font-bold uppercase tracking-wider mt-2.5 ${
                      pkg.popular ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Includes 100% Free Initial Assessment
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          9. COMPREHENSIVE ADULT CHESS FREQUENTLY ASKED QUESTIONS
      ========================================================================= */}
      <section className="py-20 md:py-28 bg-gray-50 border-b-8 border-black">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <div className="text-center mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-[#EAB308] text-[10px] font-[1000] uppercase tracking-[0.25em]">
              <HelpCircle className="w-3.5 h-3.5" />
              Clear Answers
            </div>

            <h2 className="text-3xl md:text-5xl font-[1000] text-black uppercase tracking-tight">
              FREQUENTLY ASKED <br />
              <span className="text-[#EAB308] [-webkit-text-stroke:2px_black]">
                QUESTIONS
              </span>
            </h2>

            <p className="text-gray-600 font-bold text-xs md:text-sm">
              Everything you need to know about our adult coaching methodology, scheduling, and trials.
            </p>
          </div>

          <div className="space-y-4">
            {ADULT_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border-3 border-black bg-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-[1000] text-sm md:text-base uppercase tracking-tight text-black hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-7 h-7 bg-[#EAB308] text-black border border-black flex items-center justify-center text-xs shrink-0">
                        Q{idx + 1}
                      </span>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-black shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#EAB308]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t-2 border-gray-100 text-xs md:text-sm font-bold text-gray-700 leading-relaxed bg-gray-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          10. HIGH-CONVERTING BOTTOM CTA BANNER
      ========================================================================= */}
      <section className="py-20 md:py-28 px-6 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black border-4 border-black p-8 md:p-14 shadow-[16px_16px_0px_0px_rgba(234,179,8,1)] text-white relative overflow-hidden">
            
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#EAB308]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
              <div className="space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAB308] text-black text-[10px] font-[1000] uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  Zero Risk • 100% Free Trial
                </div>
                
                <h3 className="text-3xl md:text-5xl font-[1000] uppercase tracking-tight text-white leading-tight">
                  READY TO ELEVATE <br />
                  <span className="text-[#EAB308]">YOUR CHESS GAME?</span>
                </h3>

                <p className="text-gray-400 font-bold text-sm md:text-base max-w-md">
                  Book your complimentary 45-minute 1-on-1 assessment. A FIDE-rated coach will review your recent games and create your custom improvement roadmap.
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

                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  No credit card required • No obligations
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
