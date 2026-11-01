"use client";

import { useEffect, useRef } from "react";

/**
 * Pure CSS scroll progress bar — no Framer Motion, no spring.
 * Uses passive scroll listener with requestAnimationFrame throttling.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const bar = barRef.current;
      if (!bar) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) : 0;
      bar.style.transform = `scaleX(${progress})`;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "2px",
        width: "100%",
        transformOrigin: "left",
        transform: "scaleX(0)",
        background: "linear-gradient(90deg, var(--accent-violet), var(--accent-cyan), var(--accent-blue))",
        zIndex: 1000,
        boxShadow: "0 0 8px rgba(139,92,246,0.5)",
        pointerEvents: "none",
        willChange: "transform"
      }}
      aria-hidden
    />
  );
}
