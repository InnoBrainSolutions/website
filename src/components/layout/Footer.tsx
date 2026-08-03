"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Share2, Code2, Video, ArrowUpRight, MapPin } from "lucide-react";

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
    <footer className="relative bg-deep-space border-t border-white/[0.08] text-white">
      {/* Top Border Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />

      <div className="container-custom relative z-10 pt-16 pb-12 lg:pt-20 lg:pb-14">
        {/* Main 5-Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-white/[0.08]">
          {/* Brand, Address & Newsletter Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <Link href="/" className="inline-block group" aria-label="InnoBrain Home">
                <Image
                  src="/logo-light.png"
                  alt="InnoBrain IT & AI Services Logo"
                  width={440}
                  height={100}
                  className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  unoptimized
                />
              </Link>
            </div>

            <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-sm font-light">
              A forward-thinking technology company delivering innovative IT solutions and AI-driven services to accelerate digital transformation through intelligent, scalable, and reliable engineering.
            </p>

            {/* Official Business Address */}
            <div className="flex items-start gap-2.5 text-xs text-white/80 pt-1 font-light max-w-sm">
              <MapPin className="w-4 h-4 text-teal shrink-0 mt-0.5" />
              <span>
                Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh 452010
              </span>
            </div>

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
                  className="px-5 py-2.5 rounded-xl bg-teal text-deep-space font-bold text-xs hover:bg-teal/80 transition-colors duration-200 shrink-0 cursor-pointer"
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
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-teal hover:border-teal/40 transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
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
