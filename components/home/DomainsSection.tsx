"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DomainsSectionContent, DomainCardContent } from "@/lib/types/content";
import { DynamicIcon } from "@/components/shared/DynamicIcon";

function RevealCard({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
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

import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

function PremiumDomainCard({ d, delay }: { d: DomainCardContent; delay: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.3, delay: delay }}
      onMouseMove={handleMouseMove}
      className="group relative cursor-pointer overflow-hidden rounded-[var(--radius-xl)] backdrop-blur-xl"
      style={{
        background: "var(--surface-1)",
        border: "1px solid var(--card-border)",
        boxShadow: `0 10px 30px ${d.color}18, var(--card-shadow)`,
        transition: "background 0.5s ease, border-color 0.5s ease",
      }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* Vercel-style Mouse Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-200 ease-out group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${d.color}25,
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Decorative mesh/dots overlay for extra tech feel */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${d.color} 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      <div style={{ padding: "2.5rem 2rem", position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        {/* Vibrant Solid Icon Box */}
        <div 
          className="w-[4.5rem] h-[4.5rem] rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200 ease-out relative"
          style={{
            background: `linear-gradient(135deg, ${d.color}, ${d.color}dd)`,
            boxShadow: `0 12px 24px ${d.color}40`,
            color: "#fff",
            marginBottom: "2.5rem"
          }}
        >
          <DynamicIcon name={d.icon} size={36} color="#fff" strokeWidth={2} />
        </div>
        
        <h3 style={{ 
          fontFamily: "var(--font-display)", 
          fontWeight: 800, 
          fontSize: "1.75rem", 
          color: "var(--ink-0)", 
          marginBottom: "1.25rem", 
          letterSpacing: "-0.02em",
          textAlign: "center"
        }}>
          {d.title}
        </h3>
        
        <p style={{ color: "var(--ink-2)", lineHeight: 1.8, marginBottom: "2rem", fontSize: "1.1rem", textAlign: "center" }}>
          {d.desc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.6rem" }}>
          {d.tags.map(tag => (
            <span key={tag} className="transition-colors" style={{
              padding: "0.5rem 1rem",
              background: `${d.color}15`,
              border: `1px solid ${d.color}30`,
              borderRadius: "var(--radius-pill)",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: d.color,
              fontFamily: "var(--font-display)",
              letterSpacing: "0.02em",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function DomainsSection({ data }: { data?: DomainsSectionContent }) {
  if (!data || !data.visible) return null;
  const visibleCards = data.cards?.filter(c => c.visible) || [];

  return (
    <section
      className="section"
      style={{ background: "transparent", position: "relative", overflow: "hidden" }}
    >
      {/* Ambient orb */}
      <div aria-hidden style={{
        position: "absolute", left: "-15%", top: "20%",
        width: "50vw", height: "50vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,40,217,0.05) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <RevealCard style={{ textAlign: "center", marginBottom: "4.5rem" } as React.CSSProperties}>
          {data.badge && (
            <span className="pill pill-violet" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
              {data.badge}
            </span>
          )}
          <h2 className="text-title g-text" style={{ marginBottom: "1rem" }}>
            {data.title}
          </h2>
          <p className="text-lead" style={{ maxWidth: "38rem", margin: "0 auto" }}>
            {data.description}
          </p>
        </RevealCard>

        {/* Cards */}
        {visibleCards.length > 0 && (
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{
                gap: "2rem",
                width: "100%",
                maxWidth: "64rem",
                margin: "0 auto"
              }}
            >
              {visibleCards.map((d, i) => (
                <PremiumDomainCard key={d.id} d={d} delay={i * 0.10} />
              ))}
            </div>
          </div>
        )}

        {data.cta?.visible && (
          <RevealCard delay={0.45} style={{ textAlign: "center", marginTop: "3rem" } as React.CSSProperties}>
            <div className="glass-premium" style={{ borderRadius: "var(--radius-pill)", display: "inline-block" }}>
              <Link href={data.cta.href} className="btn group" style={{
                margin: "2px",
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
                border: "1px solid var(--violet-light)",
                color: "var(--ink-0)",
                fontWeight: 600,
              }}>
                {data.cta.label} <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </div>
          </RevealCard>
        )}
      </div>
    </section>
  );
}
