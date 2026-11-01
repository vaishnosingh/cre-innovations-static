"use client";

import { useEffect, useRef } from "react";

type AnimationType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
  triggerOnce?: boolean;
  scrub?: boolean | number;
}

/**
 * Performance-optimized ScrollReveal.
 * Uses IntersectionObserver + CSS class toggling instead of GSAP ScrollTrigger.
 * Accepts same props as before for backward compatibility with inner pages.
 */
export default function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const revealMap: Record<AnimationType, string> = {
    fadeUp: "up",
    fadeDown: "down",
    fadeLeft: "left",
    fadeRight: "right",
    none: "fade",
  };

  const dataReveal = revealMap[animation];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Respect delay prop
          setTimeout(() => {
            el.classList.add("visible");
          }, delay * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      data-reveal={dataReveal}
      className={className}
    >
      {children}
    </div>
  );
}
