import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Scale, CheckCircle, ShieldAlert, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | InnoBrain IT & AI Services",
  description:
    "Terms and conditions governing the use of InnoBrain services, software platforms, AI engineering deliverables, and digital assets.",
  alternates: {
    canonical: "https://innobrainitservices.com/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-deep-space pt-32 pb-24 text-white">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <div className="mb-12 border-b border-white/10 pb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-teal/30 bg-teal/10 text-teal mb-4">
              <Scale className="w-4 h-4" />
              Terms & Conditions
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-white/60 text-sm">
              Last Updated: July 30, 2026 • Version 2.4
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-10 text-white/80 text-sm sm:text-base leading-relaxed">
            <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-teal font-bold text-lg">
                <FileCheck className="w-5 h-5" />
                <h2>1. Acceptance of Terms</h2>
              </div>
              <p>
                By accessing or using the digital platforms, software products, AI API endpoints, or engineering services provided by InnoBrain IT & AI Services Pvt. Ltd. (&quot;InnoBrain&quot;), you agree to comply with and be bound by these Terms of Service. If you are entering into this agreement on behalf of a corporation, you confirm you hold full authorization to bind that entity.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal" />
                2. Scope of Services & Master Service Agreements
              </h2>
              <p>
                InnoBrain provides software architecture, generative AI agent engineering, cloud migration, and IT consulting. Detailed project scope, deliverables, timelines, SLAs, and payment schedules are governed by individual Statements of Work (SOW) or Master Service Agreements (MSA) executed between InnoBrain and the client.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white">3. Intellectual Property Ownership</h2>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl">
                  <h3 className="font-semibold text-teal mb-2">Client Deliverables</h3>
                  <p className="text-xs text-white/70">
                    Upon full financial settlement of agreed invoices, clients retain 100% ownership of custom source code, custom-trained model parameters, and business logic engineered specifically for their contract.
                  </p>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-5 rounded-xl">
                  <h3 className="font-semibold text-teal mb-2">Pre-Existing InnoBrain IP</h3>
                  <p className="text-xs text-white/70">
                    InnoBrain retains proprietary rights to its core underlying frameworks, reusable boilerplate components, internal development accelerators, and foundation SDKs utilized during delivery.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-teal" />
                4. Acceptable Use & Security Constraints
              </h2>
              <p>Users and client organizations agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-white/70 pl-2">
                <li>Attempt unauthorized penetration testing or vulnerability exploitation against InnoBrain hosted infrastructure without prior written authorization.</li>
                <li>Use AI solutions engineered by InnoBrain for malicious automation, deepfake generation, or illegal activities.</li>
                <li>Reverse-engineer or decompile proprietary binaries or foundation algorithms provided by InnoBrain.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-white">5. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, InnoBrain shall not be liable for indirect, incidental, special, or consequential damages resulting from platform downtime, third-party cloud provider outages (e.g. AWS/Azure), or unapproved third-party modifications to deployed codebases.
              </p>
            </section>

            <section className="bg-teal/5 border border-teal/20 rounded-2xl p-6 sm:p-8 space-y-3">
              <h2 className="text-lg font-bold text-teal">Legal & Corporate Contact</h2>
              <p className="text-xs sm:text-sm text-white/80">
                For legal notices, contract modifications, or governance inquiries, please reach out to:
              </p>
              <div className="text-xs font-mono text-teal">
                legal@innobrainitservices.com
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
