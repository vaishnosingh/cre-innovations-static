"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NavbarContent } from "@/lib/types/content";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";

export default function Navbar({ data }: { data: NavbarContent }) {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isTouch, setIsTouch]       = useState(false);
  const pathname = usePathname();

  if (!data) return null;
  const visibleLinks = data.links?.filter((l) => l.visible) || [];

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
    const fn = () => setScrolled(window.scrollY > 52);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        style={{
          position:     "fixed",
          top:          scrolled ? "1rem" : 0,
          left:         0,
          right:        0,
          margin:       "0 auto",
          width:        scrolled ? "calc(100% - 2rem)" : "100%",
          maxWidth:     scrolled ? "85rem" : "100%",
          zIndex:       9000,
          transition:   "top 0.5s cubic-bezier(0.22,1,0.36,1), width 0.5s cubic-bezier(0.22,1,0.36,1), max-width 0.5s cubic-bezier(0.22,1,0.36,1), padding 0.5s cubic-bezier(0.22,1,0.36,1), border-radius 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease",
          padding:      scrolled ? "0.5rem 0.5rem" : "1.125rem 0",
          borderRadius: scrolled ? "1.5rem" : "0",
          background:   scrolled ? "rgba(255,255,255,0.12)" : "transparent",
          backdropFilter:       scrolled ? (isTouch ? "blur(16px) saturate(180%)" : "blur(12px) saturate(400%) contrast(160%) brightness(115%)") : "none",
          WebkitBackdropFilter: scrolled ? (isTouch ? "blur(16px) saturate(180%)" : "blur(12px) saturate(400%) contrast(160%) brightness(115%)") : "none",
          border: scrolled ? "1px solid rgba(255,255,255,0.25)" : "1px solid transparent",
          overflow: "hidden",
          boxShadow: scrolled
            ? [
                "0 8px 32px rgba(0,0,0,0.15)",
                "0  2px  8px rgba(0,0,0,0.08)",
                "inset 0  1px  0 rgba(255,255,255,0.5)",
                "inset 0 -1px  0 rgba(255,255,255,0.1)",
              ].join(", ")
            : "none",
        }}
        role="banner"
      >
        {/* Top razor highlight — light mode only */}
        <div aria-hidden="true" className="nav-light-gloss" style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 20%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 80%, transparent 100%)",
          opacity: scrolled ? 1 : 0, transition: "opacity 0.5s",
          pointerEvents: "none", zIndex: 2,
        }} />

        {/* Curved top-half highlight — light mode only */}
        <div aria-hidden="true" className="nav-light-gloss" style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "55%",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.1) 18%, rgba(255,255,255,0.0) 55%, rgba(255,255,255,0.0) 100%)",
          opacity: scrolled ? 1 : 0, transition: "opacity 0.5s",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* Diagonal gloss streak — light mode only */}
        <div aria-hidden="true" className="nav-light-gloss" style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(108deg, transparent 24%, rgba(255,255,255,0.05) 32%, rgba(255,255,255,0.5) 37%, rgba(255,255,255,1.0) 39%, rgba(255,255,255,0.5) 41%, rgba(255,255,255,0.05) 48%, transparent 56%)",
          opacity: scrolled ? 1 : 0, transition: "opacity 0.5s",
          mixBlendMode: "overlay", pointerEvents: "none", zIndex: 2,
        }} />

        {/* Bottom depth shadow */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "50%",
          background: "linear-gradient(to top, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.03) 40%, transparent 100%)",
          opacity: scrolled ? 1 : 0, transition: "opacity 0.5s",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* NAV CONTENT */}
        <div style={{
          maxWidth: "90rem", margin: "0 auto",
          padding: scrolled ? "0 0.5rem" : "0 clamp(1.25rem,5vw,3rem)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "1rem", transition: "padding 0.5s cubic-bezier(0.22,1,0.36,1)",
          position: "relative", zIndex: 10,
        }}>

          {/* LOGO */}
          <Link href="/" style={{ display:"flex", alignItems:"center", textDecoration:"none", flexShrink:0, minWidth:"clamp(140px, 40vw, 230px)" }}>
            <div style={{ position: "relative", width: "clamp(140px, 40vw, 230px)", height: "clamp(36px, 10vw, 54px)" }}>
              <Image 
                src="/logo.png" 
                alt="CRE Innovations Logo"
                fill
                style={{ 
                  objectFit: "contain", 
                  objectPosition: "left center",
                  filter: "brightness(1.1) contrast(1.6) saturate(1.2) drop-shadow(0px 4px 12px rgba(0,0,0,0.4)) drop-shadow(0px 0px 4px rgba(255,255,255,0.5))",
                  transition: "filter 0.3s ease"
                }}
                priority
              />
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav
            className="cre-desktop-nav hidden md:flex relative group/nav"
            aria-label="Main navigation"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              gap:"0.25rem",
              background: scrolled ? "rgba(255,255,255,0.45)" : "rgba(180,165,140,0.15)",
              border:     scrolled ? "1px solid rgba(255,255,255,0.9)" : "1px solid rgba(180,165,140,0.3)",
              boxShadow:  scrolled ? "inset 0 1.5px 0 rgba(255,255,255,1),0 2px 12px rgba(0,0,0,0.06)" : "none",
              borderRadius:"var(--radius-pill)", padding:"0.35rem",
              transition:"background 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease",
              backdropFilter: scrolled ? (isTouch ? "blur(12px) saturate(160%)" : "blur(10px) saturate(160%)") : "none",
              WebkitBackdropFilter: scrolled ? (isTouch ? "blur(12px) saturate(160%)" : "blur(10px) saturate(160%)") : "none",
            }}
          >
            {visibleLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  style={{
                    position:"relative", padding:"0.5rem 1.125rem",
                    borderRadius:"var(--radius-pill)",
                    fontSize:"0.875rem", fontWeight:active ? 700 : 500,
                    fontFamily:"var(--font-display)",
                    color: active ? "#fff" : scrolled ? "var(--ink-1)" : "var(--ink-2)",
                    textDecoration:"none",
                    background: active ? "linear-gradient(145deg,#7c3aed 0%,#6d28d9 100%)" : "transparent",
                    boxShadow: active ? "0 4px 15px rgba(109,40,217,0.3)" : "none",
                    transition:"color 0.2s ease-out, background 0.2s ease-out, box-shadow 0.2s ease-out",
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)";
                      (e.currentTarget as HTMLElement).style.color = "var(--ink-0)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = scrolled ? "var(--ink-1)" : "var(--ink-2)";
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA & THEME */}
          <div className="cre-desktop-cta" style={{ gap:"0.75rem", alignItems: "center" }}>
            <ThemeSwitcher />
            {data.cta?.visible && !pathname.startsWith(data.cta.href) && (
              <Link href={data.cta.href} className="btn btn-primary" style={{ padding:"0.5625rem 1.375rem", fontSize:"0.875rem" }}>
                {data.cta.label}
              </Link>
            )}
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="cre-hamburger"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            style={{
              width:38, height:38, borderRadius:"var(--radius-md)",
              background: mobileOpen ? "var(--violet-pale)" : "rgba(180,165,140,0.12)",
              border:`1px solid ${mobileOpen ? "rgba(109,40,217,0.18)" : "var(--border-warm)"}`,
              cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
              color: mobileOpen ? "var(--violet-mid)" : "var(--ink-2)",
              flexShrink:0, transition:"background 0.2s ease-out, border-color 0.2s ease-out, color 0.2s ease-out",
            }}
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        aria-hidden={!mobileOpen}
        style={{
          position:"fixed", inset:0, zIndex:8999,
          background:"var(--mobile-overlay-bg)",
          backdropFilter:"blur(10px) saturate(150%)",
          WebkitBackdropFilter:"blur(10px) saturate(150%)",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition:"opacity 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <nav aria-label="Mobile navigation" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.25rem", position:"relative", zIndex:1 }}>
          {visibleLinks.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} style={{
                fontFamily:"var(--font-display)", fontWeight:800,
                fontSize:"clamp(1.875rem,7vw,2.75rem)", letterSpacing:"-0.045em",
                textDecoration:"none",
                color: active ? "#8b5cf6" : "var(--ink-0)",
                padding:"0.4375rem 1.5rem", borderRadius:"var(--radius-lg)",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "none" : "translateY(16px)",
                transition:`opacity 0.38s cubic-bezier(0.16,1,0.3,1) ${i*0.06+0.04}s,transform 0.38s cubic-bezier(0.16,1,0.3,1) ${i*0.06+0.04}s,color 0.2s`,
              }}>{link.label}</Link>
            );
          })}
          {data.cta?.visible && !pathname.startsWith(data.cta.href) && (
            <div style={{ marginTop:"2rem", opacity:mobileOpen?1:0, transform:mobileOpen?"none":"translateY(16px)", transition:`opacity 0.38s ease ${visibleLinks.length*0.06+0.08}s,transform 0.38s ease ${visibleLinks.length*0.06+0.08}s` }}>
              <Link href={data.cta.href} className="btn btn-primary" style={{ fontSize:"1.0625rem", padding:"0.9375rem 2.75rem" }}>
                {data.cta.label}
              </Link>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
