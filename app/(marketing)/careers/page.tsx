import type { Metadata } from "next";
import CareersPageClient from "./CareersPageClient";
import { getPageContent } from "@/lib/content";
import { CareersPageContent } from "@/lib/types/content";

export const metadata: Metadata = {
  title: "Open Roles — Shape the Future of Technology",
  description: "Browse open engineering, design, and AI roles at CRE Innovations in Delhi, India. iOS, Android, ML Engineer, UI/UX Designer, and more.",
};

export default async function CareersPage() {
  const content = await getPageContent<CareersPageContent>("careers");
  return <CareersPageClient data={content} />;
}
