"use client";

import { useEffect } from "react";

/**
 * Global IntersectionObserver that auto-reveals all [data-reveal] and [data-stagger] elements.
 * Zero GSAP, zero Framer Motion — pure CSS class toggling.
 * Robust: polls after hydration to ensure all SSR-rendered elements are observed.
 */
export default function RevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Elements that are completely hidden (opacity:0) from CSS data-reveal selectors
    // will never intersect unless the observer is set up correctly.
    const observed = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const observe = (el: Element) => {
      if (observed.has(el)) return;
      observed.add(el);
      observer.observe(el);
    };

    const scanAndObserve = () => {
      document.querySelectorAll("[data-reveal], [data-stagger]").forEach(observe);
    };

    // Initial scan — runs after hydration
    scanAndObserve();

    // MutationObserver to catch dynamically added elements (lazy sections, etc.)
    const mutationObserver = new MutationObserver(() => {
      scanAndObserve();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Fallback: re-scan after short delay to catch any elements that weren't ready
    const t1 = setTimeout(scanAndObserve, 100);
    const t2 = setTimeout(scanAndObserve, 500);

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return <>{children}</>;
}
