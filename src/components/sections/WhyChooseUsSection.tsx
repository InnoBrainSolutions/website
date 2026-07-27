"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Layers,
  Clock,
  Rocket,
  Lock,
  Network,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import TextReveal from "@/components/ui/TextReveal";

const REASONS = [
  {
    icon: Bot,
    title: "AI-First Thinking",
    description:
      "Every solution we build starts with intelligence at its core. We don't add AI as an afterthought — it's the foundation.",
    gradient: "from-teal to-cyan",
  },
  {
    icon: Layers,
    title: "Enterprise-Grade Engineering",
    description:
      "Battle-tested architectures that scale to millions. We build for resilience, performance, and long-term maintainability.",
    gradient: "from-electric-blue to-violet",
  },
  {
    icon: Clock,
    title: "24×7 Global Support",
    description:
      "Round-the-clock monitoring and dedicated support teams. Your systems never sleep, and neither do we.",
    gradient: "from-violet to-teal",
  },
  {
    icon: Rocket,
    title: "End-to-End Delivery",
    description:
      "From strategy and design to deployment and optimization. One team, one vision, complete accountability.",
    gradient: "from-cyan to-electric-blue",
  },
  {
    icon: Lock,
    title: "Security by Design",
    description:
      "Zero-trust architecture, compliance-first development, and continuous security auditing baked into every sprint.",
    gradient: "from-teal to-violet",
  },
  {
    icon: Network,
    title: "Future-Proof Architecture",
    description:
      "We build on open standards and emerging technologies, ensuring your investment stays relevant for years to come.",
    gradient: "from-electric-blue to-teal",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function WhyChooseUsSection() {
  return (
    <section
      id="why"
      className="section relative overflow-hidden"
      aria-label="Why Choose Us"
    >
      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            className="inline-block text-teal text-sm font-medium tracking-wider uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why InnoBrain
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            <TextReveal>Built different.</TextReveal>
            <br />
            <span className="glow-text">
              <TextReveal delay={0.2}>By design.</TextReveal>
            </span>
          </h2>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div key={reason.title} variants={itemVariants} className="group">
                <GlassCard className="h-full">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal mb-5 group-hover:scale-110 group-hover:bg-teal/20 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-xl font-bold mb-3">
                    {reason.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted text-sm leading-relaxed">
                    {reason.description}
                  </p>

                  {/* Bottom gradient line */}
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <div
                      className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${reason.gradient} transition-all duration-700 rounded-full`}
                    />
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
