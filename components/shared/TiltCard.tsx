"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
  perspective?: number;
  style?: React.CSSProperties;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 12,
  glowColor = "rgba(99, 102, 241, 0.15)",
  perspective = 1000,
  style,
}: TiltCardProps) {
  const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // On touch devices, skip all the expensive motion machinery
  if (isTouch) {
    return (
      <div className={`glass-card relative overflow-hidden ${className}`} style={{ padding: "2rem", ...style }}>
        {children}
      </div>
    );
  }

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseXSpring, [0, 1], [-maxTilt, maxTilt]);

  const maskX = useTransform(x, (val) => val * 100);
  const maskY = useTransform(y, (val) => val * 100);
  const cursorMask = useMotionTemplate`
    radial-gradient(
      150px circle at ${maskX}% ${maskY}%,
      black 0%,
      transparent 100%
    )
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width;
    const yPct = mouseY / height;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        perspective,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          border: "1px solid var(--card-border)",
          background: "var(--surface-1)",
        }}
        className="w-full h-full rounded-2xl backdrop-blur-xl transition-colors duration-500 relative overflow-hidden"
      >
        {/* Mesh grid removed as per request */}
        
        <div className="relative z-10 w-full h-full" style={{ transform: "translateZ(30px)" }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
