"use client";

import { useEffect, useRef, RefObject } from "react";

/**
 * Lightweight, GPU-accelerated scroll reveal.
 * Uses IntersectionObserver + CSS class toggling — zero GSAP overhead.
 * Pairs with [data-reveal] and [data-stagger] CSS classes in globals.css.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Reveal multiple elements individually (for grid items etc.)
 */
export function useRevealAll(count: number): RefObject<(HTMLElement | null)[]> {
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const elements = refs.current.filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observers: IntersectionObserver[] = [];

    elements.forEach((el, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Stagger via JS delay to keep CSS transitions smooth
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "none";
            }, i * 80);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [count]);

  return refs;
}
