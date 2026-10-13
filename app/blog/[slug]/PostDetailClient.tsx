"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Zap, Share2, Bookmark, CheckCircle2 } from "lucide-react";

import RichContentRenderer from "@/components/blog/RichContentRenderer";

export default function PostDetailClient({ post }: { post: any }) {
  // Safe extraction of the content object
  const content = post?.content || {};

  // Helper to split title for the cinematic "last word stroke" effect
  const titleWords = post?.title?.split(" ") || [];
  const lastWord = titleWords.pop();
  const mainTitle = titleWords.join(" ");

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-[#EAB308]">
      {/* --- HEADER / META SECTION --- */}
      <header className="relative w-full pt-32 md:pt-40 pb-12 border-b-[10px] border-black bg-white overflow-hidden">
        {/* Background Decal */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[10rem] md:text-[20rem] font-[1000] text-gray-50 leading-none select-none -z-0 tracking-tighter uppercase italic opacity-80 pointer-events-none">
          {post?.category?.split(" ")[0] || "READ"}
        </div>

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          {/* Action Bar */}
          <div className="flex justify-between items-center mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest hover:text-[#EAB308] transition-colors group text-black"
            >
              <ArrowLeft
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                strokeWidth={3}
              />
              Back to Insights
            </Link>
          </div>

          {/* Category Sticker */}
          <div className="flex items-center gap-4 mb-8">
            <span className="px-4 py-1.5 bg-[#EAB308] border-2 border-black text-[10px] font-[1000] uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
              {post?.category || "Article"}
            </span>
            <div className="h-[2px] w-8 bg-black opacity-10"></div>
            <span className="text-[10px] md:text-xs font-bold uppercase text-gray-400 tracking-widest">
              {post?.date}
            </span>
          </div>

          {/* Main Title: Brutalist Hybrid Styling */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-[1000] text-black uppercase leading-[0.95] mb-10 tracking-tighter">
            {mainTitle}{" "}
            <span className="text-white [-webkit-text-stroke:1.5px_black] md:[-webkit-text-stroke:2px_black] drop-shadow-[4px_4px_0px_rgba(234,179,8,1)]">
              {lastWord}
            </span>
          </h1>

          {/* Author Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-8 border-t-2 border-black/5 text-black">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-black bg-[#EAB308] flex items-center justify-center shadow-[3px_3px_0px_0px_black]">
                <User className="w-5 h-5 text-black" />
              </div>
              <div className="leading-none text-black">
                <p className="text-[9px] font-black uppercase text-gray-400 mb-1">Written By</p>
                <p className="text-xs md:text-sm font-[1000] uppercase tracking-tight">
                  {post?.author || "ChessMate Academy"}
                </p>
              </div>
            </div>
            <div className="hidden sm:block h-8 w-[2px] bg-black/10" />
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase text-gray-500 tracking-widest">
              <Clock className="w-4 h-4 text-[#EAB308]" /> 8 Min Intensive Read
            </div>
          </div>
        </div>
      </header>

      {/* --- ARTICLE CONTENT --- */}
      <main className="container mx-auto px-6 max-w-4xl py-12 md:py-20">
        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full aspect-video border-4 border-black mb-16 md:mb-24 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-gray-100"
        >
          <img
            src={post?.image}
            alt={post?.title}
            className="w-full h-full object-cover transition-all duration-1000"
          />
        </motion.div>

        {/* Article Body */}
        <article
          className="prose prose-neutral max-w-none 
          prose-headings:font-[1000] prose-headings:uppercase prose-headings:tracking-tighter
          prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg
          prose-strong:text-black prose-strong:font-black
          prose-blockquote:border-l-[#EAB308] prose-blockquote:bg-gray-50 prose-blockquote:py-2"
        >
          {/* Top Description / Lead */}
          <p className="text-xl md:text-3xl font-[1000] leading-tight mb-12 border-l-[12px] border-[#EAB308] pl-8 italic text-black uppercase tracking-tight">
            {post?.desc}
          </p>

          <div className="space-y-12 font-medium">
            {/* Dynamic Intro */}
            {content.intro && <p className="text-lg md:text-xl text-black font-bold whitespace-pre-line">{content.intro}</p>}

            {/* Special Callouts (Myth, Brain Benefits, etc) */}
            {content.myth && <div className="bg-red-50 p-6 border-l-8 border-black font-bold italic text-black uppercase mb-8 shadow-[4px_4px_0px_0px_black]">{content.myth}</div>}
            {content.whyGapExists && <p className="text-lg">{content.whyGapExists}</p>}
            {content.whyOnlineMakesSense && <p className="text-lg">{content.whyOnlineMakesSense}</p>}

            {/* 1. RICH CONTENT RENDERER (Blocks, Middle Images, Tables, Lists, Numbering) */}
            <RichContentRenderer content={content} />

            {/* Legacy Fallback Sections for Static Hardcoded Blogs */}
            {!Array.isArray(content.blocks) && (
              <>


            {/* 2. NUMBERED LISTS (Tactics, Benefits, Features, Metrics, WhyItWorks, SkillsBuilt) */}
            {(() => {
              const listItems = [
                ...(content.benefits || []),
                ...(content.tactics || []),
                ...(content.features || []),
                ...(content.metrics || []),
                ...(content.criteria || []),
                ...(content.whyItWorks || []),
                ...(content.skillsBuilt || []),
              ];
              
              if (listItems.length === 0) return null;

              return (
                <div className="space-y-8">
                  {listItems.map((item: any, idx: number) => (
                    <div key={idx} className="flex gap-6 group">
                      <span className="text-4xl md:text-6xl font-[1000] text-gray-200 group-hover:text-[#EAB308] transition-colors leading-none">
                        {(item.number || idx + 1).toString().padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xl font-black uppercase text-black mb-2">
                          {item.title || item.name}
                        </h3>
                        <p className="whitespace-pre-line">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* 3. STEPS & PHASES (Improve Rating / Tournament Prep / Methodology) */}
            {(() => {
              const stepItems = [...(content.steps || []), ...(content.phases || [])];
              if (stepItems.length === 0) return null;

              return (
                <div className="grid gap-8">
                  {stepItems.map((item: any, idx: number) => (
                    <div key={idx} className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_black] bg-white text-black">
                      <span className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black uppercase mb-4 tracking-widest">
                        {item.step ? `Step ${item.step}` : item.phase}
                      </span>
                      <h3 className="text-2xl font-[1000] uppercase text-black mb-4">
                        {item.title || item.name}
                      </h3>
                      <p className="whitespace-pre-line">{item.body}</p>
                      {Array.isArray(item.points) && (
                        <ul className="mt-6 space-y-3">
                          {item.points.map((p: string, pIdx: number) => (
                            <li key={pIdx} className="flex gap-3 items-start text-sm">
                              <CheckCircle2 className="w-5 h-5 text-[#EAB308] shrink-0" />
                              <span className="font-bold">{p}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* 4. OPENINGS (White vs Black Grid) */}
            {(content.whiteOpenings || content.blackOpenings) && (
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-black mb-6 bg-black text-white inline-block px-4 py-1">FOR WHITE</h2>
                  <div className="grid gap-6">
                    {content.whiteOpenings?.map((op: any, i: number) => (
                      <div key={i} className="border-2 border-black p-6 italic shadow-[4px_4px_0px_0px_black]">
                        <span className="font-black uppercase block not-italic text-lg mb-2">{op.name}</span>
                        {op.body}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-black mb-6 bg-black text-white inline-block px-4 py-1">FOR BLACK</h2>
                  <div className="grid gap-6">
                    {content.blackOpenings?.map((op: any, i: number) => (
                      <div key={i} className="border-2 border-black p-6 italic shadow-[4px_4px_0px_0px_black]">
                        <span className="font-black uppercase block not-italic text-lg mb-2">{op.name}</span>
                        {op.body}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. CROSS CURRICULAR & PROS GRID */}
            {(() => {
              const grids = [...(content.crossCurricular || []), ...(content.onlinePros || [])];
              if (grids.length === 0) return null;

              return (
                <div className="grid md:grid-cols-2 gap-6">
                   {grids.map((item: any, i: number) => (
                     <div key={i} className="p-6 bg-gray-50 border-2 border-black shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">
                       <h4 className="font-black uppercase mb-2 text-black">{item.subject || item.title}</h4>
                       <p className="text-sm">{item.body}</p>
                     </div>
                   ))}
                </div>
              );
            })()}

            {/* 6. ROLE MODELS */}
            {content.roleModels && (
              <div className="space-y-8">
                <h2 className="text-3xl font-black uppercase italic border-b-8 border-black inline-block">Inspirational Icons</h2>
                {content.roleModels.map((rm: any, i: number) => (
                  <div key={i} className="flex flex-col md:flex-row gap-6 items-start bg-gray-50 p-8 border-l-8 border-[#EAB308]">
                    <div className="text-2xl font-black uppercase text-black min-w-[200px]">{rm.name}</div>
                    <div className="text-base italic border-l-2 border-black/10 pl-6">{rm.bio}</div>
                  </div>
                ))}
              </div>
            )}

            {/* 7. STRING ARRAYS (Tips for Parents, Pros list, Adult Benefits) */}
            {(() => {
              const simpleLists = [
                ...(Array.isArray(content.tipsForParents) ? content.tipsForParents : []),
                ...(Array.isArray(content.inPersonPros) ? content.inPersonPros : []),
                ...(Array.isArray(content.whyAdultsAreBetter) ? content.whyAdultsAreBetter : [])
              ];
              if (simpleLists.length === 0) return null;

              return (
                <div className="bg-black p-8 text-white rounded-2xl">
                  <h3 className="text-2xl font-black uppercase mb-6 tracking-widest text-[#EAB308]">Expert Strategy Points</h3>
                  <ul className="space-y-4">
                    {simpleLists.map((tip: string, i: number) => (
                      <li key={i} className="flex gap-4 items-start font-bold border-b border-white/10 pb-4">
                        <Zap className="w-5 h-5 text-[#EAB308] shrink-0 mt-1" fill="currentColor" /> 
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}

            {/* 8. ELITE INSIGHT / QUOTE CALLOUT */}
            <div className="bg-black text-white p-8 md:p-12 border-4 border-black shadow-[12px_12px_0px_0px_rgba(234,179,8,1)] my-16 relative overflow-hidden group">
              <Zap className="text-[#EAB308] mb-6 w-8 h-8 md:w-10 md:h-10" fill="currentColor" />
              <h4 className="text-xl md:text-2xl font-[1000] uppercase italic mb-4 tracking-tighter">
                FIDE Master Perspective
              </h4>
              <p className="text-gray-300 text-base md:text-lg font-medium italic leading-relaxed max-w-2xl">
                {content.conclusion?.slice(0, 160) || content.verdict?.slice(0, 160)}...
              </p>
              <div className="absolute top-[-10%] right-[-5%] opacity-5 rotate-12 transition-transform group-hover:scale-110">
                <Zap className="w-40 h-40 md:w-64 md:h-64" />
              </div>
            </div>

            {/* 9. EXTRA CONTEXT BLOCKS */}
            <div className="space-y-6">
              {content.whenToStart && <div className="p-6 bg-gray-100 border-l-8 border-black"><strong>Ideal Starting Point:</strong> {content.whenToStart}</div>}
              {content.principles && <div className="p-6 bg-gray-100 border-l-8 border-black"><strong>Core Principles:</strong> {content.principles}</div>}
              {content.expectations && <div className="p-6 bg-gray-100 border-l-8 border-black"><strong>Realistic Expectations:</strong> {content.expectations}</div>}
              {content.brainBenefits && <div className="p-8 border-4 border-black font-bold uppercase italic shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]">{content.brainBenefits}</div>}
              {content.whatToExpect && <div className="p-6 border-2 border-black italic text-black">{content.whatToExpect}</div>}
              {content.howChessMateTeachesDifferently && <div className="p-8 bg-[#EAB308] text-black font-[1000] uppercase border-4 border-black">{content.howChessMateTeachesDifferently}</div>}
              {content.tips && <div className="p-6 bg-black text-white font-bold uppercase tracking-tight">{content.tips}</div>}
            </div>
            </>
            )}

            {/* Dynamic Conclusion / Final Verdict */}
            {(content.conclusion || content.verdict) && (
              <div className="bg-[#EAB308]/10 p-8 border-4 border-black rounded-none shadow-[8px_8px_0px_0px_black]">
                <h3 className="text-black font-[1000] uppercase mb-4 tracking-widest flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-black" /> The Final Move
                </h3>
                <p className="text-black font-bold italic text-lg leading-relaxed whitespace-pre-line">
                  {content.conclusion || content.verdict}
                </p>
              </div>
            )}
          </div>
        </article>

        {/* BOTTOM NAVIGATION / CTA */}
        <div className="mt-20 pt-12 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#EAB308] animate-pulse"></div>
            <h3 className="text-xl md:text-3xl font-[1000] uppercase tracking-tighter text-black">
              Elevate Your <span className="text-[#EAB308]">Strategy.</span>
            </h3>
          </div>

          <Link
            href="/blog"
            className="w-full md:w-auto bg-black text-[#EAB308] px-10 py-5 border-2 border-black font-[1000] uppercase text-xs tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] hover:bg-[#EAB308] hover:text-black hover:shadow-none transition-all text-center"
          >
            Explore More Insights
          </Link>
        </div>
      </main>
    </div>
  );
}