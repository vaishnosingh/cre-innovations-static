import { MetadataRoute } from "next";
import { getPageContent } from "@/lib/content";
import { CareersPageContent } from "@/lib/types/content";

export const dynamic = "force-static";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://careers.creinnovations.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/careers`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/domains`, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const content = await getPageContent<CareersPageContent>("careers");
  const jobs = (content?.jobs || []).filter((j) => j.visible);

  const jobPages = jobs.map((job) => ({
    url: `${baseUrl}/careers/${job.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const applyPages = jobs.map((job) => ({
    url: `${baseUrl}/careers/${job.slug}/apply`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...jobPages, ...applyPages];
}
