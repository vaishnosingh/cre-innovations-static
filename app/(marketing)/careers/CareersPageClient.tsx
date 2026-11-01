"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import { CareersPageContent, JobContent } from "@/lib/types/content";
import GlowCard from "@/components/shared/GlowCard";

function JobCard({ job, index, color }: { job: JobContent; index: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.05}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.05}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity = "1"; el.style.transform = "none"; }));
  }, [index]);

  return (
    <div ref={ref} className="h-full group">
      <Link href={`/careers/${job.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
        <div 
          className="glass-card"
          style={{
            padding: "2.5rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
            position: "relative",
          }}
        >
          {/* Subtle colored shadow inside */}
          <div style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            background: `radial-gradient(120% 100% at 50% 0%, ${color}12 0%, transparent 60%)`,
            pointerEvents: "none",
            borderRadius: "inherit",
          }} />

          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: `${color}15`,
                color: color,
                border: `1px solid ${color}30`,
                fontSize: "0.8125rem",
                padding: "0.5rem 1rem",
                borderRadius: "100px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase"
              }}
            >
              {job.department.replace("-", " ")}
            </span>
            <span style={{ fontSize: "0.875rem", color: "var(--ink-4)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 0 4px rgba(16, 185, 129, 0.15)" }} />
              Actively Hiring
            </span>
          </div>

          <div style={{ position: "relative" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.65rem", color: "var(--ink-0)", marginBottom: "1rem", letterSpacing: "-0.03em", lineHeight: 1.2 }}>
              {job.title}
            </h3>
            <p style={{ color: "var(--ink-2)", fontSize: "1.05rem", lineHeight: 1.65, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {job.description}
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.9375rem", color: "var(--ink-3)", position: "relative" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--surface-sm)", padding: "0.6rem 1.1rem", borderRadius: "12px", border: "1px solid var(--border-warm)" }}>
              <MapPin size={16} color={color} /> {job.location}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--surface-sm)", padding: "0.6rem 1.1rem", borderRadius: "12px", border: "1px solid var(--border-warm)" }}>
              <Briefcase size={16} color={color} /> {job.experience}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "var(--surface-sm)", padding: "0.6rem 1.1rem", borderRadius: "12px", border: "1px solid var(--border-warm)" }}>
              <Clock size={16} color={color} /> {job.type}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "1.05rem", fontWeight: 700, marginTop: "auto", paddingTop: "1rem", position: "relative" }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "var(--ink-0)",
              color: "var(--surface-0)",
              padding: "0.85rem 1.75rem",
              borderRadius: "100px",
              transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
            }} className="group-hover:translate-x-2 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] group-hover:scale-[1.02]">
              Apply Now <ArrowRight size={18} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

function CareersContent({ data }: { data: CareersPageContent }) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("all");

  useEffect(() => {
    const d = searchParams.get("department");
    if (d && data.departments?.some(x => x.id === d)) setDept(d);
  }, [searchParams, data]);

  const visibleJobs = data.jobs?.filter(j => j.visible) || [];

  const filtered = visibleJobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) &&
    (dept === "all" || j.department === dept)
  );

  return (
    <>
      {data.hero?.visible && (
        <PageHero
          badge={data.hero.badge}
          title={data.hero.title}
          highlightWord={data.hero.highlightWord}
          subtitle={data.hero.subtitle}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", alignItems: "center" }}>
            {/* Search */}
            <div style={{ position: "relative", maxWidth: "28rem", width: "100%" }}>
              <Search size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--t4)", pointerEvents: "none" }} />
                <input
                  type="text"
                  placeholder="Search roles..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.875rem 1.25rem",
                    paddingLeft: "2.75rem",
                    background: "var(--surface-0)",
                    border: "1px solid var(--border-warm)",
                    borderRadius: "999px",
                    fontSize: "0.9375rem",
                    color: "var(--ink-1)",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1px solid var(--primary-0)";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(124, 58, 237, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1px solid var(--border-warm)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Filter pills */}
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
                {data.departments?.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setDept(d.id)}
                    style={{
                      padding: "0.5rem 1.25rem",
                      borderRadius: "999px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      fontFamily: "var(--font-display)",
                      border: dept === d.id ? "1px solid transparent" : "1px solid var(--border-warm)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      background: dept === d.id
                        ? "linear-gradient(135deg, #7c3aed, #6d28d9)"
                        : "var(--surface-0)",
                      color: dept === d.id ? "#fff" : "var(--ink-2)",
                      boxShadow: dept === d.id ? "0 4px 16px rgba(124,58,237,0.35)" : "none",
                    }}
                  >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </PageHero>
      )}

      <section className="section" style={{ background: "var(--bg-soft)" }}>
        <div className="container">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ textAlign: "center", padding: "5rem 0" }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
                <p style={{ fontSize: "1.125rem", color: "var(--ink-2)", fontWeight: 500 }}>No roles match your search.</p>
                <p style={{ fontSize: "1rem", color: "var(--ink-3)" }}>Try adjusting your filters or search term.</p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 26rem), 1fr))",
                  gap: "2.5rem",
                }}
              >
                {filtered.map((job, i) => (
                  <JobCard key={job.id} job={job} index={i} color={data.departmentColors?.[job.department] || "#7c3aed"} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Open application */}
          {data.cta?.visible && (
            <div style={{ marginTop: "5rem", textAlign: "center" }}>
              <GlowCard style={{ padding: "3rem", maxWidth: "42rem", margin: "0 auto" }}>
                <p style={{ color: "var(--ink-1)", fontSize: "1.125rem", marginBottom: "2rem", fontFamily: "var(--font-display)", fontWeight: 600 }}>
                  {data.cta.text}
                </p>
                <a
                  href={data.cta.emailHref}
                  className="btn btn-primary"
                  style={{ padding: "0.875rem 2rem", fontSize: "1rem" }}
                >
                  {data.cta.emailLabel}
                </a>
              </GlowCard>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function CareersPageClient({ data }: { data?: CareersPageContent }) {
  if (!data) return null;
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 32, height: 32,
          borderRadius: "50%",
          border: "2.5px solid rgba(124,58,237,0.15)",
          borderTopColor: "#7c3aed",
          animation: "spin 0.8s linear infinite",
        }} />
      </div>
    }>
      <CareersContent data={data} />
    </Suspense>
  );
}
