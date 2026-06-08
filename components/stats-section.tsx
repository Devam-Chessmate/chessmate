"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Minus,
  HelpCircle,
  Zap,
  ArrowRight,
  Phone,
  Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoModal } from "@/context/DemoContext";

const faqData = [
  {
    question: "What is Chess Mate Academy?",
    answer: "Chess Mate Academy is a premier professional training institute. We provide interactive live classes to kids and adults, focusing on strategic thinking and competitive mastery.",
  },
  {
    question: "What age group do we teach?",
    answer: "We teach kids as young as 5 years old to adults with no age limits. Our curriculum is tailored to the cognitive stage of the student, ensuring effective learning for every generation.",
  },
  {
    question: "Do you provide online or offline sessions?",
    answer: "We are a fully digital academy specializing in high-quality, live interactive online classes. We do not provide offline classes, allowing students from all over the world to access our elite FIDE-certified coaching.",
  },
  {
    question: "Is there a curriculum for beginners?",
    answer: "Yes. Our 'Beginner to Master' roadmap is structured into clear phases, starting with fundamental movement and logic before progressing to advanced tactical patterns.",
  },
  {
    question: "How do you track a student's progress?",
    answer: "Progress is monitored through monthly performance analytics, puzzle accuracy, and internal tournament results. Parents receive a comprehensive growth report every 30 days.",
  },
  {
    question: "Can I book a trial class first?",
    answer: "Yes, we offer a complimentary 1-on-1 assessment session. This helps our coaches determine the student's current skill level and recommend the most effective training path.",
  },
];

export default function PremiumFaqSection() {
  const { openDemoModal } = useDemoModal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-20 md:py-28 bg-white border-t-[10px] border-black overflow-hidden selection:bg-[#EAB308]">
      
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[10rem] md:text-[20rem] font-[1000] text-gray-50 leading-none select-none -z-0 tracking-tighter uppercase italic opacity-80 pointer-events-none">
        QUERY
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT SIDE: INFO & CONTACT --- */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Zap className="fill-[#EAB308] text-[#EAB308]" size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black italic">Help Center</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-[1000] text-black leading-[0.95] uppercase tracking-tighter mb-8">
                HAVE A <br />
                <span className="text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] [-webkit-text-stroke:1.5px_black]">QUESTION?</span>
              </h2>
              
              <p className="text-gray-500 font-bold text-sm md:text-base leading-relaxed max-w-md">
                Find answers to common inquiries about our online training methodology, 
                schedules, and enrollment process.
              </p>
            </div>

            {/* Support Sidebar Card */}
            <div className="bg-black p-8 border-l-[8px] border-[#EAB308] shadow-[15px_15px_0px_0px_rgba(243,244,246,1)]">
              <h4 className="text-[#EAB308] font-black uppercase text-xs tracking-widest mb-6">Direct Support</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-[#EAB308] flex items-center justify-center text-black shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-bold text-sm tracking-tight group-hover:text-[#EAB308] transition-colors">+91 79907 75581</span>
                    <span className="text-white font-bold text-sm tracking-tight group-hover:text-[#EAB308] transition-colors">+91 87330 84949</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-[#EAB308] flex items-center justify-center text-black shrink-0">
                    <Mail size={18} />
                  </div>
                  <span className="text-white font-bold text-sm tracking-tight group-hover:text-[#EAB308] transition-colors">contact@thechessmate.org</span>
                </div>
              </div>
              
              <button onClick={openDemoModal} className="w-full mt-10 py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#EAB308] transition-all">
                Book a Demo <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* --- RIGHT SIDE: ACCORDION --- */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {faqData.map((item, index) => (
                <div 
                  key={index}
                  className={`border-b-2 border-black transition-all duration-300 ${openIndex === index ? 'bg-gray-50/50' : 'bg-white'}`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between py-7 px-4 text-left group"
                  >
                    <span className={`font-black uppercase tracking-tight text-sm md:text-lg transition-colors duration-300 ${openIndex === index ? 'text-[#EAB308]' : 'text-black group-hover:text-[#EAB308]'}`}>
                      {index + 1}. {item.question}
                    </span>
                    <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                      {openIndex === index ? <Minus size={20} className="text-[#EAB308]" /> : <Plus size={20} className="text-black" />}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-4 pb-8 md:pl-10 md:pr-12">
                          <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Success Quote */}
            <div className="mt-12 flex items-center gap-4 opacity-40">
              <HelpCircle size={20} className="text-black" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                Global Digital Learning • Expert Support
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}