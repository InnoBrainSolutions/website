import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Cloud Infrastructure, DevOps & Kubernetes | InnoBrain Solutions",
  description:
    "Scalable AWS/Azure cloud-native architecture, Docker & Kubernetes orchestration, CI/CD automation pipelines, and infrastructure-as-code.",
  alternates: {
    canonical: "https://innobrain.in/solutions/cloud",
  },
  keywords: [
    "Cloud Architecture AWS Azure",
    "Kubernetes Orchestration",
    "DevOps Automation Pipelines",
    "Cloud Migration Services Indore",
    "InnoBrain Cloud Solutions",
  ],
  openGraph: {
    title: "Cloud Infrastructure, DevOps & Kubernetes | InnoBrain",
    description:
      "Scalable AWS/Azure cloud-native architecture, Docker & Kubernetes orchestration, and CI/CD automation pipelines.",
    url: "https://innobrain.in/solutions/cloud",
  },
};

export default function CloudSolutionsPage() {
  return (
    <ComingSoonPage
      category="CLOUD & DEVOPS"
      title="AWS, Azure, Docker & Kubernetes Engineering"
      description="Scalable cloud-native architecture, CI/CD automation pipelines, and infrastructure-as-code engineered for zero downtime."
      expectedLaunch="Q3 2026"
    />
  );
}
