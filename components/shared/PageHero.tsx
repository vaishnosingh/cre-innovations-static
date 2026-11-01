"use client";

import { useEffect, useRef } from "react";

interface PageHeroProps {
  badge?: React.ReactNode;
  title: string;
  highlightWord?: string;
  subtitle?: string;
  height?: "full" | "half";
  children?: React.ReactNode;
}

export default function PageHero({
  badge,
  title,
  highlightWord,
  subtitle,
  height = "half",
  children,
}: PageHeroProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    kids.forEach((child, i) => {
      child.style.opacity = "0";
      child.style.transform = "translateY(24px)";
      child.style.transition = `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.12 + 0.05}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.12 + 0.05}s`;
    });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      kids.forEach(child => {
        child.style.opacity = "1";
        child.style.transform = "none";
      });
    }));
  }, []);

  const minH = height === "full" ? "100dvh" : "auto";

  return (
    <section
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: minH,
        paddingTop: "clamp(5rem, 10vw, 8rem)",
        paddingBottom: "clamp(2rem, 5vw, 4rem)",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Ambient background removed because global mesh handles it */}

      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 50% 40%, black 10%, transparent 100%)",
          maskImage: "radial-gradient(ellipse 60% 80% at 50% 40%, black 10%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: "relative", zIndex: 10,
          maxWidth: "56rem", margin: "0 auto",
          padding: "0 clamp(1.5rem,5vw,3rem)",
          textAlign: "center",
          width: "100%",
        }}
      >
        {badge && (
          <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "center" }}>
            <span className="pill pill-violet">{badge}</span>
          </div>
        )}

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 6vw, 4.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "var(--t1)",
            marginBottom: "1.25rem",
          }}
        >
          {title}
          {highlightWord && (
            <>
              {" "}
              <span className="g-text">{highlightWord}</span>
            </>
          )}
        </h1>

        {subtitle && (
          <p
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
              color: "var(--t3)",
              lineHeight: 1.8,
              maxWidth: "40rem",
              margin: "0 auto",
            }}
          >
            {subtitle}
          </p>
        )}

        {children && <div style={{ marginTop: "2.5rem" }}>{children}</div>}
      </div>

    </section>
  );
}
