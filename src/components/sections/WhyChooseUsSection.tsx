"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Cpu,
  Clock,
  Rocket,
  ShieldCheck,
  Network,
  Sparkles,
} from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";
import ParticleField from "@/components/effects/ParticleField";

const REASONS = [
  {
    num: "01",
    tag: "IP OWNERSHIP",
    icon: Rocket,
    title: "100% Code & IP Ownership",
    description:
      "Zero vendor lock-in. Full ownership of all source code, deployment assets, and technical documentation delivered directly to your repositories.",
    gradient: "from-teal via-cyan to-electric-blue",
    glowColor: "rgba(20, 184, 166, 0.15)",
    iconBg: "bg-teal/10 border-teal/30 text-teal",
  },
  {
    num: "02",
    tag: "PRODUCTION FIRST",
    icon: Cpu,
    title: "Production-First Mindset",
    description:
      "We build resilient systems designed for high concurrency, 99.99% uptime, sub-100ms API responses, and edge-case operational integrity.",
    gradient: "from-electric-blue via-violet to-teal",
    glowColor: "rgba(59, 130, 246, 0.15)",
    iconBg: "bg-electric-blue/10 border-electric-blue/30 text-electric-blue",
  },
  {
    num: "03",
    tag: "SENIOR TALENT",
    icon: Bot,
    title: "Senior Engineering Squads",
    description:
      "Led by veteran software architects and AI engineers with deep domain expertise. Direct communication without layers of account management.",
    gradient: "from-violet via-teal to-cyan",
    glowColor: "rgba(139, 92, 246, 0.15)",
    iconBg: "bg-violet/10 border-violet/30 text-violet",
  },
  {
    num: "04",
    tag: "TRANSPARENT SPRINT",
    icon: Clock,
    title: "Real-Time Sprint Telemetry",
    description:
      "Weekly production deployment cycles, automated CI/CD visibility, and direct Slack/Teams integration. Total progress transparency.",
    gradient: "from-cyan via-electric-blue to-teal",
    glowColor: "rgba(6, 182, 212, 0.15)",
    iconBg: "bg-cyan/10 border-cyan/30 text-cyan",
  },
  {
    num: "05",
    tag: "ZERO TRUST",
    icon: ShieldCheck,
    title: "Data Sovereignty & Privacy",
    description:
      "Zero-trust network architecture and private model deployment. Your proprietary enterprise data is never exposed to public LLMs.",
    gradient: "from-teal via-violet to-electric-blue",
    glowColor: "rgba(20, 184, 166, 0.15)",
    iconBg: "bg-teal/10 border-teal/30 text-teal",
  },
  {
    num: "06",
    tag: "FUTURE PROOF",
    icon: Network,
    title: "Decoupled Scalable Stack",
    description:
      "Built on open standards, decoupled microservices, and modern Next.js/Cloud frameworks ensuring long-term agility and zero tech debt.",
    gradient: "from-electric-blue via-teal to-cyan",
    glowColor: "rgba(59, 130, 246, 0.15)",
    iconBg: "bg-electric-blue/10 border-electric-blue/30 text-electric-blue",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

interface ReasonCardProps {
  reason: (typeof REASONS)[0];
}

function ReasonCard({ reason }: ReasonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const Icon = reason.icon;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 35 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className="h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col justify-between h-full rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.015] border border-white/[0.08] hover:border-white/20 p-8 backdrop-blur-xl transition-all duration-300 transform-gpu translate-z-0 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.4)] cursor-default"
      >
        {/* Dynamic Cursor Spotlight Effect */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, ${reason.glowColor}, transparent 65%)`,
          }}
        />

        {/* Ambient Top Subtle Gradient Light */}
        <div
          className="absolute top-0 right-0 w-36 h-36 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${reason.glowColor}, transparent)`,
          }}
        />

        <div>
          {/* Card Top Header: Icon Badge & Number */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.2)] ${reason.iconBg}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-teal/80 bg-teal/5 border border-teal/15 px-2.5 py-1 rounded-full uppercase">
                {reason.tag}
              </span>
            </div>

            <span className="text-2xl font-mono font-extrabold text-white/20 group-hover:text-white/40 transition-colors duration-300">
              {reason.num}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-white text-xl font-bold tracking-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-teal transition-all duration-300">
            {reason.title}
          </h3>

          {/* Description */}
          <p className="text-muted text-sm leading-relaxed">
            {reason.description}
          </p>
        </div>

        {/* Bottom Expandable Accent Line */}
        <div className="mt-8 pt-4 border-t border-white/5 relative">
          <div className="flex items-center justify-between text-xs text-muted/60 font-mono">
            <span className="group-hover:text-teal transition-colors">
              INNOBRAIN ADVANTAGE
            </span>
            <Sparkles className="w-3.5 h-3.5 text-teal/50 group-hover:text-teal group-hover:rotate-12 transition-all duration-300" />
          </div>

          {/* Glowing Animated Gradient Beam */}
          <div
            className={`absolute -top-px left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${reason.gradient} transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(20,184,166,0.6)]`}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUsSection() {
  return (
    <section
      id="why"
      className="section relative overflow-hidden py-28 lg:py-36 bg-deep-space"
      aria-label="Why Choose Us"
    >
      <ParticleField particleCount={20} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            className="inline-block text-teal text-sm font-medium tracking-wider uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why InnoBrain
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            <TextReveal>Built different.</TextReveal>
            <br />
            <span className="glow-text">
              <TextReveal delay={0.2}>By design.</TextReveal>
            </span>
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
            We don&apos;t just deliver code — we partner with forward-thinking enterprises
            to build intelligent, future-proof engineering platforms.
          </p>
        </div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {REASONS.map((reason) => (
            <ReasonCard key={reason.title} reason={reason} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
