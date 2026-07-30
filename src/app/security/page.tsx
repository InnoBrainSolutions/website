import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Lock, Server, Cpu, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise Security & Zero-Trust Architecture | InnoBrain",
  description:
    "Explore InnoBrain's enterprise security posture, SOC 2 alignment, ISO 27001 standard practices, and zero-trust engineering principles.",
  alternates: {
    canonical: "https://innobrainitservices.com/security",
  },
};

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-deep-space pt-32 pb-24 text-white">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <div className="mb-12 border-b border-white/10 pb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-teal/30 bg-teal/10 text-teal mb-4">
              <ShieldCheck className="w-4 h-4" />
              Security Architecture
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Enterprise Security & Trust
            </h1>
            <p className="text-white/60 text-sm">
              Continuous Protection • Zero-Trust Compliance • Sub-Second Vulnerability Isolation
            </p>
          </div>

          {/* Key Security Pillars */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <Lock className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-bold text-white mb-2">Encryption Everywhere</h3>
              <p className="text-xs text-white/70">
                AES-256 at rest, TLS 1.3 in transit, and hardware-backed key management services (KMS).
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <Server className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-bold text-white mb-2">Cloud Isolation</h3>
              <p className="text-xs text-white/70">
                Dedicated VPCs, air-gapped workloads, and strict Kubernetes network policies for tenant separation.
              </p>
            </div>
            <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl">
              <Cpu className="w-8 h-8 text-teal mb-4" />
              <h3 className="font-bold text-white mb-2">Secure AI Pipelines</h3>
              <p className="text-xs text-white/70">
                Prompt injection defenses, LLM guardrails, and sanitized training data pipelines.
              </p>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="space-y-10 text-white/80 text-sm sm:text-base leading-relaxed">
            <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-white">1. Zero-Trust Security Framework</h2>
              <p>
                At InnoBrain, we build with the baseline assumption that perimeter security alone is insufficient. Every service request, API invocation, and internal data transfer is authenticated, authorized, and encrypted in real-time.
              </p>
              <div className="space-y-2 pt-2">
                {[
                  "Multi-Factor Authentication (MFA) & SSO enforcement across all engineering environments",
                  "Least-privilege Role-Based Access Control (RBAC) audited on a bi-weekly automated cycle",
                  "Immutable audit logging powered by distributed log collection",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white">2. Vulnerability Management & Audits</h2>
              <p>
                Our CI/CD deployment pipeline executes automated Static Application Security Testing (SAST), Dynamic Application Security Testing (DAST), and container image vulnerability scans (Trivy/Snyk) prior to any production deployment.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white">3. Reporting Vulnerabilities</h2>
              <p>
                We welcome responsible security disclosures from researchers and clients. If you suspect you have identified a vulnerability within any InnoBrain service or API, please contact our Security Incident Response Team (SIRT).
              </p>
            </section>

            <section className="bg-teal/5 border border-teal/20 rounded-2xl p-6 sm:p-8 space-y-3">
              <h2 className="text-lg font-bold text-teal">Security Incident & Disclosure Desk</h2>
              <p className="text-xs sm:text-sm text-white/80">
                Encrypted security reports (PGP available upon request) can be submitted to:
              </p>
              <div className="text-xs font-mono text-teal">
                security@innobrainitservices.com
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
