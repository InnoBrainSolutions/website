"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import TextReveal from "@/components/ui/TextReveal";
import GridBackground from "@/components/effects/GridBackground";

const SERVICES = [
  {
    icon: "🧠",
    title: "AI Development",
    description: "Custom AI models, LLM integration, and intelligent automation that transforms your business processes.",
  },
  {
    icon: "☁️",
    title: "Cloud Engineering",
    description: "Scalable, resilient cloud architecture on AWS, Azure, and GCP with infrastructure as code.",
  },
  {
    icon: "🛡️",
    title: "Cyber Security",
    description: "Enterprise-grade security solutions, penetration testing, and compliance frameworks.",
  },
  {
    icon: "⚙️",
    title: "DevOps Solutions",
    description: "CI/CD pipelines, containerization, and automated deployment workflows that accelerate delivery.",
  },
  {
    icon: "🌐",
    title: "Web Applications",
    description: "Modern, performant web platforms built with React, Next.js, and cutting-edge technologies.",
  },
  {
    icon: "📱",
    title: "Mobile Applications",
    description: "Native and cross-platform mobile experiences with Flutter and React Native.",
  },
  {
    icon: "📊",
    title: "Machine Learning",
    description: "Predictive analytics, computer vision, NLP, and deep learning solutions at scale.",
  },
  {
    icon: "🤖",
    title: "Automation",
    description: "End-to-end workflow automation, RPA, and intelligent process optimization.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="section relative overflow-hidden"
      aria-label="Our Services"
    >
      <GridBackground />

      <div className="container-custom relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            className="inline-block text-teal text-sm font-medium tracking-wider uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What We Build
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            <TextReveal delay={0.1}>Don&apos;t build software.</TextReveal>
            <br />
            <span className="glow-text">
              <TextReveal delay={0.3}>Build intelligence.</TextReveal>
            </span>
          </h2>
          <motion.p
            className="text-muted text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            From concept to production — we deliver end-to-end technology solutions
            that drive measurable business outcomes.
          </motion.p>
        </div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {SERVICES.map((service) => (
            <motion.div key={service.title} variants={itemVariants} className="group">
              <GlassCard className="h-full hover:scale-[1.02] transition-transform duration-300">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
