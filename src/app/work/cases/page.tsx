import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Enterprise Case Studies & Digital Transformation Impact | Inno Brains",
  description:
    "Explore how Inno Brains engineered 96% faster processing and 60% cost reductions for leaders in FinTech, Healthcare, E-Commerce, and Industry 4.0.",
  alternates: {
    canonical: "https://innobrainitservices.com/work/cases",
  },
  keywords: [
    "Enterprise Case Studies",
    "AI Transformation ROI",
    "Software Engineering Impact",
    "Healthcare AI Case Study",
    "FinTech Cloud Case Study",
    "Inno Brains Case Studies",
  ],
  openGraph: {
    title: "Enterprise Case Studies & Digital Transformation Impact | Inno Brains",
    description:
      "Explore how Inno Brains engineered 96% faster processing and 60% cost reductions for enterprise leaders.",
    url: "https://innobrainitservices.com/work/cases",
  },
};

export default function CasesPage() {
  return (
    <ComingSoonPage
      category="CASE STUDIES"
      title="Quantifiable Transformation Stories"
      description="Deep-dive reports detailing before-and-after operational metrics, speed gains, and ROI."
      expectedLaunch="Q3 2026"
    />
  );
}
