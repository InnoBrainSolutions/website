import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Zero-Trust Cybersecurity & Penetration Testing | InnoBrain Solutions",
  description:
    "Enterprise cybersecurity engineering, zero-trust architecture, continuous vulnerability auditing, SOC2 compliance, and threat intelligence.",
  alternates: {
    canonical: "https://innobrain.in/solutions/cybersecurity",
  },
  keywords: [
    "Enterprise Cybersecurity",
    "Zero-Trust Security Architecture",
    "Penetration Testing Indore",
    "SOC2 Compliance Auditing",
    "InnoBrain Cybersecurity",
  ],
  openGraph: {
    title: "Zero-Trust Cybersecurity & Penetration Testing | InnoBrain",
    description:
      "Enterprise cybersecurity engineering, zero-trust architecture, continuous vulnerability auditing, and SOC2 compliance.",
    url: "https://innobrain.in/solutions/cybersecurity",
  },
};

export default function CybersecurityPage() {
  return (
    <ComingSoonPage
      category="CYBER SECURITY"
      title="Zero-Trust Architecture & Threat Intelligence"
      description="Penetration testing, continuous security auditing, SOC2 compliance, and zero-trust identity architecture."
      expectedLaunch="Q3 2026"
    />
  );
}
