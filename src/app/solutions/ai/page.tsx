import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Enterprise AI Development & Custom LLM Integration | InnoBrain Solutions",
  description:
    "Architecting custom generative AI models, agentic workflows, RAG pipelines, computer vision, and NLP solutions for enterprise deployments.",
  alternates: {
    canonical: "https://innobrain.in/solutions/ai",
  },
  keywords: [
    "Enterprise AI Development",
    "Custom LLM Fine-Tuning",
    "Agentic AI Workflows",
    "RAG Pipelines",
    "Artificial Intelligence Indore",
    "InnoBrain AI Solutions",
  ],
  openGraph: {
    title: "Enterprise AI Development & Custom LLM Integration | InnoBrain",
    description:
      "Architecting custom generative AI models, agentic workflows, RAG pipelines, computer vision, and NLP solutions.",
    url: "https://innobrain.in/solutions/ai",
  },
};

export default function AISolutionsPage() {
  return (
    <ComingSoonPage
      category="ARTIFICIAL INTELLIGENCE"
      title="Custom AI Models, Agents & LLM Integration"
      description="Tailored generative AI models, agentic workflows, computer vision, and NLP architectures designed for enterprise deployment."
      expectedLaunch="Q3 2026"
    />
  );
}
