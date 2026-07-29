import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Enterprise Software Engineering & Full-Stack Apps | InnoBrain Solutions",
  description:
    "Next.js, React, Flutter, Python, and microservices software engineering crafted for high scalability, security, and performance benchmarks.",
  alternates: {
    canonical: "https://innobrain.in/solutions/software",
  },
  keywords: [
    "Enterprise Software Engineering",
    "Full-Stack Web Development",
    "Cross-Platform Mobile Apps",
    "Microservices Architecture",
    "Software Development Indore",
    "InnoBrain Software Solutions",
  ],
  openGraph: {
    title: "Enterprise Software Engineering & Full-Stack Apps | InnoBrain",
    description:
      "Next.js, React, Flutter, Python, and microservices software engineering crafted for high scalability, security, and performance.",
    url: "https://innobrain.in/solutions/software",
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
