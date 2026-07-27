"use client";

import { motion } from "framer-motion";
import ParticleField from "@/components/effects/ParticleField";

const FOOTER_LINKS = {
  Services: [
    "AI Development",
    "Cloud Engineering",
    "Cyber Security",
    "DevOps Solutions",
    "Web Applications",
    "Mobile Applications",
  ],
  Company: ["About Us", "Careers", "Blog", "Case Studies", "Contact"],
  Resources: ["Documentation", "API Reference", "Support", "Community", "Partners"],
};

const SOCIALS = [
  { name: "LinkedIn", icon: "in", href: "#" },
  { name: "Twitter", icon: "𝕏", href: "#" },
  { name: "GitHub", icon: "GH", href: "#" },
  { name: "YouTube", icon: "▶", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-deep-space border-t border-white/5 overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal/30 to-transparent" />

      {/* Particle background */}
      <ParticleField particleCount={30} />

      <div className="container-custom relative z-10">
        {/* Main footer content */}
        <div className="py-16 lg:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal to-electric-blue flex items-center justify-center">
                <span className="text-white font-bold text-sm">iB</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                INNOBRAIN
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-8 max-w-sm">
              Engineering intelligence. Building tomorrow. We help enterprises
              transform through AI, cloud, and modern software engineering.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <p className="text-white text-sm font-medium mb-3">
                Stay ahead of the curve
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:border-teal/40 transition-colors"
                  aria-label="Email for newsletter"
                />
                <button className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-teal to-electric-blue text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all duration-300 cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {SOCIALS.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-muted text-xs font-mono hover:bg-teal/10 hover:border-teal/20 hover:text-teal transition-all duration-300"
                  whileHover={{ y: -2 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="lg:col-span-2 lg:col-start-auto">
              <h4 className="text-white font-semibold text-sm mb-5">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted text-sm hover:text-teal transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-muted text-xs">
            © {new Date().getFullYear()} InnoBrain IT & AI Services Pvt. Ltd. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-dark-muted text-xs hover:text-muted transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-dark-muted text-xs hover:text-muted transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* AI Chat Bubble */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-teal to-electric-blue flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.3)] cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open AI Assistant"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="10" r="1" fill="white" />
          <circle cx="12" cy="10" r="1" fill="white" />
          <circle cx="15" cy="10" r="1" fill="white" />
        </svg>
      </motion.button>
    </footer>
  );
}
