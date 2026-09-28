"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Users, Zap, CheckCircle2 } from "lucide-react";

interface CountryNode {
  id: string;
  name: string;
  code: string;
  x: number; // Percentage X on 1000x520 canvas
  y: number; // Percentage Y on 1000x520 canvas
  students: string;
  timezone: string;
}

const ACTIVE_COUNTRIES: CountryNode[] = [
  { id: "us", name: "United States", code: "us", x: 230, y: 190, students: "120+ Active Students", timezone: "EST / CST / PST" },
  { id: "in", name: "India (HQ)", code: "in", x: 685, y: 260, students: "350+ Active Students", timezone: "IST (Academy Hub)" },
  { id: "gb", name: "United Kingdom", code: "gb", x: 485, y: 155, students: "75+ Active Students", timezone: "GMT / BST" },
  { id: "pt", name: "Portugal", code: "pt", x: 468, y: 205, students: "30+ Active Students", timezone: "WET / WEST" },
  { id: "it", name: "Italy", code: "it", x: 518, y: 195, students: "45+ Active Students", timezone: "CET" },
  { id: "jp", name: "Japan", code: "jp", x: 865, y: 200, students: "25+ Active Students", timezone: "JST" },
  { id: "sg", name: "Singapore", code: "sg", x: 770, y: 310, students: "50+ Active Students", timezone: "SGT" },
];

// Arcs connecting India Hub to all international student hubs
const CONNECTIONS = [
  { from: { x: 685, y: 260 }, to: { x: 230, y: 190 }, controlY: 100 }, // India to US
  { from: { x: 685, y: 260 }, to: { x: 485, y: 155 }, controlY: 140 }, // India to UK
  { from: { x: 685, y: 260 }, to: { x: 468, y: 205 }, controlY: 160 }, // India to Portugal
  { from: { x: 685, y: 260 }, to: { x: 518, y: 195 }, controlY: 170 }, // India to Italy
  { from: { x: 685, y: 260 }, to: { x: 865, y: 200 }, controlY: 160 }, // India to Japan
  { from: { x: 685, y: 260 }, to: { x: 770, y: 310 }, controlY: 270 }, // India to Singapore
];

export default function WorldMapInteractive() {
  const [selectedCountry, setSelectedCountry] = useState<CountryNode | null>(ACTIVE_COUNTRIES[0]);
  const [hoveredCountry, setHoveredCountry] = useState<CountryNode | null>(null);

  const activeDisplay = hoveredCountry || selectedCountry;

  return (
    <div className="relative w-full bg-[#0a0f1d] rounded-none border-4 border-black p-4 sm:p-6 overflow-hidden select-none">
      
      {/* MAP CONTROLS & STATUS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10 relative z-20">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EAB308] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#EAB308]"></span>
          </span>
          <span className="text-[11px] font-black uppercase tracking-widest text-[#EAB308]">
            7 Active Training Hubs
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
          <span className="text-white font-black uppercase text-[10px] bg-white/10 px-2.5 py-1 border border-white/20">
            FIDE Certified Reach
          </span>
        </div>
      </div>

      {/* SVG WORLD MAP CANVAS */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden">
        <svg
          viewBox="0 0 1000 520"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Grid Pattern */}
            <pattern id="world-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
            </pattern>

            {/* Gradient for Connection Lines */}
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EAB308" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#EAB308" stopOpacity="0.8" />
            </linearGradient>

            {/* Pulse Glow Filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid */}
          <rect width="1000" height="520" fill="url(#world-grid)" />

          {/* Latitude / Equator & Tropic Lines */}
          <line x1="0" y1="260" x2="1000" y2="260" stroke="rgba(234, 179, 8, 0.15)" strokeDasharray="4,4" strokeWidth="1" />
          <line x1="0" y1="180" x2="1000" y2="180" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2,4" strokeWidth="1" />
          <line x1="0" y1="340" x2="1000" y2="340" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2,4" strokeWidth="1" />

          {/* --- GEOGRAPHIC CONTINENTS OUTLINES (Accurate Vector Shapes) --- */}
          <g fill="#161f38" stroke="#25355e" strokeWidth="1.2" opacity="0.85">
            {/* North America */}
            <path d="M120 70 L220 60 L280 85 L320 120 L270 160 L290 190 L240 240 L180 230 L160 270 L140 240 L110 200 L90 140 Z" />
            {/* Greenland */}
            <path d="M340 40 L400 45 L380 90 L320 80 Z" />
            {/* South America */}
            <path d="M250 280 L310 290 L360 340 L340 430 L290 470 L260 410 L240 330 Z" />
            {/* Europe */}
            <path d="M460 120 L530 110 L560 140 L530 180 L480 190 L450 160 Z" />
            {/* Africa */}
            <path d="M460 210 L550 210 L580 270 L560 360 L510 410 L470 340 L440 260 Z" />
            {/* Asia */}
            <path d="M570 110 L720 90 L850 110 L890 180 L840 240 L760 260 L690 290 L600 240 L570 180 Z" />
            {/* India Subcontinent Shape */}
            <path d="M650 220 L720 230 L700 300 L660 300 Z" />
            {/* Australia */}
            <path d="M800 350 L880 340 L900 400 L840 430 L790 390 Z" />
            {/* Japan Arc */}
            <path d="M855 170 L875 190 L865 220 L850 200 Z" />
            {/* UK & Ireland */}
            <path d="M475 135 L495 140 L490 165 L470 155 Z" />
            {/* Southeast Asia Islands */}
            <path d="M740 300 L800 310 L820 340 L760 340 Z" />
          </g>

          {/* --- HIGHLIGHTED ACTIVE COUNTRIES BACKGROUND GLOWS --- */}
          {/* USA Highlight */}
          <ellipse cx="230" cy="190" rx="65" ry="35" fill="rgba(234, 179, 8, 0.12)" stroke="#EAB308" strokeWidth="1.5" strokeDasharray="3,3" />
          
          {/* India Highlight (HQ) */}
          <ellipse cx="685" cy="260" rx="40" ry="35" fill="rgba(234, 179, 8, 0.2)" stroke="#EAB308" strokeWidth="2" />

          {/* UK & Europe Zone (UK, Portugal, Italy) */}
          <ellipse cx="485" cy="155" rx="25" ry="20" fill="rgba(234, 179, 8, 0.15)" stroke="#EAB308" strokeWidth="1.5" />
          <ellipse cx="468" cy="205" rx="18" ry="16" fill="rgba(234, 179, 8, 0.15)" stroke="#EAB308" strokeWidth="1.5" />
          <ellipse cx="518" cy="195" rx="20" ry="18" fill="rgba(234, 179, 8, 0.15)" stroke="#EAB308" strokeWidth="1.5" />

          {/* Japan Highlight */}
          <ellipse cx="865" cy="200" rx="25" ry="25" fill="rgba(234, 179, 8, 0.15)" stroke="#EAB308" strokeWidth="1.5" />

          {/* Singapore Highlight */}
          <ellipse cx="770" cy="310" rx="18" ry="18" fill="rgba(234, 179, 8, 0.18)" stroke="#EAB308" strokeWidth="1.5" />

          {/* --- CONNECTION ARCS FROM INDIA TO COUNTRIES --- */}
          {CONNECTIONS.map((conn, idx) => (
            <g key={idx}>
              <path
                d={`M ${conn.from.x} ${conn.from.y} Q ${(conn.from.x + conn.to.x) / 2} ${conn.controlY} ${conn.to.x} ${conn.to.y}`}
                fill="none"
                stroke="url(#arcGradient)"
                strokeWidth="1.8"
                strokeDasharray="6,4"
                opacity="0.75"
              />
            </g>
          ))}

          {/* --- INTERACTIVE COUNTRY PINS --- */}
          {ACTIVE_COUNTRIES.map((c) => {
            const isHovered = hoveredCountry?.id === c.id;
            const isSelected = selectedCountry?.id === c.id;
            const isHighlighted = isHovered || isSelected;

            return (
              <g
                key={c.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredCountry(c)}
                onMouseLeave={() => setHoveredCountry(null)}
                onClick={() => setSelectedCountry(c)}
              >
                {/* Expanding Pulse Ring */}
                <circle cx={c.x} cy={c.y} r="14" fill="none" stroke="#EAB308" strokeWidth="1" opacity="0.6">
                  <animate attributeName="r" values="8;24" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0" dur="2.5s" repeatCount="indefinite" />
                </circle>

                {/* Outer Pin Circle */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={isHighlighted ? "9" : "7"}
                  fill={c.id === "in" ? "#EAB308" : "#ffffff"}
                  stroke="#000000"
                  strokeWidth="2"
                  filter="url(#glow)"
                  className="transition-all duration-300"
                />

                {/* Inner Center Dot */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r="3.5"
                  fill={c.id === "in" ? "#000000" : "#EAB308"}
                />

                {/* Country Name Tag on Map */}
                <rect
                  x={c.x - 30}
                  y={c.y - 26}
                  width="60"
                  height="16"
                  rx="3"
                  fill="#000000"
                  stroke="#EAB308"
                  strokeWidth="1"
                  opacity={isHighlighted ? 1 : 0.85}
                />
                <text
                  x={c.x}
                  y={c.y - 15}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="9"
                  fontWeight="900"
                  fontFamily="sans-serif"
                  letterSpacing="0.05em"
                >
                  {c.name.toUpperCase().slice(0, 7)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ACTIVE COUNTRY LIVE CARD OVERLAY */}
      {activeDisplay && (
        <div className="mt-4 p-4 bg-black border-2 border-[#EAB308] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white shadow-[6px_6px_0px_0px_rgba(234,179,8,1)]">
          <div className="flex items-center gap-3">
            <img
              src={`https://flagcdn.com/w40/${activeDisplay.code}.png`}
              alt={activeDisplay.name}
              className="w-8 h-auto border border-white/20 shadow"
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-[1000] uppercase tracking-wider text-white">
                  {activeDisplay.name}
                </h4>
                <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-[#EAB308] text-black">
                  Verified Hub
                </span>
              </div>
              <p className="text-xs font-bold text-gray-400 mt-0.5">
                {activeDisplay.timezone} • Personalized Scheduling Available
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 self-stretch sm:self-auto justify-between border-t sm:border-t-0 sm:border-l border-white/20 pt-3 sm:pt-0 sm:pl-6">
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-[#EAB308]">Network Strength</span>
              <p className="text-xs font-black text-white">{activeDisplay.students}</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Live Coaching</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
