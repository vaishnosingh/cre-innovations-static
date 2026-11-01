"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  showProgress?: boolean;
}

export default function HorizontalScroll({
  children,
  className = "",
  showProgress = true,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;
    const progress = progressRef.current;

    if (!container || !scroll || typeof window === "undefined") return;

    // Check if reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || window.innerWidth <= 768) {
      // For mobile or reduced motion, fallback to native overflow scroll
      scroll.style.overflowX = "auto";
      scroll.style.display = "flex";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const getScrollAmount = () => {
      let scrollWidth = scroll.scrollWidth;
      return -(scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(scroll, {
      x: getScrollAmount,
      ease: "none",
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (progress) {
          progress.style.transform = `scaleX(${self.progress})`;
        }
      },
    });

    return () => {
      scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={scrollRef} className="flex flex-nowrap h-full w-max">
        {children}
      </div>
      {showProgress && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 hidden md:block">
          <div
            ref={progressRef}
            className="h-full bg-brand-primary origin-left scale-x-0"
          />
        </div>
      )}
    </div>
  );
}
