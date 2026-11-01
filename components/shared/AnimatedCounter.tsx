"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
  triggerOnce?: boolean;
}

export default function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  decimals = 0,
  triggerOnce = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!ref.current || typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: target,
      duration,
      ease: "power3.out",
      onUpdate: () => {
        setValue(obj.val);
      },
      scrollTrigger: {
        trigger: ref.current,
        start: "top 90%",
        once: triggerOnce,
      },
    });

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [target, duration, triggerOnce]);

  // Format number with commas
  const formattedValue = value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}
