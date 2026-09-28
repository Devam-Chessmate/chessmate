"use client"; // 1. Add this for client-side hooks

import React from 'react';
import { ArrowRightIcon, SparklesIcon } from './BannerIcon';
import { useDemoModal } from "@/context/DemoContext"; // 2. Import the hook

const CoachCtaSection: React.FC = () => {
  // 3. Initialize the modal trigger
  const { openDemoModal } = useDemoModal();

  return (
    <section className="relative py-16 px-4 md:px-8 bg-white flex justify-center z-20">
      
      {/* Main Container */}
      <div className="w-full max-w-6xl relative">
        
        {/* Banner Card */}
        <div className="bg-[#1e1b4b] rounded-[30px] shadow-2xl overflow-visible relative flex flex-col md:flex-row items-center justify-between p-8 md:p-0 md:pr-12 min-h-[220px]">
          
          {/* Background Decor - Right Swirls */}
          <div className="absolute top-0 right-0 h-full w-2/3 pointer-events-none opacity-20 overflow-hidden rounded-r-[30px]">
             <svg viewBox="0 0 400 200" className="w-full h-full text-blue-500 fill-current">
               <path d="M0,200 C150,200 150,0 400,0 L400,200 Z" />
               <path d="M100,200 C250,200 250,50 400,50 L400,200 Z" opacity="0.5" />
             </svg>
          </div>

          {/* Left Side: Image Pop-out */}
          <div className="relative md:w-1/3 flex justify-center md:justify-start md:-mt-8 md:-ml-4 mb-6 md:mb-0 shrink-0">
             <div className="relative group cursor-pointer" onClick={openDemoModal}>
                {/* Glowing ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-purple-500 blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Image Container */}
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-[#1e1b4b] overflow-hidden bg-white z-10 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                    alt="Professional Coach" 
                    className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="absolute -top-2 -right-2 z-20 animate-pulse">
                   <SparklesIcon className="w-8 h-8 text-yellow-400" />
                </div>
                
                <div className="absolute bottom-4 -left-2 z-20 animate-pulse delay-700">
                   <SparklesIcon className="w-5 h-5 text-purple-400" />
                </div>
             </div>
          </div>

          {/* Middle: Text Content */}
          <div className="flex-1 text-center md:text-left z-10 md:pl-4 mb-8 md:mb-0">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 tracking-tight">
              Finding Your Right <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Coach</span>
            </h2>
            <p className="text-blue-200 text-sm md:text-lg font-medium">
              Learn From FIDE-Rated Trainers Here!
            </p>
          </div>

          {/* Right: Button UPDATED to trigger modal */}
          <div className="z-10 shrink-0">
            <button 
              onClick={openDemoModal}
              className="group bg-white text-[#1e1b4b] hover:bg-blue-50 active:scale-95 transition-all duration-300 font-bold py-3 px-8 rounded-full flex items-center gap-2 shadow-[0_4px_14px_0_rgba(255,255,255,0.39)]"
            >
              BOOK FREE DEMO
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CoachCtaSection;