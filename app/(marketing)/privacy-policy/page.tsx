import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CRE Innovations",
  description: "Privacy Policy for CRE Innovations",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container" style={{ paddingTop: "8rem", paddingBottom: "8rem", minHeight: "60vh" }}>
      <h1 className="text-title" style={{ marginBottom: "2rem" }}>Privacy Policy</h1>
      <div style={{ color: "var(--ink-2)", lineHeight: 1.8 }}>
        <p>This is a dummy privacy policy page. Content will be added later.</p>
      </div>
    </div>
  );
}
