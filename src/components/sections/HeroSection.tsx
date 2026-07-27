"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import LazyBackgroundVideo from "@/components/effects/LazyBackgroundVideo";

const SERVICE_TAGS = [
  "AI Solutions",
  "Software Engineering",
  "Cloud",
  "Automation",
  "Enterprise Innovation",
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-space"
      aria-label="Hero"
    >
      {/* Fast, Instant Autoplay Background Video */}
      <LazyBackgroundVideo
        src="/14492116_1920_1080_30fps.mp4"
        className="opacity-75"
      />

      {/* Vignette / gradient overlays for optimal text legibility */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-deep-space/70 via-transparent to-deep-space pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-deep-space/50 via-transparent to-deep-space/50 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border border-teal/30 bg-deep-space/60 backdrop-blur-md text-teal">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-glow" />
            Where Intelligence Meets Innovation
          </span>
        </motion.div>

        {/* Main heading */}
        <h1 className="mb-6">
          <motion.span
            className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            INNOBRAIN
          </motion.span>
          <TextReveal
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight glow-text drop-shadow-md"
            delay={0.7}
            stagger={0.08}
          >
            Engineering Intelligence.
          </TextReveal>
          <TextReveal
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight glow-text mt-2 drop-shadow-md"
            delay={1.0}
            stagger={0.08}
          >
            Building Tomorrow.
          </TextReveal>
        </h1>

        {/* Service tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          {SERVICE_TAGS.map((tag, i) => (
            <span
              key={tag}
              className="text-white/80 text-xs sm:text-sm font-medium drop-shadow-sm"
            >
              {tag}
              {i < SERVICE_TAGS.length - 1 && (
                <span className="ml-2 sm:ml-3 text-teal/60">•</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <MagneticButton variant="primary" href="#story">
            Explore Our Vision
          </MagneticButton>
          <MagneticButton variant="outline" href="#cta">
            Start Your Project
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border border-white/25 bg-black/20 backdrop-blur-sm flex justify-center pt-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="w-1 h-2 rounded-full bg-teal" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
