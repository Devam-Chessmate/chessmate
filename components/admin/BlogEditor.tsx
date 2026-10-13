"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Send,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Plus,
  Trash2,
  Copy,
  Eye,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Clock,
  User,
  Tag,
  Hash,
  AlertCircle,
  Check,
  RefreshCw,
  Layers,
  ChevronDown,
  ChevronUp,
  Star,
  Table as TableIcon,
  ListOrdered,
  List as ListIcon,
  Heading2,
  Quote,
  Film,
  Camera,
  MoveUp,
  MoveDown,
  Columns,
  Rows,
  Sliders,
  Type,
  Lightbulb,
  Zap,
} from "lucide-react";

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
  HeadingBlock,
  ParagraphBlock,
  generateBlockId,
  normalizeBlocksFromContent,
} from "../blog/types";
import RichContentRenderer from "../blog/RichContentRenderer";

interface BlogEditorProps {
  initialData?: any;
  isEditing?: boolean;
}

const PREDEFINED_CATEGORIES = [
  "Neurodiverse Learners",
  "Child Development",
  "Strategy & Tactics",
  "Beginner Guides",
  "Tournaments & Events",
  "Chess Psychology",
  "Training Tips",
];

export default function BlogEditor({
  initialData,
  isEditing = false,
}: BlogEditorProps) {
  const router = useRouter();

  // Basic Form States
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!isEditing);
  const [desc, setDesc] = useState(initialData?.desc || "");
  const [category, setCategory] = useState(
    initialData?.category || "Neurodiverse Learners"
  );
  const [customCategory, setCustomCategory] = useState("");
  const [author, setAuthor] = useState(
    initialData?.author || "ChessMate Academy"
  );
  const [date, setDate] = useState(
    initialData?.date ||
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
  );
  const [image, setImage] = useState(initialData?.image || "/benefit.png");
  const [published, setPublished] = useState(
    initialData?.published !== undefined ? initialData.published : true
  );
  const [isFeatured, setIsFeatured] = useState(
    initialData?.isFeatured || false
  );

  // SEO
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(
    initialData?.metaDescription || ""
  );
  const [keywordInput, setKeywordInput] = useState("");
  const [targetKeywords, setTargetKeywords] = useState<string[]>(
    Array.isArray(initialData?.targetKeywords)
      ? initialData.targetKeywords
      : []
  );

  // Content Structure: intro, blocks, conclusion
  const [intro, setIntro] = useState<string>(
    initialData?.content?.intro || ""
  );
  const [conclusion, setConclusion] = useState<string>(
    initialData?.content?.conclusion || ""
  );
  const [blocks, setBlocks] = useState<ContentBlock[]>(() => {
    if (initialData?.content) {
      const normalized = normalizeBlocksFromContent(initialData.content);
      if (normalized.length > 0) return normalized;
    }
    // Default starter blocks for new articles
    return [
      {
        id: generateBlockId(),
        type: "heading",
        level: 2,
        text: "Key Strategies and Highlights",
      },
      {
        id: generateBlockId(),
        type: "paragraph",
        text: "Consistent training helps young players identify tactical patterns rapidly and build long-lasting focus.",
      },
      {
        id: generateBlockId(),
        type: "callout",
        variant: "insight",
        title: "FIDE Master Perspective",
        text: "Pattern recognition is the bridge between calculating moves and intuitive mastery.",
        author: "FIDE Master Coach",
      },
    ];
  });

  // UI States
  const [activeTab, setActiveTab] = useState<"EDITOR" | "PREVIEW" | "SEO">(
    "EDITOR"
  );
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [uploadCoverError, setUploadCoverError] = useState<string | null>(null);
  const [uploadCoverSuccess, setUploadCoverSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Per-block uploading states
  const [blockUploadStatus, setBlockUploadStatus] = useState<
    Record<string, { uploading: boolean; error?: string; success?: boolean }>
  >({});

  // Block collapse states
  const [collapsedBlocks, setCollapsedBlocks] = useState<
    Record<string, boolean>
  >({});

  // Auto-generate slug from title
  useEffect(() => {
    if (autoSlug && title) {
      const generated = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generated);
    }
  }, [title, autoSlug]);

  // Featured Cover Image Upload (Cloudinary)
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingCover(true);
      setUploadCoverError(null);
      setUploadCoverSuccess(false);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setImage(data.url);
        setUploadCoverSuccess(true);
        setTimeout(() => setUploadCoverSuccess(false), 3000);
      } else {
        setUploadCoverError(data.error || "Failed to upload to Cloudinary");
      }
    } catch (err: any) {
      setUploadCoverError(err?.message || "Error uploading image to Cloudinary");
    } finally {
      setIsUploadingCover(false);
    }
  };

  // Middle-of-Blog Inline Image Upload (Cloudinary)
  const handleInlineImageUpload = async (
    blockId: string,
    file: File
  ) => {
    try {
      setBlockUploadStatus((prev) => ({
        ...prev,
        [blockId]: { uploading: true },
      }));

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setBlocks((prev) =>
          prev.map((b) =>
            b.id === blockId && b.type === "image"
              ? { ...b, url: data.url }
              : b
          )
        );
        setBlockUploadStatus((prev) => ({
          ...prev,
          [blockId]: { uploading: false, success: true },
        }));
        setTimeout(() => {
          setBlockUploadStatus((prev) => ({
            ...prev,
            [blockId]: { uploading: false, success: false },
          }));
        }, 3000);
      } else {
        setBlockUploadStatus((prev) => ({
          ...prev,
          [blockId]: {
            uploading: false,
            error: data.error || "Upload failed",
          },
        }));
      }
    } catch (err: any) {
      setBlockUploadStatus((prev) => ({
        ...prev,
        [blockId]: {
          uploading: false,
          error: err?.message || "Upload error",
        },
      }));
    }
  };

  // Keywords
  const handleAddKeyword = () => {
    if (keywordInput.trim() && !targetKeywords.includes(keywordInput.trim())) {
      setTargetKeywords([...targetKeywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setTargetKeywords(targetKeywords.filter((k) => k !== kw));
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOCK MANAGEMENT ACTIONS
  // ─────────────────────────────────────────────────────────────────────────────
  const addBlock = (blockType: ContentBlock["type"]) => {
    const id = generateBlockId();
    let newBlock: ContentBlock;

    switch (blockType) {
      case "image":
        newBlock = {
          id,
          type: "image",
          url: "",
          caption: "",
          alt: "",
          alignment: "full",
        };
        break;

      case "table":
        newBlock = {
          id,
          type: "table",
          title: "Comparison & Performance Breakdown",
          headers: ["Category / Level", "Key Focus Area", "Weekly Hours"],
          rows: [
            ["Beginner (U1000)", "Board Vision & Basic Tactics", "2 - 3 Hours"],
            ["Intermediate (1000-1500)", "Pawn Structures & Openings", "4 - 5 Hours"],
            ["Advanced (1500+)", "Deep Calculation & Endgames", "6+ Hours"],
          ],
        };
        break;

      case "numberedList":
        newBlock = {
          id,
          type: "numberedList",
          title: "Mastery Pillars",
          items: [
            {
              title: "Control the Center",
              body: "Occupy and control d4, d5, e4, e5 early with pawns and minor pieces.",
            },
            {
              title: "Develop with Purpose",
              body: "Every piece moved should increase active board presence and king safety.",
            },
          ],
        };
        break;

      case "bulletList":
        newBlock = {
          id,
          type: "bulletList",
          title: "Key Takeaways",
          style: "check",
          items: [
            "Structured pattern recognition builds fast calculation skills.",
            "Regular tournament simulation reduces time-trouble mistakes.",
            "Reviewing losses provides 10x more growth than reviewing wins.",
          ],
        };
        break;

      case "callout":
        newBlock = {
          id,
          type: "callout",
          variant: "tip",
          title: "Strategy Pro Tip",
          text: "Always consider candidate moves before committing your piece. Look for Checks, Captures, and Threats (CCT).",
        };
        break;

      case "heading":
        newBlock = {
          id,
          type: "heading",
          level: 2,
          text: "New Section Heading",
        };
        break;

      case "paragraph":
        newBlock = {
          id,
          type: "paragraph",
          text: "Write your detailed explanation here. You can use **bold**, *italics*, and [links](https://chessmate.in) directly.",
        };
        break;

      case "video":
        newBlock = {
          id,
          type: "video",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          caption: "Watch this tactical walkthrough video",
        };
        break;

      case "chessboard":
        newBlock = {
          id,
          type: "chessboard",
          title: "Tactical Position of the Day",
          fen: "r1bqk2r/pppp1ppp/2n5/4p3/2B1n3/2P2N2/PPP2PPP/R1BQK2R w KQkq - 0 6",
          description: "White to move: Find the most active tactical continuation.",
          orientation: "white",
        };
        break;

      case "faq":
        newBlock = {
          id,
          type: "faq",
          title: "Frequently Asked Questions",
          items: [
            {
              question: "How long should a beginner train every week?",
              answer: "We recommend at least 2 to 3 sessions of 45 minutes for children to maintain high engagement.",
            },
            {
              question: "Are online chess lessons as effective as in-person?",
              answer: "Yes! With interactive boards, instant tactical puzzle sharing, and screen recording, students often progress faster.",
            },
          ],
        };
        break;

      case "divider":
        newBlock = {
          id,
          type: "divider",
        };
        break;

      case "section":
      default:
        newBlock = {
          id,
          type: "section",
          heading: "Deep Dive Topic",
          body: "Overview of this topic and why it matters for student growth.",
          points: [
            {
              title: "Core Mechanism",
              body: "Explanation of how this mechanism operates in practical games.",
            },
          ],
        };
        break;
    }

    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (index: number) => {
    setBlocks(blocks.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === blocks.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...blocks];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setBlocks(updated);
  };

  const duplicateBlock = (index: number) => {
    const original = blocks[index];
    const cloned = JSON.parse(JSON.stringify(original));
    cloned.id = generateBlockId();
    const updated = [...blocks];
    updated.splice(index + 1, 0, cloned);
    setBlocks(updated);
  };

  const toggleBlockCollapse = (id: string) => {
    setCollapsedBlocks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const updateBlock = <T extends ContentBlock>(
    index: number,
    updater: (prev: T) => T
  ) => {
    setBlocks((prev) => {
      const copy = [...prev];
      copy[index] = updater(copy[index] as T);
      return copy;
    });
  };

  // Submit Handler
  const handleSubmit = async (publishImmediately: boolean) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      if (!title.trim()) {
        setErrorMessage("Please enter an article title.");
        return;
      }
      if (!desc.trim()) {
        setErrorMessage("Please enter an article excerpt / description.");
        return;
      }
      if (!image.trim()) {
        setErrorMessage("Please select or upload a featured cover image.");
        return;
      }

      const activeCategory =
        category === "Other" && customCategory.trim()
          ? customCategory.trim()
          : category;

      // Build structured content payload
      const contentPayload = {
        intro,
        conclusion,
        blocks,
        // Also map legacy sections so older API readers receive sections
        sections: blocks
          .filter((b) => b.type === "section")
          .map((b: any) => ({
            heading: b.heading,
            body: b.body,
            points: b.points,
          })),
      };

      const payload = {
        title,
        slug,
        desc,
        category: activeCategory,
        author,
        date,
        image,
        published: publishImmediately,
        isFeatured,
        metaTitle: metaTitle || `${title} | ChessMate Academy`,
        metaDescription: metaDescription || desc,
        targetKeywords,
        content: contentPayload,
      };

      const url = isEditing
        ? `/api/blogs/${initialData.id}`
        : "/api/blogs";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMessage(data.error || "Failed to save blog post to database");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "An error occurred while saving");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Top Header / Navigation bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 border-2 border-black bg-gray-100 hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_black]"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-[#EAB308] border border-black font-[1000] px-2 py-0.5 uppercase tracking-wider">
                {isEditing ? "Edit Article" : "Create Post"}
              </span>
              <span className="text-xs font-bold text-gray-500">
                Rich Media & Cloudinary CDN
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-[1000] text-black uppercase tracking-tight mt-1">
              {isEditing ? `Editing: ${initialData?.title}` : "New Blog Article"}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2.5 border-2 border-black bg-gray-100 hover:bg-gray-200 font-[1000] text-xs uppercase tracking-wider transition-colors shadow-[3px_3px_0px_0px_black] active:translate-y-0.5"
          >
            <Save className="w-4 h-4" /> Save Draft
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2.5 border-3 border-black bg-[#EAB308] hover:bg-yellow-400 font-[1000] text-xs uppercase tracking-wider transition-all shadow-[4px_4px_0px_0px_black] active:translate-y-0.5 text-black"
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {published ? "Publish Post" : "Publish Live"}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 border-3 border-red-500 bg-red-50 text-red-700 flex items-center gap-3 shadow-[4px_4px_0px_0px_red]">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="font-bold text-sm">{errorMessage}</span>
        </div>
      )}

      {/* Mode Tabs: Editor, Live Preview, SEO */}
      <div className="flex border-3 border-black bg-white p-1 shadow-[5px_5px_0px_0px_black] gap-1">
        <button
          onClick={() => setActiveTab("EDITOR")}
          className={`flex-1 py-2.5 text-xs font-[1000] uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
            activeTab === "EDITOR"
              ? "bg-black text-white"
              : "text-gray-600 hover:text-black hover:bg-gray-100"
          }`}
        >
          <Layers className="w-4 h-4" /> Article Editor
        </button>
        <button
          onClick={() => setActiveTab("PREVIEW")}
          className={`flex-1 py-2.5 text-xs font-[1000] uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
            activeTab === "PREVIEW"
              ? "bg-[#EAB308] text-black font-[1000]"
              : "text-gray-600 hover:text-black hover:bg-gray-100"
          }`}
        >
          <Eye className="w-4 h-4" /> Live Site Preview
        </button>
        <button
          onClick={() => setActiveTab("SEO")}
          className={`flex-1 py-2.5 text-xs font-[1000] uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
            activeTab === "SEO"
              ? "bg-black text-white"
              : "text-gray-600 hover:text-black hover:bg-gray-100"
          }`}
        >
          <Sparkles className="w-4 h-4" /> SEO & Google SERP
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* TAB 1: ARTICLE EDITOR */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === "EDITOR" && (
        <div className="space-y-6">
          {/* Main Attributes Card */}
          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_black] space-y-5">
            <h2 className="text-lg font-[1000] uppercase tracking-tight text-black flex items-center gap-2 border-b-2 border-black/10 pb-3">
              <span className="w-3 h-3 bg-[#EAB308] border border-black inline-block" />
              Article Basics & Cover Media
            </h2>

            {/* Title */}
            <div>
              <label className="block text-xs font-[1000] uppercase tracking-wider text-black mb-2">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Chess and Autism: How the Game Transforms Children on the Spectrum"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3.5 border-2 border-black bg-gray-50 text-black font-extrabold text-base focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-[1000] uppercase tracking-wider text-black">
                  URL Slug
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-[11px] font-bold text-gray-500 hover:text-black underline uppercase"
                >
                  {autoSlug ? "Lock auto-slug" : "Auto-generate from title"}
                </button>
              </div>
              <div className="flex items-center">
                <span className="px-3.5 py-3 border-2 border-r-0 border-black bg-gray-200 text-gray-600 font-mono text-xs font-bold select-none">
                  /blog/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setSlug(e.target.value);
                  }}
                  className="w-full p-3 border-2 border-black bg-gray-50 font-mono text-xs text-black font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-[1000] uppercase tracking-wider text-black mb-2">
                Excerpt / Short Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="A compelling 2-3 sentence overview that appears on the blog index and search results..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-3.5 border-2 border-black bg-gray-50 text-black font-medium text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
              />
            </div>

            {/* Category & Author & Date Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-[1000] uppercase tracking-wider text-black mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border-2 border-black bg-gray-50 font-bold text-xs uppercase text-black focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                >
                  {PREDEFINED_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="Other">Custom Category...</option>
                </select>
                {category === "Other" && (
                  <input
                    type="text"
                    placeholder="Enter custom category"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full mt-2 p-2.5 border-2 border-black bg-white font-bold text-xs text-black"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-[1000] uppercase tracking-wider text-black mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full p-3 border-2 border-black bg-gray-50 font-bold text-xs text-black focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                />
              </div>

              <div>
                <label className="block text-xs font-[1000] uppercase tracking-wider text-black mb-2">
                  Publish Date
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Feb 24, 2026"
                  className="w-full p-3 border-2 border-black bg-gray-50 font-bold text-xs text-black focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                />
              </div>
            </div>

            {/* Featured Cover Image */}
            <div className="pt-4 border-t-2 border-black/10">
              <label className="block text-xs font-[1000] uppercase tracking-wider text-black mb-2">
                Featured Cover Image (Cloudinary) <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="border-3 border-dashed border-black bg-yellow-50/50 p-6 text-center space-y-3 relative group hover:bg-yellow-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    disabled={isUploadingCover}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-12 h-12 bg-[#EAB308] border-2 border-black mx-auto flex items-center justify-center shadow-[3px_3px_0px_0px_black]">
                    <Upload className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="font-[1000] text-sm uppercase text-black">
                      {isUploadingCover
                        ? "Uploading cover to Cloudinary..."
                        : "Upload Featured Cover Image"}
                    </p>
                    <p className="text-[11px] font-bold text-gray-500 mt-0.5">
                      Cloudinary CDN • Auto Optimized
                    </p>
                  </div>

                  {isUploadingCover && (
                    <div className="flex items-center justify-center gap-2 text-xs font-black text-amber-700 animate-pulse">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Uploading to CDN...
                    </div>
                  )}

                  {uploadCoverSuccess && (
                    <div className="flex items-center justify-center gap-1.5 text-xs font-black text-emerald-600">
                      <CheckCircle className="w-4 h-4" /> Cover uploaded successfully!
                    </div>
                  )}

                  {uploadCoverError && (
                    <div className="text-xs font-bold text-red-600">
                      {uploadCoverError}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="aspect-video w-full border-3 border-black bg-gray-100 overflow-hidden relative shadow-[4px_4px_0px_0px_black]">
                    {image ? (
                      <img
                        src={image}
                        alt="Featured Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as any).src = "/benefit.png";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                        <ImageIcon className="w-8 h-8 mb-1" />
                        <span className="text-xs font-bold uppercase">No cover selected</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Or paste direct image URL (https://...)"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="flex-1 p-2 border-2 border-black bg-gray-50 font-mono text-[11px] text-black font-bold focus:bg-white focus:outline-none"
                    />
                    {image && (
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(image);
                          setCopiedUrl(true);
                          setTimeout(() => setCopiedUrl(false), 2000);
                        }}
                        className="px-3 py-2 border-2 border-black bg-gray-100 hover:bg-gray-200 text-xs font-bold uppercase flex items-center gap-1"
                        title="Copy Image URL"
                      >
                        {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        Copy
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Publishing Flags */}
            <div className="pt-4 border-t-2 border-black/10 flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-5 h-5 accent-[#EAB308] border-2 border-black"
                />
                <span className="font-[1000] text-xs uppercase tracking-wider text-black">
                  Published Live (Visible on Site)
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-5 h-5 accent-[#EAB308] border-2 border-black"
                />
                <span className="font-[1000] text-xs uppercase tracking-wider text-black flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-current text-amber-500" /> Featured Article
                </span>
              </label>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* ARTICLE CONTENT BUILDER: INTRO + RICH BLOCKS + CONCLUSION */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_black] space-y-6">
            <div className="border-b-2 border-black/10 pb-4">
              <h2 className="text-xl font-[1000] uppercase tracking-tight text-black flex items-center gap-2">
                <span className="w-3 h-3 bg-black inline-block" />
                Rich Article Content Builder
              </h2>
              <p className="text-xs font-bold text-gray-500 mt-1">
                Insert middle-of-blog images, interactive comparison tables, numbered lists, bullet points, callout boxes, and chess diagrams in any order.
              </p>
            </div>

            {/* Introduction Paragraph */}
            <div>
              <label className="block text-xs font-[1000] uppercase tracking-wider text-black mb-2">
                Introduction Hook Paragraph
              </label>
              <textarea
                rows={3}
                placeholder="The opening hook that draws readers in and sets up the premise..."
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                className="w-full p-4 border-2 border-black bg-gray-50 font-medium text-sm text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
              />
            </div>

            {/* ─── QUICK ADD CONTENT TOOLBAR ─── */}
            <div className="p-4 border-3 border-black bg-[#FAF9F5] shadow-[4px_4px_0px_0px_black] space-y-3">
              <span className="text-[11px] font-[1000] uppercase tracking-wider text-black flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#EAB308]" strokeWidth={3} />
                Insert New Content Block:
              </span>

              <div className="flex flex-wrap gap-2">
                {/* 1. Image in Middle */}
                <button
                  type="button"
                  onClick={() => addBlock("image")}
                  className="flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-[#EAB308] hover:bg-yellow-400 text-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black] active:translate-y-0.5"
                >
                  <Camera className="w-3.5 h-3.5" /> + Image (In Middle)
                </button>

                {/* 2. Table */}
                <button
                  type="button"
                  onClick={() => addBlock("table")}
                  className="flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black] active:translate-y-0.5 transition-colors"
                >
                  <TableIcon className="w-3.5 h-3.5" /> + Table
                </button>

                {/* 3. Numbered List */}
                <button
                  type="button"
                  onClick={() => addBlock("numberedList")}
                  className="flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black] active:translate-y-0.5 transition-colors"
                >
                  <ListOrdered className="w-3.5 h-3.5" /> + Numbering (1, 2, 3)
                </button>

                {/* 4. Bullet List */}
                <button
                  type="button"
                  onClick={() => addBlock("bulletList")}
                  className="flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black] active:translate-y-0.5 transition-colors"
                >
                  <ListIcon className="w-3.5 h-3.5" /> + Bullet List
                </button>

                {/* 5. Paragraph / Text */}
                <button
                  type="button"
                  onClick={() => addBlock("paragraph")}
                  className="flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black] active:translate-y-0.5 transition-colors"
                >
                  <Type className="w-3.5 h-3.5" /> + Paragraph Text
                </button>

                {/* 6. Heading */}
                <button
                  type="button"
                  onClick={() => addBlock("heading")}
                  className="flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black] active:translate-y-0.5 transition-colors"
                >
                  <Heading2 className="w-3.5 h-3.5" /> + Heading
                </button>

                {/* 7. Callout / Pro Tip */}
                <button
                  type="button"
                  onClick={() => addBlock("callout")}
                  className="flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black] active:translate-y-0.5 transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5" /> + Pro Tip / Callout
                </button>

                {/* 8. Video Embed */}
                <button
                  type="button"
                  onClick={() => addBlock("video")}
                  className="flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black] active:translate-y-0.5 transition-colors"
                >
                  <Film className="w-3.5 h-3.5" /> + Video Embed
                </button>

                {/* 9. Chess Board */}
                <button
                  type="button"
                  onClick={() => addBlock("chessboard")}
                  className="flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-yellow-100 hover:bg-[#EAB308] text-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black] active:translate-y-0.5 transition-colors"
                >
                  ♟ + Chess Diagram
                </button>

                {/* 10. FAQ Accordion */}
                <button
                  type="button"
                  onClick={() => addBlock("faq")}
                  className="flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black] active:translate-y-0.5 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" /> + FAQ Accordion
                </button>

                {/* 11. Section with Subpoints */}
                <button
                  type="button"
                  onClick={() => addBlock("section")}
                  className="flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-white hover:bg-black hover:text-white text-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black] active:translate-y-0.5 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" /> + Section (Cards)
                </button>

                {/* 12. Divider */}
                <button
                  type="button"
                  onClick={() => addBlock("divider")}
                  className="flex items-center gap-1.5 px-3 py-2 border-2 border-black bg-white hover:bg-gray-200 text-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black] active:translate-y-0.5"
                >
                  — Divider
                </button>
              </div>
            </div>

            {/* ─── BLOCKS CONTAINER ─── */}
            <div className="space-y-6">
              {blocks.map((block, bIdx) => {
                const isCollapsed = Boolean(collapsedBlocks[block.id]);

                return (
                  <div
                    key={block.id}
                    className="border-3 border-black bg-[#FAF9F5] shadow-[6px_6px_0px_0px_black] transition-all"
                  >
                    {/* Block Header Toolbar */}
                    <div className="bg-black text-white p-3 flex items-center justify-between gap-3 select-none">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 bg-[#EAB308] text-black font-[1000] text-xs flex items-center justify-center border border-black">
                          {bIdx + 1}
                        </span>
                        <span className="text-xs font-[1000] uppercase tracking-wider text-white flex items-center gap-1.5">
                          {block.type === "image" && (
                            <>
                              <Camera className="w-3.5 h-3.5 text-[#EAB308]" /> Image Block (In Middle)
                            </>
                          )}
                          {block.type === "table" && (
                            <>
                              <TableIcon className="w-3.5 h-3.5 text-[#EAB308]" /> Table Block
                            </>
                          )}
                          {block.type === "numberedList" && (
                            <>
                              <ListOrdered className="w-3.5 h-3.5 text-[#EAB308]" /> Numbered List
                            </>
                          )}
                          {block.type === "bulletList" && (
                            <>
                              <ListIcon className="w-3.5 h-3.5 text-[#EAB308]" /> Bullet List
                            </>
                          )}
                          {block.type === "paragraph" && (
                            <>
                              <Type className="w-3.5 h-3.5 text-[#EAB308]" /> Paragraph Text
                            </>
                          )}
                          {block.type === "heading" && (
                            <>
                              <Heading2 className="w-3.5 h-3.5 text-[#EAB308]" /> Heading (H{(block as any).level || 2})
                            </>
                          )}
                          {block.type === "callout" && (
                            <>
                              <Lightbulb className="w-3.5 h-3.5 text-[#EAB308]" /> Pro Tip / Callout ({(block as any).variant})
                            </>
                          )}
                          {block.type === "video" && (
                            <>
                              <Film className="w-3.5 h-3.5 text-[#EAB308]" /> Video Embed
                            </>
                          )}
                          {block.type === "chessboard" && (
                            <>
                              ♟ Chessboard Diagram
                            </>
                          )}
                          {block.type === "faq" && (
                            <>
                              <HelpCircle className="w-3.5 h-3.5 text-[#EAB308]" /> FAQ Accordion
                            </>
                          )}
                          {block.type === "section" && (
                            <>
                              <Layers className="w-3.5 h-3.5 text-[#EAB308]" /> Section with Cards
                            </>
                          )}
                          {block.type === "divider" && (
                            <>
                              — Divider Line
                            </>
                          )}
                        </span>
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveBlock(bIdx, "up")}
                          disabled={bIdx === 0}
                          className="p-1 hover:bg-[#EAB308] hover:text-black text-white disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Move Up"
                        >
                          <MoveUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(bIdx, "down")}
                          disabled={bIdx === blocks.length - 1}
                          className="p-1 hover:bg-[#EAB308] hover:text-black text-white disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Move Down"
                        >
                          <MoveDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => duplicateBlock(bIdx)}
                          className="p-1 hover:bg-[#EAB308] hover:text-black text-white"
                          title="Duplicate Block"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleBlockCollapse(block.id)}
                          className="p-1 hover:bg-[#EAB308] hover:text-black text-white"
                          title={isCollapsed ? "Expand" : "Collapse"}
                        >
                          {isCollapsed ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronUp className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBlock(bIdx)}
                          className="p-1 hover:bg-red-600 text-white"
                          title="Delete Block"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Block Body */}
                    {!isCollapsed && (
                      <div className="p-5 bg-white space-y-4">
                        {/* 1. IMAGE BLOCK (IN MIDDLE OF BLOG) */}
                        {block.type === "image" && (() => {
                          const imgB = block as ImageBlock;
                          const upStatus = blockUploadStatus[block.id] || {};

                          return (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                                {/* Upload Dropzone */}
                                <div className="border-3 border-dashed border-black bg-yellow-50/40 p-5 text-center space-y-2 relative group hover:bg-yellow-50 transition-colors">
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleInlineImageUpload(block.id, file);
                                    }}
                                    disabled={upStatus.uploading}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                  />
                                  <div className="w-10 h-10 bg-[#EAB308] border-2 border-black mx-auto flex items-center justify-center shadow-[2px_2px_0px_0px_black]">
                                    <Upload className="w-5 h-5 text-black" />
                                  </div>
                                  <p className="font-[1000] text-xs uppercase text-black">
                                    {upStatus.uploading
                                      ? "Uploading to Cloudinary..."
                                      : "Click or Drag Image Here"}
                                  </p>
                                  <p className="text-[10px] font-bold text-gray-500">
                                    Directly inserts in middle of article
                                  </p>

                                  {upStatus.uploading && (
                                    <div className="flex items-center justify-center gap-1.5 text-xs font-black text-amber-700 animate-pulse">
                                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading...
                                    </div>
                                  )}
                                  {upStatus.success && (
                                    <div className="flex items-center justify-center gap-1 text-xs font-black text-emerald-600">
                                      <CheckCircle className="w-3.5 h-3.5" /> Uploaded to Cloudinary!
                                    </div>
                                  )}
                                  {upStatus.error && (
                                    <div className="text-xs font-bold text-red-600">
                                      {upStatus.error}
                                    </div>
                                  )}
                                </div>

                                {/* Preview & URL fallback */}
                                <div className="space-y-2">
                                  <div className="aspect-video w-full border-3 border-black bg-gray-100 overflow-hidden relative shadow-[3px_3px_0px_0px_black]">
                                    {imgB.url ? (
                                      <img
                                        src={imgB.url}
                                        alt={imgB.alt || "Middle image"}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                                        <Camera className="w-7 h-7 mb-1" />
                                        <span className="text-[10px] font-bold uppercase">
                                          No image yet
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <input
                                    type="text"
                                    placeholder="Or paste direct image URL (https://...)"
                                    value={imgB.url}
                                    onChange={(e) =>
                                      updateBlock<ImageBlock>(bIdx, (prev) => ({
                                        ...prev,
                                        url: e.target.value,
                                      }))
                                    }
                                    className="w-full p-2 border-2 border-black bg-gray-50 font-mono text-[11px] text-black font-bold focus:bg-white focus:outline-none"
                                  />
                                </div>
                              </div>

                              {/* Caption & Alt & Alignment */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                                <div className="md:col-span-2">
                                  <label className="block text-[10px] font-[1000] uppercase tracking-wider text-black mb-1">
                                    Image Caption (Visible below image)
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Figure 1: The knight fork tactical sequence in practice"
                                    value={imgB.caption || ""}
                                    onChange={(e) =>
                                      updateBlock<ImageBlock>(bIdx, (prev) => ({
                                        ...prev,
                                        caption: e.target.value,
                                      }))
                                    }
                                    className="w-full p-2.5 border-2 border-black bg-white text-xs font-bold text-black"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[10px] font-[1000] uppercase tracking-wider text-black mb-1">
                                    Alignment
                                  </label>
                                  <select
                                    value={imgB.alignment || "full"}
                                    onChange={(e) =>
                                      updateBlock<ImageBlock>(bIdx, (prev) => ({
                                        ...prev,
                                        alignment: e.target.value as any,
                                      }))
                                    }
                                    className="w-full p-2.5 border-2 border-black bg-white text-xs font-bold text-black uppercase"
                                  >
                                    <option value="full">Full Width</option>
                                    <option value="center">Centered Normal</option>
                                    <option value="left">Float Left</option>
                                    <option value="right">Float Right</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {/* 2. TABLE BLOCK */}
                        {block.type === "table" && (() => {
                          const tbl = block as TableBlock;

                          const addColumn = () => {
                            const newHeaders = [...tbl.headers, `Col ${tbl.headers.length + 1}`];
                            const newRows = tbl.rows.map((r) => [...r, ""]);
                            updateBlock<TableBlock>(bIdx, (prev) => ({
                              ...prev,
                              headers: newHeaders,
                              rows: newRows,
                            }));
                          };

                          const removeColumn = (colIndex: number) => {
                            if (tbl.headers.length <= 1) return;
                            const newHeaders = tbl.headers.filter((_, i) => i !== colIndex);
                            const newRows = tbl.rows.map((r) => r.filter((_, i) => i !== colIndex));
                            updateBlock<TableBlock>(bIdx, (prev) => ({
                              ...prev,
                              headers: newHeaders,
                              rows: newRows,
                            }));
                          };

                          const addRow = () => {
                            const emptyRow = new Array(tbl.headers.length).fill("");
                            updateBlock<TableBlock>(bIdx, (prev) => ({
                              ...prev,
                              rows: [...prev.rows, emptyRow],
                            }));
                          };

                          const removeRow = (rowIndex: number) => {
                            updateBlock<TableBlock>(bIdx, (prev) => ({
                              ...prev,
                              rows: prev.rows.filter((_, i) => i !== rowIndex),
                            }));
                          };

                          const updateHeader = (colIndex: number, val: string) => {
                            const copy = [...tbl.headers];
                            copy[colIndex] = val;
                            updateBlock<TableBlock>(bIdx, (prev) => ({
                              ...prev,
                              headers: copy,
                            }));
                          };

                          const updateCell = (rowIndex: number, colIndex: number, val: string) => {
                            const copyRows = tbl.rows.map((r) => [...r]);
                            copyRows[rowIndex][colIndex] = val;
                            updateBlock<TableBlock>(bIdx, (prev) => ({
                              ...prev,
                              rows: copyRows,
                            }));
                          };

                          return (
                            <div className="space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                <input
                                  type="text"
                                  placeholder="Table Title / Summary..."
                                  value={tbl.title || ""}
                                  onChange={(e) =>
                                    updateBlock<TableBlock>(bIdx, (prev) => ({
                                      ...prev,
                                      title: e.target.value,
                                    }))
                                  }
                                  className="flex-1 p-2 border-2 border-black bg-white font-[1000] text-sm text-black"
                                />

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={addColumn}
                                    className="px-3 py-1.5 border-2 border-black bg-gray-100 hover:bg-[#EAB308] text-xs font-[1000] uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_black]"
                                  >
                                    <Columns className="w-3.5 h-3.5" /> + Column
                                  </button>
                                  <button
                                    type="button"
                                    onClick={addRow}
                                    className="px-3 py-1.5 border-2 border-black bg-[#EAB308] hover:bg-yellow-400 text-xs font-[1000] uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_black]"
                                  >
                                    <Rows className="w-3.5 h-3.5" /> + Row
                                  </button>
                                </div>
                              </div>

                              {/* Interactive Table Grid */}
                              <div className="overflow-x-auto border-3 border-black bg-gray-50">
                                <table className="w-full border-collapse">
                                  <thead>
                                    <tr className="bg-black text-white">
                                      {tbl.headers.map((h, hIdx) => (
                                        <th key={hIdx} className="p-2 border border-white/20">
                                          <div className="flex items-center gap-1">
                                            <input
                                              type="text"
                                              value={h}
                                              onChange={(e) => updateHeader(hIdx, e.target.value)}
                                              className="w-full p-1 bg-black text-white font-[1000] text-xs uppercase focus:bg-gray-800 focus:outline-none"
                                            />
                                            {tbl.headers.length > 1 && (
                                              <button
                                                type="button"
                                                onClick={() => removeColumn(hIdx)}
                                                className="text-red-400 hover:text-red-200 p-0.5 text-xs font-black"
                                                title="Remove column"
                                              >
                                                ×
                                              </button>
                                            )}
                                          </div>
                                        </th>
                                      ))}
                                      <th className="w-10 p-2 text-center text-xs">Del</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {tbl.rows.map((row, rIdx) => (
                                      <tr key={rIdx} className="border-b border-black/20 bg-white">
                                        {row.map((cell, cIdx) => (
                                          <td key={cIdx} className="p-1 border border-black/20">
                                            <input
                                              type="text"
                                              value={cell}
                                              onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                                              placeholder="Cell text..."
                                              className="w-full p-1.5 bg-transparent text-xs font-medium text-black focus:bg-yellow-50 focus:outline-none"
                                            />
                                          </td>
                                        ))}
                                        <td className="text-center p-1 border border-black/20">
                                          <button
                                            type="button"
                                            onClick={() => removeRow(rIdx)}
                                            className="text-gray-400 hover:text-red-600 p-1"
                                            title="Delete Row"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          );
                        })()}

                        {/* 3. NUMBERED LIST BLOCK */}
                        {block.type === "numberedList" && (() => {
                          const nList = block as NumberedListBlock;

                          const addItem = () => {
                            updateBlock<NumberedListBlock>(bIdx, (prev) => ({
                              ...prev,
                              items: [
                                ...prev.items,
                                { title: "", body: "" },
                              ],
                            }));
                          };

                          const removeItem = (itemIdx: number) => {
                            updateBlock<NumberedListBlock>(bIdx, (prev) => ({
                              ...prev,
                              items: prev.items.filter((_, i) => i !== itemIdx),
                            }));
                          };

                          const updateItem = (itemIdx: number, field: "title" | "body", val: string) => {
                            const copy = [...nList.items];
                            copy[itemIdx] = { ...copy[itemIdx], [field]: val };
                            updateBlock<NumberedListBlock>(bIdx, (prev) => ({
                              ...prev,
                              items: copy,
                            }));
                          };

                          return (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between gap-3">
                                <input
                                  type="text"
                                  placeholder="List Section Title (e.g. 5 Principles of Master Calculation)"
                                  value={nList.title || ""}
                                  onChange={(e) =>
                                    updateBlock<NumberedListBlock>(bIdx, (prev) => ({
                                      ...prev,
                                      title: e.target.value,
                                    }))
                                  }
                                  className="flex-1 p-2.5 border-2 border-black bg-white font-[1000] text-sm text-black"
                                />
                                <button
                                  type="button"
                                  onClick={addItem}
                                  className="px-3 py-2 border-2 border-black bg-[#EAB308] hover:bg-yellow-400 text-xs font-[1000] uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_black]"
                                >
                                  <Plus className="w-3.5 h-3.5" /> Add Numbered Item
                                </button>
                              </div>

                              <div className="space-y-3">
                                {nList.items.map((item, iIdx) => (
                                  <div
                                    key={iIdx}
                                    className="p-3 border-2 border-black/30 bg-gray-50 flex items-start gap-3 relative"
                                  >
                                    <span className="w-8 h-8 shrink-0 bg-black text-[#EAB308] border-2 border-black flex items-center justify-center font-[1000] text-xs">
                                      {(iIdx + 1).toString().padStart(2, "0")}
                                    </span>
                                    <div className="flex-1 space-y-2">
                                      <input
                                        type="text"
                                        placeholder="Item Title (e.g. STEP 1: Build a Blunder Check Routine)"
                                        value={item.title || ""}
                                        onChange={(e) => updateItem(iIdx, "title", e.target.value)}
                                        className="w-full p-2 border border-black bg-white font-[1000] text-xs text-black"
                                      />
                                      <textarea
                                        rows={4}
                                        placeholder="Explanation details (press Enter for new lines / paragraphs)..."
                                        value={item.body}
                                        onChange={(e) => updateItem(iIdx, "body", e.target.value)}
                                        className="w-full p-2.5 border border-black/40 bg-white font-medium text-xs text-gray-800 leading-relaxed focus:outline-none"
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeItem(iIdx)}
                                      className="text-gray-400 hover:text-red-600 p-1"
                                      title="Remove Item"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* 4. BULLET LIST BLOCK */}
                        {block.type === "bulletList" && (() => {
                          const bList = block as BulletListBlock;

                          const addItem = () => {
                            updateBlock<BulletListBlock>(bIdx, (prev) => ({
                              ...prev,
                              items: [...prev.items, "New bullet point"],
                            }));
                          };

                          const removeItem = (itemIdx: number) => {
                            updateBlock<BulletListBlock>(bIdx, (prev) => ({
                              ...prev,
                              items: prev.items.filter((_, i) => i !== itemIdx),
                            }));
                          };

                          const updateItem = (itemIdx: number, val: string) => {
                            const copy = [...bList.items];
                            copy[itemIdx] = val;
                            updateBlock<BulletListBlock>(bIdx, (prev) => ({
                              ...prev,
                              items: copy,
                            }));
                          };

                          return (
                            <div className="space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <input
                                  type="text"
                                  placeholder="Bullet List Title (Optional)..."
                                  value={bList.title || ""}
                                  onChange={(e) =>
                                    updateBlock<BulletListBlock>(bIdx, (prev) => ({
                                      ...prev,
                                      title: e.target.value,
                                    }))
                                  }
                                  className="flex-1 p-2.5 border-2 border-black bg-white font-[1000] text-sm text-black"
                                />

                                <div className="flex items-center gap-2">
                                  <select
                                    value={bList.style}
                                    onChange={(e) =>
                                      updateBlock<BulletListBlock>(bIdx, (prev) => ({
                                        ...prev,
                                        style: e.target.value as any,
                                      }))
                                    }
                                    className="p-2 border-2 border-black bg-white font-bold text-xs uppercase"
                                  >
                                    <option value="check">✓ Checkmark</option>
                                    <option value="bullet">• Classic Bullet</option>
                                    <option value="arrow">→ Arrow</option>
                                    <option value="pawn">♟ Chess Pawn</option>
                                  </select>

                                  <button
                                    type="button"
                                    onClick={addItem}
                                    className="px-3 py-2 border-2 border-black bg-[#EAB308] hover:bg-yellow-400 text-xs font-[1000] uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_black]"
                                  >
                                    <Plus className="w-3.5 h-3.5" /> Add Point
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-2">
                                {bList.items.map((item, itemIdx) => (
                                  <div key={itemIdx} className="flex items-center gap-2">
                                    <span className="w-5 text-center font-bold text-[#EAB308]">
                                      {bList.style === "check"
                                        ? "✓"
                                        : bList.style === "arrow"
                                        ? "→"
                                        : bList.style === "pawn"
                                        ? "♟"
                                        : "•"}
                                    </span>
                                    <input
                                      type="text"
                                      value={item}
                                      onChange={(e) => updateItem(itemIdx, e.target.value)}
                                      placeholder="Bullet text..."
                                      className="flex-1 p-2 border border-black bg-white font-medium text-xs text-black"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeItem(itemIdx)}
                                      className="text-gray-400 hover:text-red-600 p-1"
                                      title="Remove Point"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* 5. PARAGRAPH TEXT BLOCK */}
                        {block.type === "paragraph" && (() => {
                          const p = block as ParagraphBlock;

                          const insertFormatting = (prefix: string, suffix: string) => {
                            const textarea = document.getElementById(
                              `textarea_${block.id}`
                            ) as HTMLTextAreaElement | null;
                            if (!textarea) return;
                            const start = textarea.selectionStart;
                            const end = textarea.selectionEnd;
                            const selected = p.text.substring(start, end);
                            const updated =
                              p.text.substring(0, start) +
                              prefix +
                              (selected || "text") +
                              suffix +
                              p.text.substring(end);
                            updateBlock<ParagraphBlock>(bIdx, (prev) => ({
                              ...prev,
                              text: updated,
                            }));
                          };

                          return (
                            <div className="space-y-2">
                              {/* Text Formatting Helper Bar */}
                              <div className="flex items-center gap-1.5 p-1.5 border border-black/30 bg-gray-100">
                                <button
                                  type="button"
                                  onClick={() => insertFormatting("**", "**")}
                                  className="px-2 py-1 bg-white border border-black font-black text-xs hover:bg-[#EAB308]"
                                  title="Bold"
                                >
                                  B
                                </button>
                                <button
                                  type="button"
                                  onClick={() => insertFormatting("*", "*")}
                                  className="px-2 py-1 bg-white border border-black italic font-bold text-xs hover:bg-[#EAB308]"
                                  title="Italic"
                                >
                                  I
                                </button>
                                <button
                                  type="button"
                                  onClick={() => insertFormatting("[", "](https://chessmate.in)")}
                                  className="px-2 py-1 bg-white border border-black text-xs font-bold hover:bg-[#EAB308]"
                                  title="Link"
                                >
                                  🔗 Link
                                </button>
                                <button
                                  type="button"
                                  onClick={() => insertFormatting("`", "`")}
                                  className="px-2 py-1 bg-white border border-black text-xs font-mono hover:bg-[#EAB308]"
                                  title="Code"
                                >
                                  `code`
                                </button>
                              </div>

                              <textarea
                                id={`textarea_${block.id}`}
                                rows={4}
                                placeholder="Write your paragraph here. Supports Markdown formatting..."
                                value={p.text}
                                onChange={(e) =>
                                  updateBlock<ParagraphBlock>(bIdx, (prev) => ({
                                    ...prev,
                                    text: e.target.value,
                                  }))
                                }
                                className="w-full p-3.5 border-2 border-black bg-white font-medium text-sm text-black leading-relaxed focus:outline-none"
                              />
                            </div>
                          );
                        })()}

                        {/* 6. HEADING BLOCK */}
                        {block.type === "heading" && (() => {
                          const h = block as HeadingBlock;
                          return (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                              <select
                                value={h.level}
                                onChange={(e) =>
                                  updateBlock<HeadingBlock>(bIdx, (prev) => ({
                                    ...prev,
                                    level: parseInt(e.target.value, 10) as any,
                                  }))
                                }
                                className="p-2.5 border-2 border-black bg-white font-[1000] text-xs uppercase"
                              >
                                <option value={2}>H2 - Major Section</option>
                                <option value={3}>H3 - Sub Heading</option>
                                <option value={4}>H4 - Minor Heading</option>
                              </select>
                              <input
                                type="text"
                                placeholder="Heading text..."
                                value={h.text}
                                onChange={(e) =>
                                  updateBlock<HeadingBlock>(bIdx, (prev) => ({
                                    ...prev,
                                    text: e.target.value,
                                  }))
                                }
                                className="flex-1 p-2.5 border-2 border-black bg-white font-[1000] text-base text-black"
                              />
                            </div>
                          );
                        })()}

                        {/* 7. CALLOUT / PRO TIP */}
                        {block.type === "callout" && (() => {
                          const callout = block as CalloutBlock;
                          return (
                            <div className="space-y-3">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-[10px] font-[1000] uppercase text-black mb-1">
                                    Variant Style
                                  </label>
                                  <select
                                    value={callout.variant}
                                    onChange={(e) =>
                                      updateBlock<CalloutBlock>(bIdx, (prev) => ({
                                        ...prev,
                                        variant: e.target.value as any,
                                      }))
                                    }
                                    className="w-full p-2 border-2 border-black bg-white font-bold text-xs uppercase"
                                  >
                                    <option value="tip">💡 Strategy Pro Tip</option>
                                    <option value="insight">⚡ FIDE Master Insight</option>
                                    <option value="warning">⚠️ Important Advisory</option>
                                    <option value="quote">💬 Quote / Testimonial</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-[10px] font-[1000] uppercase text-black mb-1">
                                    Title Banner
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Title (e.g. Master's Golden Rule)"
                                    value={callout.title || ""}
                                    onChange={(e) =>
                                      updateBlock<CalloutBlock>(bIdx, (prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                      }))
                                    }
                                    className="w-full p-2 border-2 border-black bg-white font-bold text-xs text-black"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-[1000] uppercase text-black mb-1">
                                    Author Citation (Optional)
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. FIDE Grandmaster Garry Kasparov"
                                    value={callout.author || ""}
                                    onChange={(e) =>
                                      updateBlock<CalloutBlock>(bIdx, (prev) => ({
                                        ...prev,
                                        author: e.target.value,
                                      }))
                                    }
                                    className="w-full p-2 border-2 border-black bg-white font-bold text-xs text-black"
                                  />
                                </div>
                              </div>
                              <textarea
                                rows={2}
                                placeholder="Callout message / statement..."
                                value={callout.text}
                                onChange={(e) =>
                                  updateBlock<CalloutBlock>(bIdx, (prev) => ({
                                    ...prev,
                                    text: e.target.value,
                                  }))
                                }
                                className="w-full p-3 border-2 border-black bg-white font-medium text-xs text-black"
                              />
                            </div>
                          );
                        })()}

                        {/* 8. VIDEO BLOCK */}
                        {block.type === "video" && (() => {
                          const vid = block as VideoBlock;
                          return (
                            <div className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[10px] font-[1000] uppercase text-black mb-1">
                                    YouTube or Vimeo URL
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    value={vid.url}
                                    onChange={(e) =>
                                      updateBlock<VideoBlock>(bIdx, (prev) => ({
                                        ...prev,
                                        url: e.target.value,
                                      }))
                                    }
                                    className="w-full p-2.5 border-2 border-black bg-white font-mono text-xs text-black"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-[1000] uppercase text-black mb-1">
                                    Video Caption / Label
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Watch this rapid training demo"
                                    value={vid.caption || ""}
                                    onChange={(e) =>
                                      updateBlock<VideoBlock>(bIdx, (prev) => ({
                                        ...prev,
                                        caption: e.target.value,
                                      }))
                                    }
                                    className="w-full p-2.5 border-2 border-black bg-white font-bold text-xs text-black"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {/* 9. CHESSBOARD BLOCK */}
                        {block.type === "chessboard" && (() => {
                          const cb = block as ChessboardBlock;
                          return (
                            <div className="space-y-3">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-[10px] font-[1000] uppercase text-black mb-1">
                                    Diagram Title
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="e.g. Tactical Puzzle: White to move"
                                    value={cb.title || ""}
                                    onChange={(e) =>
                                      updateBlock<ChessboardBlock>(bIdx, (prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                      }))
                                    }
                                    className="w-full p-2 border-2 border-black bg-white font-bold text-xs text-black"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-[1000] uppercase text-black mb-1">
                                    FEN Position String
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="r1bqk2r/pppp1ppp... or 'start'"
                                    value={cb.fen || ""}
                                    onChange={(e) =>
                                      updateBlock<ChessboardBlock>(bIdx, (prev) => ({
                                        ...prev,
                                        fen: e.target.value,
                                      }))
                                    }
                                    className="w-full p-2 border-2 border-black bg-white font-mono text-xs text-black"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-[1000] uppercase text-black mb-1">
                                    Orientation
                                  </label>
                                  <select
                                    value={cb.orientation || "white"}
                                    onChange={(e) =>
                                      updateBlock<ChessboardBlock>(bIdx, (prev) => ({
                                        ...prev,
                                        orientation: e.target.value as any,
                                      }))
                                    }
                                    className="w-full p-2 border-2 border-black bg-white font-bold text-xs uppercase"
                                  >
                                    <option value="white">White on Bottom</option>
                                    <option value="black">Black on Bottom</option>
                                  </select>
                                </div>
                              </div>
                              <input
                                type="text"
                                placeholder="Puzzle prompt or tactical explanation (e.g. Can you spot the Queen sacrifice?)..."
                                value={cb.description || ""}
                                onChange={(e) =>
                                  updateBlock<ChessboardBlock>(bIdx, (prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                  }))
                                }
                                className="w-full p-2 border-2 border-black bg-white font-medium text-xs text-black"
                              />
                            </div>
                          );
                        })()}

                        {/* 10. FAQ BLOCK */}
                        {block.type === "faq" && (() => {
                          const faq = block as FAQBlock;

                          const addFaqItem = () => {
                            updateBlock<FAQBlock>(bIdx, (prev) => ({
                              ...prev,
                              items: [
                                ...prev.items,
                                { question: "", answer: "" },
                              ],
                            }));
                          };

                          const removeFaqItem = (fIdx: number) => {
                            updateBlock<FAQBlock>(bIdx, (prev) => ({
                              ...prev,
                              items: prev.items.filter((_, i) => i !== fIdx),
                            }));
                          };

                          const updateFaqItem = (fIdx: number, field: "question" | "answer", val: string) => {
                            const copy = [...faq.items];
                            copy[fIdx] = { ...copy[fIdx], [field]: val };
                            updateBlock<FAQBlock>(bIdx, (prev) => ({
                              ...prev,
                              items: copy,
                            }));
                          };

                          return (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between gap-3">
                                <input
                                  type="text"
                                  placeholder="FAQ Section Title..."
                                  value={faq.title || ""}
                                  onChange={(e) =>
                                    updateBlock<FAQBlock>(bIdx, (prev) => ({
                                      ...prev,
                                      title: e.target.value,
                                    }))
                                  }
                                  className="flex-1 p-2 border-2 border-black bg-white font-[1000] text-sm text-black"
                                />
                                <button
                                  type="button"
                                  onClick={addFaqItem}
                                  className="px-3 py-1.5 border-2 border-black bg-[#EAB308] hover:bg-yellow-400 text-xs font-[1000] uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_black]"
                                >
                                  <Plus className="w-3.5 h-3.5" /> Add Q&A
                                </button>
                              </div>

                              <div className="space-y-3">
                                {faq.items.map((item, fIdx) => (
                                  <div key={fIdx} className="p-3 border-2 border-black/30 bg-gray-50 space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-black uppercase text-gray-500">
                                        Q&A #{fIdx + 1}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => removeFaqItem(fIdx)}
                                        className="text-gray-400 hover:text-red-600"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                    <input
                                      type="text"
                                      placeholder="Question..."
                                      value={item.question}
                                      onChange={(e) => updateFaqItem(fIdx, "question", e.target.value)}
                                      className="w-full p-2 border border-black bg-white font-[1000] text-xs text-black"
                                    />
                                    <textarea
                                      rows={4}
                                      placeholder="Detailed answer (supports line breaks / paragraphs when you press Enter)..."
                                      value={item.answer}
                                      onChange={(e) => updateFaqItem(fIdx, "answer", e.target.value)}
                                      className="w-full p-2.5 border border-black/40 bg-white font-medium text-xs text-gray-800 leading-relaxed focus:outline-none"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* 11. SECTION WITH SUBPOINTS (LEGACY COMPATIBILITY) */}
                        {block.type === "section" && (() => {
                          const sec = block as SectionBlock;

                          const addPoint = () => {
                            updateBlock<SectionBlock>(bIdx, (prev) => ({
                              ...prev,
                              points: [
                                ...(prev.points || []),
                                { title: "", body: "" },
                              ],
                            }));
                          };

                          const removePoint = (pIdx: number) => {
                            updateBlock<SectionBlock>(bIdx, (prev) => ({
                              ...prev,
                              points: (prev.points || []).filter((_, i) => i !== pIdx),
                            }));
                          };

                          const updatePoint = (pIdx: number, field: "title" | "body", val: string) => {
                            const copy = [...(sec.points || [])];
                            copy[pIdx] = { ...copy[pIdx], [field]: val };
                            updateBlock<SectionBlock>(bIdx, (prev) => ({
                              ...prev,
                              points: copy,
                            }));
                          };

                          return (
                            <div className="space-y-4">
                              <input
                                type="text"
                                placeholder="Section Heading..."
                                value={sec.heading}
                                onChange={(e) =>
                                  updateBlock<SectionBlock>(bIdx, (prev) => ({
                                    ...prev,
                                    heading: e.target.value,
                                  }))
                                }
                                className="w-full p-3 border-2 border-black bg-white font-[1000] text-sm text-black"
                              />

                              <textarea
                                rows={2}
                                placeholder="Optional section introductory narrative..."
                                value={sec.body || ""}
                                onChange={(e) =>
                                  updateBlock<SectionBlock>(bIdx, (prev) => ({
                                    ...prev,
                                    body: e.target.value,
                                  }))
                                }
                                className="w-full p-2.5 border-2 border-black bg-white font-medium text-xs text-black"
                              />

                              <div className="space-y-2 pt-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-[1000] uppercase text-gray-700">
                                    Sub-Point Cards ({sec.points?.length || 0})
                                  </span>
                                  <button
                                    type="button"
                                    onClick={addPoint}
                                    className="text-xs font-[1000] uppercase text-black hover:text-[#EAB308] flex items-center gap-1"
                                  >
                                    <Plus className="w-3.5 h-3.5" /> Add Point Card
                                  </button>
                                </div>

                                {sec.points?.map((pt, pIdx) => (
                                  <div
                                    key={pIdx}
                                    className="p-3 border-2 border-black/30 bg-gray-50 space-y-2"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-black uppercase text-gray-400">
                                        Card #{pIdx + 1}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => removePoint(pIdx)}
                                        className="text-gray-400 hover:text-red-600"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                    <input
                                      type="text"
                                      placeholder="Card Title (e.g. STEP 1: Build a Blunder Check Routine)"
                                      value={pt.title}
                                      onChange={(e) => updatePoint(pIdx, "title", e.target.value)}
                                      className="w-full p-2 border border-black bg-white font-black text-xs text-black"
                                    />
                                    <textarea
                                      rows={4}
                                      placeholder="Card explanation details (press Enter for new lines / paragraphs)..."
                                      value={pt.body}
                                      onChange={(e) => updatePoint(pIdx, "body", e.target.value)}
                                      className="w-full p-2.5 border border-black/40 bg-white font-medium text-xs text-gray-800 leading-relaxed focus:outline-none"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* 12. DIVIDER BLOCK */}
                        {block.type === "divider" && (
                          <div className="py-2 text-center text-xs font-bold text-gray-400 select-none">
                            — Visual Divider Line with Diamond Accent —
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Add Bar if blocks exist */}
            {blocks.length > 0 && (
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => addBlock("paragraph")}
                  className="px-4 py-2 border-2 border-black bg-[#EAB308] hover:bg-yellow-400 text-black font-[1000] text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[3px_3px_0px_0px_black]"
                >
                  <Plus className="w-4 h-4" /> Add Next Block
                </button>
              </div>
            )}

            {/* Conclusion Paragraph */}
            <div className="pt-4 border-t-2 border-black/10">
              <label className="block text-xs font-[1000] uppercase tracking-wider text-black mb-2">
                Conclusion Paragraph & Final Move
              </label>
              <textarea
                rows={4}
                placeholder="Concluding thoughts and encouragement to book a trial demo class..."
                value={conclusion}
                onChange={(e) => setConclusion(e.target.value)}
                className="w-full p-4 border-2 border-black bg-gray-50 font-medium text-sm text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
              />
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* TAB 2: LIVE SITE PREVIEW */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === "PREVIEW" && (
        <div className="border-4 border-black bg-white shadow-[10px_10px_0px_0px_black] overflow-hidden">
          {/* Mock Browser Header */}
          <div className="bg-black text-white px-6 py-3 border-b-2 border-black flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
              <span className="ml-3 font-mono text-[11px] text-gray-300">
                https://chessmate.in/blog/{slug || "preview"}
              </span>
            </div>
            <span className="text-[10px] bg-[#EAB308] text-black px-2 py-0.5 font-black uppercase">
              Live Preview
            </span>
          </div>

          <div className="p-6 md:p-12 max-w-4xl mx-auto space-y-8 font-sans">
            {/* Category and Date */}
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 bg-[#EAB308] border-2 border-black text-[10px] font-[1000] uppercase tracking-widest shadow-[3px_3px_0px_0px_black] text-black">
                {category}
              </span>
              <span className="text-xs font-bold uppercase text-gray-400 tracking-widest">
                {date}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-[1000] text-black uppercase leading-[0.95] tracking-tighter">
              {title || "Untitled Article"}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t-2 border-black/10">
              <div className="w-10 h-10 border-2 border-black bg-[#EAB308] flex items-center justify-center shadow-[2px_2px_0px_0px_black]">
                <User className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-gray-400">Written By</p>
                <p className="text-xs font-[1000] uppercase tracking-tight text-black">
                  {author}
                </p>
              </div>
            </div>

            {/* Featured Image */}
            <div className="w-full aspect-video border-4 border-black overflow-hidden bg-gray-100 shadow-[10px_10px_0px_0px_black]">
              <img
                src={image || "/benefit.png"}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Intro */}
            {intro && (
              <p className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed border-l-4 border-[#EAB308] pl-5 italic">
                {intro}
              </p>
            )}

            {/* ─── LIVE RICH BLOCKS RENDERER ─── */}
            <RichContentRenderer
              content={{
                intro,
                conclusion,
                blocks,
              }}
            />

            {/* Conclusion */}
            {conclusion && (
              <div className="p-6 border-4 border-black bg-yellow-50 shadow-[6px_6px_0px_0px_black] space-y-3">
                <h3 className="text-xl font-[1000] uppercase text-black">
                  Final Thoughts & The Next Move
                </h3>
                <p className="text-base text-gray-800 leading-relaxed font-medium">
                  {conclusion}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* TAB 3: SEO SETTINGS */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {activeTab === "SEO" && (
        <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_black] space-y-6">
          <div className="border-b-2 border-black/10 pb-3">
            <h2 className="text-lg font-[1000] uppercase tracking-tight text-black flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-600 border border-black inline-block" />
              Search Engine Optimization (SEO) & Metadata
            </h2>
            <p className="text-xs font-bold text-gray-500 mt-0.5">
              Optimize how this article ranks and appears on Google, Bing, and Social Shares.
            </p>
          </div>

          {/* SERP Google Snippet Preview */}
          <div className="border-2 border-black bg-gray-50 p-5 space-y-1.5 shadow-[4px_4px_0px_0px_black]">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
              Google Search Result Preview
            </span>
            <div className="text-xs font-medium text-emerald-800 truncate">
              https://chessmate.in › blog › {slug || "your-slug"}
            </div>
            <div className="text-lg font-bold text-blue-800 hover:underline cursor-pointer truncate">
              {metaTitle || (title ? `${title} | ChessMate Academy` : "Article Title")}
            </div>
            <div className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {metaDescription || desc || "Description of article snippet..."}
            </div>
          </div>

          {/* Meta Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-[1000] uppercase tracking-wider text-black">
                Meta Title
              </label>
              <span
                className={`text-[11px] font-bold ${
                  (metaTitle || title).length > 60
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {(metaTitle || title).length}/60 chars
              </span>
            </div>
            <input
              type="text"
              placeholder={title ? `${title} | ChessMate Academy` : "Custom Meta Title"}
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full p-3 border-2 border-black bg-gray-50 font-bold text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
            />
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-[1000] uppercase tracking-wider text-black">
                Meta Description
              </label>
              <span
                className={`text-[11px] font-bold ${
                  (metaDescription || desc).length > 160
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {(metaDescription || desc).length}/160 chars
              </span>
            </div>
            <textarea
              rows={3}
              placeholder={desc || "Search snippet description..."}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full p-3 border-2 border-black bg-gray-50 font-medium text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
            />
          </div>

          {/* Target Keywords */}
          <div>
            <label className="block text-xs font-[1000] uppercase tracking-wider text-black mb-2">
              Target SEO Keywords
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Type keyword and press Add (e.g. chess benefits autism)"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddKeyword();
                  }
                }}
                className="flex-1 p-2.5 border-2 border-black bg-gray-50 font-bold text-xs text-black focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddKeyword}
                className="px-4 py-2.5 border-2 border-black bg-black text-white text-xs font-black uppercase tracking-wider"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {targetKeywords.map((kw) => (
                <span
                  key={kw}
                  className="px-3 py-1 bg-[#EAB308] border-2 border-black text-xs font-bold text-black flex items-center gap-1.5 shadow-[2px_2px_0px_0px_black]"
                >
                  <Hash className="w-3 h-3" /> {kw}
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(kw)}
                    className="ml-1 hover:text-red-700 font-black"
                  >
                    ×
                  </button>
                </span>
              ))}
              {targetKeywords.length === 0 && (
                <span className="text-xs font-bold text-gray-400 italic">
                  No keywords added yet.
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
