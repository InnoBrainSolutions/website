"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const StoryCanvas = dynamic(() => import("@/components/three/StoryCanvas"), {
  ssr: false,
});

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-space"
      aria-label="Call to Action"
    >
      {/* 3D QuantumCore reprise — bookends the journey */}
      <StoryCanvas scrollProgress={0.7} />

      {/* Radial vignette */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(9,9,11,0.85)_100%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.span
          className="text-teal/60 text-xs font-mono font-semibold tracking-[0.3em] uppercase block mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Let&apos;s Build Together
        </motion.span>

        {/* Massive viewport-filling headline */}
        <motion.h2
          className="text-[clamp(2.5rem,8vw,8rem)] font-extrabold tracking-[-0.05em] leading-[0.85] text-white mb-10 drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Ready to build
          <br />
          <span className="bg-gradient-to-r from-teal via-cyan to-electric-blue bg-clip-text text-transparent">
            the future?
          </span>
        </motion.h2>

        <motion.p
          className="text-white/40 text-base sm:text-lg max-w-lg mx-auto mb-14 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Whether you&apos;re starting from scratch or scaling to millions, our
          engineers are ready.
        </motion.p>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <MagneticButton variant="primary" href="/contact">
            Start Your Project
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
