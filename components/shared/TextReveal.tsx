"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TextRevealProps {
  text: string;
  className?: string;
  splitType?: "chars" | "words" | "lines";
  stagger?: number;
  trigger?: "scroll" | "mount";
  delay?: number;
}

export default function TextReveal({
  text,
  className = "",
  splitType = "words",
  stagger = 0.02,
  trigger = "scroll",
  delay = 0,
}: TextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    // Check if reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const elements: HTMLElement[] = [];
    const container = containerRef.current;
    
    // Clear and split
    container.innerHTML = "";
    
    if (splitType === "chars") {
      const chars = text.split("");
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.opacity = "0";
        span.style.transform = "translateY(15px) rotateX(-20deg)";
        span.style.display = "inline-block";
        container.appendChild(span);
        elements.push(span);
      });
    } else {
      const words = text.split(" ");
      words.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = index === words.length - 1 ? word : word + "\u00A0";
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
        span.style.display = "inline-block";
        container.appendChild(span);
        elements.push(span);
      });
    }

    const animationProps = {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: stagger,
      delay: trigger === "mount" ? delay : 0,
    };

    let animationInstance: gsap.core.Tween;

    if (trigger === "mount") {
      animationInstance = gsap.to(elements, animationProps);
    } else {
      animationInstance = gsap.to(elements, {
        ...animationProps,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          once: true,
        },
      });
    }

    return () => {
      if (animationInstance.scrollTrigger) {
        animationInstance.scrollTrigger.kill();
      }
      animationInstance.kill();
    };
  }, [text, splitType, stagger, trigger, delay]);

  const Tag = className.includes("text-display") || className.includes("text-heading") ? "h2" : "div";

  return (
    <Tag ref={containerRef} className={className}>
      <span className="opacity-0">{text}</span>
    </Tag>
  );
}
