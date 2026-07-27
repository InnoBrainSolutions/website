"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-config";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const STORY_STEPS = [
  {
    title: "The world is changing.",
    subtitle: "AI is rewriting every industry.",
  },
  {
    title: "Businesses need intelligence.",
    subtitle: "Not just software.",
  },
  {
    title: "That's where InnoBrain comes in.",
    subtitle: "Engineering the future, one solution at a time.",
  },
  {
    title: "Don't build software.",
    subtitle: "Build intelligence.",
  },
];

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const steps = stepsRef.current.filter(Boolean);

      // Pin the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${steps.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      steps.forEach((step, i) => {
        if (i === 0) {
          // First step: fade in
          tl.fromTo(
            step,
            { opacity: 0, y: 60, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
          );
        } else {
          // Previous fades out, current fades in
          tl.to(steps[i - 1], {
            opacity: 0,
            y: -40,
            scale: 0.98,
            duration: 0.5,
            ease: "power2.in",
          }).fromTo(
            step,
            { opacity: 0, y: 60, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
            "-=0.2"
          );
        }

        // Hold visible
        if (i < steps.length - 1) {
          tl.to(step, { duration: 0.5 });
        }
      });

      // Fade out last step
      tl.to(steps[steps.length - 1], {
        opacity: 0,
        y: -40,
        duration: 0.5,
        ease: "power2.in",
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Our Story"
    >
      {/* Background elements */}
      <div className="absolute inset-0 mesh-gradient" />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Story steps */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        {STORY_STEPS.map((step, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) stepsRef.current[i] = el;
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <motion.div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
                {step.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-muted font-medium">
                {step.subtitle}
              </p>
            </motion.div>

            {/* Decorative orb */}
            <div
              className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-[100px]"
              style={{
                background: i % 2 === 0
                  ? "radial-gradient(circle, var(--teal), transparent)"
                  : "radial-gradient(circle, var(--violet), transparent)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
