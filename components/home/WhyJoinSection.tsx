"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhyJoinSectionContent } from "@/lib/types/content";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { motion, useInView } from "framer-motion";
import GlowCard from "@/components/shared/GlowCard";

export default function WhyJoinSection({ data }: { data?: WhyJoinSectionContent }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data || !data.visible) return null;
  const visibleReasons = data.reasons?.filter(r => r.visible) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } },
  };

  return (
    <section
      className="section"
      style={{ background: "transparent", position: "relative", overflow: "hidden" }}
    >
      {/* Decorative warm orbs */}
      <div aria-hidden style={{
        position: "absolute", bottom: "-10%", left: "-10%",
        width: "40vw", height: "40vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(180,83,9,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden style={{
        position: "absolute", top: "-5%", right: "10%",
        width: "30vw", height: "30vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,40,217,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10"
      >
        <div className="flex flex-col items-center justify-center text-center w-full" style={{ marginBottom: "4rem" }}>
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
            {data.badge && (
              <span className="pill pill-rose hover:scale-105 transition-transform" style={{ marginBottom: "1.5rem", display: "inline-flex" }}>{data.badge}</span>
            )}
            <h2 className="text-title text-center w-full" style={{ marginBottom: "2.5rem" }}>
              {data.headingPrefix} <span className="g-text-warm">{data.headingHighlight}</span>
            </h2>
            <p className="text-lead text-center mx-auto w-full max-w-2xl">
              {data.description}
            </p>
          </motion.div>
        </div>

        {visibleReasons.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,24rem),1fr))",
              gap: "2.5rem",
            }}
          >
            {visibleReasons.map((r, i) => (
              <motion.div variants={itemVariants} key={r.id}>
                <GlowCard glowColor={r.color} className="h-full">
                  <div
                    style={{
                      width: 64, height: 64,
                      borderRadius: "16px",
                      background: `${r.color}12`,
                      color: r.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginBottom: "1.5rem",
                    }}
                    className="group-hover:scale-110 group-hover:rotate-3 transition-transform duration-200 ease-out"
                  >
                    <DynamicIcon name={r.icon} size={28} />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.35rem",
                      color: "var(--ink-0)",
                      marginBottom: "1.75rem",
                      letterSpacing: "-0.02em",
                    }}>
                      {r.title}
                    </h3>
                    <p style={{ color: "var(--ink-2)", fontSize: "1.05rem", lineHeight: 1.7, margin: 0 }}>
                      {r.desc}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        )}

        {data.cta?.visible && (
          <motion.div variants={itemVariants} style={{ textAlign: "center", marginTop: "4rem" } as React.CSSProperties}>
            <Link href={data.cta.href} className="btn btn-primary group">
              {data.cta.label} <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
