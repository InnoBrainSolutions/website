"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Activity,
  TrendingUp,
  ShoppingBag,
  Factory,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";
import ParticleField from "@/components/effects/ParticleField";

const CASE_STUDIES = [
  {
    industry: "Healthcare",
    icon: Activity,
    title: "AI Diagnostics Platform",
    subtitle: "Enterprise Pathology AI Model Integration",
    before: "72h manual analysis per patient",
    after: "Real-time AI-powered diagnostics",
    metricValue: "96%",
    metricLabel: "Faster Processing Time",
    gradient: "from-teal via-cyan to-electric-blue",
    glowColor: "rgba(20, 184, 166, 0.18)",
    accentBorder: "rgba(20, 184, 166, 0.4)",
  },
  {
    industry: "FinTech",
    icon: TrendingUp,
    title: "Cloud Migration & Automation",
    subtitle: "High-Frequency Automated Trading Pipeline",
    before: "Legacy on-premise infrastructure",
    after: "Fully automated cloud-native platform",
    metricValue: "60%",
    metricLabel: "Infrastructure Cost Reduction",
    gradient: "from-electric-blue via-violet to-teal",
    glowColor: "rgba(59, 130, 246, 0.18)",
    accentBorder: "rgba(59, 130, 246, 0.4)",
  },
  {
    industry: "E-Commerce",
    icon: ShoppingBag,
    title: "ML Recommendation Engine",
    subtitle: "Real-time Hyper-Personalized Discovery Engine",
    before: "Generic static product suggestions",
    after: "Personalized AI recommendations",
    metricValue: "3.2×",
    metricLabel: "Revenue Lift Per User",
    gradient: "from-violet via-teal to-cyan",
    glowColor: "rgba(139, 92, 246, 0.18)",
    accentBorder: "rgba(139, 92, 246, 0.4)",
  },
  {
    industry: "Manufacturing",
    icon: Factory,
    title: "IoT & Predictive Maintenance",
    subtitle: "Computer Vision & Sensor Anomaly Detector",
    before: "Reactive equipment repairs & downtime",
    after: "AI-driven predictive maintenance",
    metricValue: "45%",
    metricLabel: "Downtime Reduction",
    gradient: "from-cyan via-electric-blue to-teal",
    glowColor: "rgba(6, 182, 212, 0.18)",
    accentBorder: "rgba(6, 182, 212, 0.4)",
  },
];

interface CaseStudyCardProps {
  study: (typeof CASE_STUDIES)[0];
  index: number;
  isInView: boolean;
}

function CaseStudyCard({ study, index, isInView }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const IndustryIcon = study.icon;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setTransform({
      rotateX: (y - 0.5) * -10,
      rotateY: (x - 0.5) * 10,
    });
    setMousePos({
      x: x * 100,
      y: y * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setMousePos({ x: 50, y: 50 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: transform.rotateX,
          rotateY: transform.rotateY,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        className="group relative h-full rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/[0.08] p-7 sm:p-8 backdrop-blur-xl transition-colors duration-500 hover:border-white/20 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        {/* Dynamic Cursor Spotlight Effect */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, ${study.glowColor}, transparent 65%)`,
          }}
        />

        {/* Dynamic Glowing Border Follower */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%, ${study.accentBorder}, transparent 70%)`,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
          {/* Top Industry & Title Header */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/5 border border-white/10 text-white/90 group-hover:border-teal/30 group-hover:text-teal transition-all duration-300">
                <IndustryIcon className="w-3.5 h-3.5 text-teal" />
                {study.industry}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-teal/70 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-teal" /> Verified Impact
              </span>
            </div>

            <h3 className="text-white text-2xl font-bold tracking-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-teal transition-all duration-300">
              {study.title}
            </h3>
            <p className="text-muted/70 text-xs font-medium">
              {study.subtitle}
            </p>
          </div>

          {/* Before vs After Split Comparison Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-black/40 border border-white/5 group-hover:border-white/10 transition-colors duration-300">
            {/* Before Box */}
            <div className="p-3 rounded-lg bg-red-500/[0.04] border border-red-500/10 space-y-1.5">
              <div className="flex items-center gap-1.5 text-red-400/80 text-[10px] font-mono font-semibold uppercase tracking-wider">
                <AlertCircle className="w-3 h-3" />
                Legacy State
              </div>
              <p className="text-muted/90 text-xs leading-snug">
                {study.before}
              </p>
            </div>

            {/* After Box */}
            <div className="p-3 rounded-lg bg-teal-500/[0.08] border border-teal-500/20 space-y-1.5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-teal text-[10px] font-mono font-semibold uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3" />
                  InnoBrain Solution
                </div>
                <ArrowRight className="w-3 h-3 text-teal opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <p className="text-white text-xs font-medium leading-snug">
                {study.after}
              </p>
            </div>
          </div>

          {/* High-Impact Metric Display */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r ${study.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 inline-block`}
                >
                  {study.metricValue}
                </span>
              </div>
              <span className="text-muted text-xs font-medium block mt-1">
                {study.metricLabel}
              </span>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted group-hover:bg-teal group-hover:text-deep-space group-hover:border-teal transition-all duration-300 shadow-md">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CaseStudiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="cases"
      className="section relative overflow-hidden py-28 lg:py-36 bg-deep-space"
      aria-label="Case Studies"
      ref={ref}
    >
      <ParticleField particleCount={25} />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.span
            className="inline-block text-teal text-sm font-medium tracking-wider uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Proven Track Record
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            <TextReveal>Transformations that speak.</TextReveal>
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
            See how our enterprise AI and cloud solutions deliver measurable ROI,
            speed, and operational excellence.
          </p>
        </div>

        {/* 2x2 Interactive Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyCard
              key={study.title}
              study={study}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
