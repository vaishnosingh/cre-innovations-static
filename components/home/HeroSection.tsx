"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroContent } from "@/lib/types/content";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection({ data }: { data?: HeroContent }) {
  const rootRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* Parallax orbs on mouse move — desktop only */
  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
    const root = rootRef.current;
    if (!root) return;
    const orbs = root.querySelectorAll<HTMLElement>("[data-orb]");
    let rAF = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;
        orbs.forEach((orb, i) => {
          const depth = (i + 1) * 14;
          orb.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
        });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rAF); };
  }, []);

  if (!data || !data.visible) return null;

  const visibleStats = data.stats?.filter(s => s.visible) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 120, damping: 20 }
    },
  };

  return (
    <section
      id="hero"
      ref={rootRef}
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* ── Warm ambient orbs ── */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div
          data-orb="1"
          style={{
            position: "absolute",
            width: "65vw", height: "65vw",
            top: "-25%", left: "-20%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(109,40,217,0.18) 0%, rgba(109,40,217,0.06) 40%, transparent 70%)",
            filter: "blur(60px)",
            WebkitFilter: "blur(60px)",
            animation: "orb-drift-1 28s ease infinite alternate",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div
          data-orb="2"
          style={{
            position: "absolute",
            width: "50vw", height: "50vw",
            top: "10%", right: "-18%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(8,145,178,0.15) 0%, rgba(8,145,178,0.04) 40%, transparent 70%)",
            filter: "blur(60px)",
            WebkitFilter: "blur(60px)",
            animation: "orb-drift-2 34s ease infinite alternate",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
        <div
          data-orb="3"
          style={{
            position: "absolute",
            width: "35vw", height: "35vw",
            bottom: "0%", left: "28%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, rgba(245,158,11,0.03) 40%, transparent 70%)",
            filter: "blur(60px)",
            WebkitFilter: "blur(60px)",
            animation: "orb-drift-3 22s ease infinite alternate",
            transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        {/* Warm paper grain texture */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: `
              radial-gradient(1px 1px at 20% 30%, rgba(60,45,25,0.08) 0%, transparent 0%),
              radial-gradient(1px 1px at 60% 70%, rgba(60,45,25,0.06) 0%, transparent 0%),
              radial-gradient(1px 1px at 80% 20%, rgba(60,45,25,0.07) 0%, transparent 0%)
            `,
            backgroundSize: "32px 32px, 48px 48px, 24px 24px",
            opacity: 0.4,
          }}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "78rem",
          margin: "0 auto",
          padding: "clamp(8rem,16vw,13rem) clamp(1.5rem,5vw,3rem) clamp(5rem,9vw,8rem)",
          width: "100%",
          textAlign: "center",
          opacity: opacityFade,
        }}
      >
        {/* Badge */}
        {data.badge && (
          <motion.div variants={itemVariants} style={{ marginBottom: "2.25rem" }}>
            <span
              className="pill pill-warm hover:scale-105 transition-transform cursor-default"
              style={{
                background: "rgba(180,165,140,0.15)",
                borderColor: "var(--cream-4)",
                color: "var(--ink-2)",
                letterSpacing: "0.12em",
                fontSize: "0.625rem",
              }}
            >
              <span className="pulse-dot" />
              {data.badge}
            </span>
          </motion.div>
        )}

        {/* Main Heading — editorial split */}
        <motion.h1
          variants={itemVariants}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(0.5rem, 2vw, 1.5rem)",
            flexWrap: "wrap",
            fontFamily: "var(--font-inter)",
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 7.5vw, 8rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, var(--ink-0) 0%, var(--ink-2) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {data.titlePrefix}
          </span>
          <span
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #a855f7 50%, #f43f5e 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 12px 24px rgba(168, 85, 247, 0.45))",
            }}
          >
            {data.titleSuffix}
          </span>
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
            fontWeight: 500,
            color: "var(--ink-1)",
            letterSpacing: "-0.02em",
            marginBottom: "1.75rem",
          }}
        >
          {data.subtitle}
        </motion.h2>

        {/* Domain tags */}
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1.75rem",
            background: "linear-gradient(90deg, var(--cyan-bright) 0%, var(--violet-light) 50%, var(--rose-bright) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {data.domainTags}
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          style={{
            fontSize: "clamp(1.2rem, 2vw, 1.45rem)",
            color: "var(--ink-2)",
            lineHeight: 1.8,
            maxWidth: "40rem",
            margin: "0 auto 3rem",
            fontWeight: 400,
          }}
        >
          {data.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.875rem", marginBottom: "3.5rem" }}
        >
          {data.primaryCta?.visible && (
            <div className="glass-premium group relative overflow-hidden transition-transform duration-200 ease-out hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_rgba(139,92,246,0.6)]" style={{ borderRadius: "var(--radius-pill)", display: "inline-block" }}>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-violet-500 to-rose-500 opacity-90 group-hover:opacity-100 transition-opacity duration-200 ease-out" />
              <div className="absolute -inset-full animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(255,255,255,0.5)_0%,transparent_50%,rgba(255,255,255,0.5)_100%)] opacity-40 mix-blend-overlay" />
              <Link href={data.primaryCta.href} className="btn relative z-10 flex items-center justify-center gap-2" id="hero-cta-primary" style={{
                margin: "1px",
                padding: "1.1rem 3rem",
                borderRadius: "var(--radius-pill)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#ffffff",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontSize: "0.95rem",
                boxShadow: "inset 0 1px 2px rgba(255,255,255,0.5)",
              }}>
                <span className="drop-shadow-lg">{data.primaryCta.label}</span> <ArrowRight className="group-hover:translate-x-1.5 transition-transform duration-200 ease-out drop-shadow-lg" size={18} />
              </Link>
            </div>
          )}
          {data.secondaryCta?.visible && (
            <div className="group relative overflow-hidden transition-transform duration-200 ease-out hover:scale-105 active:scale-95" style={{ borderRadius: "var(--radius-pill)", display: "inline-flex" }}>
              <Link href={data.secondaryCta.href} className="btn relative z-10 flex items-center justify-center overflow-hidden" id="hero-cta-secondary" style={{
                padding: "1rem clamp(1.25rem, 4vw, 2.75rem)",
                borderRadius: "var(--radius-pill)",
                background: "var(--surface-1)",
                border: "1px solid var(--border-warm)",
                color: "var(--ink-0)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontSize: "0.95rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
              }}>
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out" />
                <span className="relative z-10 transition-colors duration-300">{data.secondaryCta.label}</span>
              </Link>
            </div>
          )}
        </motion.div>



        {/* Stats row — editorial pill strip */}
        {visibleStats.length > 0 && (
          <motion.div variants={itemVariants} className="w-full flex justify-center mt-6">
            <div
              className="glass-premium grid grid-cols-1 md:grid-cols-3 rounded-2xl md:rounded-[2rem] overflow-hidden mx-auto"
              style={{
                maxWidth: "52rem",
                width: "100%",
              }}
            >
              {visibleStats.map(({ value, label, sub, id }, i) => (
                <div
                  key={id}
                  className={`flex flex-col justify-center items-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-300 p-8 md:p-10 text-center relative ${i < visibleStats.length - 1 ? 'border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10' : ''}`}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(2rem, 4vw, 2.75rem)",
                      letterSpacing: "-0.04em",
                      color: "var(--ink-0)",
                      lineHeight: 1.1,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--ink-4)", letterSpacing: "0.04em" }}>
                    {sub}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Scroll cue */}
      <div
        style={{
          position: "absolute",
          bottom: "2.25rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "var(--ink-4)",
          zIndex: 20
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.5rem",
            fontWeight: 700,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div style={{ animation: "scroll-bounce 2.2s ease-in-out infinite" }}>
          <ChevronDown size={15} strokeWidth={1.5} />
        </div>
      </div>

    </section>
  );
}
