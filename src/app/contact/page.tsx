import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactFormUI from "@/components/ui/ContactFormUI";

export const metadata: Metadata = {
  title: "Contact Inno Brains | Start Your Engineering Project Today",
  description:
    "Ready to scale your software architecture or deploy enterprise AI? Partner with Inno Brains. Request a technical consultation today.",
  alternates: {
    canonical: "https://innobrainitservices.com/contact",
  },
  keywords: [
    "Contact Inno Brains",
    "Hire AI Developers",
    "Hire Software Engineers",
    "Technical Consultation",
    "IT Company Indore",
    "Inno Brains Address",
  ],
  openGraph: {
    title: "Contact Inno Brains | Start Your Engineering Project Today",
    description:
      "Partner with Inno Brains. Schedule an executive AI and custom software engineering consultation today.",
    url: "https://innobrainitservices.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-deep-space pt-32 pb-24 relative overflow-hidden text-white">
        {/* Background Ambient Glow Orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--teal), transparent)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--electric-blue), transparent)" }}
        />

        <div className="container-custom relative z-10">
          <ContactFormUI />
        </div>
      </main>
      <Footer />
    </>
  );
}
