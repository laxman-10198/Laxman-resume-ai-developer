import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-space", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Laxman Poddar — AI Solution Architect · AI Agents, RAG, ML & MLOps · Mobile & Full Stack",
  description:
    "Laxman Poddar — AI Solution Architect with 6+ years of core development: AI agents, RAG, AI/ML and MLOps, shipped inside mobile and web products on any stack and any database. Up to 60% lower maintenance cost and faster load times.",
  openGraph: {
    title: "Laxman Poddar — AI Solution Architect",
    description: "Complete AI-powered solutions — Android, iOS, Web, Backend & LLM integration. 6+ years, 15+ production releases.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#06141a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
