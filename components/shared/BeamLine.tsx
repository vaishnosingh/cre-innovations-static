"use client";

import { motion } from "framer-motion";

interface BeamLineProps {
  direction?: "h" | "v";
  color?: string;
  speed?: number;
  length?: string;
  className?: string;
}

export default function BeamLine({
  direction = "h",
  color = "rgba(99, 102, 241, 0.8)",
  speed = 3,
  length = "100%",
  className = "",
}: BeamLineProps) {
  const isHorizontal = direction === "h";

  return (
    <div
      className={`relative overflow-hidden pointer-events-none z-0 ${className}`}
      style={{
        width: isHorizontal ? length : "1px",
        height: isHorizontal ? "1px" : length,
        background: `linear-gradient(${isHorizontal ? "90deg" : "180deg"}, transparent, rgba(255,255,255,0.05), transparent)`,
      }}
    >
      <motion.div
        className="absolute top-0 left-0"
        style={{
          width: isHorizontal ? "30%" : "100%",
          height: isHorizontal ? "100%" : "30%",
          background: `linear-gradient(${isHorizontal ? "90deg" : "180deg"}, transparent, ${color}, transparent)`,
          boxShadow: `0 0 10px ${color}`,
        }}
        animate={{
          [isHorizontal ? "x" : "y"]: ["-100%", "350%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 1,
        }}
      />
    </div>
  );
}
