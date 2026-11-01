import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RevealProvider from "@/components/providers/RevealProvider";
import ScrollProgress from "@/components/shared/ScrollProgress";
import { getGlobalContent } from "@/lib/content";
import { NavbarContent, FooterContent } from "@/lib/types/content";
import MeshBackground from "@/components/home/MeshBackground";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const navbarContent = await getGlobalContent<NavbarContent>("navbar");
  const footerContent = await getGlobalContent<FooterContent>("footer");

  return (
    <RevealProvider>
      <MeshBackground />
      <ScrollProgress />
      <Navbar data={navbarContent} />
      <main style={{ minHeight: "100vh" }}>
        {children}
      </main>
      <Footer data={footerContent} />
    </RevealProvider>
  );
}
