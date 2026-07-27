"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function SingleStatSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-deep-space"
      aria-label="Key Statistic"
    >
      {/* Top/bottom subtle gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <motion.div
        className="text-center px-6"
        style={{ scale, opacity }}
      >
        <div className="text-[clamp(5rem,18vw,16rem)] font-extrabold tracking-[-0.05em] leading-none mb-6">
          <AnimatedCounter
            target={100}
            suffix="+"
            className="bg-gradient-to-r from-teal via-cyan to-electric-blue bg-clip-text text-transparent"
            duration={3}
          />
        </div>
        <p className="text-white/40 text-sm sm:text-base font-medium tracking-wide max-w-md mx-auto">
          Enterprise projects delivered across 12 industries worldwide
        </p>
      </motion.div>
    </section>
  );
}
