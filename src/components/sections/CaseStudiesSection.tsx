"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import TextReveal from "@/components/ui/TextReveal";

const CASE_STUDIES = [
  {
    industry: "Healthcare",
    title: "AI Diagnostics Platform",
    before: "72h manual analysis per patient",
    after: "Real-time AI-powered diagnostics",
    metric: "96% faster",
    color: "from-teal to-cyan",
  },
  {
    industry: "FinTech",
    title: "Cloud Migration & Automation",
    before: "Legacy on-premise infrastructure",
    after: "Fully automated cloud-native platform",
    metric: "60% cost reduction",
    color: "from-electric-blue to-violet",
  },
  {
    industry: "E-Commerce",
    title: "ML Recommendation Engine",
    before: "Generic product suggestions",
    after: "Personalized AI recommendations",
    metric: "3.2× revenue lift",
    color: "from-violet to-teal",
  },
  {
    industry: "Manufacturing",
    title: "IoT & Predictive Maintenance",
    before: "Reactive equipment repairs",
    after: "AI-driven predictive maintenance",
    metric: "45% less downtime",
    color: "from-cyan to-electric-blue",
  },
];

export default function CaseStudiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="cases"
      className="section relative overflow-hidden"
      aria-label="Case Studies"
      ref={ref}
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
            Case Studies
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            <TextReveal>Transformations that speak.</TextReveal>
          </h2>
        </div>

        {/* Cards - horizontal scroll on mobile, grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-2 gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
          {CASE_STUDIES.map((study, i) => (
            <motion.div
              key={study.title}
              className="min-w-[320px] sm:min-w-[380px] lg:min-w-0 snap-center"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <GlassCard className="h-full">
                {/* Industry tag */}
                <span
                  className={`inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-gradient-to-r ${study.color} text-white mb-5`}
                >
                  {study.industry}
                </span>

                <h3 className="text-white text-xl font-bold mb-6">{study.title}</h3>

                {/* Before → After */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="text-red-400/70 text-xs font-mono mt-0.5 shrink-0">
                      BEFORE
                    </span>
                    <p className="text-muted text-sm">{study.before}</p>
                  </div>
                  <div className="flex justify-center">
                    <motion.div
                      className="text-teal text-lg"
                      animate={{ y: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      ↓
                    </motion.div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-teal text-xs font-mono mt-0.5 shrink-0">
                      AFTER
                    </span>
                    <p className="text-white text-sm font-medium">{study.after}</p>
                  </div>
                </div>

                {/* Metric */}
                <div className="pt-4 border-t border-white/5">
                  <span
                    className={`text-2xl font-bold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}
                  >
                    {study.metric}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
