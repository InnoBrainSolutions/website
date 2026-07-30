import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from "lucide-react";

interface BlogPostData {
  title: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: { name: string; role: string; avatar: string };
  excerpt: string;
  sections: { heading: string; content: string[] }[];
  tags: string[];
}

const BLOG_POSTS: Record<string, BlogPostData> = {
  "ai-trends-2026": {
    title: "Top Enterprise AI Trends & Agentic Workflows for 2026",
    category: "ARTIFICIAL INTELLIGENCE",
    readTime: "6 min read",
    publishDate: "July 28, 2026",
    author: {
      name: "Satyam Rana",
      role: "Lead AI Architect",
      avatar: "SR",
    },
    excerpt:
      "From multi-agent orchestration to local edge models, explore how generative AI is shifting from conversational bots to autonomous execution engines.",
    sections: [
      {
        heading: "The Shift to Autonomous Agentic Systems",
        content: [
          "In 2026, enterprise AI has moved far beyond basic RAG (Retrieval-Augmented Generation) and simple Q&A chatbots. The dominant shift is toward agentic workflows—autonomous AI agents capable of planning multi-step tool calls, querying databases, writing software code, and resolving user tickets independently.",
          "Rather than waiting for human prompts at every step, modern agentic frameworks utilize stateful loops and feedback evaluation, reducing operational intervention while scaling throughput by 10x.",
        ],
      },
      {
        heading: "Local Model Deployment & Edge Privacy",
        content: [
          "With smaller, hyper-optimized models (8B-14B parameter range) achieving reasoning capabilities comparable to 70B models from prior years, enterprise organizations are deploying models on-premise and on edge devices.",
          "This trend completely eliminates third-party API latency and guarantees absolute privacy for confidential IP, financial ledgers, and health records.",
        ],
      },
      {
        heading: "Synthesizing Multimodal Knowledge Graphs",
        content: [
          "Combining vector embeddings with deterministic Knowledge Graphs is preventing LLM hallucination in production. Enterprise AI pipelines now cross-reference semantic vector matches against verified knowledge graphs to yield 99.9% factual accuracy.",
        ],
      },
    ],
    tags: ["Agentic AI", "LLMs", "RAG", "Enterprise AI", "Machine Learning"],
  },
  "cloud-security": {
    title: "Zero-Trust Cloud Security Architecture for Enterprise Scale",
    category: "CYBERSECURITY & CLOUD",
    readTime: "8 min read",
    publishDate: "July 25, 2026",
    author: {
      name: "Security Engineering Team",
      role: "InnoBrain Cyber Operations",
      avatar: "SE",
    },
    excerpt:
      "A comprehensive guide to enforcing continuous authentication, Micro-segmentation, and zero-trust perimeter defense in AWS and Azure EKS setups.",
    sections: [
      {
        heading: "Why Perimeter Security is Obsolete",
        content: [
          "Modern cloud topologies span multiple public clouds, edge locations, and remote worker endpoints. Relying on traditional VPNs or simple perimeter firewalls creates vulnerable internal surfaces once an initial breach occurs.",
          "Zero-Trust enforces strict identity verification for every single inter-service request, whether coming from outside or inside the cluster.",
        ],
      },
      {
        heading: "Micro-Segmentation in Kubernetes Clusters",
        content: [
          "Utilizing eBPF-powered network policies (such as Cilium), security engineers can restrict pod-to-pod communication at Layer 7. Even if an attacker gains access to a web front-end container, lateral movement to internal database pods is blocked by policy.",
        ],
      },
    ],
    tags: ["Zero Trust", "Cloud Security", "Kubernetes", "AWS", "DevSecOps"],
  },
  "enterprise-ai-transformation": {
    title: "Architecting Enterprise AI Transformation: From PoC to Production",
    category: "ENTERPRISE STRATEGY",
    readTime: "7 min read",
    publishDate: "July 20, 2026",
    author: {
      name: "Enterprise Solutions Group",
      role: "InnoBrain Strategy",
      avatar: "ESG",
    },
    excerpt:
      "Discover the 5 critical architectural steps to transition experimental AI prototypes into secure, reliable, enterprise-wide production platforms.",
    sections: [
      {
        heading: "Escaping the Proof-of-Concept Trap",
        content: [
          "Over 70% of enterprise AI prototypes fail to reach production due to unscalable API costs, latency issues, or data compliance concerns. Successful AI deployment requires designing for infrastructure governance on Day 1.",
        ],
      },
    ],
    tags: ["AI Strategy", "Enterprise Architecture", "DevOps", "Scaling"],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    return {
      title: "Blog Insight | InnoBrain IT & AI Services",
    };
  }

  return {
    title: `${post.title} | InnoBrain Insights`,
    description: post.excerpt,
    alternates: {
      canonical: `https://innobrainitservices.com/insights/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  const data: BlogPostData = post || {
    title: slug.replace(/-/g, " ").toUpperCase(),
    category: "ENGINEERING & AI INSIGHTS",
    readTime: "5 min read",
    publishDate: "July 30, 2026",
    author: { name: "InnoBrain Research Team", role: "Engineering Thought Leadership", avatar: "IB" },
    excerpt: "In-depth research and technical insights from InnoBrain software architects and AI specialists.",
    sections: [
      {
        heading: "Overview",
        content: [
          "Detailed engineering breakdown covering best practices, architecture recommendations, and production performance optimization.",
        ],
      },
    ],
    tags: ["Technology", "AI", "Cloud", "Software"],
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-deep-space pt-32 pb-24 text-white">
        <article className="container-custom max-w-4xl">
          {/* Back link */}
          <Link
            href="/insights/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog & Articles
          </Link>

          {/* Header Info */}
          <div className="space-y-4 mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase border border-teal/30 bg-teal/10 text-teal">
              <Tag className="w-3.5 h-3.5" />
              {data.category}
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {data.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-white/10 py-4 text-xs text-white/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-teal/20 border border-teal/40 flex items-center justify-center font-bold text-teal text-xs">
                  {data.author.avatar}
                </div>
                <div>
                  <div className="font-bold text-white text-xs">{data.author.name}</div>
                  <div className="text-[11px] text-white/50">{data.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/60 font-mono text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal" />
                  {data.publishDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal" />
                  {data.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Excerpt Box */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border-l-4 border-teal text-white/90 text-base italic leading-relaxed mb-10">
            {data.excerpt}
          </div>

          {/* Body Sections */}
          <div className="space-y-8 text-white/80 text-base leading-relaxed font-light mb-12">
            {data.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl font-bold text-white tracking-tight pt-2">
                  {sec.heading}
                </h2>
                {sec.content.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </section>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-white/10 mb-12">
            <div className="text-xs text-white/50 font-mono uppercase mb-3">Tags & Categories</div>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.03] border border-white/10 text-teal"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4 text-center sm:text-left sm:flex items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white">Subscribe to AI & Cloud Engineering Digest</h3>
              <p className="text-xs text-white/60">Get bi-weekly technical deep dives straight to your inbox.</p>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-teal text-deep-space font-bold text-xs hover:bg-teal/80 transition-colors inline-flex items-center gap-2 shrink-0"
            >
              <span>Join Newsletter</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
