import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make sure to register plugins only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom easing presets
export const EASE = {
  power3Out: "power3.out",
  power3InOut: "power3.inOut",
  power4Out: "power4.out",
  expoOut: "expo.out",
  elasticOut: "elastic.out(1, 0.5)",
  circOut: "circ.out",
  backOut: "back.out(1.7)",
};

/**
 * Creates a fade-in animation triggered by scroll
 */
export const scrollFadeIn = (
  element: string | Element | null,
  config?: {
    direction?: "up" | "down" | "left" | "right" | "none";
    duration?: number;
    delay?: number;
    ease?: string;
    distance?: number;
    scrub?: boolean | number;
    trigger?: string | Element;
    start?: string;
    end?: string;
    markers?: boolean;
  }
) => {
  if (!element || typeof window === "undefined") return;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const {
    direction = "up",
    duration = 1,
    delay = 0,
    ease = EASE.power3Out,
    distance = 50,
    scrub = false,
    trigger = element,
    start = "top 85%",
    end = "bottom top",
  } = config || {};

  let x = 0;
  let y = 0;

  switch (direction) {
    case "up":
      y = distance;
      break;
    case "down":
      y = -distance;
      break;
    case "left":
      x = distance;
      break;
    case "right":
      x = -distance;
      break;
  }

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      x,
      y,
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
        markers: config?.markers,
      },
    }
  );
};

/**
 * Creates a continuous parallax effect linked to scroll
 */
export const scrollParallax = (
  element: string | Element | null,
  config?: {
    speed?: number;
    direction?: "y" | "x";
    trigger?: string | Element;
  }
) => {
  if (!element || typeof window === "undefined") return;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const { speed = 1, direction = "y", trigger = element } = config || {};
  
  // yPercent/xPercent movement relative to scroll
  const movement = speed * 100;

  return gsap.to(element, {
    [direction]: movement,
    ease: "none",
    scrollTrigger: {
      trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

/**
 * Pins an element for a specific scroll duration
 */
export const scrollPin = (
  element: string | Element | null,
  config?: {
    duration?: string; // e.g. "100vh" or "+=500"
    scrub?: boolean | number;
    trigger?: string | Element;
  }
) => {
  if (!element || typeof window === "undefined") return;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const { duration = "+=100%", scrub = true, trigger = element } = config || {};

  return ScrollTrigger.create({
    trigger,
    start: "top top",
    end: duration,
    pin: element,
    scrub,
  });
};

export { gsap, ScrollTrigger };
