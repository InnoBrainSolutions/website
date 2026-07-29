import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";

const StorySection = dynamic(() => import("@/components/sections/StorySection"));
const ManifestoSection = dynamic(() => import("@/components/sections/ManifestoSection"));
const ServicesSection = dynamic(() => import("@/components/sections/ServicesSection"));
const CaseStudiesSection = dynamic(() => import("@/components/sections/CaseStudiesSection"));
const SingleStatSection = dynamic(() => import("@/components/sections/SingleStatSection"));
const TechStackSection = dynamic(() => import("@/components/sections/TechStackSection"));
const TrustSection = dynamic(() => import("@/components/sections/TrustSection"));
const CTASection = dynamic(() => import("@/components/sections/CTASection"));
const SpotlightCursor = dynamic(() => import("@/components/effects/SpotlightCursor"));

export default function Home() {
  return (
    <>
      <SpotlightCursor />
      <Navbar />
      <main>
        <HeroSection />
        <StorySection />
        <ManifestoSection />
        <ServicesSection />
        <CaseStudiesSection />
        <SingleStatSection />
        <TechStackSection />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
