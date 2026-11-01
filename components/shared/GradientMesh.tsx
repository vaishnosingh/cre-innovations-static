"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface GradientMeshProps {
  colors?: string[];
  speed?: number;
  opacity?: number;
  className?: string;
}

export default function GradientMesh({
  colors = ["#6366f1", "#06b6d4", "#a855f7", "#ec4899"],
  speed = 1,
  opacity = 0.5,
  className = "",
}: GradientMeshProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const element = ref.current;
    
    // Animate CSS variables for background positions
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(element, {
      "--pos-x-1": "100%",
      "--pos-y-1": "100%",
      "--pos-x-2": "0%",
      "--pos-y-2": "100%",
      "--pos-x-3": "100%",
      "--pos-y-3": "0%",
      "--pos-x-4": "0%",
      "--pos-y-4": "0%",
      duration: 15 / speed,
      ease: "sine.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{
        opacity,
        // @ts-ignore - Custom CSS variables
        "--pos-x-1": "0%", "--pos-y-1": "0%",
        "--pos-x-2": "100%", "--pos-y-2": "0%",
        "--pos-x-3": "0%", "--pos-y-3": "100%",
        "--pos-x-4": "100%", "--pos-y-4": "100%",
        background: `
          radial-gradient(circle at var(--pos-x-1) var(--pos-y-1), ${colors[0]} 0%, transparent 50%),
          radial-gradient(circle at var(--pos-x-2) var(--pos-y-2), ${colors[1]} 0%, transparent 50%),
          radial-gradient(circle at var(--pos-x-3) var(--pos-y-3), ${colors[2]} 0%, transparent 50%),
          radial-gradient(circle at var(--pos-x-4) var(--pos-y-4), ${colors[3] || colors[0]} 0%, transparent 50%)
        `,
        filter: "blur(60px)",
      }}
    />
  );
}
