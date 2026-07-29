import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactFormUI from "@/components/ui/ContactFormUI";

export const metadata: Metadata = {
  title: "Contact InnoBrain IT & AI Services | Vijay Nagar, Indore",
  description:
    "Get in touch with InnoBrain IT & AI Services Private Limited. Located at Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh 452010. Start your AI or software engineering project.",
  alternates: {
    canonical: "https://innobrain.in/contact",
  },
  keywords: [
    "Contact InnoBrain",
    "InnoBrain Indore Address",
    "Vijay Nagar Scheme No 54 IT Company",
    "Computer support and services Indore contact",
  ],
  openGraph: {
    title: "Contact InnoBrain IT & AI Services | Vijay Nagar, Indore",
    description:
      "Official Office: Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh 452010. Schedule an AI and software strategy consultation.",
    url: "https://innobrain.in/contact",
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
