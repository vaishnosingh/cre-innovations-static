"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import PageHero from "@/components/shared/PageHero";
import { ArrowRight } from "lucide-react";
import { AboutPageContent } from "@/lib/types/content";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import GlowCard from "@/components/shared/GlowCard";

import { motion } from "framer-motion";

function RevealItem({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10% 0px -10% 0px", amount: 0.1 }}
      transition={{
        opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
        y: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }
      }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPageClient({ data }: { data?: AboutPageContent }) {
  if (!data) return null;

  return (
    <>
      {data.hero?.visible && (
        <PageHero
          badge={data.hero.badge}
          title={data.hero.title}
          highlightWord={data.hero.highlightWord}
          subtitle={data.hero.subtitle}
        />
      )}

      {/* Story */}
      {data.story?.visible && (
        <section className="section" style={{ background: "transparent" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))",
                gap: "4rem",
                alignItems: "center",
              }}
            >
              <RevealItem>
                <h2 className="text-title" style={{ marginBottom: "1.25rem" }}>
                  {data.story.headingPrefix}{" "}
                  <span className="g-text">{data.story.headingHighlight}</span>
                </h2>
                
                {data.story.paragraphs?.filter(p => p.visible).map((p) => (
                  <p key={p.id} style={{ color: "var(--t3)", lineHeight: 1.8, marginBottom: "1rem" }}>
                    {p.text}
                  </p>
                ))}

                {data.story.cta?.visible && (
                  <Link href={data.story.cta.href} className="btn btn-primary" style={{ marginTop: "1rem" }}>
                    {data.story.cta.label} <ArrowRight size={17} />
                  </Link>
                )}
              </RevealItem>

              <RevealItem delay={0.15}>
                {data.story.stats?.length > 0 && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {data.story.stats.filter(s => s.visible).map(s => (
                      <GlowCard
                        key={s.id}
                        glowColor={s.color}
                        style={{ padding: "1.75rem", textAlign: "center", height: "100%" }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 900,
                            fontSize: "2.25rem",
                            letterSpacing: "-0.04em",
                            color: s.color,
                            lineHeight: 1,
                            marginBottom: "0.5rem",
                          }}
                        >
                          {s.n}
                        </div>
                        <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--t3)" }}>{s.label}</div>
                      </GlowCard>
                    ))}
                  </div>
                )}
              </RevealItem>
            </div>
          </div>
        </section>
      )}

      {/* Mission & Vision */}
      {data.purpose?.visible && (
        <section className="section" style={{ background: "transparent" }}>
          <div className="container">
            <RevealItem style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              {data.purpose.badge && (
                <span className="pill pill-violet" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>{data.purpose.badge}</span>
              )}
              <h2 className="text-title">{data.purpose.title}</h2>
            </RevealItem>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))", gap: "1.5rem" }}>
              {data.purpose.items?.filter(item => item.visible).map((item, i) => (
                <RevealItem key={item.id} delay={0}>
                  <GlowCard style={{ padding: "2.5rem", height: "100%" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "1.25rem", lineHeight: 1 }}>{item.icon}</div>
                    <span className={`pill ${item.pill}`} style={{ marginBottom: "1rem", display: "inline-flex" }}>{item.title}</span>
                    <p style={{ color: "var(--t3)", lineHeight: 1.8, fontSize: "1rem", margin: 0 }}>{item.text}</p>
                  </GlowCard>
                </RevealItem>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline */}
      {data.timeline?.visible && (
        <section className="section" style={{ background: "transparent" }}>
          <div className="container-sm">
            <RevealItem style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              {data.timeline.badge && (
                <span className="pill pill-cyan" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>{data.timeline.badge}</span>
              )}
              <h2 className="text-title">{data.timeline.title}</h2>
            </RevealItem>

            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              <div style={{
                position: "absolute",
                left: "2.25rem",
                top: 0, bottom: 0,
                width: "2px",
                background: "linear-gradient(to bottom, rgba(124,58,237,0.3), rgba(6,182,212,0.3))",
                borderRadius: "2px",
              }} />

              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {data.timeline.events?.filter(item => item.visible).map((item, i) => (
                  <RevealItem key={item.id} delay={0} style={{ paddingLeft: "5.5rem", position: "relative" }}>
                    {/* Dot */}
                    <div style={{
                      position: "absolute",
                      left: "1.5rem",
                      top: "1.5rem",
                      width: "16px", height: "16px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                      boxShadow: "0 0 0 4px rgba(255,255,255,0.9), 0 0 0 6px rgba(124,58,237,0.15)",
                      transform: "translateX(-50%)",
                    }} />

                    <div className="glass-card" style={{ padding: "1.5rem 1.75rem", background: "var(--surface-0)", border: "1px solid var(--border-warm)", borderRadius: "var(--radius-2xl)", boxShadow: "var(--card-shadow)" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 800,
                          fontSize: "1.125rem",
                          background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          display: "block",
                          marginBottom: "0.375rem",
                        }}
                      >
                        {item.year}
                      </span>
                      <p style={{ color: "var(--t2)", margin: 0, lineHeight: 1.65, fontSize: "0.9375rem" }}>{item.event}</p>
                    </div>
                  </RevealItem>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Values */}
      {data.values?.visible && (
        <section className="section" style={{ background: "transparent" }}>
          <div className="container">
            <RevealItem style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              {data.values.badge && (
                <span className="pill pill-amber" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>{data.values.badge}</span>
              )}
              <h2 className="text-title">{data.values.title}</h2>
            </RevealItem>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 22rem), 1fr))", gap: "1.25rem" }}>
              {data.values.items?.filter(v => v.visible).map((v, i) => (
                <RevealItem key={v.id} delay={0}>
                  <GlowCard glowColor={v.color} style={{ padding: "2.5rem 2rem", height: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <div
                      style={{
                        fontSize: "2rem",
                        width: 64, height: 64,
                        borderRadius: "16px",
                        background: `${v.color}12`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        lineHeight: 1,
                        marginBottom: "1.75rem",
                      }}
                    >
                      {v.icon}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.35rem", color: "var(--ink-0)", margin: 0 }}>
                        {v.title}
                      </h3>
                      <p style={{ color: "var(--ink-2)", fontSize: "1.05rem", lineHeight: 1.75, margin: 0 }}>{v.desc}</p>
                    </div>
                  </GlowCard>
                </RevealItem>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
