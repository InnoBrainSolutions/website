import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | InnoBrain IT & AI Services",
  description:
    "Learn about how InnoBrain protects, handles, and secures your personal and enterprise data in accordance with global privacy regulations.",
  alternates: {
    canonical: "https://innobrainitservices.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-deep-space pt-32 pb-24 text-white">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <div className="mb-12 border-b border-white/10 pb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-teal/30 bg-teal/10 text-teal mb-4">
              <ShieldCheck className="w-4 h-4" />
              Legal & Compliance
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/60 text-sm">
              Last Updated: July 30, 2026 • Effective Date: January 1, 2026
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-10 text-white/80 text-sm sm:text-base leading-relaxed">
            <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-teal font-bold text-lg">
                <Lock className="w-5 h-5" />
                <h2>1. Commitment to Data Privacy</h2>
              </div>
              <p>
                InnoBrain IT & AI Services Pvt. Ltd. (&quot;InnoBrain&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) values your privacy. This Privacy Policy details how we collect, process, store, and safeguard data provided through our website, software products, AI services, and enterprise solutions.
              </p>
              <p>
                We adhere strictly to global data protection laws including GDPR, CCPA, and HIPAA compliance frameworks for client data handling.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-teal" />
                2. Information We Collect
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl">
                  <h3 className="font-semibold text-teal mb-2">Personal Data</h3>
                  <p className="text-xs text-white/70">
                    Contact details such as name, corporate email address, phone number, company name, and project specifications provided voluntarily via inquiry forms or contract onboarding.
                  </p>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl">
                  <h3 className="font-semibold text-teal mb-2">Technical Telemetry</h3>
                  <p className="text-xs text-white/70">
                    IP address, browser specification, operating system, dynamic page interaction logs, and cookie identifiers used strictly for performance optimization and threat protection.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal" />
                3. Use of Information
              </h2>
              <p>
                We process collected data exclusively for the following operational requirements:
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70 pl-2">
                <li>Providing customized software development, AI model engineering, and cloud managed services.</li>
                <li>Executing client communication, technical support, and architectural consultations.</li>
                <li>Ensuring zero-trust perimeter security, preventing unauthorized access, and monitoring system health.</li>
                <li>Fulfilling legal compliance, auditing, and corporate governance obligations.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white">4. AI Data Confidentiality & Model Non-Training</h2>
              <p>
                Client proprietary datasets, intellectual property, and internal enterprise documentation submitted to InnoBrain for AI model training or fine-tuning are strictly isolated. We <strong className="text-white">never</strong> sell client data or use private client data to train multi-tenant public AI models.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white">5. Security Infrastructure</h2>
              <p>
                We enforce AES-256 bit encryption for data at rest and TLS 1.3 for data in transit. Access to sensitive environments is guarded by strict Multi-Factor Authentication (MFA) and Role-Based Access Control (RBAC).
              </p>
            </section>

            <section className="bg-teal/5 border border-teal/20 rounded-2xl p-6 sm:p-8 space-y-3">
              <h2 className="text-lg font-bold text-teal">Contact Privacy Officer</h2>
              <p className="text-xs sm:text-sm text-white/80">
                For questions regarding data access requests, deletion requests, or compliance inquiries, please contact our Data Protection Officer at:
              </p>
              <div className="text-xs font-mono text-teal">
                privacy@innobrainitservices.com
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
