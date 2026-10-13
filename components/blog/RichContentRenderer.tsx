"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ContentBlock,
  ImageBlock,
  TableBlock,
  NumberedListBlock,
  BulletListBlock,
  CalloutBlock,
  SectionBlock,
  VideoBlock,
  ChessboardBlock,
  FAQBlock,
  DividerBlock,
  MarkdownBlock,
  HeadingBlock,
  ParagraphBlock,
} from "./types";
import {
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Zap,
  Quote,
  Maximize2,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ExternalLink,
  Film,
  Camera,
  Layers,
} from "lucide-react";

// Safe dynamic import for react-chessboard to prevent SSR hydration mismatches
const DynamicChessboard = dynamic(
  () => import("react-chessboard").then((mod) => mod.Chessboard),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square max-w-[360px] mx-auto border-4 border-black bg-gray-100 flex items-center justify-center font-bold text-xs uppercase text-gray-500">
        Loading Interactive Chessboard...
      </div>
    ),
  }
);

// Helper to extract YouTube video ID from various URL formats
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    // Vimeo check
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
  } catch {
    return null;
  }
  return null;
}

export default function RichContentRenderer({
  content,
}: {
  content: any;
}) {
  const [lightboxImage, setLightboxImage] = useState<{
    url: string;
    caption?: string;
  } | null>(null);

  const [expandedFaq, setExpandedFaq] = useState<Record<string, boolean>>({});

  if (!content) return null;

  const blocks: ContentBlock[] = Array.isArray(content.blocks)
    ? content.blocks
    : [];

  // Helper to toggle FAQ item
  const toggleFaq = (key: string) => {
    setExpandedFaq((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER INDIVIDUAL BLOCK
  // ─────────────────────────────────────────────────────────────────────────────
  const renderBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      // 1. IMAGE IN MIDDLE OF BLOG
      case "image": {
        const imgBlock = block as ImageBlock;
        if (!imgBlock.url) return null;

        let containerClass = "my-8";
        if (imgBlock.alignment === "left") {
          containerClass = "my-6 md:float-left md:mr-8 md:mb-6 max-w-sm w-full";
        } else if (imgBlock.alignment === "right") {
          containerClass = "my-6 md:float-right md:ml-8 md:mb-6 max-w-sm w-full";
        } else if (imgBlock.alignment === "center") {
          containerClass = "my-8 max-w-2xl mx-auto w-full";
        } else {
          containerClass = "my-10 w-full";
        }

        return (
          <figure key={block.id || index} className={containerClass}>
            <div className="relative group border-4 border-black bg-gray-100 shadow-[8px_8px_0px_0px_black] overflow-hidden">
              <img
                src={imgBlock.url}
                alt={imgBlock.alt || imgBlock.caption || "Blog image"}
                className="w-full h-auto object-cover max-h-[550px] transition-transform duration-300 group-hover:scale-[1.01]"
                loading="lazy"
              />
              <button
                type="button"
                onClick={() =>
                  setLightboxImage({
                    url: imgBlock.url,
                    caption: imgBlock.caption,
                  })
                }
                className="absolute bottom-3 right-3 p-2 bg-black text-[#EAB308] border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity shadow-[2px_2px_0px_0px_white]"
                title="View full size"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            {imgBlock.caption && (
              <figcaption className="mt-2 text-center text-xs font-bold text-gray-600 italic flex items-center justify-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[#EAB308]" />
                {imgBlock.caption}
              </figcaption>
            )}
          </figure>
        );
      }

      // 2. TABLE BLOCK
      case "table": {
        const tbl = block as TableBlock;
        if (!tbl.headers || tbl.headers.length === 0) return null;

        return (
          <div key={block.id || index} className="my-8 space-y-2">
            {tbl.title && (
              <h4 className="text-base md:text-lg font-[1000] uppercase text-black tracking-tight flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#EAB308] border border-black inline-block" />
                {tbl.title}
              </h4>
            )}
            <div className="overflow-x-auto border-4 border-black bg-white shadow-[8px_8px_0px_0px_black]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black text-white border-b-4 border-black">
                    {tbl.headers.map((h, hIdx) => (
                      <th
                        key={hIdx}
                        className="p-3.5 md:p-4 text-xs md:text-sm font-[1000] uppercase tracking-wider border-r-2 border-white/20 last:border-r-0"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tbl.rows && tbl.rows.length > 0 ? (
                    tbl.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={`border-b-2 border-black last:border-b-0 ${
                          rIdx % 2 === 1 ? "bg-yellow-50/50" : "bg-white"
                        } hover:bg-[#EAB308]/10 transition-colors`}
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className="p-3 md:p-4 text-xs md:text-sm font-semibold text-gray-800 border-r-2 border-black/20 last:border-r-0"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={tbl.headers.length}
                        className="p-4 text-center text-xs font-bold text-gray-400 italic"
                      >
                        No rows added yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      // 3. NUMBERED LIST BLOCK
      case "numberedList": {
        const nList = block as NumberedListBlock;
        if (!nList.items || nList.items.length === 0) return null;

        return (
          <div key={block.id || index} className="my-8 space-y-4">
            {nList.title && (
              <h3 className="text-xl md:text-2xl font-[1000] uppercase text-black tracking-tight border-b-2 border-black pb-2">
                {nList.title}
              </h3>
            )}
            <div className="space-y-4">
              {nList.items.map((item, iIdx) => {
                const numStr = (iIdx + 1).toString().padStart(2, "0");
                return (
                  <div
                    key={iIdx}
                    className="flex items-start gap-4 p-4 md:p-5 border-3 border-black bg-white shadow-[5px_5px_0px_0px_black] group hover:border-[#EAB308] transition-colors"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-black text-[#EAB308] border-2 border-black flex items-center justify-center font-[1000] text-sm md:text-base tracking-tighter shadow-[2px_2px_0px_0px_black] group-hover:bg-[#EAB308] group-hover:text-black transition-colors">
                      {numStr}
                    </div>
                    <div className="space-y-1 pt-0.5 flex-1">
                      {item.title && (
                        <h4 className="text-base md:text-lg font-[1000] uppercase text-black tracking-tight">
                          {item.title}
                        </h4>
                      )}
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium whitespace-pre-line">
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      // 4. BULLET LIST BLOCK
      case "bulletList": {
        const bList = block as BulletListBlock;
        if (!bList.items || bList.items.length === 0) return null;

        return (
          <div key={block.id || index} className="my-6 space-y-3">
            {bList.title && (
              <h4 className="text-lg font-[1000] uppercase text-black tracking-tight mb-2">
                {bList.title}
              </h4>
            )}
            <ul className="space-y-2.5">
              {bList.items.map((item, bIdx) => (
                <li
                  key={bIdx}
                  className="flex items-start gap-3 text-sm md:text-base text-gray-800 font-medium"
                >
                  {bList.style === "check" ? (
                    <div className="w-5 h-5 mt-0.5 rounded-none bg-[#EAB308] border-2 border-black flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[3]" />
                    </div>
                  ) : bList.style === "arrow" ? (
                    <span className="w-5 h-5 mt-0.5 bg-black text-[#EAB308] flex items-center justify-center shrink-0 font-black text-xs">
                      →
                    </span>
                  ) : bList.style === "pawn" ? (
                    <span className="text-lg leading-none shrink-0 text-[#EAB308] select-none">
                      ♟
                    </span>
                  ) : (
                    <span className="w-2.5 h-2.5 mt-2 bg-[#EAB308] border border-black shrink-0 inline-block" />
                  )}
                  <span className="flex-1 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }

      // 5. CALLOUT / PRO TIP / QUOTE
      case "callout": {
        const callout = block as CalloutBlock;

        if (callout.variant === "warning") {
          return (
            <div
              key={block.id || index}
              className="my-8 p-6 border-4 border-red-500 bg-red-50 shadow-[6px_6px_0px_0px_black] space-y-2"
            >
              <div className="flex items-center gap-2 text-red-700 font-[1000] uppercase text-sm tracking-wider">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {callout.title || "Important Advisory"}
              </div>
              <p className="text-sm md:text-base text-red-900 leading-relaxed font-semibold">
                {callout.text}
              </p>
            </div>
          );
        }

        if (callout.variant === "insight") {
          return (
            <div
              key={block.id || index}
              className="my-8 p-6 md:p-8 border-4 border-black bg-black text-white shadow-[8px_8px_0px_0px_rgba(234,179,8,1)] space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center gap-2 text-[#EAB308] font-[1000] uppercase text-xs md:text-sm tracking-wider">
                <Zap className="w-5 h-5 shrink-0 fill-current" />
                {callout.title || "FIDE Master Perspective"}
              </div>
              <p className="text-base md:text-lg text-gray-200 leading-relaxed font-bold italic whitespace-pre-line">
                "{callout.text}"
              </p>
              {callout.author && (
                <p className="text-xs font-black uppercase text-[#EAB308] tracking-widest text-right">
                  — {callout.author}
                </p>
              )}
            </div>
          );
        }

        if (callout.variant === "quote") {
          return (
            <div
              key={block.id || index}
              className="my-8 p-6 md:p-8 border-l-8 border-[#EAB308] bg-yellow-50/70 border-2 border-black/10 shadow-[4px_4px_0px_0px_black] space-y-3"
            >
              <Quote className="w-8 h-8 text-[#EAB308]" />
              <blockquote className="text-lg md:text-xl font-bold italic text-black leading-relaxed whitespace-pre-line">
                "{callout.text}"
              </blockquote>
              {callout.author && (
                <p className="text-xs font-[1000] uppercase tracking-wider text-gray-600">
                  — {callout.author}
                </p>
              )}
            </div>
          );
        }

        // Default variant = "tip"
        return (
          <div
            key={block.id || index}
            className="my-8 p-6 border-4 border-black bg-[#FAF9F5] shadow-[6px_6px_0px_0px_rgba(234,179,8,1)] space-y-2"
          >
            <div className="flex items-center gap-2 text-black font-[1000] uppercase text-sm tracking-wider">
              <Lightbulb className="w-5 h-5 text-[#EAB308] shrink-0 fill-current" />
              {callout.title || "Strategy Pro Tip"}
            </div>
            <p className="text-sm md:text-base text-gray-800 leading-relaxed font-medium whitespace-pre-line">
              {callout.text}
            </p>
          </div>
        );
      }

      // 6. VIDEO EMBED
      case "video": {
        const vid = block as VideoBlock;
        const embedUrl = getYouTubeEmbedUrl(vid.url);

        return (
          <div key={block.id || index} className="my-8 space-y-2">
            <div className="aspect-video w-full border-4 border-black bg-black shadow-[8px_8px_0px_0px_black] overflow-hidden">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={vid.caption || "Video embed"}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-gray-400">
                  <Film className="w-10 h-10 mb-2 text-[#EAB308]" />
                  <p className="text-xs font-bold uppercase text-white">
                    Video Player
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1 max-w-sm truncate">
                    {vid.url || "Please enter a valid YouTube or Vimeo URL"}
                  </p>
                </div>
              )}
            </div>
            {vid.caption && (
              <p className="text-center text-xs font-bold text-gray-600 italic">
                {vid.caption}
              </p>
            )}
          </div>
        );
      }

      // 7. CHESSBOARD BLOCK
      case "chessboard": {
        const cb = block as ChessboardBlock;
        return (
          <div
            key={block.id || index}
            className="my-10 p-6 border-4 border-black bg-white shadow-[8px_8px_0px_0px_black] space-y-4"
          >
            {cb.title && (
              <div className="border-b-2 border-black pb-2">
                <span className="text-[10px] bg-[#EAB308] border border-black font-[1000] px-2 py-0.5 uppercase tracking-wider">
                  Tactical Board
                </span>
                <h4 className="text-lg md:text-xl font-[1000] uppercase text-black tracking-tight mt-1">
                  {cb.title}
                </h4>
              </div>
            )}

            <div className="max-w-[380px] mx-auto border-4 border-black shadow-[6px_6px_0px_0px_black]">
              <DynamicChessboard
                position={cb.fen && cb.fen.trim() ? cb.fen.trim() : "start"}
                boardOrientation={cb.orientation || "white"}
                arePiecesDraggable={false}
              />
            </div>

            {cb.description && (
              <p className="text-xs md:text-sm text-gray-700 font-bold text-center leading-relaxed max-w-md mx-auto italic">
                {cb.description}
              </p>
            )}
          </div>
        );
      }

      // 8. FAQ ACCORDION BLOCK
      case "faq": {
        const faq = block as FAQBlock;
        if (!faq.items || faq.items.length === 0) return null;

        return (
          <div key={block.id || index} className="my-10 space-y-4">
            {faq.title && (
              <h3 className="text-xl md:text-2xl font-[1000] uppercase text-black tracking-tight border-b-2 border-black pb-2">
                {faq.title}
              </h3>
            )}
            <div className="space-y-3">
              {faq.items.map((item, fIdx) => {
                const itemKey = `${block.id}_${fIdx}`;
                const isOpen = Boolean(expandedFaq[itemKey]);

                return (
                  <div
                    key={fIdx}
                    className="border-3 border-black bg-white shadow-[4px_4px_0px_0px_black] transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(itemKey)}
                      className="w-full p-4 text-left font-[1000] text-sm md:text-base uppercase tracking-tight flex items-center justify-between gap-4 hover:bg-yellow-50 transition-colors"
                    >
                      <span className="text-black">{item.question}</span>
                      <span className="p-1 border border-black bg-black text-white shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-3 border-t-2 border-black/10 bg-[#FAF9F5] text-xs md:text-sm text-gray-700 font-medium leading-relaxed whitespace-pre-line space-y-2">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      // 9. HEADING BLOCK
      case "heading": {
        const h = block as HeadingBlock;
        if (h.level === 3) {
          return (
            <h3
              key={block.id || index}
              className="text-xl md:text-2xl font-[1000] uppercase text-black tracking-tight mt-8 mb-4 border-b-2 border-black/40 pb-1"
            >
              {h.text}
            </h3>
          );
        }
        if (h.level === 4) {
          return (
            <h4
              key={block.id || index}
              className="text-lg md:text-xl font-[1000] uppercase text-black tracking-tight mt-6 mb-3"
            >
              {h.text}
            </h4>
          );
        }
        return (
          <h2
            key={block.id || index}
            className="text-2xl md:text-4xl font-[1000] uppercase text-black tracking-tight mt-10 mb-5 border-b-4 border-black inline-block pb-1"
          >
            {h.text}
          </h2>
        );
      }

      // 10. PARAGRAPH BLOCK
      case "paragraph": {
        const p = block as ParagraphBlock;
        return (
          <div
            key={block.id || index}
            className="text-base md:text-lg text-gray-700 leading-relaxed font-medium my-4 prose-p"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {p.text}
            </ReactMarkdown>
          </div>
        );
      }

      // 11. MARKDOWN BLOCK
      case "markdown": {
        const md = block as MarkdownBlock;
        return (
          <div
            key={block.id || index}
            className="my-6 prose prose-neutral max-w-none 
              prose-headings:font-[1000] prose-headings:uppercase prose-headings:tracking-tighter
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg
              prose-strong:text-black prose-strong:font-black
              prose-table:border-4 prose-table:border-black prose-th:bg-black prose-th:text-white prose-td:border-2 prose-td:border-black
              prose-ol:font-bold prose-ul:font-medium"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {md.content}
            </ReactMarkdown>
          </div>
        );
      }

      // 12. SECTION WITH SUB-POINTS (Backward Compatibility)
      case "section": {
        const sec = block as SectionBlock;
        return (
          <div key={block.id || index} className="space-y-4 my-8">
            <h2 className="text-2xl md:text-4xl font-[1000] uppercase text-black border-b-4 border-black inline-block pb-1">
              {sec.heading}
            </h2>
            {sec.body && (
              <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium whitespace-pre-line">
                {sec.body}
              </p>
            )}
            {Array.isArray(sec.points) && sec.points.length > 0 && (
              <div className="grid gap-4 mt-6">
                {sec.points.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-gray-50 p-5 md:p-6 border-l-4 border-black shadow-[3px_3px_0px_0px_black]"
                  >
                    <h4 className="font-[1000] uppercase text-black mb-1.5 text-base md:text-lg">
                      {pt.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium whitespace-pre-line">
                      {pt.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }

      // 13. DIVIDER
      case "divider": {
        return (
          <div
            key={block.id || index}
            className="my-10 flex items-center gap-4 select-none"
          >
            <div className="flex-1 h-[3px] bg-black" />
            <span className="w-3 h-3 bg-[#EAB308] border-2 border-black rotate-45 inline-block" />
            <div className="flex-1 h-[3px] bg-black" />
          </div>
        );
      }

      default:
        return null;
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // MAIN RENDER
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="rich-content-container space-y-6">
      {/* 1. Dynamic Blocks (Modern) */}
      {blocks.length > 0 ? (
        blocks.map((block, idx) => renderBlock(block, idx))
      ) : (
        /* 2. Fallback to Legacy Sections if blocks array is empty */
        Array.isArray(content.sections) &&
        content.sections.map((section: any, idx: number) => (
          <div key={idx} className="space-y-4 my-8">
            <h2 className="text-2xl md:text-4xl font-[1000] uppercase text-black border-b-4 border-black inline-block pb-1">
              {section.heading}
            </h2>
            {section.body && (
              <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium whitespace-pre-line">
                {section.body}
              </p>
            )}
            {Array.isArray(section.points) && (
              <div className="grid gap-4 mt-6">
                {section.points.map((pt: any, pIdx: number) => (
                  <div
                    key={pIdx}
                    className="bg-gray-50 p-6 border-l-4 border-black shadow-[3px_3px_0px_0px_black]"
                  >
                    <h4 className="font-[1000] uppercase text-black mb-1 text-base">
                      {pt.title}
                    </h4>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium whitespace-pre-line">
                      {pt.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}

      {/* Lightbox Modal for Middle-of-Blog Images */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 p-4 md:p-8 flex flex-col items-center justify-center animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 bg-[#EAB308] border-2 border-black text-black font-black uppercase text-xs flex items-center gap-1 shadow-[2px_2px_0px_0px_white]"
            >
              <X className="w-4 h-4" /> Close
            </button>
            <img
              src={lightboxImage.url}
              alt={lightboxImage.caption || "Full image view"}
              className="max-w-full max-h-[80vh] object-contain border-4 border-white shadow-[10px_10px_0px_0px_black]"
            />
            {lightboxImage.caption && (
              <p className="mt-3 text-center text-sm font-bold text-white bg-black/80 px-4 py-1.5 border border-white/20">
                {lightboxImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
