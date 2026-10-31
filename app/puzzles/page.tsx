import type { Metadata } from "next";
import Link from "next/link";
import { getSeoMetadata } from "@/config/seo";
import { Zap, Target, Trophy, ArrowRight, Brain, Swords, ShieldAlert } from "lucide-react";

export const metadata: Metadata = getSeoMetadata("puzzles");

export default function PuzzlesHubPage() {
  const tiers = [
    {
      level: "Beginner",
      title: "Mate in 1 & Basic Tactics",
      description:
        "Master the fundamentals: mate in one, hanging pieces, simple pins, and elementary checkmate patterns designed for rapid pattern recognition.",
      href: "/puzzles/beginner",
      color: "bg-white",
      badge: "Level 1",
      icon: Target,
      highlight: "Foundation Skills",
    },
    {
      level: "Intermediate",
      title: "Forks, Pins & Double Attacks",
      description:
        "Level up calculation with double attacks, skewers, discovered checks, deflection tactics, and multi-move combinations that win material.",
      href: "/puzzles/intermediate",
      color: "bg-yellow-400",
      badge: "Level 2",
      icon: Swords,
      highlight: "Tactical Vision",
    },
    {
      level: "Advanced",
      title: "Master-Level Calculation",
      description:
        "Tackle complex tactical puzzles with quiet candidate moves, piece sacrifices, prophylaxis, and deep endgame calculations under tournament pressure.",
      href: "/puzzles/advanced",
      color: "bg-black",
      textColor: "text-white",
      badge: "Level 3",
      icon: Trophy,
      highlight: "Tournament Ready",
    },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 selection:bg-yellow-400">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-14 border-b-4 border-black pb-10">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-yellow-500 fill-yellow-400" />
            <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-500">
              Interactive Tactics Training
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-[1000] text-black uppercase tracking-tight mb-4">
            Chess Tactics &amp; <span className="bg-yellow-400 px-3 py-1 border-2 border-black inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Daily Puzzles</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 font-bold max-w-3xl leading-relaxed mt-4">
            Sharpen your tactical radar every day. Solve curated chess puzzles across 3 progressive difficulty levels to build lightning-fast tactical calculation and blunder prevention.
          </p>
        </div>

        {/* Puzzle Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => {
            const IconComponent = tier.icon;
            const isDark = tier.textColor === "text-white";
            return (
              <div
                key={tier.level}
                className={`${tier.color} ${isDark ? "text-white" : "text-black"} border-4 border-black p-8 flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 border-2 border-black ${
                        isDark ? "bg-yellow-400 text-black" : "bg-black text-white"
                      }`}
                    >
                      {tier.badge}
                    </span>
                    <IconComponent className={`w-7 h-7 ${isDark ? "text-yellow-400" : "text-black"}`} />
                  </div>

                  <h2 className="text-2xl font-[1000] uppercase tracking-tight mb-2">
                    {tier.level} Puzzles
                  </h2>
                  <p className={`text-xs font-black uppercase tracking-widest mb-4 ${isDark ? "text-yellow-400" : "text-gray-600"}`}>
                    {tier.title}
                  </p>
                  <p className={`text-sm font-medium leading-relaxed mb-8 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                    {tier.description}
                  </p>
                </div>

                <Link
                  href={tier.href}
                  className={`w-full py-4 px-6 font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 border-2 border-black transition-all ${
                    isDark
                      ? "bg-yellow-400 text-black hover:bg-white"
                      : "bg-black text-white hover:bg-yellow-400 hover:text-black"
                  } shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]`}
                >
                  Start Solving <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Demo Callout Strip */}
        <div className="bg-yellow-400 border-4 border-black p-8 md:p-12 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/70 block mb-2">
              Accelerate Your Tactical Growth
            </span>
            <h3 className="text-2xl md:text-3xl font-[1000] text-black uppercase tracking-tight mb-3">
              Want a FIDE-Rated Coach to Analyze Your Games?
            </h3>
            <p className="text-sm md:text-base font-bold text-black/80">
              Book a complimentary 45-minute 1-on-1 assessment. A certified coach will pinpoint your recurring tactical blind spots and build a customized improvement plan.
            </p>
          </div>
          <Link
            href="/bookdemo"
            className="w-full md:w-auto shrink-0 bg-black text-yellow-400 hover:bg-white hover:text-black border-4 border-black px-8 py-5 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]"
          >
            Book Free Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
