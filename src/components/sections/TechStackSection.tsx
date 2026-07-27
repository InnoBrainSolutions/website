"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";

const TECH_STACK = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "Flutter", color: "#02569B" },
  { name: "Java", color: "#ED8B00" },
  { name: "Python", color: "#3776AB" },
  { name: "AWS", color: "#FF9900" },
  { name: "Azure", color: "#0089D6" },
  { name: "Docker", color: "#2496ED" },
  { name: "Kubernetes", color: "#326CE5" },
  { name: "TensorFlow", color: "#FF6F00" },
  { name: "OpenAI", color: "#10A37F" },
  { name: "LangChain", color: "#1C3C3C" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function TechStackSection() {
  return (
    <section
      id="tech"
      className="section relative overflow-hidden py-24 lg:py-32 bg-deep-space"
      aria-label="Technology Stack"
    >
      {/* Subtle Background Mesh */}
      <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-teal text-sm font-medium tracking-wider uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technology
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            <TextReveal>Powered by the tools that</TextReveal>
            <br />
            <span className="glow-text">
              <TextReveal delay={0.2}>power the future.</TextReveal>
            </span>
          </h2>
        </div>

        {/* Tech Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {TECH_STACK.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{
                y: -4,
                scale: 1.02,
                transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200 ease-out cursor-pointer transform-gpu translate-z-0 shadow-sm hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)] overflow-hidden"
            >
              {/* Subtle Ambient Hover Glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(120px circle at 50% 50%, ${tech.color}15, transparent 75%)`,
                }}
              />

              {/* Icon Circle */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-extrabold tracking-tight transition-all duration-200 group-hover:scale-105"
                style={{
                  background: `${tech.color}18`,
                  color: tech.color === "#FFFFFF" ? "#F8FAFC" : tech.color,
                  border: `1px solid ${tech.color}25`,
                }}
              >
                {tech.name.slice(0, 2)}
              </div>

              {/* Technology Name */}
              <span className="text-white/80 text-xs font-semibold group-hover:text-white transition-colors duration-200">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
