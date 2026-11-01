"use client";

import { motion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}

export default function GlowCard({ children, className = "", glowColor = "#7c3aed", style }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02, boxShadow: `0 12px 32px ${glowColor}1a` }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`glass-card group relative overflow-hidden ${className}`}
      style={{
        padding: "clamp(1.5rem, 5vw, 2.5rem)",
        ...style,
      }}
    >
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
