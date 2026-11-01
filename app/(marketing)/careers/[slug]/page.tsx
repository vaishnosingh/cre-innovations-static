import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Briefcase, Clock, Calendar, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import GlowCard from "@/components/shared/GlowCard";
import ScrollReveal from "@/components/shared/ScrollReveal";
import MagneticButton from "@/components/shared/MagneticButton";
import TiltCard from "@/components/shared/TiltCard";
import type { Metadata } from "next";
import { getPageContent } from "@/lib/content";
import { CareersPageContent } from "@/lib/types/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const content = await getPageContent<CareersPageContent>("careers");
  return (content.jobs || []).map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getPageContent<CareersPageContent>("careers");
  const job = (content.jobs || []).find((j) => j.slug === slug);
  if (!job) return {};
  return {
    title: `${job.title} — Careers at CRE Innovations`,
    description: job.description,
  };
}

export default async function CareerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getPageContent<CareersPageContent>("careers");
  
  const job = (content.jobs || []).find((j) => j.slug === slug && j.visible);

  if (!job) {
    notFound();
  }

  const color = content.departmentColors?.[job.department] || "var(--violet-mid)";

  const metaItems = [
    { Icon: MapPin,   label: "Location",   value: job.location },
    { Icon: Briefcase,label: "Experience", value: job.experience },
    { Icon: Clock,    label: "Type",       value: job.type },
    { Icon: Calendar, label: "Posted",     value: "Recently" },
  ];

  const responsibilities = job.responsibilities || [
    "Architect and build scalable, performant applications",
    "Collaborate with cross-functional teams to define, design, and ship new features",
    "Unit-test code for robustness, including edge cases, usability, and general reliability",
    "Continuously discover, evaluate, and implement new technologies",
  ];

  const requirements = job.requirements || [
    `Experience level: ${job.experience} in a fast-paced environment`,
    "Strong understanding of modern software engineering principles",
    "Experience with version control systems (Git)",
    "Excellent problem-solving and communication skills",
  ];

  const jobPostingSchema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "CRE Innovations",
      "sameAs": "https://careers.creinnovations.in"
    },
    "employmentType": job.type.includes("Full") ? "FULL_TIME" : (job.type.includes("Contract") ? "CONTRACTOR" : "PART_TIME"),
    "datePosted": new Date().toISOString().split('T')[0],
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location,
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <PageHero
        badge={
          <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {job.department.replace("-", " ").toUpperCase()}
          </span>
        }
        title={job.title}
        subtitle={`Join our ${job.department.replace("-", " ")} team and build the extraordinary.`}
        height="half"
      >
        <Link
          href="/careers"
          className="career-back-link"
        >
          <ArrowLeft size={16} /> Back to Open Roles
        </Link>
      </PageHero>

      <section
        style={{
          padding: "var(--section-pad) 0",
          background: "var(--cream-0)",
        }}
      >
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "3rem",
            }}
            className="career-detail-grid"
          >
            {/* ── Main Content ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>

              <ScrollReveal animation="fadeUp">
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.25rem,2.5vw,1.5rem)",
                    fontWeight: 800,
                    color: "var(--ink-0)",
                    marginBottom: "1rem",
                    letterSpacing: "-0.025em",
                  }}
                >
                  About the Role
                </h2>
                <p style={{ color: "var(--ink-2)", fontSize: "1.0625rem", lineHeight: 1.8 }}>
                  {job.description}
                  {" "}At CRE Innovations, we believe in empowering our engineers to make
                  architectural decisions and take ownership of their projects from day one. You
                  will be working closely with our design and product teams to deliver exceptional
                  user experiences.
                </p>
              </ScrollReveal>

              <ScrollReveal animation="fadeUp" delay={0.1}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.25rem,2.5vw,1.5rem)",
                    fontWeight: 800,
                    color: "var(--ink-0)",
                    marginBottom: "1.5rem",
                    letterSpacing: "-0.025em",
                  }}
                >
                  What You&apos;ll Do
                </h2>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {responsibilities.map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <div style={{ marginTop: "2px", flexShrink: 0, color }}>
                        <CheckCircle2 size={18} />
                      </div>
                      <span style={{ color: "var(--ink-2)", lineHeight: 1.75 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal animation="fadeUp" delay={0.2}>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.25rem,2.5vw,1.5rem)",
                    fontWeight: 800,
                    color: "var(--ink-0)",
                    marginBottom: "1.5rem",
                    letterSpacing: "-0.025em",
                  }}
                >
                  Requirements
                </h2>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {requirements.map((req, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <div style={{ marginTop: "2px", flexShrink: 0, color }}>
                        <CheckCircle2 size={18} />
                      </div>
                      <span style={{ color: "var(--ink-2)", lineHeight: 1.75 }}>{req}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>

            {/* ── Sidebar ── */}
            <div>
              <div style={{ position: "sticky", top: "8rem" }}>
                <ScrollReveal animation="fadeLeft">
                  <GlowCard glowColor={color}>
                    <div
                      className="glass-card"
                      style={{
                        padding: "2rem",
                        border: `1px solid var(--border-warm)`,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.125rem",
                          fontWeight: 800,
                          color: "var(--ink-0)",
                          marginBottom: "1.5rem",
                          letterSpacing: "-0.025em",
                        }}
                      >
                        Role Summary
                      </h3>

                      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
                        {metaItems.map(({ Icon, label, value }) => (
                          <div key={label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <div
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: `${color}12`,
                                flexShrink: 0,
                              }}
                            >
                              <Icon size={17} style={{ color }} />
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: "0.6875rem",
                                  color: "var(--ink-4)",
                                  textTransform: "uppercase",
                                  letterSpacing: "0.1em",
                                  fontWeight: 700,
                                  fontFamily: "var(--font-display)",
                                  marginBottom: "0.2rem",
                                }}
                              >
                                {label}
                              </div>
                              <div
                                style={{
                                  color: "var(--ink-1)",
                                  fontWeight: 600,
                                  fontSize: "0.9375rem",
                                }}
                              >
                                {value}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div
                        style={{
                          paddingTop: "1.5rem",
                          borderTop: "1px solid var(--border-warm)",
                        }}
                      >
                        <Link
                          href={`/careers/${job.slug}/apply`}
                          className="btn btn-primary"
                          style={{ width: "100%", justifyContent: "center", padding: "0.875rem 1.5rem", fontSize: "0.9375rem" }}
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </GlowCard>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 1024px) {
            .career-detail-grid {
              grid-template-columns: 2fr 1fr !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}
