"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative min-h-[120vh] flex items-center overflow-hidden bg-deep-space"
      aria-label="Why InnoBrain"
    >
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
        }}
      />

      <motion.div
        className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center py-32"
        style={{ opacity }}
      >
        {/* Left: Massive provocative question */}
        <motion.div style={{ y: leftY }} className="lg:sticky lg:top-1/4">
          <span className="text-teal text-xs font-mono font-semibold tracking-[0.3em] uppercase block mb-8">
            THE QUESTION
          </span>
          <h2 className="text-[clamp(3rem,8vw,8rem)] font-extrabold tracking-[-0.05em] leading-[0.95] text-white">
            Why
            <br />
            <span className="bg-gradient-to-r from-teal via-cyan to-electric-blue bg-clip-text text-transparent inline-block pb-2">
              us?
            </span>
          </h2>
        </motion.div>

        {/* Right: The answer — not cards, not icons. Pure words. */}
        <motion.div
          style={{ y: rightY }}
          className="space-y-10 lg:pt-20"
        >
          <div className="space-y-4">
            <p className="text-white/90 text-xl sm:text-2xl font-light leading-relaxed">
              Most companies build software and
              <span className="text-white font-semibold"> bolt AI onto it later.</span>
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              We start with intelligence. Every architecture, every pipeline, every
              interface is designed with machine learning at its foundation — not as
              an afterthought.
            </p>
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-teal to-transparent" />

          <div className="space-y-4">
            <p className="text-white/90 text-xl sm:text-2xl font-light leading-relaxed">
              We don&apos;t chase frameworks.
              <span className="text-white font-semibold"> We engineer outcomes.</span>
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              96% faster diagnostics. 60% cost reduction. 3.2× revenue lift.
              These aren&apos;t promises — they&apos;re measured results from live
              enterprise deployments.
            </p>
          </div>

          <div className="w-16 h-px bg-gradient-to-r from-teal to-transparent" />

          <div className="space-y-4">
            <p className="text-white/90 text-xl sm:text-2xl font-light leading-relaxed">
              The future belongs to companies that think in
              <span className="text-white font-semibold"> systems, not features.</span>
            </p>
            <p className="text-white/50 text-base leading-relaxed">
              InnoBrain builds the intelligent infrastructure that lets
              enterprises move faster, see further, and scale without limits.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
