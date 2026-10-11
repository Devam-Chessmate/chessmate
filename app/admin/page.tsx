"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  RefreshCw,
  ExternalLink,
  BookOpen,
  Calendar,
  User,
  Image as ImageIcon,
  Sparkles,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";

interface BlogPostItem {
  id: number;
  slug: string;
  title: string;
  desc: string;
  category: string;
  date: string;
  author: string;
  image: string;
  published: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);
  const [postToDelete, setPostToDelete] = useState<BlogPostItem | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (res.ok && data.success) {
        setPosts(data.posts || []);
      } else {
        setError(data.error || "Failed to load blogs from Neon database");
      }
    } catch (err: any) {
      setError(err?.message || "Network error loading blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" || post.category === categoryFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "PUBLISHED" && post.published) ||
        (statusFilter === "DRAFT" && !post.published);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [posts, searchTerm, categoryFilter, statusFilter]);

  // Quick toggle publish status
  const handleTogglePublish = async (post: BlogPostItem) => {
    try {
      const newStatus = !post.published;
      const res = await fetch(`/api/blogs/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: newStatus }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, published: newStatus } : p))
        );
      }
    } catch (err) {
      console.error("Failed to toggle publish status:", err);
    }
  };

  // Quick toggle featured status
  const handleToggleFeatured = async (post: BlogPostItem) => {
    try {
      const newFeatured = !post.isFeatured;
      const res = await fetch(`/api/blogs/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: newFeatured }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? { ...p, isFeatured: newFeatured } : p))
        );
      }
    } catch (err) {
      console.error("Failed to toggle featured status:", err);
    }
  };

  // Confirm delete post
  const handleDeletePost = async () => {
    if (!postToDelete) return;
    try {
      setIsDeletingId(postToDelete.id);
      const res = await fetch(`/api/blogs/${postToDelete.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== postToDelete.id));
        setPostToDelete(null);
      } else {
        alert("Failed to delete post. Please check database connection.");
      }
    } catch (err) {
      alert("Error deleting post.");
    } finally {
      setIsDeletingId(null);
    }
  };

  const totalCount = posts.length;
  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = totalCount - publishedCount;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner / Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-[#EAB308] border-2 border-black text-xs font-[1000] uppercase tracking-wider shadow-[2px_2px_0px_0px_black]">
              Dashboard
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Neon DB & Cloudinary
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-[1000] text-black uppercase tracking-tight mt-2">
            Blog Post Manager
          </h1>
          <p className="text-sm font-bold text-gray-600 mt-1">
            Create, edit, publish, and manage all your ChessMate Academy articles.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={fetchPosts}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-3 border-2 border-black bg-gray-100 hover:bg-gray-200 font-black text-xs uppercase tracking-wider transition-colors shadow-[3px_3px_0px_0px_black] active:translate-y-0.5"
            title="Refresh from Neon DB"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <Link
            href="/admin/blogs/new"
            className="flex items-center gap-2 px-5 py-3 border-3 border-black bg-[#EAB308] hover:bg-yellow-400 font-[1000] text-sm uppercase tracking-wider transition-all shadow-[5px_5px_0px_0px_black] hover:-translate-y-0.5 active:translate-y-0 text-black"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            New Article
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border-3 border-black bg-white p-5 shadow-[5px_5px_0px_0px_black]">
          <p className="text-xs font-black uppercase tracking-wider text-gray-500">
            Total Articles
          </p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-[1000] text-black">{totalCount}</span>
            <BookOpen className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="border-3 border-black bg-white p-5 shadow-[5px_5px_0px_0px_black]">
          <p className="text-xs font-black uppercase tracking-wider text-emerald-600">
            Published Live
          </p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-[1000] text-emerald-600">{publishedCount}</span>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
        </div>

        <div className="border-3 border-black bg-white p-5 shadow-[5px_5px_0px_0px_black]">
          <p className="text-xs font-black uppercase tracking-wider text-amber-600">
            Drafts
          </p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-[1000] text-amber-600">{draftCount}</span>
            <XCircle className="w-5 h-5 text-amber-500" />
          </div>
        </div>

        <div className="border-3 border-black bg-white p-5 shadow-[5px_5px_0px_0px_black]">
          <p className="text-xs font-black uppercase tracking-wider text-purple-600">
            Categories
          </p>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-3xl font-[1000] text-purple-600">{categories.length - 1}</span>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="border-3 border-black bg-white p-4 shadow-[6px_6px_0px_0px_black] space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles by title, description, slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border-2 border-black bg-gray-50 text-black font-bold placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#EAB308] text-sm"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-gray-500 tracking-wider whitespace-nowrap">
              Category:
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-3 border-2 border-black bg-white text-black font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#EAB308]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Pills */}
          <div className="flex items-center border-2 border-black bg-gray-100 p-1 self-start md:self-auto">
            {(["ALL", "PUBLISHED", "DRAFT"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-colors ${
                  statusFilter === status
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 border-3 border-red-500 bg-red-50 text-red-700 flex items-center justify-between shadow-[4px_4px_0px_0px_red]">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span className="font-bold text-sm">{error}</span>
          </div>
          <button
            onClick={fetchPosts}
            className="px-3 py-1 bg-red-600 text-white font-black text-xs uppercase"
          >
            Retry
          </button>
        </div>
      )}

      {/* Articles Table / Cards */}
      <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_black] overflow-hidden">
        {loading ? (
          <div className="p-16 text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#EAB308]" />
            <p className="mt-4 font-black uppercase tracking-wider text-sm text-gray-500">
              Loading posts from Neon database...
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 border-3 border-black bg-[#EAB308] rounded-full flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_black]">
              <BookOpen className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-[1000] uppercase text-black">
              No matching articles found
            </h3>
            <p className="text-sm font-bold text-gray-500 max-w-md mx-auto">
              {searchTerm || categoryFilter !== "All" || statusFilter !== "ALL"
                ? "Try adjusting your search criteria or resetting the filters."
                : "You don't have any blog articles yet. Click below to create your first post!"}
            </p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 px-6 py-3 border-3 border-black bg-[#EAB308] text-black font-[1000] uppercase text-sm shadow-[4px_4px_0px_0px_black] hover:-translate-y-0.5 transition-transform"
            >
              <PlusCircle className="w-4 h-4" /> Create First Article
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-3 border-black bg-black text-white text-xs font-[1000] uppercase tracking-wider">
                  <th className="py-4 px-4 w-16 text-center">#</th>
                  <th className="py-4 px-4 w-28">Image</th>
                  <th className="py-4 px-4">Article Details</th>
                  <th className="py-4 px-4 w-36">Category</th>
                  <th className="py-4 px-4 w-28 text-center">Featured</th>
                  <th className="py-4 px-4 w-32 text-center">Status</th>
                  <th className="py-4 px-4 w-40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black/10 text-sm">
                {filteredPosts.map((post, idx) => (
                  <tr
                    key={post.id}
                    className="hover:bg-yellow-50/60 transition-colors group"
                  >
                    {/* Index */}
                    <td className="py-4 px-4 text-center font-black text-gray-400 text-xs">
                      {idx + 1}
                    </td>

                    {/* Image Thumbnail */}
                    <td className="py-4 px-4">
                      <div className="w-20 h-14 border-2 border-black bg-gray-100 overflow-hidden relative shadow-[2px_2px_0px_0px_black]">
                        <img
                          src={post.image || "/benefit.png"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as any).src = "/benefit.png";
                          }}
                        />
                      </div>
                    </td>

                    {/* Title & Details */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <Link
                          href={`/admin/blogs/${post.id}`}
                          className="font-[1000] text-black hover:text-[#EAB308] text-base leading-tight block uppercase tracking-tight transition-colors line-clamp-1"
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-gray-600 line-clamp-1 font-medium">
                          {post.desc}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-gray-400 font-bold uppercase tracking-wider pt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {post.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" /> {post.author}
                          </span>
                          <span>•</span>
                          <span className="text-gray-500 font-mono text-[10px]">
                            /{post.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="inline-block px-2.5 py-1 bg-[#EAB308]/20 border border-black text-[11px] font-black uppercase text-black tracking-wider">
                        {post.category || "General"}
                      </span>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleFeatured(post)}
                        title={post.isFeatured ? "Featured on Home" : "Not Featured"}
                        className={`p-2 border-2 transition-all ${
                          post.isFeatured
                            ? "bg-[#EAB308] border-black text-black shadow-[2px_2px_0px_0px_black]"
                            : "bg-gray-100 border-gray-300 text-gray-400 hover:text-black hover:border-black"
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    </td>

                    {/* Status Toggle Switch */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`px-3 py-1.5 border-2 text-[10px] font-[1000] uppercase tracking-wider transition-all inline-flex items-center gap-1.5 ${
                          post.published
                            ? "bg-emerald-500 text-white border-black shadow-[2px_2px_0px_0px_black]"
                            : "bg-gray-200 text-gray-700 border-gray-400 hover:bg-gray-300"
                        }`}
                      >
                        {post.published ? (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" /> Published
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Draft
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Live Site Preview */}
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_black]"
                          title="View on Live Site"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>

                        {/* Edit Button */}
                        <Link
                          href={`/admin/blogs/${post.id}`}
                          className="p-2 border-2 border-black bg-[#EAB308] hover:bg-yellow-400 text-black transition-colors shadow-[2px_2px_0px_0px_black]"
                          title="Edit Post"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>

                        {/* Delete Button */}
                        <button
                          onClick={() => setPostToDelete(post)}
                          className="p-2 border-2 border-black bg-red-100 hover:bg-red-500 hover:text-white text-red-600 transition-colors shadow-[2px_2px_0px_0px_black]"
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {postToDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
          <div className="border-4 border-black bg-white p-6 max-w-md w-full shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="p-2 bg-red-100 border-2 border-red-600">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-[1000] uppercase text-black">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-sm font-bold text-gray-700 leading-relaxed mb-4">
              Are you sure you want to permanently delete article{" "}
              <span className="font-[1000] text-black underline">
                &ldquo;{postToDelete.title}&rdquo;
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-3 border-t-2 border-black/10">
              <button
                onClick={() => setPostToDelete(null)}
                disabled={isDeletingId !== null}
                className="px-4 py-2.5 border-2 border-black bg-gray-100 hover:bg-gray-200 font-black text-xs uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePost}
                disabled={isDeletingId !== null}
                className="px-5 py-2.5 border-2 border-black bg-red-600 hover:bg-red-700 text-white font-[1000] text-xs uppercase tracking-wider shadow-[3px_3px_0px_0px_black] flex items-center gap-2"
              >
                {isDeletingId !== null ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Deleting...
                  </>
                ) : (
                  "Yes, Delete Article"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
