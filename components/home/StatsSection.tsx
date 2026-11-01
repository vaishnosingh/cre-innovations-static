"use client";

import { useEffect, useRef, useState } from "react";
import { StatsSectionContent, StatCardContent } from "@/lib/types/content";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ── Intersection-observer reveal ── */
function useRevealRef(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`;
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      },
      { threshold: 0.1, rootMargin: "-10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── Count-up animation ── */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        const dur = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          setCount(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   FEATURED CARD — large, left-aligned, with detail text + CTA
   Used for the flagship "100+ Apps" stat
   ───────────────────────────────────────────────────────────────── */
function FeaturedCard({ s }: { s: StatCardContent }) {
  const ref = useRevealRef(0);
  return (
    <div ref={ref} style={{ height: "100%" }}>
      <div
        className="glass-card"
        style={{
          height: "100%",
          padding: "clamp(2rem,4vw,3rem)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Coloured left border accent */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "4px",
            bottom: 0,
            background: `linear-gradient(180deg, ${s.color} 0%, ${s.color}33 100%)`,
            borderRadius: "var(--radius-xl) 0 0 var(--radius-xl)",
          }}
        />
        {/* Large ambient orb */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            width: "260px",
            height: "260px",
            bottom: "-60px",
            right: "-60px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${s.color}14 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div>
          {/* Label pill */}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: `${s.color}14`,
              color: s.color,
              border: `1px solid ${s.color}28`,
              borderRadius: "999px",
              padding: "0.35rem 0.9rem",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: s.color,
                display: "inline-block",
              }}
            />
            {s.desc}
          </span>

          {/* Giant number */}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(4rem,10vw,6.5rem)",
              letterSpacing: "-0.05em",
              color: s.color,
              lineHeight: 0.9,
              marginBottom: "1rem",
            }}
          >
            <Counter target={s.value} suffix={s.suffix} />
          </div>

          {/* Label */}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: "var(--ink-0)",
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
            }}
          >
            {s.label}
          </div>

          {/* Narrative detail */}
          {s.detail && (
            <p
              style={{
                fontSize: "1rem",
                color: "var(--ink-3)",
                lineHeight: 1.7,
                maxWidth: "28rem",
              }}
            >
              {s.detail}
            </p>
          )}
        </div>

        <Link
          href="/careers"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 700,
            color: s.color,
            textDecoration: "none",
            letterSpacing: "0.03em",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget.style.gap = "0.75rem"))
          }
          onMouseLeave={(e) =>
            ((e.currentTarget.style.gap = "0.5rem"))
          }
        >
          See open roles <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   DETAIL CARD — compact, horizontal number + text layout
   Used for the 3 supporting stats
   ───────────────────────────────────────────────────────────────── */
function DetailCard({ s, i }: { s: StatCardContent; i: number }) {
  const ref = useRevealRef(i * 0.1 + 0.1);
  return (
    <div ref={ref} style={{ height: "100%" }}>
      <div
        className="glass-card"
        style={{
          height: "100%",
          padding: "1.75rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top accent bar */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: `linear-gradient(90deg, ${s.color} 0%, transparent 70%)`,
          }}
        />
        {/* Ambient orb */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            width: "140px",
            height: "140px",
            top: "-40px",
            right: "-30px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${s.color}10 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Number */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2.25rem,4vw,3rem)",
            letterSpacing: "-0.045em",
            color: s.color,
            lineHeight: 1,
          }}
        >
          <Counter target={s.value} suffix={s.suffix} />
        </div>

        {/* Label + desc row */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.975rem",
              color: "var(--ink-1)",
              marginBottom: "0.25rem",
            }}
          >
            {s.label}
          </div>
          <div
            style={{
              fontSize: "0.8125rem",
              color: "var(--ink-4)",
              letterSpacing: "0.04em",
              fontWeight: 500,
            }}
          >
            {s.desc}
          </div>
        </div>

        {/* Narrative detail */}
        {s.detail && (
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--ink-3)",
              lineHeight: 1.65,
              marginTop: "0.25rem",
              borderTop: "1px solid var(--border-warm)",
              paddingTop: "0.75rem",
            }}
          >
            {s.detail}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   SECTION EXPORT
   ───────────────────────────────────────────────────────────────── */
export default function StatsSection({ data }: { data?: StatsSectionContent }) {
  const headerRef = useRevealRef(0);

  if (!data || !data.visible) return null;

  const visibleCards = data.cards?.filter((c) => c.visible) || [];
  const [featured, ...rest] = visibleCards;

  return (
    <section
      className="section"
      style={{ background: "transparent", position: "relative", overflow: "hidden" }}
    >
      {/* Ambient bg orb */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: "80vw",
          height: "55vw",
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(109,40,217,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          {data.badge && (
            <span
              className="pill pill-violet"
              style={{ marginBottom: "1.25rem", display: "inline-flex" }}
            >
              {data.badge}
            </span>
          )}
          <h2 className="text-title" style={{ marginBottom: "1rem" }}>
            {data.headingPrefix}{" "}
            <span className="g-text">{data.headingHighlight}</span>
          </h2>
          <p className="text-lead" style={{ maxWidth: "36rem", margin: "0 auto" }}>
            {data.description}
          </p>
        </div>

        {/* Bento grid: featured left (spans 2 rows), 3 detail cards right */}
        {visibleCards.length > 0 && (
          <div
            className="stats-bento"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "auto auto auto",
              gap: "1.5rem",
            }}
          >
            {/* Featured card — spans full left column height */}
            {featured && (
              <div style={{ gridRow: "1 / span 3", gridColumn: "1" }}>
                <FeaturedCard s={featured} />
              </div>
            )}

            {/* Three detail cards stacked on the right */}
            {rest.map((s, i) => (
              <div key={s.id} style={{ gridColumn: "2" }}>
                <DetailCard s={s} i={i} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 850px) {
          .stats-bento {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .stats-bento > div {
            grid-row: auto !important;
            grid-column: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
