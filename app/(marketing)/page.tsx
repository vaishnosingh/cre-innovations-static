import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import DomainsSection from "@/components/home/DomainsSection";
import AIHighlightSection from "@/components/home/AIHighlightSection";
import TechStackSection from "@/components/home/TechStackSection";
import WhyJoinSection from "@/components/home/WhyJoinSection";

import MapSection from "@/components/home/MapSection";
import CTASection from "@/components/home/CTASection";
import { getPageContent } from "@/lib/content";
import { HomePageContent } from "@/lib/types/content";

export const metadata: Metadata = {
  title: "CRE Innovations — Build The Future With AI | Careers",
  description:
    "Join CRE Innovations — 13+ years, 100+ apps shipped. We're hiring iOS, Android, AI/ML, Web engineers and designers in Delhi, India.",
  keywords: [
    "CRE Innovations careers",
    "CRE Innovations jobs",
    "iOS developer jobs Delhi",
    "Android developer jobs Delhi",
    "AI/ML engineer careers",
    "Next.js react jobs India"
  ],
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const content = await getPageContent<HomePageContent>("home");

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CRE Innovations",
    "url": "https://careers.creinnovations.in",
    "logo": "https://careers.creinnovations.in/logo.png",
    "description": "13+ years crafting extraordinary iOS, Android, Web, and AI-powered applications.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressRegion": "Delhi",
      "addressCountry": "IN"
    }
  };

  return (
    <div className="home-page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <HeroSection data={content.hero} />
      <StatsSection data={content.stats} />
      <DomainsSection data={content.domains} />
      <AIHighlightSection data={content.aiHighlight} />
      <TechStackSection data={content.techStack} />
      <WhyJoinSection data={content.whyJoin} />

      <MapSection data={content.map} />
      <CTASection data={content.ctaSection} />
    </div>
  );
}
