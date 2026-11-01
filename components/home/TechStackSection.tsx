"use client";

import { useRef } from "react";
import { TechStackSectionContent } from "@/lib/types/content";
import { motion, useInView } from "framer-motion";

import GlowCard from "@/components/shared/GlowCard";

function Chip({ name, icon }: { name: string; icon: string }) {
  return (
    <GlowCard
      className="cursor-pointer"
      style={{
        margin: "1.25rem 1.5rem",
        background: "var(--chip-bg)",
        border: "1px solid var(--chip-border)",
        borderRadius: "100px",
        boxShadow: "var(--card-shadow)",
        width: "15rem",
        padding: 0,
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.25rem",
        padding: "0.85rem",
        width: "100%",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}>
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300"
          style={{ flexShrink: 0, fontSize: "1.5rem", color: "var(--ink-0)", background: "var(--chip-icon-bg)", border: "1px solid var(--card-border)" }}
        >
          <span dangerouslySetInnerHTML={{ __html: icon }} />
        </div>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.2rem",
          fontWeight: 700,
          color: "var(--ink-1)",
          letterSpacing: "-0.01em",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          {name}
        </span>
      </div>
    </GlowCard>
  );
}

export default function TechStackSection({ data }: { data?: TechStackSectionContent }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (!data || !data.visible) return null;

  const row1 = data.row1?.filter(r => r.visible) || [];
  const row2 = data.row2?.filter(r => r.visible) || [];

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
    <section className="section" style={{ background: "transparent", overflow: "hidden" }}>
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container" 
        style={{ marginBottom: "4rem" }}
      >
        <motion.div variants={itemVariants} style={{ textAlign: "center", marginBottom: "2rem" }}>
          {data.badge && (
            <span className="pill pill-cyan hover:scale-105 transition-transform" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>{data.badge}</span>
          )}
          <h2 className="text-title g-text" style={{ marginBottom: "1.25rem" }}>
            {data.headingPrefix} <span className="g-text">{data.headingHighlight}</span>
          </h2>
          <p className="text-lead" style={{ maxWidth: "42rem", margin: "0 auto", color: "var(--ink-2)" }}>
            {data.description}
          </p>
        </motion.div>
      </motion.div>

      {/* Marquee Row 1 */}
      {row1.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="marquee-wrap" 
          style={{ marginBottom: "1.5rem" }}
        >
          <div className="marquee-track">
            {[...row1, ...row1, ...row1, ...row1, ...row1].map((chip, i) => <Chip key={`${chip.id}-${i}`} name={chip.name} icon={chip.icon} />)}
          </div>
        </motion.div>
      )}
      {/* Marquee Row 2 */}
      {row2.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="marquee-wrap"
        >
          <div className="marquee-track-rev">
            {[...row2, ...row2, ...row2, ...row2, ...row2].map((chip, i) => <Chip key={`${chip.id}-${i}`} name={chip.name} icon={chip.icon} />)}
          </div>
        </motion.div>
      )}
    </section>
  );
}
