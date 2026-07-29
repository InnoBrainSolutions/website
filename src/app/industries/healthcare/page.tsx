import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Healthcare AI, Telehealth & HIPAA Compliant Software | InnoBrain Industries",
  description:
    "Computer vision pathology analysis, HIPAA-compliant patient management, medical record automation, and enterprise healthcare AI solutions.",
  alternates: {
    canonical: "https://innobrain.in/industries/healthcare",
  },
  keywords: [
    "Healthcare AI Solutions",
    "HIPAA Compliant Software Development",
    "AI Pathology Computer Vision",
    "Telehealth Platform Architecture",
    "InnoBrain Healthcare",
  ],
  openGraph: {
    title: "Healthcare AI, Telehealth & HIPAA Systems | InnoBrain",
    description:
      "Computer vision pathology analysis, HIPAA-compliant patient management, and AI medical record automation.",
    url: "https://innobrain.in/industries/healthcare",
  },
};

export default function HealthcareIndustryPage() {
  return (
    <ComingSoonPage
      category="HEALTHCARE"
      title="AI Diagnostics, Telehealth & HIPAA Systems"
      description="Computer vision pathology analysis, HIPAA-compliant patient management, and AI medical record automation."
      expectedLaunch="Q3 2026"
    />
  );
}
