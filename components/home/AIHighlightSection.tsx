"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AIHighlightSectionContent, AIHighlightContent } from "@/lib/types/content";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import GlowCard from "@/components/shared/GlowCard";

function RevealItem({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
  return <div ref={ref}>{children}</div>;
}

export default function AIHighlightSection({ data }: { data?: AIHighlightSectionContent }) {
  if (!data || !data.visible) return null;
  const visibleHighlights = data.highlights?.filter(h => h.visible) || [];

  return (
    <section
      className="section"
      style={{ background: "transparent", position: "relative", overflow: "hidden" }}
    >
      {/* Right orb */}
      <div aria-hidden style={{
        position: "absolute", right: "-20%", top: "40%",
        transform: "translateY(-50%)",
        width: "55vw", height: "55vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,40,217,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,26rem),1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Left copy */}
          <RevealItem>
            {data.badge && (
              <span className="pill pill-violet" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>
                {data.badge}
              </span>
            )}
            <h2 className="text-title" style={{ marginBottom: "1.25rem" }}>
              {data.headingPrefix}{" "}
              <span className="g-text">{data.headingHighlight}</span>
            </h2>
            <p style={{ color: "var(--ink-2)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "34rem", fontSize: "1.15rem" }}>
              {data.description}
            </p>
            {data.cta?.visible && (
              <div className="glass-premium" style={{ borderRadius: "var(--radius-pill)", display: "inline-block" }}>
                <Link href={data.cta.href} className="btn group" style={{
                  margin: "2px",
                  padding: "1rem 2rem",
                  fontSize: "1.1rem",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
                  border: "1px solid var(--violet-light)",
                  color: "var(--ink-0)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem"
                }}>
                  {data.cta.label} <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200 ease-out" size={18} />
                </Link>
              </div>
            )}
          </RevealItem>

          {/* Right grid */}
          {visibleHighlights.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))", gap: "2.5rem" }}>
              {visibleHighlights.map((h, i) => (
                <RevealItem key={h.id} delay={i * 0.1}>
                  <GlowCard
                    glowColor={h.color}
                    style={{ padding: "3rem 2.5rem", height: "100%", position: "relative" }}
                  >
                    <div
                      style={{
                        width: 56, height: 56,
                        borderRadius: "16px",
                        background: `${h.color}12`,
                        color: h.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginBottom: "1.5rem",
                      }}
                    >
                      <DynamicIcon name={h.icon} size={28} />
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1.25rem",
                        color: "var(--ink-0)",
                        marginBottom: "0.5rem",
                      }}>
                        {h.title}
                      </div>
                      <div style={{ fontSize: "1.05rem", color: "var(--ink-3)", lineHeight: 1.65 }}>{h.desc}</div>
                    </div>
                  </GlowCard>
                </RevealItem>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
