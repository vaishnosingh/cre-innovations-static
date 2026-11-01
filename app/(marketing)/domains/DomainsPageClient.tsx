"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import { DomainsPageContent } from "@/lib/types/content";
import { DynamicIcon } from "@/components/shared/DynamicIcon";

const DomainVisual = ({ id, color }: { id: string; color: string }) => {
  if (id === 'android') {
    return (
      <div className="relative w-56 h-56 flex items-center justify-center">
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-40 h-40 flex items-center justify-center rounded-[2.5rem] shadow-2xl backdrop-blur-xl border border-white/5"
          style={{ background: `linear-gradient(135deg, ${color}25, ${color}05)`, boxShadow: `inset 0 0 20px ${color}10, 0 20px 40px -10px ${color}30` }}
        >
          {/* Real Android SVG Logo */}
          <svg viewBox="0 0 24 24" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ color: "#3DDC84", fill: "currentColor" }}>
            <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0004.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592c.1158-.2018.0465-.4589-.1553-.5743-.2031-.1162-.4596-.0469-.5754.1557l-2.0322 3.5189C15.346 8.2326 13.7291 7.854 12 7.854c-1.7291 0-3.346.3786-4.9126 1.0504L5.0552 5.3857c-.1158-.2026-.3723-.2719-.5754-.1557-.2018.1154-.2711.3725-.1553.5743l1.9973 3.4592C2.6889 11.2678.3432 14.6563 0 18.761h24c-.3432-4.1047-2.6889-7.4932-6.1185-9.4396" />
          </svg>
        </motion.div>
        <div className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse" style={{ background: color }} />
      </div>
    );
  }
  
  if (id === 'ios') {
    return (
      <div className="relative w-56 h-56 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [0.95, 1.05, 0.95], y: [-5, 5, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="w-40 h-40 rounded-[2.5rem] relative z-10 flex items-center justify-center overflow-hidden border border-white/5 shadow-2xl backdrop-blur-xl"
          style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01))`, boxShadow: `inset 0 0 20px rgba(255,255,255,0.05), 0 20px 40px -10px ${color}30` }}
        >
          {/* Real Apple SVG Logo */}
          <svg viewBox="0 0 384 512" className="w-20 h-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" style={{ color: "#F5F5F7", fill: "currentColor" }}>
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
          </svg>
        </motion.div>
        <div className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse" style={{ background: color }} />
      </div>
    );
  }

  if (id === 'design') {
    return (
      <div className="relative w-56 h-56 flex items-center justify-center">
        <motion.div
          animate={{ rotate: [0, 360], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-40 h-40 rounded-[2.5rem] relative z-10 flex items-center justify-center overflow-hidden border border-white/5 shadow-2xl backdrop-blur-xl"
          style={{ background: `linear-gradient(135deg, ${color}25, ${color}05)`, boxShadow: `inset 0 0 20px ${color}10, 0 20px 40px -10px ${color}30` }}
        >
          {/* Figma Logo SVG */}
          <svg viewBox="0 0 24 24" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" style={{ color: "#F472B6", fill: "currentColor" }}>
            <path d="M12 11.5v-7A4.5 4.5 0 007.5 0C5.01 0 3 2.01 3 4.5S5.01 9 7.5 9h4.5v2.5M12 11.5h4.5a4.5 4.5 0 100-9H12v9zM12 11.5v7A4.5 4.5 0 017.5 23C5.01 23 3 20.99 3 18.5S5.01 14 7.5 14H12v-2.5zM12 11.5A4.5 4.5 0 1116.5 16C16.5 18.49 14.49 20.5 12 20.5v-9z"/>
          </svg>
        </motion.div>
        <div className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse" style={{ background: color }} />
      </div>
    );
  }

  if (id === 'web-ai') {
    return (
      <div className="relative w-56 h-56 flex items-center justify-center">
        <motion.div 
          animate={{ y: [10, -10, 10], rotate: [5, -5, 5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-40 h-40 rounded-[2.5rem] relative z-10 flex items-center justify-center overflow-hidden border border-white/5 shadow-2xl backdrop-blur-xl"
          style={{ background: `linear-gradient(135deg, ${color}25, ${color}05)`, boxShadow: `inset 0 0 20px ${color}10, 0 20px 40px -10px ${color}30` }}
        >
          {/* React / Web Node Network SVG */}
          <svg viewBox="0 0 24 24" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" style={{ color: "#22D3EE", stroke: "currentColor", fill: "none", strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round" }}>
            <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
          </svg>
        </motion.div>
        <div className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse" style={{ background: color }} />
      </div>
    );
  }

  // Fallback
  return <DynamicIcon name="Box" size={80} color={color} />;
};

export default function DomainsPageClient({ data }: { data?: DomainsPageContent }) {
  if (!data) return null;
  const visibleDomains = data.domains?.filter(d => d.visible) || [];

  return (
    <>
      {data.hero?.visible && (
        <PageHero
          badge={data.hero.badge}
          title={data.hero.title}
          highlightWord={data.hero.highlightWord}
          subtitle={data.hero.subtitle}
          height="half"
        />
      )}

      {/* Side Navigation (Desktop only) */}
      <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col gap-4">
        {visibleDomains.map((d) => (
          <a
            key={d.id}
            href={`#${d.id}`}
            className="w-3 h-3 rounded-full bg-white/20 hover:bg-white transition-colors hover:scale-150 transform"
            title={d.title}
          />
        ))}
      </div>

      <div className="relative" style={{ background: "transparent" }}>
        {visibleDomains.map((d, i) => (
          <section key={d.id} id={d.id} className="section flex items-center relative overflow-hidden" style={{ minHeight: "90vh", backgroundColor: "transparent" }}>
            <div className="absolute inset-0 opacity-10 transition-colors duration-1000" style={{ background: `radial-gradient(circle at ${i % 2 === 0 ? "30%" : "70%"} 50%, ${d.color}, transparent 60%)` }} />
            
            <div className="container relative z-10">
              <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-20`}>
                
                {/* Visual side */}
                <div className="flex-1 w-full max-w-lg">
                  <ScrollReveal animation={i % 2 === 0 ? "fadeRight" : "fadeLeft"}>
                    <motion.div 
                      className="relative aspect-square rounded-3xl border border-black/5 overflow-hidden flex flex-col items-center justify-center" 
                      style={{ background: `linear-gradient(135deg, ${d.color}15, ${d.color}05)` }}
                      animate={{ y: [-15, 15, -15] }}
                      transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {/* Orbiting dots */}
                      {[0, 1, 2].map((j) => (
                        <motion.div
                          key={j}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10 + j * 4, repeat: Infinity, ease: "linear", delay: j * 1.5 }}
                          className="absolute inset-0 border border-black/5 rounded-full"
                          style={{ margin: `${15 + j * 10}%` }}
                        >
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ background: d.color }} />
                        </motion.div>
                      ))}
                      
                      <div className="relative z-10">
                        <DomainVisual id={d.id} color={d.color} />
                      </div>
                    </motion.div>
                  </ScrollReveal>
                </div>

                {/* Content side */}
                <div className="flex-1">
                  <ScrollReveal animation={i % 2 === 0 ? "fadeLeft" : "fadeRight"}>
                    <div style={{ marginBottom: "1.5rem" }}>
                      <span className="pill" style={{ 
                        background: `${d.color}15`, 
                        color: d.color, 
                        border: `1px solid ${d.color}30`
                      }}>
                        {d.tagline}
                      </span>
                    </div>
                    
                    <h2 className="text-title" style={{ marginBottom: "1.5rem", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                      {d.title}
                    </h2>
                    
                    <p className="text-lead" style={{ marginBottom: "2.5rem" }}>
                      {d.description}
                    </p>

                    <div className="pt-2">
                      <h4 style={{ 
                        fontFamily: "var(--font-display)", 
                        fontSize: "0.875rem", 
                        fontWeight: 700, 
                        textTransform: "uppercase", 
                        letterSpacing: "0.1em",
                        color: "var(--ink-3)",
                        marginBottom: "1rem" 
                      }}>
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2.5" style={{ marginBottom: "3.5rem" }}>
                        {d.stack.map((s) => (
                          <span key={s} style={{
                            padding: "0.4rem 0.85rem",
                            background: "var(--surface-0)",
                            border: "1px solid var(--cream-4)",
                            borderRadius: "var(--radius-pill)",
                            fontSize: "0.8125rem",
                            fontWeight: 600,
                            color: "var(--ink-2)",
                            fontFamily: "var(--font-display)",
                            letterSpacing: "0.01em",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                          }}>{s}</span>
                        ))}
                      </div>
                      
                      <Link
                        href={`/careers?department=${d.careersFilter}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "0.875rem 2.25rem",
                          background: d.color,
                          color: "#fff",
                          borderRadius: "999px",
                          fontSize: "1rem",
                          fontWeight: 700,
                          textDecoration: "none",
                          fontFamily: "var(--font-display)",
                          transition: "transform 0.2s, box-shadow 0.2s",
                          boxShadow: `0 4px 14px ${d.color}40`,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px ${d.color}60`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "none";
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 14px ${d.color}40`;
                        }}
                      >
                        View Roles in This Domain
                        <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
                      </Link>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
