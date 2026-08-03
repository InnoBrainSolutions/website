"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import LazyBackgroundVideo from "@/components/effects/LazyBackgroundVideo";
import { CLOUDINARY_VIDEOS } from "@/config/media";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-deep-space"
      aria-label="Hero"
    >
      {/* Layer 1: Atmospheric Background Video */}
      <LazyBackgroundVideo
        src={CLOUDINARY_VIDEOS.heroBackground}
        className="opacity-50"
        isPriority={true}
      />

      {/* Layer 2: 3D Living Neural Network — InnoBrain's iconic visual */}
      <HeroCanvas />

      {/* Layer 3: Dark vignettes for text legibility over 3D */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-deep-space/60 via-transparent to-deep-space pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,9,11,0.8)_100%)] pointer-events-none" />

      {/* Layer 4: Content — stripped to 3 essential elements */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto my-auto">
        {/* Tiny badge — understated, not competing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium tracking-widest uppercase border border-white/10 bg-white/[0.03] backdrop-blur-sm text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-glow" />
            Where Intelligence Meets Innovation
          </span>
        </motion.div>

        {/* THE title — monumental, cinematic with custom brain logo for "O" */}
        <motion.h1
          className="mb-8 select-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center justify-center text-[clamp(2.5rem,10.5vw,12rem)] font-extrabold tracking-[-0.05em] leading-[0.88] drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            <span className="text-white">INN</span>
            <span className="relative inline-flex items-center justify-center mx-[0.02em] w-[0.82em] h-[0.82em] align-baseline">
              <Image
                src="/logo-icon.png"
                alt="InnoBrain Logo Mark"
                width={240}
                height={240}
                className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(20,184,166,0.95)] transition-transform duration-500 hover:scale-110"
                priority
                unoptimized
              />
            </span>
            <span className="bg-gradient-to-r from-teal via-cyan to-electric-blue bg-clip-text text-transparent">
              BRAIN
            </span>
          </span>
        </motion.h1>

        {/* Subtitle — executive value prop */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl font-light text-white/70 tracking-wide mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          Architecting production-grade AI systems, custom SaaS applications,
          <br className="hidden sm:inline" /> and enterprise cloud platforms built for scale.
        </motion.p>

        {/* Single CTA — clear conversion path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton variant="primary" href="/contact">
            Start Your Project →
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator — minimal */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-0.5 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
