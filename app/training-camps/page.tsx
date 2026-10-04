"use client";

import React from "react";
import { motion } from "framer-motion";
import { CalendarX, Mail, ArrowRight, BookOpen } from "lucide-react";
import TrainingCampsBanner from "@/components/ui/trainingCampBanner";
import TestimonialsSection from "@/components/testimonials-section";

const NoActiveCamps: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Banner */}
      <TrainingCampsBanner />

      {/* 2. Empty State Section */}
      <section className="py-20 px-6 bg-[#000000]">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border-4 border-black p-8 md:p-16 shadow-[12px_12px_0px_0px_rgba(253,224,71,1)] text-center"
          >
            {/* Icon Circle */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 border-4 border-black rounded-full mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CalendarX className="w-10 h-10 text-black" />
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-black uppercase italic mb-6 tracking-tight">
              Quiet on the <span className="bg-yellow-400 px-2">Front.</span>
            </h2>
            
            <p className="text-lg md:text-xl font-bold text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
              There are currently no active training camps scheduled. Our Grandmasters are currently drafting 
              new legendary sessions. Don't fall behind while we're away.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary CTA */}
              <button className="w-full sm:w-auto bg-black text-white px-8 py-4 font-black uppercase tracking-widest border-4 border-black hover:bg-yellow-400 hover:text-black transition-all active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[6px_6px_0px_0px_rgba(253,224,71,1)] flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Notify Me
              </button>

              {/* Secondary CTA */}
              <a 
                href="/curriculum" 
                className="w-full sm:w-auto bg-white text-black px-8 py-4 font-black uppercase tracking-widest border-4 border-black hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                Explore Curriculum
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* 3. "While You Wait" Suggestions */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-yellow-400 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              <BookOpen className="w-10 h-10 mb-4 text-black" />
              <h3 className="text-xl font-black uppercase mb-2">Self-Study Path</h3>
              <p className="font-bold text-black/80 mb-4">Check out our free resources and blog to keep your tactics sharp.</p>
              <a href="/blog" className="underline font-black uppercase text-sm hover:text-white transition-colors">Read Blogs —&gt;</a>
            </div>

            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(253,224,71,1)]">
              <div className="flex -space-x-4 mb-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="coach" />
                  </div>
                ))}
              </div>
              <h3 className="text-xl font-black uppercase mb-2">Private Coaching</h3>
              <p className="font-bold text-gray-600 mb-4">Camps are closed, but our coaches aren't. Book a 1-on-1 session.</p>
              <a href="/coaches" className="underline font-black uppercase text-sm hover:text-yellow-500 transition-colors">Find a Coach —&gt;</a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <TestimonialsSection />

      {/* 4. Contact Footer Link */}
      <div className="bg-white py-12 text-center border-t-4 border-black">
          <p className="font-black uppercase tracking-tighter text-2xl">
            Have a specific request? <a href="/contact" className="text-yellow-500 hover:underline">Contact us</a>
          </p>
      </div>
    </div>
  );
};

export default NoActiveCamps;