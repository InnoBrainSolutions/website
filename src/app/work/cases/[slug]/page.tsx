import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, TrendingUp, ShieldCheck, Cpu, ArrowRight } from "lucide-react";

interface CaseStudyData {
  title: string;
  category: string;
  client: string;
  timeline: string;
  summary: string;
  impactMetrics: { label: string; value: string; change: string }[];
  challenge: string;
  solution: string[];
  architectureHighlights: string[];
  techStack: string[];
  quote?: { text: string; author: string; role: string };
}

const CASE_STUDIES: Record<string, CaseStudyData> = {
  "fintech-cloud-migration": {
    title: "Zero-Downtime AWS Cloud Migration for High-Frequency FinTech Platform",
    category: "FINTECH & CLOUD ARCHITECTURE",
    client: "Tier-1 Investment & Trading Network",
    timeline: "6 Months",
    summary:
      "Engineered a seamless multi-region cloud migration supporting 10,000+ transactions per second while maintaining 99.999% uptime and zero data loss.",
    impactMetrics: [
      { label: "Latency Reduction", value: "42ms → 8ms", change: "-81%" },
      { label: "Infrastructure Savings", value: "$1.4M / yr", change: "-45%" },
      { label: "Transaction Throughput", value: "25k / sec", change: "+350%" },
    ],
    challenge:
      "The client's legacy on-premise infrastructure was choking during high-volatility market sessions. Monolithic database locks and legacy networking hardware led to trade execution bottlenecks and soaring operational maintenance costs.",
    solution:
      [
        "Refactored monolithic trading workflows into event-driven microservices running on AWS EKS (Kubernetes).",
        "Implemented Redis Enterprise caching clusters with active-active cross-region replication for microsecond order matching.",
        "Deployed automated IaC (Infrastructure as Code) using Terraform and GitOps pipeline via ArgoCD for zero-downtime blue/green deployments.",
      ],
    architectureHighlights: [
      "Multi-Region AWS EKS with automated pod auto-scaling",
      "Kafka Event Stream for real-time transaction ordering",
      "Zero-Trust IAM policies with HashiCorp Vault key management",
      "Grafana + Prometheus observability stack for real-time telemetry",
    ],
    techStack: ["AWS EKS", "Terraform", "Kafka", "Redis Enterprise", "Go", "Docker", "ArgoCD"],
    quote: {
      text: "InnoBrain delivered a flawless cloud migration under strict regulatory oversight. Our platform latency dropped by over 80% without a single millisecond of downtime for our traders.",
      author: "Marcus Vance",
      role: "VP of Infrastructure, Global Trading Corp",
    },
  },
  "healthcare-ai": {
    title: "HIPAA-Compliant AI Diagnostic Assistant for Diagnostic Imaging",
    category: "HEALTHCARE AI & NLP",
    client: "National Diagnostic Healthcare Network",
    timeline: "8 Months",
    summary:
      "Built a custom medical vision AI model and NLP pipeline that assists radiologists by pre-screening chest X-rays and MRI scans with 98.4% diagnostic accuracy.",
    impactMetrics: [
      { label: "Radiology Triage Speed", value: "4.5 hrs → 12 mins", change: "-95%" },
      { label: "Diagnostic Accuracy", value: "98.4%", change: "+14%" },
      { label: "Patient Scans Processed", value: "1.2M+", change: "Active" },
    ],
    challenge:
      "Radiologists faced severe backlogs processing tens of thousands of daily imaging scans, resulting in critical diagnostic delay risks for acute pathology cases.",
    solution:
      [
        "Fine-tuned a custom Vision-Language Transformer model on anonymized DICOM medical imaging datasets.",
        "Engineered an air-gapped, HIPAA-compliant inference API processing high-resolution scans with sub-second inference speed.",
        "Integrated real-time priority queuing for acute findings, alerting emergency care teams instantly.",
      ],
    architectureHighlights: [
      "HIPAA-compliant AWS GovCloud enclave with strict air-gapping",
      "Custom PyTorch Vision Transformer fine-tuned on DICOM images",
      "Zero-retention inference pipeline ensuring patient data privacy",
    ],
    techStack: ["PyTorch", "Python", "DICOM Standard", "AWS GovCloud", "FastAPI", "Docker", "Triton Server"],
    quote: {
      text: "The AI assistant engineered by InnoBrain has dramatically accelerated critical triage in our emergency rooms. Radiologists receive flagged anomalies in minutes rather than hours.",
      author: "Dr. Elena Rostova",
      role: "Chief Medical Information Officer",
    },
  },
  "ecommerce-scaling": {
    title: "Real-Time Personalization & Recommendation ML Engine for E-Commerce",
    category: "E-COMMERCE & MACHINE LEARNING",
    client: "Global Retail & Marketplace Leader",
    timeline: "5 Months",
    summary:
      "Designed a vector-search ML recommendation engine serving 45 million monthly active shoppers with personalized product suggestions.",
    impactMetrics: [
      { label: "Conversion Rate", value: "+28.4%", change: "Increase" },
      { label: "Average Order Value", value: "$64 → $89", change: "+39%" },
      { label: "Inference Latency", value: "14ms", change: "Sub-second" },
    ],
    challenge:
      "Generic recommendation algorithms failed to adapt to real-time shopper intent, causing lost cart conversions during peak Black Friday traffic spikes.",
    solution:
      [
        "Implemented real-time user behavior embedding vectors powered by Qdrant vector database and transformer embeddings.",
        "Deployed edge-rendered personalized carousels using Next.js and Redis cache layer.",
        "Automated continuous online model retraining pipelines triggered by real-time clickstream data.",
      ],
    architectureHighlights: [
      "Qdrant Vector DB storing 50M+ product & user embeddings",
      "Apache Flink real-time clickstream feature engine",
      "Multi-armed bandit reinforcement learning for dynamic offer placement",
    ],
    techStack: ["Qdrant", "Python", "Apache Flink", "Next.js", "Redis", "TensorFlow", "Kubernetes"],
    quote: {
      text: "Our recommendation click-through rate doubled within two weeks of launching InnoBrain's vector AI engine. It paid for itself in less than a month.",
      author: "Sarah Jenkins",
      role: "Head of Digital Product",
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];

  if (!study) {
    return {
      title: "Case Study | InnoBrain IT & AI Services",
    };
  }

  return {
    title: `${study.title} | InnoBrain Case Studies`,
    description: study.summary,
    alternates: {
      canonical: `https://innobrainitservices.com/work/cases/${slug}`,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];

  const data: CaseStudyData = study || {
    title: `Enterprise Case Study: ${slug.replace(/-/g, " ").toUpperCase()}`,
    category: "CASE STUDY & DIGITAL TRANSFORMATION",
    client: "Enterprise Global Partner",
    timeline: "4 - 6 Months",
    summary:
      "Comprehensive digital engineering project focusing on scalable architecture, cloud efficiency, and AI-driven automation.",
    impactMetrics: [
      { label: "Operational Speed Gain", value: "3.5x", change: "+250%" },
      { label: "Cost Optimization", value: "-40%", change: "Reduction" },
      { label: "Platform Availability", value: "99.99%", change: "SLA" },
    ],
    challenge:
      "The client required modernizing legacy workflows with high availability, security compliance, and AI automation.",
    solution: [
      "Architected cloud-native microservices infrastructure.",
      "Integrated autonomous monitoring and automated CI/CD pipelines.",
      "Deployed security and data governance guardrails.",
    ],
    architectureHighlights: [
      "Cloud-native microservices architecture",
      "Zero-Trust IAM and encryption controls",
      "Automated pipeline deployments",
    ],
    techStack: ["Next.js", "TypeScript", "Python", "Docker", "AWS", "Kubernetes"],
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-deep-space pt-32 pb-24 text-white">
        <div className="container-custom max-w-5xl">
          {/* Back link */}
          <Link
            href="/work/cases"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>

          {/* Category Tag */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase border border-teal/30 bg-teal/10 text-teal">
              <Cpu className="w-3.5 h-3.5" />
              {data.category}
            </span>
          </div>

          {/* Main Title & Summary */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6 leading-tight max-w-4xl">
            {data.title}
          </h1>

          <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl mb-10 font-light">
            {data.summary}
          </p>

          {/* Impact Cards */}
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-14">
            {data.impactMetrics.map((m) => (
              <div
                key={m.label}
                className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl relative overflow-hidden group"
              >
                <div className="text-xs text-white/50 font-mono uppercase tracking-wider mb-2">
                  {m.label}
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight mb-1">
                  {m.value}
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-teal">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {m.change}
                </div>
              </div>
            ))}
          </div>

          {/* Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-14 text-xs">
            <div>
              <span className="text-white/40 uppercase font-mono block mb-1">Client Sector</span>
              <span className="font-semibold text-white">{data.client}</span>
            </div>
            <div>
              <span className="text-white/40 uppercase font-mono block mb-1">Duration</span>
              <span className="font-semibold text-white">{data.timeline}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-white/40 uppercase font-mono block mb-1">Core Stack</span>
              <span className="font-semibold text-teal">{data.techStack.slice(0, 3).join(", ")}</span>
            </div>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="space-y-12 mb-16">
            <section className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-4">
              <h2 className="text-2xl font-bold text-white">The Challenge</h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-light">
                {data.challenge}
              </p>
            </section>

            <section className="bg-white/[0.02] border border-white/10 p-8 rounded-3xl space-y-6">
              <h2 className="text-2xl font-bold text-white">Our Engineering Approach</h2>
              <div className="space-y-4">
                {data.solution.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-teal/10 border border-teal/30 flex items-center justify-center text-teal font-mono font-bold text-xs shrink-0 mt-0.5">
                      0{idx + 1}
                    </div>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed pt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Architecture Highlights */}
            <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-teal" />
                Key Architectural Highlights
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {data.architectureHighlights.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimonial Quote if available */}
            {data.quote && (
              <section className="p-8 rounded-3xl bg-gradient-to-r from-teal/10 via-teal/5 to-transparent border border-teal/30 space-y-4">
                <blockquote className="text-base sm:text-lg text-white font-light italic leading-relaxed">
                  &ldquo;{data.quote.text}&rdquo;
                </blockquote>
                <div>
                  <div className="font-bold text-white text-sm">{data.quote.author}</div>
                  <div className="text-xs text-teal font-mono">{data.quote.role}</div>
                </div>
              </section>
            )}

            {/* Tech Stack Pills */}
            <section className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-white/50">Technologies Deployed</h3>
              <div className="flex flex-wrap gap-2">
                {data.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono bg-white/[0.03] border border-white/10 text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* CTA Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-teal/20 via-deep-space to-deep-space border border-teal/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-2xl font-bold text-white">Ready for a Similar Transformation?</h3>
              <p className="text-xs sm:text-sm text-white/70">
                Consult with our senior cloud & AI architects to outline your project roadmap.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-teal text-deep-space font-bold text-xs uppercase tracking-wider hover:bg-teal/80 transition-colors inline-flex items-center gap-2 shrink-0"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
