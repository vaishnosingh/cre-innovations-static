"use client";

import { useEffect, useRef } from "react";
import { scrollParallax } from "@/lib/gsap";

interface ParallaxWrapperProps {
  children: React.ReactNode;
  speed?: number;
  direction?: "y" | "x";
  className?: string;
}

export default function ParallaxWrapper({
  children,
  speed = 1,
  direction = "y",
  className = "",
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // Disable on small devices often for performance or layout stability
    if (window.innerWidth <= 768) return;

    const animationInstance = scrollParallax(ref.current, {
      speed,
      direction,
    });

    return () => {
      if (animationInstance && animationInstance.scrollTrigger) {
        animationInstance.scrollTrigger.kill();
      }
      if (animationInstance) {
        animationInstance.kill();
      }
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
