"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown,
  Brain,
  Code2,
  Cloud,
  ShieldCheck,
  Zap,
  Database,
  Activity,
  TrendingUp,
  ShoppingBag,
  Factory,
  Rocket,
  Layers,
  FileText,
  BookOpen,
  Users,
  Building2,
  Globe,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

const MEGA_MENUS = {
  Solutions: [
    {
      title: "Artificial Intelligence",
      desc: "Custom LLMs, AI Agents & Machine Learning",
      icon: Brain,
      href: "/solutions/ai",
    },
    {
      title: "Software Engineering",
      desc: "Full-stack Web, Mobile Apps & Enterprise Systems",
      icon: Code2,
      href: "/solutions/software",
    },
    {
      title: "Cloud & DevOps",
      desc: "AWS, Azure, Docker, Kubernetes & CI/CD Pipelines",
      icon: Cloud,
      href: "/solutions/cloud",
    },
    {
      title: "Cyber Security",
      desc: "Zero-Trust Architecture & Penetration Auditing",
      icon: ShieldCheck,
      href: "/solutions/cybersecurity",
    },
    {
      title: "Workflow Automation",
      desc: "RPA, Intelligent Agents & Process Optimization",
      icon: Zap,
      href: "/solutions/automation",
    },
    {
      title: "Data Engineering",
      desc: "Big Data Pipelines, Real-time Analytics & Warehouses",
      icon: Database,
      href: "/solutions/data",
    },
  ],
  Industries: [
    {
      title: "Healthcare",
      desc: "AI Diagnostics, Telehealth & HIPAA Compliance",
      icon: Activity,
      href: "/industries/healthcare",
    },
    {
      title: "FinTech & Banking",
      desc: "Algorithmic Pipelines, Fraud Detection & Cloud",
      icon: TrendingUp,
      href: "/industries/fintech",
    },
    {
      title: "Retail & E-Commerce",
      desc: "ML Recommendation Engines & Personalization",
      icon: ShoppingBag,
      href: "/industries/retail",
    },
    {
      title: "Manufacturing & IoT",
      desc: "Predictive Maintenance & Computer Vision",
      icon: Factory,
      href: "/industries/manufacturing",
    },
    {
      title: "Startups & Scaleups",
      desc: "Rapid MVP Engineering & Architecture",
      icon: Rocket,
      href: "/industries/startups",
    },
  ],
  Work: [
    {
      title: "Featured Projects",
      desc: "Flagship enterprise client builds",
      icon: Layers,
      href: "/work/projects",
    },
    {
      title: "Case Studies",
      desc: "Measurable ROI & digital transformations",
      icon: FileText,
      href: "/work/cases",
    },
    {
      title: "Client Testimonials",
      desc: "Feedback from CTOs & VP of Engineering",
      icon: Users,
      href: "/work/testimonials",
    },
  ],
  Insights: [
    {
      title: "Blog & Articles",
      desc: "Latest engineering insights & AI trends",
      icon: BookOpen,
      href: "/insights/blog",
    },
    {
      title: "AI Research",
      desc: "Deep-dives into LLMs & Agentic Systems",
      icon: Brain,
      href: "/insights/research",
    },
    {
      title: "Documentation",
      desc: "API References & Integration Guides",
      icon: FileText,
      href: "/insights/docs",
    },
  ],
  Company: [
    {
      title: "About InnoBrain",
      desc: "Where Intelligence Meets Innovation",
      icon: Building2,
      href: "/company/about",
    },
    {
      title: "Vision & Leadership",
      desc: "Our mission to build future tech",
      icon: Globe,
      href: "/company/vision",
    },
    {
      title: "Careers & Culture",
      desc: "Join our global engineering team",
      icon: Users,
      href: "/company/careers",
    },
    {
      title: "Contact Us",
      desc: "Schedule a consultation with specialists",
      icon: Rocket,
      href: "/contact",
    },
  ],
};

type MenuKey = keyof typeof MEGA_MENUS;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 border-none transition-all duration-500 ${
          scrolled
            ? "glass py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="InnoBrain Home">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-teal to-electric-blue flex items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(20,184,166,0.3)]">
              <span className="text-white font-extrabold text-sm tracking-tighter">iB</span>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/20 group-hover:to-white/30 transition-all duration-300" />
            </div>
            <span className="text-white font-extrabold text-lg tracking-tight hidden sm:block">
              INNOBRAIN
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-7">
            <Link
              href="/"
              className="text-muted hover:text-white text-sm font-semibold transition-colors duration-300 relative group py-2"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal group-hover:w-full transition-all duration-300 rounded-full" />
            </Link>

            {(Object.keys(MEGA_MENUS) as MenuKey[]).map((key) => {
              const isOpen = activeMenu === key;
              return (
                <div
                  key={key}
                  className="relative py-2"
                  onMouseEnter={() => setActiveMenu(key)}
                >
                  <button
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                      isOpen ? "text-teal" : "text-muted hover:text-white"
                    }`}
                  >
                    <span>{key}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-teal" : "text-muted/60"
                      }`}
                    />
                  </button>
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-teal transition-all duration-300 rounded-full ${
                      isOpen ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right CTA */}
          <div className="hidden lg:block">
            <MagneticButton variant="primary" href="/contact" className="text-xs px-6 py-2.5">
              Get Started →
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden relative w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1.5 z-50 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              className="w-5 h-0.5 bg-white block rounded-full"
              animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-white block rounded-full"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-5 h-0.5 bg-white block rounded-full"
              animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>

        {/* Mega Menu Overlay Dropdown */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-full left-0 right-0 z-40 px-6 pt-3"
            >
              <div className="container-custom">
                <div className="p-7 rounded-2xl bg-deep-space/95 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] grid grid-cols-2 md:grid-cols-3 gap-4">
                  {MEGA_MENUS[activeMenu].map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setActiveMenu(null)}
                        className="group flex items-start gap-3.5 p-3.5 rounded-xl hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all duration-200"
                      >
                        <div className="w-10 h-10 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center text-teal shrink-0 group-hover:scale-110 group-hover:bg-teal group-hover:text-deep-space transition-all duration-200">
                          <ItemIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-white text-sm font-bold group-hover:text-teal transition-colors flex items-center gap-1">
                            {item.title}
                          </div>
                          <p className="text-muted/70 text-xs mt-0.5 leading-snug">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-deep-space/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 lg:hidden overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block text-2xl font-bold text-white hover:text-teal transition-colors"
              >
                Home
              </Link>

              {(Object.keys(MEGA_MENUS) as MenuKey[]).map((key) => (
                <div key={key} className="space-y-3">
                  <div className="text-teal font-mono text-xs uppercase tracking-widest border-b border-white/10 pb-1">
                    {key}
                  </div>
                  <div className="grid grid-cols-1 gap-2 pl-2">
                    {MEGA_MENUS[key].map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-white/80 hover:text-teal text-sm font-medium transition-colors"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10">
              <MagneticButton
                variant="primary"
                href="/contact"
                className="w-full text-center"
                onClick={() => setMobileOpen(false)}
              >
                Get Started →
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
