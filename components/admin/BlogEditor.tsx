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
} from "lucide-react";

interface SubPoint {
  title: string;
  body: string;
}

interface Section {
  heading: string;
  body?: string;
  points?: SubPoint[];
}

interface ContentStructure {
  intro: string;
  sections: Section[];
  conclusion: string;
}

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

  // Form states
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

  // Content structure
  const [content, setContent] = useState<ContentStructure>(() => {
    if (initialData?.content) {
      if (typeof initialData.content === "object") {
        return {
          intro: initialData.content.intro || "",
          sections: Array.isArray(initialData.content.sections)
            ? initialData.content.sections
            : [],
          conclusion: initialData.content.conclusion || "",
        };
      }
    }
    return {
      intro: "",
      sections: [
        {
          heading: "Key Strategies and Highlights",
          points: [
            {
              title: "Structured Pattern Recognition",
              body: "Consistent training helps young players identify tactical patterns rapidly.",
            },
          ],
        },
      ],
      conclusion: "",
    };
  });

  // UI tabs & states
  const [activeTab, setActiveTab] = useState<"EDITOR" | "PREVIEW" | "SEO">(
    "EDITOR"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Auto generate slug from title when autoSlug is on
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

  // Cloudinary image upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadError(null);
      setUploadSuccess(false);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setImage(data.url);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        setUploadError(data.error || "Failed to upload to Cloudinary");
      }
    } catch (err: any) {
      setUploadError(err?.message || "Error uploading image to Cloudinary");
    } finally {
      setIsUploading(false);
    }
  };

  // Keywords handler
  const handleAddKeyword = () => {
    if (keywordInput.trim() && !targetKeywords.includes(keywordInput.trim())) {
      setTargetKeywords([...targetKeywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setTargetKeywords(targetKeywords.filter((k) => k !== kw));
  };

  // Section modifiers
  const handleAddSection = () => {
    setContent({
      ...content,
      sections: [
        ...content.sections,
        {
          heading: "New Section",
          body: "",
          points: [{ title: "Point 1", body: "Description of this point" }],
        },
      ],
    });
  };

  const handleRemoveSection = (index: number) => {
    setContent({
      ...content,
      sections: content.sections.filter((_, i) => i !== index),
    });
  };

  const handleUpdateSectionHeading = (index: number, heading: string) => {
    const updated = [...content.sections];
    updated[index].heading = heading;
    setContent({ ...content, sections: updated });
  };

  const handleUpdateSectionBody = (index: number, body: string) => {
    const updated = [...content.sections];
    updated[index].body = body;
    setContent({ ...content, sections: updated });
  };

  const handleAddSubPoint = (sectionIndex: number) => {
    const updated = [...content.sections];
    const points = updated[sectionIndex].points || [];
    updated[sectionIndex].points = [
      ...points,
      { title: "Key Insight", body: "Explanation details..." },
    ];
    setContent({ ...content, sections: updated });
  };

  const handleRemoveSubPoint = (sectionIndex: number, pointIndex: number) => {
    const updated = [...content.sections];
    if (updated[sectionIndex].points) {
      updated[sectionIndex].points = updated[sectionIndex].points!.filter(
        (_, i) => i !== pointIndex
      );
      setContent({ ...content, sections: updated });
    }
  };

  const handleUpdateSubPoint = (
    sectionIndex: number,
    pointIndex: number,
    field: "title" | "body",
    value: string
  ) => {
    const updated = [...content.sections];
    if (updated[sectionIndex].points) {
      updated[sectionIndex].points![pointIndex][field] = value;
      setContent({ ...content, sections: updated });
    }
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
        setErrorMessage("Please select or upload a featured image.");
        return;
      }

      const activeCategory =
        category === "Other" && customCategory.trim()
          ? customCategory.trim()
          : category;

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
        content,
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
        setErrorMessage(data.error || "Failed to save blog post to Neon database");
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
              <span className="text-xs font-bold text-gray-400">
                Prisma & Cloudinary
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

      {/* TAB 1: ARTICLE EDITOR */}
      {activeTab === "EDITOR" && (
        <div className="space-y-6">
          {/* Main Attributes Card */}
          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_black] space-y-5">
            <h2 className="text-lg font-[1000] uppercase tracking-tight text-black flex items-center gap-2 border-b-2 border-black/10 pb-3">
              <span className="w-3 h-3 bg-[#EAB308] border border-black inline-block" />
              Article Basics & Cloudinary Media
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

            {/* Slug & Auto-slug */}
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

            {/* Description / Excerpt */}
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
              {/* Category */}
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

              {/* Author */}
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

              {/* Publish Date */}
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

            {/* Featured Image with Cloudinary Upload */}
            <div className="pt-4 border-t-2 border-black/10">
              <label className="block text-xs font-[1000] uppercase tracking-wider text-black mb-2">
                Featured Cover Image (Cloudinary) <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Uploader Box */}
                <div className="border-3 border-dashed border-black bg-yellow-50/50 p-6 text-center space-y-3 relative group hover:bg-yellow-50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-12 h-12 bg-[#EAB308] border-2 border-black mx-auto flex items-center justify-center shadow-[3px_3px_0px_0px_black]">
                    <Upload className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="font-[1000] text-sm uppercase text-black">
                      {isUploading
                        ? "Uploading to Cloudinary..."
                        : "Click or Drag & Drop Image"}
                    </p>
                    <p className="text-[11px] font-bold text-gray-500 mt-0.5">
                      Cloud: kdredot5 • Preset: chessmate (Unsigned)
                    </p>
                  </div>

                  {isUploading && (
                    <div className="flex items-center justify-center gap-2 text-xs font-black text-amber-700 animate-pulse">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Uploading to CDN...
                    </div>
                  )}

                  {uploadSuccess && (
                    <div className="flex items-center justify-center gap-1.5 text-xs font-black text-emerald-600">
                      <CheckCircle className="w-4 h-4" /> Uploaded to Cloudinary successfully!
                    </div>
                  )}

                  {uploadError && (
                    <div className="text-xs font-bold text-red-600">
                      {uploadError}
                    </div>
                  )}
                </div>

                {/* Preview Box */}
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
                        <span className="text-xs font-bold uppercase">No image selected</span>
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

          {/* Structured Content Builder */}
          <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_black] space-y-6">
            <div className="flex items-center justify-between border-b-2 border-black/10 pb-3">
              <div>
                <h2 className="text-lg font-[1000] uppercase tracking-tight text-black flex items-center gap-2">
                  <span className="w-3 h-3 bg-black inline-block" />
                  Article Content & Structure
                </h2>
                <p className="text-xs font-bold text-gray-500 mt-0.5">
                  Write the introductory paragraph, dynamic sections with sub-points, and conclusion.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddSection}
                className="flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-[#EAB308] hover:bg-yellow-400 font-[1000] text-xs uppercase tracking-wider shadow-[2px_2px_0px_0px_black] text-black"
              >
                <Plus className="w-4 h-4" /> Add Section
              </button>
            </div>

            {/* Introduction */}
            <div>
              <label className="block text-xs font-[1000] uppercase tracking-wider text-black mb-2">
                Introduction Paragraph
              </label>
              <textarea
                rows={4}
                placeholder="The opening hook that draws readers in and frames the topic..."
                value={content.intro}
                onChange={(e) => setContent({ ...content, intro: e.target.value })}
                className="w-full p-4 border-2 border-black bg-gray-50 font-medium text-sm text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
              />
            </div>

            {/* Dynamic Sections */}
            <div className="space-y-6">
              {content.sections.map((section, sIdx) => (
                <div
                  key={sIdx}
                  className="border-3 border-black bg-[#FAF9F5] p-5 shadow-[4px_4px_0px_0px_black] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-black text-white text-[11px] font-[1000] uppercase tracking-wider">
                      Section {sIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(sIdx)}
                      className="p-1 text-red-600 hover:text-red-800 transition-colors"
                      title="Remove Section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Section Heading */}
                  <div>
                    <label className="block text-[11px] font-[1000] uppercase tracking-wider text-black mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Why Chess Works Especially Well for Autistic Children"
                      value={section.heading}
                      onChange={(e) =>
                        handleUpdateSectionHeading(sIdx, e.target.value)
                      }
                      className="w-full p-3 border-2 border-black bg-white font-[1000] text-sm text-black focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                    />
                  </div>

                  {/* Section Narrative Body (Optional) */}
                  <div>
                    <label className="block text-[11px] font-[1000] uppercase tracking-wider text-black mb-1">
                      Section Overview Body (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Optional introductory text for this section before the points..."
                      value={section.body || ""}
                      onChange={(e) => handleUpdateSectionBody(sIdx, e.target.value)}
                      className="w-full p-3 border-2 border-black bg-white font-medium text-xs text-black focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
                    />
                  </div>

                  {/* Sub-Points */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-[1000] uppercase tracking-wider text-gray-700">
                        Section Sub-Points & Takeaways ({section.points?.length || 0})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAddSubPoint(sIdx)}
                        className="text-xs font-[1000] uppercase text-black hover:text-[#EAB308] flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Sub-Point
                      </button>
                    </div>

                    {section.points?.map((pt, pIdx) => (
                      <div
                        key={pIdx}
                        className="p-3 border-2 border-black/30 bg-white space-y-2 relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase text-gray-400">
                            Point #{pIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSubPoint(sIdx, pIdx)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Point Title (e.g. Pattern Recognition — A Natural Strength)"
                          value={pt.title}
                          onChange={(e) =>
                            handleUpdateSubPoint(
                              sIdx,
                              pIdx,
                              "title",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-black font-black text-xs text-black focus:outline-none"
                        />
                        <textarea
                          rows={2}
                          placeholder="Detailed explanation of this point..."
                          value={pt.body}
                          onChange={(e) =>
                            handleUpdateSubPoint(
                              sIdx,
                              pIdx,
                              "body",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border border-black/40 font-medium text-xs text-gray-700 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="pt-4 border-t-2 border-black/10">
              <label className="block text-xs font-[1000] uppercase tracking-wider text-black mb-2">
                Conclusion Paragraph & Call To Action
              </label>
              <textarea
                rows={4}
                placeholder="Concluding thoughts and encouragement to book a trial demo class..."
                value={content.conclusion}
                onChange={(e) =>
                  setContent({ ...content, conclusion: e.target.value })
                }
                className="w-full p-4 border-2 border-black bg-gray-50 font-medium text-sm text-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LIVE SITE PREVIEW */}
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
            {content.intro && (
              <p className="text-lg md:text-xl font-bold text-gray-800 leading-relaxed border-l-4 border-[#EAB308] pl-5 italic">
                {content.intro}
              </p>
            )}

            {/* Sections */}
            <div className="space-y-8 pt-4">
              {content.sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-[1000] uppercase text-black tracking-tight border-b-2 border-black pb-2">
                    {sec.heading}
                  </h2>
                  {sec.body && (
                    <p className="text-base text-gray-700 leading-relaxed">
                      {sec.body}
                    </p>
                  )}
                  {sec.points && sec.points.length > 0 && (
                    <div className="space-y-4 pt-2">
                      {sec.points.map((pt, pIdx) => (
                        <div
                          key={pIdx}
                          className="border-2 border-black p-4 bg-gray-50 shadow-[4px_4px_0px_0px_black]"
                        >
                          <h4 className="font-[1000] text-black uppercase text-base mb-1">
                            {pt.title}
                          </h4>
                          <p className="text-sm text-gray-700 leading-relaxed font-medium">
                            {pt.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Conclusion */}
            {content.conclusion && (
              <div className="p-6 border-4 border-black bg-yellow-50 shadow-[6px_6px_0px_0px_black] space-y-3">
                <h3 className="text-xl font-[1000] uppercase text-black">
                  Final Thoughts
                </h3>
                <p className="text-base text-gray-800 leading-relaxed font-medium">
                  {content.conclusion}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: SEO SETTINGS */}
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
