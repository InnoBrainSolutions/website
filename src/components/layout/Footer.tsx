"use client";

import { motion } from "framer-motion";
import { Globe, Share2, Code2, Video, ArrowUpRight } from "lucide-react";

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
      {/* Accent Gradient Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/40 to-transparent" />

      <div className="container-custom relative z-10 pt-16 pb-12 lg:pt-20 lg:pb-14">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/[0.06]">
          {/* Brand Column (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold tracking-tighter text-white">
                INNO<span className="text-teal">BRAIN</span>
              </span>
            </div>

            <p className="text-white/50 text-sm leading-relaxed max-w-sm font-light">
              Engineering intelligence. Building tomorrow. We help enterprises
              architect and scale AI-first systems.
            </p>

            {/* Newsletter Subscription */}
            <div className="max-w-sm pt-2">
              <span className="text-white/70 text-xs font-mono tracking-wider uppercase block mb-3">
                Join the AI Engineering Digest
              </span>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="Enter work email"
                  className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 transition-colors"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-teal hover:bg-teal/80 text-deep-space font-semibold text-xs transition-colors duration-200 shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Nav Columns */}
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
            <a href="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white/70 transition-colors">
              Terms of Service
            </a>
            <a href="/security" className="hover:text-white/70 transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
