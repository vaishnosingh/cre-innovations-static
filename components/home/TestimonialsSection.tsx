"use client";

import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
import { TestimonialsSectionContent } from "@/lib/types/content";
import { motion } from "framer-motion";
import GlowCard from "@/components/shared/GlowCard";

function RevealItem({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.transition = `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`;
        el.style.opacity = "1";
        el.style.transform = "none";
      } else {
        el.style.transition = `opacity 0.25s ease-out, transform 0.25s ease-out`;
        el.style.opacity = "0";
        el.style.transform = "translateY(32px)";
      }
    }, { 
      threshold: 0,
      rootMargin: "-15% 0px -15% 0px"
    });
    obs.observe(el);
    return () => obs.disconnect();
}, [delay]);
  return <div ref={ref} style={style}>{children}</div>;
}

export default function TestimonialsSection({ data }: { data?: TestimonialsSectionContent }) {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  if (!data || !data.visible) return null;
  const items = data.items?.filter(t => t.visible) || [];

  const switchTo = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 260);
  };

  if (items.length === 0) return null;
  const t = items[active] || items[0];

  return (
    <section className="section" style={{ background: "transparent", position: "relative", overflow: "hidden" }}>
      {/* Orb */}
      <div aria-hidden style={{
        position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%,-50%)",
        width: "80vw", height: "60vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,40,217,0.04) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <RevealItem style={{ textAlign: "center", marginBottom: "4rem" } as React.CSSProperties}>
          {data.badge && (
            <span className="pill pill-amber" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>{data.badge}</span>
          )}
          <h2 className="text-title g-text" style={{ marginBottom: "1rem" }}>
            {data.headingPrefix} <span className="g-text">{data.headingHighlight}</span>
          </h2>
          <p className="text-lead" style={{ maxWidth: "36rem", margin: "0 auto" }}>
            {data.description}
          </p>
        </RevealItem>

        <RevealItem delay={0.15}>
          {/* Main quote card */}
          <GlowCard
            className="cursor-default"
            style={{ padding: "clamp(3rem,6vw,5rem)", maxWidth: "60rem", margin: "0 auto" }}
          >
            {/* Quote icon */}
            <div style={{
              width: 56, height: 56,
              borderRadius: "16px",
              background: `${t.color}12`,
              color: t.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
              transition: "background 0.35s, color 0.35s",
            }}>
              <Quote size={28} />
            </div>

            {/* Quote text with fade */}
            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.25rem,2.5vw,1.6rem)",
                fontWeight: 500,
                color: "var(--ink-0)",
                lineHeight: 1.7,
                letterSpacing: "-0.015em",
                marginBottom: "2.5rem",
                fontStyle: "italic",
                minHeight: "5rem",
                opacity: fading ? 0 : 1,
                transform: fading ? "translateY(6px)" : "none",
                transition: "opacity 0.26s ease, transform 0.26s ease",
              }}
            >
              &quot;{t.quote}&quot;
            </blockquote>

            {/* Author row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  opacity: fading ? 0 : 1,
                  transition: "opacity 0.26s ease",
                }}
              >
                <div style={{
                  width: 56, height: 56,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${t.color}, ${t.color}aa)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1rem",
                  flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--ink-0)", fontSize: "1.15rem", letterSpacing: "-0.02em" }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "var(--ink-3)" }}>
                    {t.role} · {t.tenure}
                  </div>
                </div>
              </div>

              {/* Dots */}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                {items.map((tm, i) => (
                  <button
                    key={tm.id}
                    onClick={() => switchTo(i)}
                    aria-label={`View testimonial ${i + 1}`}
                    style={{
                      width: i === active ? 22 : 7,
                      height: 7,
                      borderRadius: "999px",
                      background: i === active ? t.color : "var(--cream-4)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </GlowCard>

          {/* Thumbnail row */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", marginTop: "1.75rem", flexWrap: "wrap" }}>
            {items.map((tm, i) => (
              <button
                key={tm.id}
                onClick={() => switchTo(i)}
                style={{
                  background: i === active ? "var(--cream-0)" : "var(--cream-3)",
                  border: `1px solid ${i === active ? tm.color : "var(--border-warm)"}`,
                  borderRadius: "var(--radius-lg)",
                  padding: "0.6875rem 1.125rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  cursor: "pointer",
                  transition: "all 0.28s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: i === active ? `0 4px 16px ${tm.color}22` : "none",
                  transform: i === active ? "scale(1.02)" : "scale(1)",
                }}
              >
                <div style={{
                  width: 30, height: 30,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${tm.color}, ${tm.color}aa)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "0.625rem",
                  flexShrink: 0,
                }}>
                  {tm.avatar}
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.84375rem", color: "var(--ink-0)", letterSpacing: "-0.02em" }}>
                    {tm.name}
                  </div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--ink-4)" }}>{tm.role}</div>
                </div>
              </button>
            ))}
          </div>
        </RevealItem>
      </div>
    </section>
  );
}
