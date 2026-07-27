"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Globe, Share2, Code2, Video, ArrowUpRight } from "lucide-react";

// ────────────────────────────────────────────
// Animated Fluid Drip Effect Component
// ────────────────────────────────────────────

function FluidDripEffect() {
  // Generate 16 randomized drip drops across the width
  const drops = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i / 16) * 100 + (Math.random() * 3 - 1.5)}%`,
      height: 35 + Math.random() * 45,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      color:
        i % 3 === 0
          ? "#14B8A6" // Teal
          : i % 3 === 1
          ? "#06B6D4" // Cyan
          : "#8B5CF6", // Violet
    }));
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden pointer-events-none z-10">
      {drops.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute top-0 w-[2px] rounded-full"
          style={{
            left: drop.left,
            height: `${drop.height}px`,
            background: `linear-gradient(to bottom, ${drop.color}, transparent)`,
            boxShadow: `0 0 10px ${drop.color}`,
          }}
          animate={{
            y: [-10, 30, -10],
            opacity: [0.2, 0.85, 0.2],
            scaleY: [0.6, 1.2, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: drop.duration,
            delay: drop.delay,
            ease: "easeInOut",
          }}
        >
          {/* Glowing liquid drop bulb at the tip */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: drop.color,
              boxShadow: `0 0 12px ${drop.color}, 0 0 20px ${drop.color}`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ────────────────────────────────────────────
// Navigation Links & Social Data
// ────────────────────────────────────────────

const FOOTER_NAV = [
  {
    title: "SOLUTIONS",
    links: [
      { label: "AI Development", href: "/solutions/ai" },
      { label: "Software Engineering", href: "/solutions/software" },
      { label: "Cloud & DevOps", href: "/solutions/cloud" },
      { label: "Cybersecurity", href: "/solutions/cybersecurity" },
      { label: "Intelligent Automation", href: "/solutions/automation" },
    ],
  },
  {
    title: "INDUSTRIES",
    links: [
      { label: "Healthcare AI", href: "/industries/healthcare" },
      { label: "FinTech Cloud", href: "/industries/fintech" },
      { label: "E-Commerce ML", href: "/industries/retail" },
      { label: "Smart Manufacturing", href: "/industries/manufacturing" },
      { label: "Startups & Scaleups", href: "/industries/startups" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "Our Story & Vision", href: "/company/vision" },
      { label: "Case Studies", href: "/work/cases" },
      { label: "Insights & Research", href: "/insights/research" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const SOCIAL_LINKS = [
  { name: "LinkedIn", icon: Globe, href: "#" },
  { name: "Twitter", icon: Share2, href: "#" },
  { name: "GitHub", icon: Code2, href: "#" },
  { name: "YouTube", icon: Video, href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-deep-space border-t border-white/[0.08] overflow-hidden text-white">
      {/* Animated Fluid Drip Effect at Top Border */}
      <FluidDripEffect />

      {/* Top Accent Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal to-electric-blue" />

      {/* Ambient Color Theme Gradient Orbs */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--teal), transparent)" }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full blur-[120px] opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--violet), transparent)" }}
      />

      <div className="container-custom relative z-20 pt-16 pb-12 lg:pt-20 lg:pb-14">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/[0.08]">
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold tracking-tighter text-white">
                INNO
                <span className="bg-gradient-to-r from-teal via-cyan to-electric-blue bg-clip-text text-transparent">
                  BRAIN
                </span>
              </span>
            </div>

            <p className="text-white/60 text-sm leading-relaxed max-w-sm font-light">
              Engineering intelligence. Building tomorrow. We help enterprises
              architect and scale AI-first systems with speed and security.
            </p>

            {/* Newsletter Subscription */}
            <div className="max-w-sm pt-2">
              <span className="text-teal text-xs font-mono tracking-wider uppercase block mb-3 font-semibold">
                Join the AI Engineering Digest
              </span>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="Enter work email"
                  className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-teal/60 focus:bg-white/[0.05] transition-colors"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal via-cyan to-electric-blue text-deep-space font-bold text-xs hover:shadow-[0_0_25px_rgba(20,184,166,0.5)] transition-all duration-300 shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-teal hover:border-teal/40 hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation Columns */}
          {FOOTER_NAV.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-teal text-xs font-mono font-semibold tracking-[0.2em] uppercase">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white text-xs sm:text-sm font-light transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-teal" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            © {new Date().getFullYear()} InnoBrain IT & AI Services Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-white/80 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white/80 transition-colors">
              Terms of Service
            </a>
            <a href="/security" className="hover:text-white/80 transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
