import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageContent } from "@/lib/content";
import { CareersPageContent } from "@/lib/types/content";
import ApplyPageClient from "./ApplyPageClient";

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
    title: `Apply — ${job.title} | CRE Innovations`,
    description: `Submit your application for the ${job.title} role at CRE Innovations, Delhi.`,
  };
}

export default async function ApplyPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getPageContent<CareersPageContent>("careers");
  const job = (content.jobs || []).find((j) => j.slug === slug && j.visible);

  if (!job) {
    notFound();
  }

  const color = content.departmentColors?.[job.department] || "var(--violet-mid)";

  return (
    <section
      style={{
        minHeight: "100dvh",
        paddingTop: "clamp(7rem,14vw,10rem)",
        paddingBottom: "clamp(4rem,8vw,6rem)",
        background: "var(--cream-0)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "70vw",
            height: "50vw",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}12 0%, transparent 65%)`,
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "42rem",
          margin: "0 auto",
          padding: "0 clamp(1.25rem,5vw,3rem)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <ApplyPageClient
          jobTitle={job.title}
          department={job.department}
          slug={job.slug}
          color={color}
          jobId={job.id}
        />
      </div>
    </section>
  );
}
