"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Activity, TrendingUp, ShoppingBag, Factory } from "lucide-react";

const CASE_STUDIES = [
  {
    industry: "Healthcare",
    icon: Activity,
    title: "AI Diagnostics Platform",
    before: "72h manual analysis per patient",
    after: "Real-time AI-powered diagnostics",
    metricValue: "96%",
    metricLabel: "faster",
    color: "#14B8A6",
  },
  {
    industry: "FinTech",
    icon: TrendingUp,
    title: "Cloud Migration & Automation",
    before: "Legacy on-premise infrastructure",
    after: "Fully automated cloud-native platform",
    metricValue: "60%",
    metricLabel: "cost reduction",
    color: "#3B82F6",
  },
  {
    industry: "E-Commerce",
    icon: ShoppingBag,
    title: "ML Recommendation Engine",
    before: "Generic product suggestions",
    after: "Personalized AI recommendations",
    metricValue: "3.2×",
    metricLabel: "revenue lift",
    color: "#8B5CF6",
  },
  {
    industry: "Manufacturing",
    icon: Factory,
    title: "IoT & Predictive Maintenance",
    before: "Reactive equipment repairs",
    after: "AI-driven predictive maintenance",
    metricValue: "45%",
    metricLabel: "less downtime",
    color: "#06B6D4",
  },
];

export default function CaseStudiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);
  const industryRef = useRef<HTMLSpanElement>(null);
  const colorBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const panels = panelsRef.current.filter(Boolean);
      const totalPanels = panels.length;

      // Pin the entire section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalPanels * 100}%`,
        pin: true,
        anticipatePin: 1,
      });

      // Animate each panel in/out on the right side
      panels.forEach((panel, i) => {
        const study = CASE_STUDIES[i];

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: () => `${(i / totalPanels) * 100}% top`,
          end: () => `${((i + 1) / totalPanels) * 100}% top`,
          onEnter: () => {
            // Fade in current panel
            gsap.to(panel, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            });
            // Update left-side industry label
            if (industryRef.current) {
              industryRef.current.textContent = study.industry;
            }
            // Update color accent bar
            if (colorBarRef.current) {
              gsap.to(colorBarRef.current, {
                backgroundColor: study.color,
                duration: 0.5,
              });
            }
          },
          onEnterBack: () => {
            gsap.to(panel, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            });
            if (industryRef.current) {
              industryRef.current.textContent = study.industry;
            }
            if (colorBarRef.current) {
              gsap.to(colorBarRef.current, {
                backgroundColor: study.color,
                duration: 0.5,
              });
            }
          },
          onLeave: () => {
            if (i < totalPanels - 1) {
              gsap.to(panel, {
                opacity: 0,
                y: -40,
                duration: 0.4,
                ease: "power2.in",
              });
            }
          },
          onLeaveBack: () => {
            if (i > 0) {
              gsap.to(panel, {
                opacity: 0,
                y: 40,
                duration: 0.4,
                ease: "power2.in",
              });
            }
          },
        });

        // Set initial state: only first panel visible
        if (i > 0) {
          gsap.set(panel, { opacity: 0, y: 40 });
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="cases"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-deep-space"
      aria-label="Case Studies"
    >
      <div className="h-screen flex">
        {/* LEFT: Sticky context column */}
        <div
          ref={leftRef}
          className="hidden lg:flex w-[45%] flex-col justify-center px-16 relative"
        >
          {/* Vertical color accent bar */}
          <div
            ref={colorBarRef}
            className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-full transition-colors duration-500"
            style={{ backgroundColor: CASE_STUDIES[0].color }}
          />

          <span className="text-teal text-xs font-mono font-semibold tracking-[0.3em] uppercase block mb-6">
            Proven Results
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Transformations
            <br />
            <span className="text-white/30">that speak.</span>
          </h2>
          <div className="flex items-center gap-3 mt-8">
            <div className="w-2 h-2 rounded-full bg-teal" />
            <span
              ref={industryRef}
              className="text-white/60 text-sm font-medium tracking-wide"
            >
              {CASE_STUDIES[0].industry}
            </span>
          </div>
        </div>

        {/* RIGHT: Scrolling case study panels */}
        <div className="w-full lg:w-[55%] flex items-center justify-center px-8 lg:px-16 relative">
          {/* Mobile header */}
          <div className="lg:hidden absolute top-8 left-8">
            <span className="text-teal text-xs font-mono font-semibold tracking-[0.3em] uppercase">
              Case Studies
            </span>
          </div>

          {CASE_STUDIES.map((study, i) => {
            const Icon = study.icon;
            return (
              <div
                key={study.title}
                ref={(el) => {
                  if (el) panelsRef.current[i] = el;
                }}
                className="absolute inset-0 flex items-center justify-center px-8 lg:px-16"
              >
                <div className="max-w-lg w-full space-y-8">
                  {/* Industry + Icon */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border"
                      style={{
                        borderColor: `${study.color}40`,
                        backgroundColor: `${study.color}10`,
                        color: study.color,
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-white/60 text-sm font-medium">
                      {study.industry}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
                    {study.title}
                  </h3>

                  {/* Before → After */}
                  <div className="space-y-4 py-6 border-y border-white/5">
                    <div className="flex items-start gap-3">
                      <span className="text-red-400/60 text-[10px] font-mono font-semibold uppercase tracking-wider mt-1 shrink-0 w-14">
                        Before
                      </span>
                      <p className="text-white/50 text-sm">{study.before}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-teal text-[10px] font-mono font-semibold uppercase tracking-wider mt-1 shrink-0 w-14">
                        After
                      </span>
                      <p className="text-white text-sm font-medium">
                        {study.after}
                      </p>
                    </div>
                  </div>

                  {/* The massive metric */}
                  <div>
                    <span
                      className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight"
                      style={{ color: study.color }}
                    >
                      {study.metricValue}
                    </span>
                    <span className="block text-white/40 text-sm font-medium mt-2">
                      {study.metricLabel}
                    </span>
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
