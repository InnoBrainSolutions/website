import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, BookOpen, Code2, Terminal, Key, CheckCircle2 } from "lucide-react";

interface DocData {
  title: string;
  category: string;
  version: string;
  summary: string;
  endpointsOrMethods: { method: string; path: string; desc: string }[];
  codeSnippet: string;
  quickSteps: string[];
}

const DOCS_DATA: Record<string, DocData> = {
  "rest-api": {
    title: "InnoBrain Core Platform REST API Reference",
    category: "DEVELOPER DOCUMENTATION",
    version: "v2.4.0",
    summary:
      "Complete API specification for authenticating, requesting enterprise AI inferences, and managing real-time data streaming pipelines.",
    endpointsOrMethods: [
      { method: "POST", path: "/v2/ai/agent/execute", desc: "Trigger multi-step AI agentic workflow execution" },
      { method: "POST", path: "/v2/embeddings/generate", desc: "Generate 1536-dim vector embeddings for documents" },
      { method: "GET", path: "/v2/health/status", desc: "Check cluster health and active tenant rate limits" },
    ],
    codeSnippet: `// Example TypeScript SDK Request
import { InnoBrainClient } from "@innobrain/sdk";

const client = new InnoBrainClient({
  apiKey: process.env.INNOBRAIN_API_KEY,
  environment: "production"
});

const result = await client.agents.execute({
  agentId: "agent_financial_analyzer",
  input: "Analyze Q2 revenue variance and cross-reference tax compliance risks.",
  stream: true
});

for await (const chunk of result.stream) {
  console.log(chunk.text);
}`,
    quickSteps: [
      "Obtain API Key from InnoBrain Enterprise Portal",
      "Configure TLS 1.3 Bearer Token headers",
      "Observe 1,000 req/min default rate limit policy",
    ],
  },
  "ai-sdk": {
    title: "InnoBrain Agentic AI SDK Integration Guide",
    category: "SDK REFERENCE",
    version: "v1.8.2",
    summary:
      "Guide for integrating InnoBrain's Python and TypeScript SDKs into existing web applications and backend services.",
    endpointsOrMethods: [
      { method: "SDK", path: "pip install innobrain-ai", desc: "Official Python package" },
      { method: "SDK", path: "npm install @innobrain/sdk", desc: "Official Node.js / TypeScript package" },
    ],
    codeSnippet: `# Python SDK Integration Example
from innobrain import AgentClient

client = AgentClient(api_key="ib_live_secret_key")

response = client.chat.completions.create(
    model="innobrain-llm-v2-enterprise",
    messages=[{"role": "user", "content": "Generate Terraform EKS security module"}],
    temperature=0.2
)

print(response.choices[0].message.content)`,
    quickSteps: [
      "Install package via package manager",
      "Set environment variable INNOBRAIN_API_KEY",
      "Initialize client instance in app context",
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCS_DATA[slug];

  if (!doc) {
    return {
      title: "Documentation | InnoBrain Developer Portal",
    };
  }

  return {
    title: `${doc.title} | InnoBrain Docs`,
    description: doc.summary,
    alternates: {
      canonical: `https://innobrainitservices.com/insights/docs/${slug}`,
    },
  };
}

export default async function DocsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = DOCS_DATA[slug];

  const data: DocData = doc || {
    title: slug.replace(/-/g, " ").toUpperCase(),
    category: "TECHNICAL DOCUMENTATION",
    version: "v1.0.0",
    summary: "Technical integration specs and developer reference guide.",
    endpointsOrMethods: [
      { method: "GET", path: `/v1/${slug}`, desc: "Standard data query endpoint" },
    ],
    codeSnippet: `// Quickstart Example
console.log("InnoBrain API initialized for ${slug}");`,
    quickSteps: ["Review authentication requirements", "Test payload in staging environment"],
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-deep-space pt-32 pb-24 text-white">
        <div className="container-custom max-w-4xl">
          {/* Back link */}
          <Link
            href="/insights/docs"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Documentation
          </Link>

          {/* Header Info */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase border border-teal/30 bg-teal/10 text-teal">
                <BookOpen className="w-3.5 h-3.5" />
                {data.category}
              </span>
              <span className="text-xs font-mono text-white/40 bg-white/[0.04] px-2.5 py-1 rounded-md">
                {data.version}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {data.title}
            </h1>

            <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed">
              {data.summary}
            </p>
          </div>

          {/* Quickstart steps */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 mb-10">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-teal" />
              Quick Setup Prerequisites
            </h3>
            <div className="space-y-2">
              {data.quickSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* API Endpoints Table */}
          <div className="space-y-4 mb-10">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-teal" />
              Endpoints & Commands
            </h2>
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/10 text-xs">
              {data.endpointsOrMethods.map((ep, idx) => (
                <div key={idx} className="p-4 sm:flex items-center justify-between gap-4 space-y-2 sm:space-y-0">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded font-mono font-bold bg-teal/10 text-teal border border-teal/20">
                      {ep.method}
                    </span>
                    <span className="font-mono text-white/90 font-semibold">{ep.path}</span>
                  </div>
                  <div className="text-white/60 font-light">{ep.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet Box */}
          <div className="space-y-4 mb-12">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-teal" />
              Implementation Code Snippet
            </h2>
            <div className="bg-black/60 border border-white/15 rounded-2xl p-6 overflow-x-auto font-mono text-xs text-teal/90 leading-relaxed">
              <pre>{data.codeSnippet}</pre>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
