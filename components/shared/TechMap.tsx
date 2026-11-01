"use client";

import { motion } from "framer-motion";

export default function TechMap() {
  const offices = [
    { name: "Delhi, India (HQ)", x: "72%", y: "45%" },
    { name: "San Francisco", x: "18%", y: "35%" },
    { name: "London", x: "48%", y: "28%" },
    { name: "Singapore", x: "82%", y: "55%" }
  ];

  return (
    <div className="relative w-full aspect-[2/1] bg-white/10 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-violet-500/10 pointer-events-none" />
      
      {/* Abstract Tech SVG Map */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]" viewBox="0 0 1000 500" preserveAspectRatio="none">
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Simplified Continents using paths */}
        <path d="M200,100 Q250,50 300,100 T400,100 T450,200 T300,300 Z" fill="currentColor" />
        <path d="M500,150 Q550,100 600,150 T700,100 T750,250 T650,400 T550,300 Z" fill="currentColor" />
        <path d="M800,200 Q850,150 900,250 T950,400 T850,450 T800,350 Z" fill="currentColor" />
        <path d="M100,250 Q150,200 200,300 T250,450 T150,400 T100,350 Z" fill="currentColor" />
      </svg>

      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))" }}>
        <motion.path 
          d="M 18% 35% Q 45% 15% 72% 45%" 
          fill="none" 
          stroke="var(--accent-cyan)" 
          strokeWidth="1.5" 
          strokeDasharray="5, 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.path 
          d="M 48% 28% Q 60% 20% 72% 45%" 
          fill="none" 
          stroke="var(--accent-violet)" 
          strokeWidth="1.5" 
          strokeDasharray="5, 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.path 
          d="M 82% 55% Q 78% 65% 72% 45%" 
          fill="none" 
          stroke="var(--accent-cyan)" 
          strokeWidth="1.5" 
          strokeDasharray="5, 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Pulsing Dots */}
      {offices.map((office, i) => (
        <div key={i} className="absolute flex items-center justify-center group" style={{ left: office.x, top: office.y, transform: 'translate(-50%, -50%)' }}>
          <div className="absolute w-6 h-6 bg-cyan-500/20 rounded-full animate-ping" />
          <div className="relative w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]" />
          
          <div className="absolute top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap backdrop-blur-md px-3 py-1.5 rounded-lg shadow-xl z-10 text-xs font-bold" style={{ background: "var(--surface-1)", border: "1px solid var(--card-border)", color: "var(--ink-0)" }}>
            {office.name}
          </div>
        </div>
      ))}
      
      {/* Scanning Laser */}
      <motion.div 
        className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06b6d4]"
        animate={{ left: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
