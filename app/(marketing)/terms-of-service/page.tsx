import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | CRE Innovations",
  description: "Terms of Service for CRE Innovations",
};

export default function TermsOfServicePage() {
  return (
    <div className="container" style={{ paddingTop: "8rem", paddingBottom: "8rem", minHeight: "60vh" }}>
      <h1 className="text-title" style={{ marginBottom: "2rem" }}>Terms of Service</h1>
      <div style={{ color: "var(--ink-2)", lineHeight: 1.8 }}>
        <p>This is a dummy terms of service page. Content will be added later.</p>
      </div>
    </div>
  );
}
