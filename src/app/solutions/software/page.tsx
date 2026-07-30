import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Custom Enterprise Software & Web Engineering | Inno Brains",
  description:
    "Scalable Next.js web applications, multi-tenant SaaS platforms, and microservices built for zero-downtime performance and high-concurrency workloads.",
  alternates: {
    canonical: "https://innobrainitservices.com/solutions/software",
  },
  keywords: [
    "Enterprise Software Engineering",
    "Full-Stack Web Development",
    "SaaS Application Architecture",
    "Next.js Development Company",
    "Microservices Architecture",
    "Inno Brains Software Solutions",
  ],
  openGraph: {
    title: "Custom Enterprise Software & Web Engineering | Inno Brains",
    description:
      "Scalable Next.js web applications, multi-tenant SaaS platforms, and microservices built for zero-downtime performance.",
    url: "https://innobrainitservices.com/solutions/software",
  },
};

export default function SoftwareSolutionsPage() {
  return (
    <ComingSoonPage
      category="SOFTWARE ENGINEERING"
      title="Full-Stack Web, Mobile & Systems Engineering"
      description="Next.js, React, Flutter, Python, and Java enterprise application engineering crafted with modern performance benchmarks."
      expectedLaunch="Q3 2026"
    />
  );
}
