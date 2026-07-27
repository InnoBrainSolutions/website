"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ParticleField from "@/components/effects/ParticleField";

const STATS = [
  {
    value: 100,
    suffix: "+",
    label: "Projects Delivered",
    description: "Across industries worldwide",
  },
  {
    value: 99,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Based on post-project surveys",
  },
  {
    value: 24,
    suffix: "×7",
    label: "Support",
    description: "Round-the-clock availability",
  },
  {
    value: 50,
    suffix: "+",
    label: "AI Models Deployed",
    description: "Powered by cutting-edge AI",
  },
];

export default function StatsSection() {
  return (
    <section
      id="stats"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-label="Statistics"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-deep-teal/10 to-deep-space" />
      <ParticleField particleCount={25} />

      {/* Top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

      <div className="container-custom relative z-10">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  className="glow-text-teal"
                  duration={2.5}
                />
              </div>
              <p className="text-white font-semibold text-sm sm:text-base mb-1">
                {stat.label}
              </p>
              <p className="text-muted text-xs sm:text-sm">{stat.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
