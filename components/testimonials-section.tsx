"use client";

import React, { useState, useEffect } from "react";
import { 
  Quote, 
  Star, 
  User, 
  Zap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_REVIEWS = [
  {
    name: "Isha Patel",
    role: "Parent",
    country: "India",
    text: "Our daughter's creativity and time management skills have flourished since she started at Chess Mate. The video-recorded lectures are fantastic, allowing her to learn at her own pace.",
    color: "bg-white",
    textColor: "text-black",
    shadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
  },
  {
    name: "Cody",
    role: "Adult Student",
    country: "USA",
    text: "Devam is a great teacher! He helped me learn novel methods to digest positions. For my first tournament, he charted out defenses step-by-step. 100% worth every penny spent!",
    color: "bg-black",
    textColor: "text-white",
    shadow: "shadow-[8px_8px_0px_0px_rgba(234,179,8,1)]"
  },
  {
    name: "Aarav Sharma",
    role: "Parent",
    country: "India",
    text: "Chess Mate has been a game-changer for our son. The coaches are exceptional, and the masterclasses have really boosted his confidence. We love the flexibility of recorded lectures.",
    color: "bg-[#EAB308]",
    textColor: "text-black",
    shadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
  },
  {
    name: "Alex",
    role: "Adult Student",
    country: "USA",
    text: "I’ve been taking chess classes with Devam at Chessmate for a while now. He explains concepts clearly, even those well above my level. Improved more than I expected!",
    color: "bg-white",
    textColor: "text-black",
    shadow: "shadow-[8px_8px_0px_0px_rgba(234,179,8,1)]"
  },
  {
    name: "Ananya Rao",
    role: "Parent",
    country: "India",
    text: "Since joining Chess Mate, our daughter's focus and problem-solving abilities have improved dramatically. The regular tournaments keep her engaged and the coaching is impactful.",
    color: "bg-black",
    textColor: "text-white",
    shadow: "shadow-[8px_8px_0px_0px_rgba(234,179,8,1)]"
  },
  {
    name: "Brad",
    role: "Adult Student",
    country: "USA",
    text: "He is patient, explains concepts clearly, and tailors the lessons to what I need. I’ve noticed major improvement in how I think through positions. Highly recommended.",
    color: "bg-[#EAB308]",
    textColor: "text-black",
    shadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
  },
  {
    name: "Erik",
    role: "Student",
    country: "Japan",
    text: "These classes have helped improve my skills by a ton! I went from 800 Elo to 1400 in only a few months. I know many lines and have much better board vision now.",
    color: "bg-white",
    textColor: "text-black",
    shadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
  }
];

export default function TestimonialSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Handle responsiveness manually for the slider count
  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 768) setDisplayCount(1);
      else if (window.innerWidth < 1024) setDisplayCount(2);
      else setDisplayCount(3);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % ALL_REVIEWS.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 1 + ALL_REVIEWS.length) % ALL_REVIEWS.length);
  };

  // Auto slide effect
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, startIndex]);

  // Get the visible slides (wrapping around the array)
  const visibleReviews = [];
  for (let i = 0; i < displayCount; i++) {
    visibleReviews.push(ALL_REVIEWS[(startIndex + i) % ALL_REVIEWS.length]);
  }

  return (
    <section className="relative py-20 md:py-32 bg-white border-t-[10px] border-black overflow-hidden selection:bg-[#EAB308]">
      
      {/* Background Architectural Decal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[25rem] font-[1000] text-gray-50 leading-none select-none -z-0 tracking-tighter uppercase italic opacity-80 pointer-events-none">
        VOICE
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 md:mb-24 gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <Zap className="fill-[#EAB308] text-[#EAB308] w-6 h-6" />
              <span className="text-[10px] md:text-xs font-[1000] uppercase tracking-[0.4em] text-black italic">
                The Community Voice
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-[1000] text-black leading-tight uppercase tracking-tighter">
              STUDENT <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] [-webkit-text-stroke:2px_black]">FEEDBACK.</span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 md:w-16 md:h-16 border-4 border-black bg-white flex items-center justify-center hover:bg-[#EAB308] transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              <ChevronLeft className="w-8 h-8" strokeWidth={3} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 md:w-16 md:h-16 bg-black text-[#EAB308] border-4 border-black flex items-center justify-center hover:bg-[#EAB308] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              <ChevronRight className="w-8 h-8" strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* --- SLIDER GRID --- */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleReviews.map((review, idx) => (
                <motion.div
                  key={`${review.name}-${startIndex}-${idx}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`relative p-8 border-4 border-black ${review.color} ${review.textColor} ${review.shadow} flex flex-col h-full min-h-[380px]`}
                >
                  <Quote className={`w-10 h-10 mb-6 ${review.textColor === 'text-white' ? 'text-[#EAB308]/30' : 'text-black/10'}`} fill="currentColor" />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
                    ))}
                  </div>

                  <p className="text-base md:text-lg font-[1000] italic leading-[1.4] mb-10 flex-grow tracking-tight">
                    "{review.text}"
                  </p>

                  <div className="pt-8 border-t-2 border-current/10 flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 border-2 border-current flex items-center justify-center bg-current/5 shrink-0">
                       <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm md:text-base font-[1000] uppercase tracking-widest leading-none mb-1">
                        {review.name}
                      </h4>
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">
                        {review.role} • {review.country}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-3 mt-10">
            {ALL_REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 border-2 border-black ${
                  startIndex === i
                    ? "w-8 h-3.5 bg-[#EAB308] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "w-3.5 h-3.5 bg-gray-200 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* --- BOTTOM TAG --- */}
        <div className="mt-20 pt-10 border-t-4 border-black flex justify-center opacity-40">
           <p className="text-[10px] font-[1000] uppercase tracking-[0.6em] text-black">
              Elite Standard In Digital Chess Education
           </p>
        </div>
      </div>
    </section>
  );
}