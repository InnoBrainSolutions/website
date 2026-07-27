"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import LazyBackgroundVideo from "@/components/effects/LazyBackgroundVideo";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-space"
      aria-label="Call to Action"
    >
      {/* Background aurora ambient light glow */}
      <div className="absolute inset-0 aurora-bg opacity-40 pointer-events-none" />

      {/* Atmospheric video layer */}
      <LazyBackgroundVideo
        src="/14492116_1920_1080_30fps.mp4"
        className="opacity-30"
      />

      {/* Animated glowing ambient orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--teal), transparent)" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--electric-blue), transparent)" }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,9,11,0.9)_100%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.span
          className="text-teal text-xs font-mono font-semibold tracking-[0.3em] uppercase block mb-10"
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
          className="text-white/50 text-base sm:text-lg max-w-lg mx-auto mb-14 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Whether you&apos;re starting from scratch or scaling to millions, our
          engineers are ready to bring your vision to life.
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
