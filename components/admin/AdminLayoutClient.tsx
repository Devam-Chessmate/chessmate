"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  PlusCircle,
  Image as ImageIcon,
  ExternalLink,
  Database,
  Cloud,
  Menu,
  X,
  Layers,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navLinks = [
    {
      name: "All Articles",
      href: "/admin",
      icon: FileText,
      active: pathname === "/admin",
    },
    {
      name: "Create New Post",
      href: "/admin/blogs/new",
      icon: PlusCircle,
      active: pathname === "/admin/blogs/new",
    },
    {
      name: "Cloudinary Media",
      href: "/admin/media",
      icon: ImageIcon,
      active: pathname === "/admin/media",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-black font-sans flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-black text-white border-b-4 border-black z-30 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#EAB308] border-2 border-white flex items-center justify-center font-black text-black text-base shadow-[2px_2px_0px_0px_white]">
            ♞
          </div>
          <div>
            <span className="font-[1000] tracking-tighter text-base">CHESSMATE</span>
            <span className="text-[10px] bg-[#EAB308] text-black font-extrabold px-1.5 py-0.5 ml-1.5 uppercase">
              Admin
            </span>
          </div>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 border-2 border-white bg-white/10 hover:bg-[#EAB308] hover:text-black transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Desktop Sidebar / Mobile Drawer */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-black text-white flex flex-col justify-between border-r-4 border-black z-40 transition-transform duration-200 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6">
          {/* Logo / Brand Header */}
          <div className="flex items-center gap-3 pb-6 border-b-2 border-white/10">
            <div className="w-11 h-11 bg-[#EAB308] border-3 border-white flex items-center justify-center font-black text-black text-xl shadow-[3px_3px_0px_0px_white]">
              ♞
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-[1000] text-lg tracking-tighter text-white">
                  CHESSMATE
                </span>
                <span className="text-[9px] bg-[#EAB308] text-black font-black px-1.5 py-0.5 uppercase tracking-wider">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Blog CMS & Media
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-2">
            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-3 mb-2">
              Content Management
            </p>
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 border-2 font-black text-sm uppercase tracking-wider transition-all ${
                    link.active
                      ? "bg-[#EAB308] text-black border-black shadow-[4px_4px_0px_0px_white] translate-x-1"
                      : "border-transparent text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${link.active ? "text-black" : "opacity-40"}`} />
                </Link>
              );
            })}
          </nav>

          {/* Live Website Quick Links */}
          <div className="mt-8 pt-6 border-t-2 border-white/10 space-y-2">
            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-3 mb-2">
              Website Shortcuts
            </p>
            <Link
              href="/blog"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 text-xs font-bold text-gray-300 hover:text-[#EAB308] transition-colors border border-white/10 hover:border-[#EAB308]/40 bg-white/5"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5" />
                View Live Blog
              </span>
              <span className="text-[10px] uppercase font-black opacity-60">↗</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 text-xs font-bold text-gray-300 hover:text-white transition-colors border border-white/10 bg-white/5"
            >
              <span className="flex items-center gap-2">
                <ArrowLeft className="w-3.5 h-3.5" />
                Main Homepage
              </span>
              <span className="text-[10px] uppercase font-black opacity-60">↗</span>
            </Link>
          </div>
        </div>

        {/* System Status Indicators at bottom */}
        <div className="p-6 bg-black border-t-2 border-white/10 space-y-3">
          <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center justify-between">
            <span>System Infrastructure</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>

          <div className="flex items-center gap-2.5 p-2 bg-white/5 border border-white/10 text-xs">
            <Database className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="overflow-hidden">
              <p className="font-black text-white text-[11px] truncate">Neon PostgreSQL</p>
              <p className="text-[10px] text-emerald-400 font-bold">Prisma ORM • Connected</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 bg-white/5 border border-white/10 text-xs">
            <Cloud className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="overflow-hidden">
              <p className="font-black text-white text-[11px] truncate">Cloudinary CDN</p>
              <p className="text-[10px] text-amber-400 font-bold truncate">Preset: chessmate</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-[#F4F4F0] min-h-screen">
        {children}
      </main>
    </div>
  );
}
