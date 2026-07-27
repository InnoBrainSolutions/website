import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SpotlightCursor from "@/components/effects/SpotlightCursor";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import SingleStatSection from "@/components/sections/SingleStatSection";
import TechStackSection from "@/components/sections/TechStackSection";
import TrustSection from "@/components/sections/TrustSection";
import CTASection from "@/components/sections/CTASection";

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
