"use client";

import { motion } from "framer-motion";
import { Quote, ShieldCheck } from "lucide-react";

const PARTNER_LOGOS = [
  "AWS",
  "Microsoft Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "TensorFlow",
  "OpenAI",
  "Vercel",
  "MongoDB",
  "Redis",
  "PostgreSQL",
  "Cloudflare",
];

const TRUST_BADGES = [
  "SOC2 Compliant",
  "ISO 27001",
  "GDPR Ready",
  "AWS Partner",
];

export default function TrustSection() {
  return (
    <section
      id="trust"
      className="relative overflow-hidden bg-deep-space py-24 lg:py-32"
      aria-label="Trust & Social Proof"
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Infinite Logo Marquee */}
      <div className="relative mb-20 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-deep-space to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-deep-space to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-16 whitespace-nowrap">
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-white/15 text-sm font-semibold tracking-wide shrink-0 hover:text-white/40 transition-colors duration-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Central Testimonial */}
      <div className="container-custom relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Quote className="w-10 h-10 text-teal/30 mx-auto mb-8" />

          <blockquote className="text-xl sm:text-2xl md:text-3xl font-light text-white/80 leading-relaxed mb-10 italic">
            &ldquo;InnoBrain didn&apos;t just build our AI platform — they
            fundamentally changed how we think about engineering. Our processing
            pipeline went from 72 hours to real-time. That&apos;s not incremental
            improvement. That&apos;s transformation.&rdquo;
          </blockquote>

          <div className="flex flex-col items-center gap-1">
            <span className="text-white font-semibold text-sm">
              Dr. Arjun Mehta
            </span>
            <span className="text-muted text-xs">
              CTO, MedVision AI — Series B Healthcare Platform
            </span>
          </div>
        </motion.div>
      </div>

      {/* Trust Badges Row */}
      <motion.div
        className="container-custom mt-20 flex justify-center flex-wrap gap-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {TRUST_BADGES.map((badge) => (
          <div
            key={badge}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-white/30 text-xs font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-teal/50" />
            {badge}
          </div>
        ))}
      </motion.div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
