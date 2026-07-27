import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SpotlightCursor from "@/components/effects/SpotlightCursor";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import ServicesSection from "@/components/sections/ServicesSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import TechStackSection from "@/components/sections/TechStackSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <SpotlightCursor />
      <Navbar />
      <main>
        <HeroSection />
        <StorySection />
        <ServicesSection />
        <CaseStudiesSection />
        <TechStackSection />
        <WhyChooseUsSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
