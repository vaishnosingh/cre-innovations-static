"use client";

import { useState } from "react";

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: string;
  borderWidth?: string;
  onHoverOnly?: boolean;
}

export default function AnimatedBorder({
  children,
  className = "",
  colors = ["#6366f1", "#06b6d4", "#a855f7", "#ec4899", "#6366f1"],
  speed = "6s",
  borderWidth = "2px",
  onHoverOnly = false,
}: AnimatedBorderProps) {
  const [isHovered, setIsHovered] = useState(false);

  const showBorder = !onHoverOnly || isHovered;

  const gradientString = `conic-gradient(from 0deg, ${colors.join(", ")})`;

  return (
    <div
      className={`relative rounded-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ padding: borderWidth }}
    >
      <div
        className="absolute inset-0 z-0 rounded-2xl transition-opacity duration-500"
        style={{
          background: gradientString,
          animation: showBorder ? `spin-slow ${speed} linear infinite` : "none",
          opacity: showBorder ? 1 : 0,
        }}
      />
      <div className="relative z-10 w-full h-full bg-bg-1 rounded-[calc(1rem-1px)]">
        {children}
      </div>
    </div>
  );
}
