"use client";

import React, { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Shield,
  Video,
  Award,
  Zap,
  Copy,
  Check,
  Brain,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ThankYouClient() {
  const [copied, setCopied] = useState(false);
  const CAL_URL = "https://cal.com/devam-makwana-chessmate/free-demo-chess-class";

  const handleCopy = () => {
    navigator.clipboard.writeText(CAL_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const NEXT_STEPS = [
    {
      step: "01",
      title: "Select Time Slot",
      desc: "Use the calendar below to choose a 30-45 minute slot that matches your timezone.",
      icon: <Calendar className="w-6 h-6 text-black" />
    },
    {
      step: "02",
      title: "Receive Meeting Link",
      desc: "Instant calendar invite & Google Meet link sent straight to your registered email.",
      icon: <Video className="w-6 h-6 text-black" />
    },
    {
      step: "03",
      title: "Live 1-on-1 Assessment",
      desc: "Join our FIDE-rated coach on an interactive digital board for skill evaluation & personalized roadmap.",
      icon: <Award className="w-6 h-6 text-black" />
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#EAB308] selection:text-black pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* --- TOP CELEBRATION HERO --- */}
        <div className="text-center space-y-6 mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22C55E] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xs font-[1000] uppercase tracking-widest"
          >
            <CheckCircle2 className="w-4 h-4" /> Request Submitted Successfully!
          </motion.div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-[1000] uppercase tracking-tighter leading-[0.95]">
              THANK YOU! <br />
              <span className="text-[#EAB308] [-webkit-text-stroke:2px_black] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                CHOOSE YOUR DEMO SLOT
              </span>
            </h1>
            <p className="text-sm sm:text-base font-bold text-gray-700 max-w-2xl mx-auto uppercase tracking-wide">
              We received your details. Please pick your preferred date & time below to instantly lock in your coach and receive the meeting invite.
            </p>
          </div>
        </div>

        {/* --- PRIMARY CAL.COM ACTION CARD --- */}
        <div className="border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-16 overflow-hidden">
          
          {/* Card Top Banner */}
          <div className="bg-[#EAB308] p-6 border-b-4 border-black flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black text-[#EAB308] flex items-center justify-center border-2 border-black shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black">
                  Official Scheduling Portal
                </span>
                <h2 className="text-xl sm:text-2xl font-[1000] uppercase text-black leading-none mt-0.5">
                  Book Your Free Demo Session
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-black text-[#EAB308] hover:bg-white hover:text-black border-2 border-black font-[1000] text-xs uppercase tracking-widest transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopy}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-white text-black hover:bg-black hover:text-white border-2 border-black font-[1000] text-xs uppercase tracking-wider transition-all"
                title="Copy booking link"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Direct Link Display */}
          <div className="p-4 bg-gray-50 border-b-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono font-bold">
            <span className="text-gray-600 uppercase text-[10px] tracking-wider shrink-0 font-sans">
              Direct Link:
            </span>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-[#EAB308] underline break-all text-center sm:text-left"
            >
              {CAL_URL}
            </a>
          </div>

          {/* Embedded Cal.com iFrame for direct booking */}
          <div className="relative w-full bg-white min-h-[600px] sm:min-h-[700px]">
            <iframe
              src={CAL_URL}
              title="Book Free Demo Chess Class"
              className="w-full h-[650px] sm:h-[750px] border-none"
              allow="camera; microphone; fullscreen; display-capture"
            />
          </div>

          {/* Card Footer WhatsApp fallback */}
          <div className="p-6 bg-black text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-t-4 border-black">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-[#EAB308] shrink-0" />
              <div>
                <p className="text-xs font-black uppercase tracking-wider">
                  Prefer WhatsApp instead?
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">
                  Our coordinators can help you schedule a time manually within 5 minutes.
                </p>
              </div>
            </div>

            <a
              href="https://wa.me/917990775581?text=Hi%20ChessMate%20Team,%20I%20just%20submitted%20a%20free%20demo%20request%20and%20would%20like%20to%20confirm%20my%20slot!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white border-2 border-white hover:bg-white hover:text-black font-[1000] text-xs uppercase tracking-widest transition-all shrink-0"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* --- 3-STEP ROADMAP SECTION --- */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAB308] bg-black px-3 py-1 border border-black inline-block mb-2">
              What to Expect
            </span>
            <h3 className="text-2xl sm:text-3xl font-[1000] uppercase tracking-tight">
              3 Simple Steps to Your First Class
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEXT_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-6 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#EAB308] border-2 border-black flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-3xl font-[1000] text-gray-200">
                      {item.step}
                    </span>
                  </div>
                  <h4 className="text-lg font-[1000] uppercase mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs font-bold text-gray-600 leading-relaxed uppercase">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- EXPLORE WHILE YOU WAIT --- */}
        <div className="p-8 border-4 border-black bg-gray-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 fill-[#EAB308] text-black" />
            <h4 className="text-lg font-[1000] uppercase tracking-wide">
              Explore ChessMate While You Wait
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <Link
              href="/puzzles"
              className="p-4 bg-white border-2 border-black hover:bg-[#EAB308] transition-colors group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-black" />
                <span className="text-xs font-[1000] uppercase tracking-wider">
                  Daily Tactics Puzzles
                </span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/platform"
              className="p-4 bg-white border-2 border-black hover:bg-[#EAB308] transition-colors group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-black" />
                <span className="text-xs font-[1000] uppercase tracking-wider">
                  24/7 Training Platform
                </span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/courses"
              className="p-4 bg-white border-2 border-black hover:bg-[#EAB308] transition-colors group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-black" />
                <span className="text-xs font-[1000] uppercase tracking-wider">
                  Course Catalog
                </span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
