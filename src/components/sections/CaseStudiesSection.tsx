"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, TrendingUp, ShoppingBag, Factory, ArrowRight } from "lucide-react";

const CASE_STUDIES = [
  {
    industry: "Healthcare",
    icon: Activity,
    title: "AI Diagnostics Platform",
    subtitle: "Enterprise Pathology AI Model Integration",
    before: "72h manual analysis per patient record",
    after: "Real-time automated AI-powered diagnostics",
    metricValue: "96%",
    metricLabel: "Faster Processing Time",
    color: "#14B8A6",
    glowColor: "rgba(20, 184, 166, 0.18)",
  },
  {
    industry: "FinTech",
    icon: TrendingUp,
    title: "Cloud Migration & Automation",
    subtitle: "High-Frequency Trading Pipeline",
    before: "Legacy slow on-premise infrastructure",
    after: "Fully automated cloud-native platform",
    metricValue: "60%",
    metricLabel: "Infrastructure Cost Reduction",
    color: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.18)",
  },
  {
    industry: "E-Commerce",
    icon: ShoppingBag,
    title: "ML Recommendation Engine",
    subtitle: "Real-Time Discovery Engine",
    before: "Generic static product suggestions",
    after: "Hyper-personalized AI recommendations",
    metricValue: "3.2×",
    metricLabel: "Direct Revenue Lift",
    color: "#8B5CF6",
    glowColor: "rgba(139, 92, 246, 0.18)",
  },
  {
    industry: "Manufacturing",
    icon: Factory,
    title: "IoT & Predictive Maintenance",
    subtitle: "Industry 4.0 Smart Factory System",
    before: "Reactive emergency equipment repairs",
    after: "AI-driven predictive maintenance",
    metricValue: "45%",
    metricLabel: "Reduction in Unplanned Downtime",
    color: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.18)",
  },
];

export default function CaseStudiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
      if (panels.length === 0) return;

      // Set initial states: panel 0 visible, rest hidden below
      panels.forEach((panel, i) => {
        if (i === 0) {
          gsap.set(panel, { opacity: 1, y: 0, autoAlpha: 1 });
        } else {
          gsap.set(panel, { opacity: 0, y: 60, autoAlpha: 0 });
        }
      });

      const totalPanels = panels.length;

      // Master scrubbing timeline pinned for smooth scrolling
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalPanels * 130}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              totalPanels - 1,
              Math.floor(self.progress * totalPanels)
            );
            setActiveIndex(idx);
          },
        },
      });

      // Animate between panels smoothly without overlaps
      for (let i = 0; i < totalPanels - 1; i++) {
        const current = panels[i];
        const next = panels[i + 1];

        tl.to(
          current,
          {
            opacity: 0,
            y: -50,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          `step-${i}`
        ).to(
          next,
          {
            opacity: 1,
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power2.inOut",
          },
          `step-${i}+=0.2`
        );

        tl.to({}, { duration: 0.7 });
      }

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef }
  );

  const activeStudy = CASE_STUDIES[activeIndex];

  return (
    <section
      id="cases"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-space py-20 lg:py-24"
      aria-label="Case Studies"
    >
      {/* Dynamic ambient background glow matching active case study color */}
      <div
        className="absolute inset-0 opacity-25 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(900px circle at 75% 50%, ${activeStudy.glowColor}, transparent 70%)`,
        }}
      />

      <div className="container-custom w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 relative z-10">
        {/* LEFT COLUMN: Fixed Header & Industry Progress (40% Ratio) */}
        <div className="w-full lg:w-[40%] xl:w-[38%] flex flex-col justify-center">
          <span className="text-teal text-xs font-mono font-semibold tracking-[0.3em] uppercase block mb-4">
            Proven Results
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[0.95] mb-8">
            Transformations
            <br />
            <span className="bg-gradient-to-r from-teal via-cyan to-electric-blue bg-clip-text text-transparent">
              that speak.
            </span>
          </h2>

          <p className="text-white/50 text-base sm:text-lg font-light mb-10 max-w-md">
            Real enterprise deployments engineered for performance, precision, and measurable ROI.
          </p>

          {/* Industry Pills Indicator */}
          <div className="flex flex-wrap gap-3">
            {CASE_STUDIES.map((study, i) => {
              const Icon = study.icon;
              const isActive = i === activeIndex;
              return (
                <div
                  key={study.industry}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-500 ${
                    isActive
                      ? "bg-white/10 text-white border-white/40 shadow-xl scale-105"
                      : "bg-white/[0.02] text-white/40 border-white/5"
                  }`}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: isActive ? study.color : "currentColor" }}
                  />
                  <span>{study.industry}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Full-Height Showcase Card Container (60% Ratio) */}
        <div className="w-full lg:w-[58%] xl:w-[60%] h-[520px] sm:h-[550px] lg:h-[580px] relative flex items-center">
          {CASE_STUDIES.map((study, i) => {
            const Icon = study.icon;
            const isActive = i === activeIndex;

            return (
              <div
                key={study.title}
                ref={(el) => {
                  panelsRef.current[i] = el;
                }}
                className={`absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 backdrop-blur-2xl p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-[0_25px_70px_rgba(0,0,0,0.7)] ${
                  isActive ? "pointer-events-auto" : "pointer-events-none"
                }`}
                style={{
                  boxShadow: isActive
                    ? `0 25px 60px -10px ${study.glowColor}`
                    : undefined,
                }}
              >
                {/* Card Top Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                        style={{
                          borderColor: `${study.color}40`,
                          backgroundColor: `${study.color}15`,
                          color: study.color,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-white/40 text-xs font-mono uppercase tracking-widest block">
                          {study.industry}
                        </span>
                        <span className="text-white/80 text-xs sm:text-sm font-medium">
                          {study.subtitle}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-white/40 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      0{i + 1} / 0{CASE_STUDIES.length}
                    </span>
                  </div>

                  <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-2">
                    {study.title}
                  </h3>
                </div>

                {/* Before vs After Comparison Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-y border-white/10 my-auto">
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-red-400/80 text-xs font-mono font-bold uppercase tracking-wider block mb-1.5">
                      Before InnoBrain
                    </span>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                      {study.before}
                    </p>
                  </div>
                  <div className="p-4 sm:p-5 rounded-2xl bg-teal/10 border border-teal/20">
                    <span className="text-teal text-xs font-mono font-bold uppercase tracking-wider block mb-1.5">
                      After InnoBrain
                    </span>
                    <p className="text-white font-medium text-xs sm:text-sm leading-relaxed">
                      {study.after}
                    </p>
                  </div>
                </div>

                {/* Metric Bottom Showcase Row */}
                <div className="flex items-end justify-between pt-2">
                  <div>
                    <span
                      className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-none block"
                      style={{ color: study.color }}
                    >
                      {study.metricValue}
                    </span>
                    <span className="text-white/70 text-sm sm:text-base font-medium mt-1 block">
                      {study.metricLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-white/40 text-xs font-mono">
                    <span>CASE STUDY</span>
                    <ArrowRight className="w-4 h-4 text-teal" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
