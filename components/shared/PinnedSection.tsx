"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface PinnedSectionProps {
  children: React.ReactNode;
  duration?: string; // e.g. "100vh"
  className?: string;
  scrub?: boolean | number;
}

export default function PinnedSection({
  children,
  duration = "+=100%",
  className = "",
  scrub = true,
}: PinnedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    // Optional: Disable pinning on small devices if it breaks UX
    if (window.innerWidth <= 768) return;

    gsap.registerPlugin(ScrollTrigger);

    const scrollTrigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: duration,
      pin: true,
      scrub,
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [duration, scrub]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
