"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useMotionTemplate, useScroll, useTransform, useSpring } from "framer-motion";

export default function MeshBackground() {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Desktop-only cursor tracking
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const maskRadius = useSpring(350, { stiffness: 110, damping: 30 });

  // Scroll tracking for hue shift — desktop only, no scroll listener on mobile
  const { scrollY } = useScroll();
  const hueRotate = useTransform(scrollY, [0, 4000], ["0deg", isTouch ? "0deg" : "70deg"]);

  useEffect(() => {
    setMounted(true);
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(touch);
    if (touch) return; // Skip all mouse listeners on touch devices

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [class*="card" i], .cursor-pointer')) {
        maskRadius.set(0);
      } else {
        maskRadius.set(350);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, maskRadius]);

  const opacityTransform = useTransform(mouseX, x => x === -1000 ? 0 : 1);
  const hueFilter = useMotionTemplate`hue-rotate(${hueRotate})`;
  const cursorMask = useMotionTemplate`
    radial-gradient(
      ${maskRadius}px circle at ${mouseX}px ${mouseY}px,
      black 0%,
      rgba(0,0,0,0.3) 30%,
      transparent 70%
    )
  `;

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden"
      style={{
        backgroundColor: "var(--cream-0)",
        // Use an explicit transition matching ThemeSwitcher duration (350ms)
        // so both the body bg and mesh bg cross-fade in perfect sync.
        // translateZ(0) keeps this on its own GPU compositing layer so
        // background repaints don't cascade into the blur/orb layers.
        transition: "background-color 350ms cubic-bezier(0.4, 0, 0.2, 1)",
        transform: "translateZ(0)",
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gas-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(35vw, 25vh) scale(1.7) rotate(45deg); }
          66% { transform: translate(-25vw, 35vh) scale(1.1) rotate(-20deg); }
        }
        @keyframes gas-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(-35vw, 25vh) scale(1.8) rotate(-30deg); }
          66% { transform: translate(30vw, -30vh) scale(1.2) rotate(20deg); }
        }
        @keyframes gas-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(45vw, -45vh) scale(1.9); }
        }
        @media (hover: none) and (pointer: coarse) {
          .gas-orb { animation-play-state: paused !important; }
        }
      `}} />

      {/* 1. Gradient Gas Layer — hue-shift only on desktop */}
      <motion.div
        className="absolute inset-0 w-full h-full opacity-70 mix-blend-normal"
        style={isTouch ? undefined : { filter: hueFilter }}
      >
        <div
          className="gas-orb absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(139,92,246,0.85) 0%, rgba(139,92,246,0.55) 30%, rgba(139,92,246,0.25) 55%, rgba(139,92,246,0.05) 75%, transparent 100%)",
            filter: "blur(90px)",
            WebkitFilter: "blur(90px)",
            transform: "translateZ(0)",
            willChange: "transform",
            animation: "gas-drift-1 14s infinite alternate ease-in-out",
          }}
        />
        <div
          className="gas-orb absolute top-[10%] right-[-20%] w-[80%] h-[80%] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(6,182,212,0.8) 0%, rgba(6,182,212,0.5) 30%, rgba(6,182,212,0.22) 55%, rgba(6,182,212,0.05) 75%, transparent 100%)",
            filter: "blur(90px)",
            WebkitFilter: "blur(90px)",
            transform: "translateZ(0)",
            willChange: "transform",
            animation: "gas-drift-2 18s infinite alternate-reverse ease-in-out",
          }}
        />
        <div
          className="gas-orb absolute bottom-[-30%] left-[10%] w-[90%] h-[90%] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0.5) 30%, rgba(59,130,246,0.22) 55%, rgba(59,130,246,0.05) 75%, transparent 100%)",
            filter: "blur(90px)",
            WebkitFilter: "blur(90px)",
            transform: "translateZ(0)",
            willChange: "transform",
            animation: "gas-drift-3 16s infinite alternate ease-in-out",
          }}
        />
        <div
          className="gas-orb absolute top-[50%] right-[20%] w-[60%] h-[60%] rounded-full"
          style={{
            background: "radial-gradient(circle at center, rgba(16,185,129,0.6) 0%, rgba(16,185,129,0.35) 30%, rgba(16,185,129,0.15) 55%, rgba(16,185,129,0.03) 75%, transparent 100%)",
            filter: "blur(90px)",
            WebkitFilter: "blur(90px)",
            transform: "translateZ(0)",
            willChange: "transform",
            animation: "gas-drift-1 12s infinite alternate-reverse ease-in-out",
          }}
        />
      </motion.div>

      {/* 2. Dotted Grid Cursor Spotlight — desktop only */}
      {!isTouch && (
        <motion.div
          className="mesh-grid absolute inset-0 w-full h-full mix-blend-normal pointer-events-none transition-opacity duration-300"
          style={{
            background: "radial-gradient(var(--ink-3) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            WebkitMaskImage: cursorMask,
            maskImage: cursorMask,
            opacity: opacityTransform,
          }}
        />
      )}

      {/* 3. Lightweight Noise Texture */}
      <div className="absolute inset-0 opacity-[0.04] noise-bg pointer-events-none" />
    </div>
  );
}
