"use client";
import React, { useState, useEffect } from "react";
import { MenuIcon, XIcon, ArrowRightIcon } from "./ui/BannerIcon";
import { ChevronDown, Monitor } from "lucide-react"; // Added Monitor icon for classroom
import { useDemoModal } from "@/context/DemoContext";

interface SubItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href?: string;
  subItems?: SubItem[];
}

const Header: React.FC = () => {
  const { openDemoModal } = useDemoModal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
      name: "Courses",
      href: "/courses",
      subItems: [
        { name: "All Courses", href: "/courses" },
        { name: "1-on-1 Online Coaching", href: "/online-coaching" },
        { name: "Chess for Adults", href: "/chess-classes-for-adults" },
        { name: "Comprehensive Curriculum", href: "/curriculum" },
        { name: "Intensive Camps", href: "/training-camps" },
        { name: "Future Champions (FCS)", href: "/fcs" },
      ],
    },
    {
      name: "Practice",
      href: "/platform",
      subItems: [
        { name: "24/7 Training Platform", href: "/platform" },
        { name: "Daily Tactics & Puzzles", href: "/puzzles" },
        { name: "Beginner Puzzles", href: "/puzzles/beginner" },
        { name: "Intermediate Tactics", href: "/puzzles/intermediate" },
        { name: "Advanced Calculation", href: "/puzzles/advanced" },
      ],
    },
    { name: "Blogs", href: "/blog" },
    { name: "Payments", href: "/pay" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-300 bg-white ${
        scrolled ? "shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] py-3" : "py-5 border-b border-gray-100"
      }`}
    >
      <div className="max-w-[1640px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <a href="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/logo.jpg"
              alt="Chessmate Academy"
              className={`object-contain transition-all duration-500 ${
                scrolled ? "h-10" : "h-12 md:h-14"
              }`}
            />
            <span className="text-2xl md:text-3xl font-extrabold tracking-[0.01em] text-black uppercase leading-none font-sans">
              CHESS<span className="text-[#EAB308] ml-1">MATE</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-4">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.subItems ? (
                  <button className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-black hover:text-[#EAB308] transition-colors">
                    {item.name}
                    <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className={`text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 relative group py-1 px-2 ${
                      item.name === "Payments" 
                        ? "bg-[#EAB308] text-black px-3 py-1.5 rounded-sm shadow-sm hover:bg-black hover:text-[#EAB308]" 
                        : "text-black hover:text-[#EAB308]"
                    }`}
                  >
                    {item.name}
                    {item.name !== "Payments" && (
                      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#EAB308] transition-all duration-300 group-hover:w-full"></span>
                    )}
                  </a>
                )}

                {item.subItems && (
                  <div className="absolute top-full -left-4 w-56 bg-black border-t-4 border-[#EAB308] mt-4 py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl">
                    {item.subItems.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        className="block px-6 py-3 text-[10px] font-black text-white hover:text-[#EAB308] hover:bg-white/5 uppercase tracking-widest transition-all"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Classroom Button */}
            <a
              href="https://classroom.thechessmate.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 px-5 py-3 bg-white text-black border-2 border-black text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-gray-100 shadow-sm"
            >
              <Monitor className="w-4 h-4" />
              Classroom
            </a>

            {/* Book Free Demo Button */}
            <button
              onClick={openDemoModal}
              className="hidden md:flex items-center gap-3 px-8 py-3 bg-black text-[#EAB308] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 border-2 border-black hover:bg-[#EAB308] hover:text-black shadow-lg"
            >
              Book Free Demo
              <ArrowRightIcon className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-black"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <XIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`xl:hidden fixed inset-0 top-[70px] bg-white transition-transform duration-500 ease-in-out z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-gray-100">
              {item.subItems ? (
                <div className="py-6">
                  <button
                    onClick={() => setActiveMobileSubmenu(activeMobileSubmenu === item.name ? null : item.name)}
                    className="flex items-center justify-between w-full text-black text-xl font-black uppercase tracking-widest"
                  >
                    {item.name}
                    <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileSubmenu === item.name ? "rotate-180 text-[#EAB308]" : ""}`} />
                  </button>
                  <div className={`flex flex-col gap-5 mt-5 pl-4 overflow-hidden transition-all duration-300 ${activeMobileSubmenu === item.name ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
                    {item.subItems.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        className="text-gray-500 text-sm font-black uppercase tracking-widest hover:text-[#EAB308]"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  href={item.href}
                  className={`block py-6 text-xl font-black uppercase tracking-widest ${
                    item.name === "Payments" ? "text-[#EAB308]" : "text-black"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}

          <div className="mt-auto pt-10 pb-12 flex flex-col gap-4">
            <a
              href="https://classroom.thechessmate.org"
              target="_blank"
              className="w-full bg-white border-2 border-black text-black py-4 text-center font-black uppercase text-sm tracking-[0.3em]"
            >
              Enter Classroom
            </a>
            <button
              onClick={() => {
                openDemoModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-black text-[#EAB308] py-5 font-black uppercase text-sm tracking-[0.3em] shadow-2xl active:bg-[#EAB308] active:text-black"
            >
              Book a Free Demo
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;