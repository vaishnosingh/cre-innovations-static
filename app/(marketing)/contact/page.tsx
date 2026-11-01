import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { getPageContent } from "@/lib/content";
import { ContactPageContent } from "@/lib/types/content";

export const metadata: Metadata = {
  title: "Contact — Let's Talk | CRE Innovations",
  description: "Have questions about working with us? Reach out to the CRE Innovations team at hr@creinnovations.in or use our contact form.",
};

export default async function ContactPage() {
  const content = await getPageContent<ContactPageContent>("contact");
  return <ContactPageClient data={content} />;
}
