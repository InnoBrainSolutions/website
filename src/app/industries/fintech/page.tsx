import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "FinTech Cloud, Trading Systems & Fraud AI Analytics | InnoBrain Industries",
  description:
    "Sub-millisecond financial transaction processing, ML fraud detection engines, cloud banking architecture, and automated compliance.",
  alternates: {
    canonical: "https://innobrain.in/industries/fintech",
  },
  keywords: [
    "FinTech Cloud Architecture",
    "ML Fraud Detection AI",
    "High Frequency Trading Infrastructure",
    "Cloud Banking Software Indore",
    "InnoBrain FinTech",
  ],
  openGraph: {
    title: "FinTech Cloud, Trading Systems & Fraud AI Analytics | InnoBrain",
    description:
      "Sub-millisecond financial processing, ML fraud detection engines, and automated cloud banking platforms.",
    url: "https://innobrain.in/industries/fintech",
  },
};

export default function FinTechIndustryPage() {
  return (
    <ComingSoonPage
      category="FINTECH & BANKING"
      title="High-Frequency Trading & Fraud Analytics"
      description="Sub-millisecond financial processing, ML fraud detection engines, and automated cloud banking platforms."
      expectedLaunch="Q3 2026"
    />
  );
}
