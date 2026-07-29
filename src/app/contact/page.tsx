import type { Metadata } from "next";
import ComingSoonPage from "@/components/ui/ComingSoonPage";

export const metadata: Metadata = {
  title: "Contact InnoBrain IT & AI Services | Vijay Nagar, Indore",
  description:
    "Get in touch with InnoBrain IT & AI Services Private Limited. Located at Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh 452010. Schedule a consultation.",
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
    <ComingSoonPage
      category="CONTACT & CONSULTATION"
      title="Start Your Project With InnoBrain"
      description="Official Office: Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh 452010. Schedule a 1-on-1 strategy call with our AI and engineering leadership team."
      expectedLaunch="Q3 2026"
    />
  );
}
