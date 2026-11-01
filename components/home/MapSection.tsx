"use client";

import { useEffect, useRef } from "react";
import { MapPin, Users } from "lucide-react";
import TechMap from "@/components/shared/TechMap";
import { MapSectionContent } from "@/lib/types/content";

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

export default function MapSection({ data }: { data?: MapSectionContent }) {
  if (!data || !data.visible) return null;

  return (
    <section className="section" style={{ background: "transparent", position: "relative" }}>
      {/* Decorative Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container relative z-10">
        <RevealItem style={{ textAlign: "center", marginBottom: "4rem" } as React.CSSProperties}>
          {data.badge && (
            <span className="pill pill-cyan hover:scale-105 transition-transform" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>{data.badge}</span>
          )}
          <h2 className="text-title" style={{ marginBottom: "1.25rem", color: "var(--ink-0)" }}>
            Our <span className="g-text" style={{ backgroundImage: "var(--g-brand)" }}>Location</span>
          </h2>
          <p className="text-lead" style={{ color: "var(--ink-2)", maxWidth: "42rem", margin: "0 auto" }}>
            Visit our headquarters. We are always excited to meet new talent and partners.
          </p>
        </RevealItem>

        <RevealItem delay={0.1}>
          <div className="w-full h-[600px] rounded-3xl overflow-hidden glass shadow-2xl border border-white/60 relative group">
            {/* Hover overlay glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out pointer-events-none z-10" />
            
            <iframe
              src="https://maps.google.com/maps?q=28.628907,77.0817772&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="relative z-0 filter grayscale-[20%] contrast-[1.1]"
            ></iframe>
          </div>
        </RevealItem>
      </div>
    </section>
  );
}
