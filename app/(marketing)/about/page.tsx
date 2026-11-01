import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { getPageContent } from "@/lib/content";
import { AboutPageContent } from "@/lib/types/content";

export const metadata: Metadata = {
  title: "About — 13 Years of Crafting the Extraordinary",
  description: "CRE Innovations was founded in 2013 as a division of Mobisoft Labs. Discover our story, mission, values, and the team behind 100+ shipped applications.",
};

export default async function AboutPage() {
  const content = await getPageContent<AboutPageContent>("about");
  return <AboutPageClient data={content} />;
}
