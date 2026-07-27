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
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function TechStackSection() {
  return (
    <section
      id="tech"
      className="section relative overflow-hidden"
      aria-label="Technology Stack"
    >
      {/* Background glow */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-teal text-sm font-medium tracking-wider uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
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

        {/* Tech grid */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TECH_STACK.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover={{
                scale: 1.08,
                boxShadow: `0 0 30px ${tech.color}20`,
              }}
              className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 cursor-default"
            >
              {/* Icon circle */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${tech.color}15`,
                  color: tech.color,
                  boxShadow: `0 0 0 0 ${tech.color}00`,
                }}
              >
                {tech.name.slice(0, 2)}
              </div>

              {/* Name */}
              <span className="text-muted text-xs font-medium group-hover:text-white transition-colors duration-300">
                {tech.name}
              </span>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${tech.color}08, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
