"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const TechCanvas = dynamic(() => import("@/components/three/TechCanvas"), {
  ssr: false,
});

const TECH_NAMES = [
  "React", "Next.js", "Flutter", "Python", "AWS", "Azure",
  "Docker", "Kubernetes", "TensorFlow", "OpenAI", "Java", "Go",
];

export default function TechStackSection() {
  return (
    <section
      id="tech"
      className="relative overflow-hidden bg-deep-space py-24 lg:py-32"
      aria-label="Technology Stack"
    >
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-teal text-xs font-mono font-semibold tracking-[0.3em] uppercase block mb-4">
            Our Stack
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Powered by the tools that
            <br />
            <span className="bg-gradient-to-r from-teal via-cyan to-electric-blue bg-clip-text text-transparent">
              power the future.
            </span>
          </h2>
        </div>

        {/* 3D Orbital Ring */}
        <TechCanvas />

        {/* Technology name marquee underneath */}
        <motion.div
          className="flex justify-center flex-wrap gap-x-8 gap-y-3 mt-8 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {TECH_NAMES.map((name) => (
            <span
              key={name}
              className="text-white/30 text-xs sm:text-sm font-medium tracking-wide hover:text-teal transition-colors duration-200"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
