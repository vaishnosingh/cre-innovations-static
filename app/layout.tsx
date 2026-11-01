import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/shared/ScrollToTop";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: {
    default: "Careers at CRE Innovations — Build the Future With AI",
    template: "%s | CRE Innovations",
  },
  description:
    "Join CRE Innovations — 13+ years crafting extraordinary iOS, Android, Web, and AI-powered applications. Hiring engineers, designers, and AI specialists.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://careers.creinnovations.in"),
  openGraph: {
    title: "Careers at CRE Innovations",
    description: "Join CRE Innovations — 13+ years crafting extraordinary iOS, Android, Web, and AI-powered applications.",
    url: "https://careers.creinnovations.in",
    siteName: "CRE Innovations",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at CRE Innovations",
    description: "Join CRE Innovations — 13+ years crafting extraordinary iOS, Android, Web, and AI-powered applications.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="relative antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ScrollToTop />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "var(--cream-0)",
                color: "var(--ink-1)",
                border: "1px solid var(--cream-3)",
                borderRadius: "14px",
                fontSize: "14px",
                backdropFilter: "blur(16px)",
                fontFamily: "var(--font-display, system-ui)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              },
              success: { iconTheme: { primary: "#7c3aed", secondary: "#fff" } },
              error: { iconTheme: { primary: "#f43f5e", secondary: "#fff" } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
