"use client";

import { useRef, useEffect } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);

  // Smooth video currentTime lerp loop for 120Hz scroll scrubbing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    const smoothVideoScrub = () => {
      if (video && video.duration) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.01) {
          video.currentTime += diff * 0.15;
        }
      }
      rafId = requestAnimationFrame(smoothVideoScrub);
    };

    rafId = requestAnimationFrame(smoothVideoScrub);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const steps = stepsRef.current.filter(Boolean);

      // Pin the container and drive both text & video scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${steps.length * 120}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (videoRef.current && videoRef.current.duration) {
              targetTimeRef.current = videoRef.current.duration * self.progress;
            }
          },
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
          tl.to(step, { duration: 0.8 });
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-space"
      aria-label="Our Story"
    >
      {/* Scroll-driven 4K Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/7077025-uhd_4096_2160_30fps.mp4"
          preload="auto"
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 mix-blend-screen transform-gpu translate-z-0"
        />
        {/* Dark vignettes for optimal text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space/80 via-transparent to-deep-space pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-space/60 via-transparent to-deep-space/60 pointer-events-none" />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 z-[1] mesh-gradient opacity-30 pointer-events-none" />

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
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 leading-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
                {step.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-teal font-semibold drop-shadow-md">
                {step.subtitle}
              </p>
            </motion.div>

            {/* Glowing background aura */}
            <div
              className="absolute w-[350px] h-[350px] rounded-full opacity-20 blur-[110px] pointer-events-none"
              style={{
                background:
                  i % 2 === 0
                    ? "radial-gradient(circle, var(--teal), transparent)"
                    : "radial-gradient(circle, var(--electric-blue), transparent)",
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
