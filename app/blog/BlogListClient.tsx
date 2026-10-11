"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  ChevronRight, 
  User, 
  ArrowRight, 
  Search, 
  Clock,
  Zap
} from "lucide-react";
import BlogBanner from "@/components/ui/blogBanner";

const CATEGORIES = [
  "All",
  "Neurodiverse",
  "Child Development",
  "Training",
  "Openings",
  "Mindset",
  "Academy",
  "Inclusion",
  "Homeschool"
];

export default function BlogListClient({ initialPosts }: { initialPosts: any[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(() => {
    let result = [...initialPosts];

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter(post => 
        post.category?.toLowerCase().includes(activeCategory.toLowerCase()) ||
        post.title?.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(post =>
        post.title?.toLowerCase().includes(term) ||
        post.desc?.toLowerCase().includes(term) ||
        post.content?.intro?.toLowerCase().includes(term)
      );
    }

    return result;
  }, [activeCategory, searchTerm, initialPosts]);

  // Featured = marked as featured or latest post
  const featuredPost = useMemo(() => {
    const featured = initialPosts.find((p) => p.isFeatured);
    return featured || initialPosts[0];
  }, [initialPosts]);

  const readingTime = (content: any) => {
    const text = content?.intro || content?.body || "";
    const words = text.split(/\s+/).length;
    return Math.max(3, Math.ceil(words / 200));
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-[#EAB308] selection:text-black">
      <BlogBanner />

      {/* HERO / SEARCH SECTION */}
      <section className="pt-16 pb-20 border-b-4 border-black bg-[#EAB308]/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
              Chess <span className="text-[#EAB308]">Knowledge</span>
            </h1>
            <p className="text-xl font-bold text-black/70">Master the game. Transform your mind.</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-black/60">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                placeholder="Search articles... (titles, topics, benefits)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-4 border-black pl-16 pr-6 py-6 text-lg font-bold placeholder:font-normal focus:outline-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-7xl py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 border-2 border-black font-black uppercase tracking-widest text-sm transition-all hover:-translate-y-0.5
                ${activeCategory === cat 
                  ? 'bg-black text-[#EAB308] shadow-[4px_4px_0px_0px_rgba(234,179,8,1)]' 
                  : 'bg-white text-black hover:bg-[#EAB308] hover:text-black'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {featuredPost && activeCategory === "All" && !searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 border-4 border-black overflow-hidden bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="relative aspect-video md:aspect-square overflow-hidden bg-black/5">
                  <img 
                    src={featuredPost.image || "/benefit.png"} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 left-6 bg-black text-[#EAB308] text-xs font-black px-4 py-2 border border-[#EAB308]">
                    FEATURED
                  </div>
                </div>

                <div className="p-8 md:p-12 flex flex-col justify-center text-black">
                  <div className="flex items-center gap-4 text-sm mb-6 text-gray-600">
                    <span>{featuredPost.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#EAB308]" /> {readingTime(featuredPost.content)} min
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight mb-6 transition-colors group-hover:text-[#EAB308]">
                    {featuredPost.title}
                  </h2>

                  <p className="text-lg font-bold text-black/80 mb-8 line-clamp-3">
                    {featuredPost.desc}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center bg-[#EAB308]">
                        <User className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="font-black text-sm text-black">{featuredPost.author}</p>
                        <p className="text-xs opacity-60 text-black">{featuredPost.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 font-black uppercase text-sm group-hover:gap-3 transition-all text-black">
                      Read Now <ArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id || post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: Math.min(index * 0.03, 0.3) }}
                className={`group relative border-4 border-black p-6 flex flex-col h-full transition-all hover:-translate-y-2 bg-white text-black shadow-[8px_8px_0px_0px_rgba(234,179,8,1)]`}
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="relative aspect-[16/9] mb-6 border-2 border-black overflow-hidden bg-black/5">
                    <img 
                      src={post.image || "/benefit.png"} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 bg-white/90 text-black text-[10px] font-black px-3 py-1 border border-black">
                      {post.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-[#EAB308]" />
                    <span className="uppercase text-xs font-black tracking-widest opacity-70 text-black">{post.category}</span>
                  </div>

                  <h3 className="font-black text-2xl leading-tight tracking-tighter mb-4 line-clamp-3 text-black group-hover:text-[#EAB308] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm font-medium opacity-75 line-clamp-4 mb-8 flex-1 text-black">
                    {post.desc}
                  </p>

                  <div className="mt-auto pt-6 border-t border-black/20 flex items-center justify-between text-black">
                    <div className="flex items-center gap-3 text-xs font-black">
                      <div className="w-7 h-7 border-2 border-black rounded flex items-center justify-center bg-[#EAB308]/20">
                        <User className="w-4 h-4 text-black" />
                      </div>
                      {post.author}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:text-[#EAB308] transition-colors text-black">
                      Read <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl font-black text-black">No articles found</p>
            <p className="text-black/60 mt-2 font-bold">Try different search terms or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
