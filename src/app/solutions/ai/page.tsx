import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Custom AI Development & Generative AI Solutions | Inno Brains",
  description:
    "Deploy production-grade RAG pipelines, fine-tuned LLMs, and autonomous AI agents designed for enterprise data security and sub-second performance.",
  alternates: {
    canonical: "https://innobrainitservices.com/solutions/ai",
  },
  keywords: [
    "Enterprise AI Development",
    "Custom LLM Fine-Tuning",
    "Agentic AI Workflows",
    "RAG Pipelines",
    "Generative AI Company",
    "Inno Brains AI Solutions",
  ],
  openGraph: {
    title: "Custom AI Development & Generative AI Solutions | Inno Brains",
    description:
      "Production-grade RAG pipelines, fine-tuned LLMs, and autonomous AI agents designed for enterprise security and performance.",
    url: "https://innobrainitservices.com/solutions/ai",
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
