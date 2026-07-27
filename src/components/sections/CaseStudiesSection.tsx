"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, TrendingUp, ShoppingBag, Factory } from "lucide-react";

const CASE_STUDIES = [
  {
    industry: "Healthcare",
    icon: Activity,
    title: "AI Diagnostics Platform",
    subtitle: "Pathology AI Model Integration",
    before: "72h manual analysis per patient",
    after: "Real-time AI-powered diagnostics",
    metricValue: "96%",
    metricLabel: "Faster Processing Time",
    color: "#14B8A6",
    glowColor: "rgba(20, 184, 166, 0.15)",
  },
  {
    industry: "FinTech",
    icon: TrendingUp,
    title: "Cloud Migration & Automation",
    subtitle: "High-Frequency Trading Pipeline",
    before: "Legacy on-premise infrastructure",
    after: "Fully automated cloud-native platform",
    metricValue: "60%",
    metricLabel: "Cost Reduction",
    color: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.15)",
  },
  {
    industry: "E-Commerce",
    icon: ShoppingBag,
    title: "ML Recommendation Engine",
    subtitle: "Personalized Discovery Engine",
    before: "Generic product suggestions",
    after: "Real-time AI recommendations",
    metricValue: "3.2×",
    metricLabel: "Revenue Lift",
    color: "#8B5CF6",
    glowColor: "rgba(139, 92, 246, 0.15)",
  },
  {
    industry: "Manufacturing",
    icon: Factory,
    title: "IoT & Predictive Maintenance",
    subtitle: "Industry 4.0 Smart Factory",
    before: "Reactive equipment repairs",
    after: "AI-driven predictive maintenance",
    metricValue: "45%",
    metricLabel: "Less Downtime",
    color: "#06B6D4",
    glowColor: "rgba(6, 182, 212, 0.15)",
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
          gsap.set(panel, { opacity: 0, y: 50, autoAlpha: 0 });
        }
      });

      const totalPanels = panels.length;

      // Master scrubbing timeline pinned for smooth scrolling
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalPanels * 120}%`,
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
            y: -40,
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

        // Hold panel in place before transitioning to next
        tl.to({}, { duration: 0.6 });
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
      className="relative min-h-screen overflow-hidden bg-deep-space py-12 lg:py-0"
      aria-label="Case Studies"
    >
      {/* Dynamic ambient background glow matching active case study color */}
      <div
        className="absolute inset-0 opacity-20 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at 70% 50%, ${activeStudy.glowColor}, transparent 70%)`,
        }}
      />

      <div className="container-custom min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 relative z-10">
        {/* LEFT COLUMN: Fixed Header & Industry Progress */}
        <div className="w-full lg:w-[42%] flex flex-col justify-center pt-8 lg:pt-0">
          <span className="text-teal text-xs font-mono font-semibold tracking-[0.3em] uppercase block mb-4">
            Proven Results
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-8">
            Transformations
            <br />
            <span className="bg-gradient-to-r from-teal via-cyan to-electric-blue bg-clip-text text-transparent">
              that speak.
            </span>
          </h2>

          {/* Industry Pills Indicator */}
          <div className="flex flex-wrap gap-2.5">
            {CASE_STUDIES.map((study, i) => {
              const Icon = study.icon;
              const isActive = i === activeIndex;
              return (
                <div
                  key={study.industry}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all duration-500 ${
                    isActive
                      ? "bg-white/10 text-white border-white/30 shadow-lg scale-105"
                      : "bg-white/[0.02] text-white/40 border-white/5"
                  }`}
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: isActive ? study.color : "currentColor" }}
                  />
                  <span>{study.industry}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Floating Card Container (Fixed height to prevent layout shifts) */}
        <div className="w-full lg:w-[54%] h-[460px] sm:h-[480px] relative flex items-center">
          {CASE_STUDIES.map((study, i) => {
            const Icon = study.icon;
            const isActive = i === activeIndex;

            return (
              <div
                key={study.title}
                ref={(el) => {
                  panelsRef.current[i] = el;
                }}
                className={`absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 backdrop-blur-xl p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${
                  isActive ? "pointer-events-auto" : "pointer-events-none"
                }`}
                style={{
                  boxShadow: isActive
                    ? `0 20px 50px -10px ${study.glowColor}`
                    : undefined,
                }}
              >
                {/* Card Top Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center border"
                        style={{
                          borderColor: `${study.color}40`,
                          backgroundColor: `${study.color}15`,
                          color: study.color,
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-white/40 text-xs font-mono uppercase tracking-wider block">
                          {study.industry}
                        </span>
                        <span className="text-white/80 text-xs font-medium">
                          {study.subtitle}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-white/30">
                      0{i + 1} / 0{CASE_STUDIES.length}
                    </span>
                  </div>

                  <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight mb-6">
                    {study.title}
                  </h3>
                </div>

                {/* Before vs After Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-y border-white/10 my-auto">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-red-400/80 text-[10px] font-mono font-bold uppercase tracking-wider block mb-1">
                      Before InnoBrain
                    </span>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                      {study.before}
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-teal/10 border border-teal/20">
                    <span className="text-teal text-[10px] font-mono font-bold uppercase tracking-wider block mb-1">
                      After InnoBrain
                    </span>
                    <p className="text-white font-medium text-xs sm:text-sm leading-relaxed">
                      {study.after}
                    </p>
                  </div>
                </div>

                {/* Metric Bottom Row */}
                <div className="flex items-baseline justify-between pt-2">
                  <div>
                    <span
                      className="text-5xl sm:text-6xl font-extrabold tracking-tight block"
                      style={{ color: study.color }}
                    >
                      {study.metricValue}
                    </span>
                    <span className="text-white/60 text-xs sm:text-sm font-medium">
                      {study.metricLabel}
                    </span>
                  </div>

                  <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: study.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
