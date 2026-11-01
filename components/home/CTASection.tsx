"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { CTASectionContent } from "@/lib/types/content";

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

export default function CTASection({ data }: { data?: CTASectionContent }) {
  if (!data || !data.visible) return null;
  const visibleStats = data.stats?.filter(s => s.visible) || [];

  return (
    <section
      className="section"
      style={{ background: "transparent", position: "relative", overflow: "hidden" }}
    >
      {/* Decorative orbs */}
      <div aria-hidden style={{
        position: "absolute", bottom: "-20%", right: "-15%",
        width: "50vw", height: "50vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,40,217,0.07) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "-10%", left: "-10%",
        width: "35vw", height: "35vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="container-sm" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <RevealItem>
          {data.badge && (
            <span className="pill pill-violet" style={{ marginBottom: "2rem", display: "inline-flex" }}>
              {data.badge}
            </span>
          )}
        </RevealItem>

        <RevealItem delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.75rem,7vw,4.75rem)",
              fontWeight: 900,
              letterSpacing: "-0.045em",
              lineHeight: 1.1,
              color: "var(--ink-0)",
              marginBottom: "1.5rem",
              paddingBottom: "0.1em",
            }}
          >
            {data.headingPrefix}{" "}
            <span className="g-text">{data.headingHighlight}</span>
            <br />
            <span className="g-text-warm" style={{ fontStyle: "italic", paddingRight: "0.2em" }}>{data.headingItalic}</span>
          </h2>
        </RevealItem>

        <RevealItem delay={0.2}>
          <p
            style={{
              fontSize: "clamp(1.2rem,2vw,1.4rem)",
              color: "var(--ink-2)",
              lineHeight: 1.8,
              maxWidth: "40rem",
              margin: "0 auto 4.5rem",
            }}
          >
            {data.description}
          </p>
        </RevealItem>

        <RevealItem delay={0.3}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginBottom: "5rem" }}>
            {data.primaryCta?.visible && (
              <Link href={data.primaryCta.href} className="btn btn-primary" style={{ fontSize: "1.0625rem", padding: "1rem 2.25rem" }}>
                {data.primaryCta.label} <ArrowRight size={18} />
              </Link>
            )}
            {data.secondaryCta?.visible && (
              <Link
                href={data.secondaryCta.href}
                className="btn btn-secondary"
                style={{ fontSize: "1.0625rem", padding: "1rem 2.25rem" }}
              >
                <Mail size={16} /> {data.secondaryCta.label}
              </Link>
            )}
          </div>
        </RevealItem>

        {/* Social proof strip */}
        {visibleStats.length > 0 && (
          <RevealItem delay={0.4}>
            <div
              className="stat-card glass-premium group relative grid grid-cols-1 md:grid-cols-3 rounded-2xl md:rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01))",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255,255,255,0.05)",
                padding: "0.5rem",
                overflow: "hidden",
                maxWidth: "60rem",
                margin: "0 auto",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out" />
              
              {visibleStats.map((item, i) => (
                <div key={item.id} className={`relative z-10 p-6 md:px-8 text-center ${i < visibleStats.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/10' : ''}`}>
                  <div style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 900,
                    fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                    background: "linear-gradient(135deg, var(--ink-0), var(--ink-2))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    {item.value}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "var(--violet-light)",
                    marginTop: "0.25rem",
                  }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </RevealItem>
        )}
      </div>
    </section>
  );
}
