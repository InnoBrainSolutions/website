"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  Brain,
  Cloud,
  ShieldCheck,
  Globe,
  Sparkles,
  Zap,
} from "lucide-react";

const SERVICES = [
  {
    num: "01",
    icon: Brain,
    title: "AI & Generative Intelligence",
    description:
      "Custom LLMs, private RAG pipelines, autonomous AI agents, and predictive models engineered for enterprise data sovereignty and sub-second latency.",
    gradient: "from-teal to-cyan",
    glowColor: "rgba(20, 184, 166, 0.12)",
  },
  {
    num: "02",
    icon: Globe,
    title: "Enterprise Web & SaaS",
    description:
      "Next.js application architectures, multi-tenant microservices, and high-performance API ecosystems built for zero-downtime scale.",
    gradient: "from-electric-blue to-violet",
    glowColor: "rgba(59, 130, 246, 0.12)",
  },
  {
    num: "03",
    icon: Cloud,
    title: "Cloud DevOps & Architecture",
    description:
      "Infrastructure-as-code on AWS and Azure, Kubernetes orchestration, and continuous zero-downtime CI/CD deployment pipelines.",
    gradient: "from-violet to-teal",
    glowColor: "rgba(139, 92, 246, 0.12)",
  },
  {
    num: "04",
    icon: Zap,
    title: "Intelligent Automation & n8n",
    description:
      "Event-driven n8n workflows, custom RPA pipelines, and automated task orchestration across enterprise legacy and cloud platforms.",
    gradient: "from-cyan to-electric-blue",
    glowColor: "rgba(6, 182, 212, 0.12)",
  },
  {
    num: "05",
    icon: Sparkles,
    title: "Mobile Systems Engineering",
    description:
      "Native iOS & Android applications built with React Native and Flutter, offline-first sync, and bank-grade data security.",
    gradient: "from-teal to-violet",
    glowColor: "rgba(20, 184, 166, 0.12)",
  },
  {
    num: "06",
    icon: ShieldCheck,
    title: "Cyber Security & Zero-Trust",
    description:
      "Zero-trust network architecture, automated security compliance audits, SOC2 readiness, and continuous threat monitoring.",
    gradient: "from-electric-blue to-teal",
    glowColor: "rgba(59, 130, 246, 0.12)",
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const scrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-deep-space"
      aria-label="Our Services"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent z-10" />

      {/* Fixed Header — stays visible during horizontal scroll */}
      <div className="absolute top-28 lg:top-32 left-0 z-20 px-8 lg:px-16">
        <span className="text-teal text-xs font-mono font-semibold tracking-[0.3em] uppercase block mb-2">
          What We Build
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Capabilities
        </h2>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex items-center h-screen gap-8 px-8 lg:px-16 pt-48 lg:pt-56 will-change-transform"
        style={{ width: `${SERVICES.length * 55 + 20}vw` }}
      >
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              className="group relative flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[45vw] lg:w-[40vw] h-[55vh] sm:h-[58vh] lg:h-[60vh] rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/[0.08] hover:border-white/20 backdrop-blur-xl overflow-hidden transition-colors duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Ambient glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at 50% 80%, ${service.glowColor}, transparent 70%)`,
                }}
              />

              <div className="relative z-10 flex flex-col justify-between h-full p-8 sm:p-10 lg:p-12">
                {/* Top: Number + Icon */}
                <div className="flex items-start justify-between">
                  <span className="text-7xl sm:text-8xl font-extrabold text-white/[0.04] leading-none">
                    {service.num}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-deep-space group-hover:border-teal transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                </div>

                {/* Bottom: Title + Description */}
                <div>
                  <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted text-sm sm:text-base leading-relaxed max-w-sm">
                    {service.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-8 pt-6 border-t border-white/5">
                    <div
                      className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${service.gradient} transition-all duration-700 rounded-full`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom scroll progress indicator */}
      <div className="absolute bottom-8 left-8 right-8 lg:left-16 lg:right-16 z-20">
        <div className="h-px bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-teal to-electric-blue rounded-full origin-left"
            style={{ scaleX: 0 }}
            id="services-progress"
          />
        </div>
      </div>
    </section>
  );
}
