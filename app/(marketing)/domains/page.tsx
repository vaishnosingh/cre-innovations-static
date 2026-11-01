import type { Metadata } from "next";
import DomainsPageClient from "./DomainsPageClient";
import { getPageContent } from "@/lib/content";
import { DomainsPageContent } from "@/lib/types/content";

export const metadata: Metadata = {
  title: "Domains — Android, iOS, UI/UX, Web & AI | CRE Innovations",
  description: "Explore the four domains of excellence at CRE Innovations: Android, iOS, UI/UX Creative Studio, and Web & AI Development.",
};

export default async function DomainsPage() {
  const content = await getPageContent<DomainsPageContent>("domains");
  return <DomainsPageClient data={content} />;
}
