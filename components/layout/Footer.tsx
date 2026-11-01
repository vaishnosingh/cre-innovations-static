"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { FooterContent } from "@/lib/types/content";
import { DynamicIcon } from "@/components/shared/DynamicIcon";
import { SocialIcon } from "@/components/shared/SocialIcon";
import GlowCard from "@/components/shared/GlowCard";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        fontSize: "0.9rem",
        color: "var(--ink-3)",
        textDecoration: "none",
        display: "inline-block",
        transition: "color 0.2s ease",
        fontWeight: 450,
        lineHeight: 1,
      }}
      onMouseEnter={e => (e.currentTarget.style.color = "var(--ink-0)")}
      onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-3)")}
    >
      {children}
    </a>
  );
}

export default function Footer({ data }: { data: FooterContent }) {
  if (!data) return null;

  const visibleCompanyLinks = data.companyLinks?.filter(l => l.visible) || [];
  const visibleCareersLinks = data.careersLinks?.filter(l => l.visible) || [];
  const visibleBottomLinks = data.bottomLinks?.filter(l => l.visible) || [];
  const visibleSocials = data.brand?.socials?.filter(s => s.visible) || [];

  return (
    <footer
      style={{
        background: "transparent",
        borderTop: "1px solid var(--divider)",
        paddingTop: "5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top violet accent line */}
      <div aria-hidden style={{
        position: "absolute", top: 0,
        left: "20%", right: "20%",
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(109,40,217,0.3), transparent)",
      }} />
      {/* Background orb */}
      <div aria-hidden style={{
        position: "absolute", bottom: "-30%", right: "-20%",
        width: "60vw", height: "60vw",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(109,40,217,0.04) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: "80rem", margin: "0 auto",
        padding: "0 clamp(1.25rem,5vw,3rem)",
        position: "relative", zIndex: 1,
      }}>

        {/* Pre-footer CTA */}
        {data.preFooter?.visible && (
          <GlowCard
            style={{
              padding: "clamp(2rem,4vw,3rem) clamp(1.5rem,4vw,3rem)",
              marginBottom: "5rem",
            }}
          >
            <div style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2.5rem",
            }}>
              <div>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(1.375rem,3vw,2.125rem)",
                letterSpacing: "-0.035em",
                color: "var(--ink-0)",
                marginBottom: "0.5rem",
                lineHeight: 1.15,
              }}>
                {data.preFooter.heading}{" "}
                <span className="g-text">{data.preFooter.highlightWord}</span>
              </h2>
              <p style={{ color: "var(--ink-3)", fontSize: "0.9375rem", margin: 0, lineHeight: 1.6 }}>
                {data.preFooter.description}
              </p>
            </div>
            {data.preFooter.cta?.visible && (
              <Link href={data.preFooter.cta.href} className="btn btn-primary" style={{ flexShrink: 0 }}>
                {data.preFooter.cta.label} <ArrowRight size={16} />
              </Link>
            )}
            </div>
          </GlowCard>
        )}

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
            gap: "3rem",
            marginBottom: "4rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", marginBottom: "1.25rem" }}>
              <div style={{ position: "relative", width: "180px", height: "42px" }}>
                <Image 
                  src="/logo.png" 
                  alt="CRE Innovations Logo"
                  fill
                  style={{ 
                    objectFit: "contain", 
                    objectPosition: "left center",
                    filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.2)) contrast(1.1)",
                    transition: "filter 0.3s ease"
                  }}
                />
              </div>
            </Link>
            <p style={{ color: "var(--ink-3)", fontSize: "0.875rem", lineHeight: 1.8, maxWidth: "22rem", marginBottom: "1.5rem" }}>
              {data.brand?.description}
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {visibleSocials.map(s => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  style={{
                    width: 34, height: 34,
                    borderRadius: "9px",
                    background: "var(--cream-2)",
                    border: "1px solid var(--divider)",
                    color: "var(--ink-2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    textDecoration: "none",
                    fontSize: "0.75rem", fontWeight: 700,
                    fontFamily: "var(--font-display)",
                    transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(109,40,217,0.08)";
                    el.style.borderColor = "rgba(109,40,217,0.2)";
                    el.style.color = "#7c3aed";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "var(--cream-2)";
                    el.style.borderColor = "var(--divider)";
                    el.style.color = "var(--ink-2)";
                    el.style.transform = "none";
                  }}
                >
                  <SocialIcon name={s.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.75rem", color: "var(--ink-0)", marginBottom: "1.25rem", letterSpacing: "0.07em", textTransform: "uppercase" }}>
              Company
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {visibleCompanyLinks.map(l => <li key={l.id}><FooterLink href={l.href}>{l.label}</FooterLink></li>)}
            </ul>
          </div>

          {/* Careers */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.75rem", color: "var(--ink-0)", marginBottom: "1.25rem", letterSpacing: "0.07em", textTransform: "uppercase" }}>
              Careers
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {visibleCareersLinks.map(l => <li key={l.id}><FooterLink href={l.href}>{l.label}</FooterLink></li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.75rem", color: "var(--ink-0)", marginBottom: "1.25rem", letterSpacing: "0.07em", textTransform: "uppercase" }}>
              Get in Touch
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <li>
                <a href={`mailto:${data.contact?.email}`} style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none", color: "var(--ink-3)", fontSize: "0.875rem", transition: "color 0.18s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--violet-mid)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-3)")}>
                  <Mail size={14} style={{ flexShrink: 0 }} /> {data.contact?.email}
                </a>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", color: "var(--ink-3)", fontSize: "0.875rem" }}>
                  <MapPin size={14} style={{ marginTop: "3px", flexShrink: 0 }} />
                  <span>{data.contact?.address}</span>
                </div>
              </li>
              <li>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", color: "var(--ink-3)", fontSize: "0.875rem" }}>
                  <Phone size={14} style={{ flexShrink: 0 }} /> {data.contact?.phone}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--divider)",
          paddingTop: "1.5rem", paddingBottom: "2rem",
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between", gap: "1rem",
        }}>
          <p style={{ color: "var(--ink-4)", fontSize: "0.8125rem", margin: 0 }}>
            © {new Date().getFullYear()} CRE Innovations. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {visibleBottomLinks.map(l => (
              <a key={l.id} href={l.href} style={{ color: "var(--ink-4)", fontSize: "0.8125rem", textDecoration: "none", transition: "color 0.18s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink-1)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--ink-4)")}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
