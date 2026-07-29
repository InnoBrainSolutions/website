"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  CheckCircle2,
  MapPin,
  Mail,
  Clock,
  Sparkles,
  Brain,
  Cloud,
  Globe,
  ShieldCheck,
  Zap,
} from "lucide-react";

const CAPABILITY_SERVICES = [
  {
    title: "Artificial Intelligence",
    icon: Brain,
    gradient: "from-teal to-cyan",
  },
  {
    title: "Software Engineering",
    icon: Globe,
    gradient: "from-electric-blue to-violet",
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    gradient: "from-violet to-teal",
  },
  {
    title: "Cyber Security",
    icon: ShieldCheck,
    gradient: "from-cyan to-electric-blue",
  },
  {
    title: "Intelligent Automation",
    icon: Zap,
    gradient: "from-teal to-electric-blue",
  },
];

export default function ContactFormUI() {
  const [selectedService, setSelectedService] = useState("Artificial Intelligence");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16">
      {/* Header — Inspired by Capabilities Section Header */}
      <div className="space-y-3">
        <span className="text-teal text-xs font-mono font-semibold tracking-[0.3em] uppercase block">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.0]">
          Start Your <span className="bg-gradient-to-r from-teal via-cyan to-electric-blue bg-clip-text text-transparent">Project</span>
        </h1>
        <p className="text-muted text-sm sm:text-base max-w-2xl font-light">
          Have a vision for AI, enterprise software, or computer support? Partner with our engineering team to accelerate your digital transformation.
        </p>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Capabilities Info Deck (5 / 12 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 01: Head Office */}
          <div className="group relative rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/[0.08] hover:border-white/20 backdrop-blur-xl p-6 sm:p-8 overflow-hidden transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: "radial-gradient(400px circle at 50% 80%, rgba(20, 184, 166, 0.12), transparent 70%)",
              }}
            />
            <div className="relative z-10 flex items-start justify-between">
              <span className="text-6xl font-extrabold text-white/[0.04] leading-none absolute top-4 right-6">
                01
              </span>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-deep-space group-hover:border-teal transition-all duration-300 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
            <div className="relative z-10 mt-6">
              <span className="text-teal text-xs font-mono uppercase tracking-wider block mb-1 font-semibold">
                Official Head Office
              </span>
              <h3 className="text-white text-lg font-bold tracking-tight mb-1">
                InnoBrain IT & AI Services Pvt. Ltd.
              </h3>
              <p className="text-muted text-xs sm:text-sm font-light leading-relaxed">
                Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh 452010
              </p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-teal to-cyan transition-all duration-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* Card 02: Email & Support */}
          <div className="group relative rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/[0.08] hover:border-white/20 backdrop-blur-xl p-6 sm:p-8 overflow-hidden transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: "radial-gradient(400px circle at 50% 80%, rgba(59, 130, 246, 0.12), transparent 70%)",
              }}
            />
            <div className="relative z-10 flex items-start justify-between">
              <span className="text-6xl font-extrabold text-white/[0.04] leading-none absolute top-4 right-6">
                02
              </span>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-electric-blue group-hover:bg-electric-blue group-hover:text-deep-space group-hover:border-electric-blue transition-all duration-300 shrink-0">
                <Mail className="w-6 h-6" />
              </div>
            </div>
            <div className="relative z-10 mt-6">
              <span className="text-teal text-xs font-mono uppercase tracking-wider block mb-1 font-semibold">
                Direct Inquiries
              </span>
              <a
                href="mailto:contact@innobrain.in"
                className="text-white text-base sm:text-lg font-bold tracking-tight hover:text-teal transition-colors block"
              >
                contact@innobrain.in
              </a>
              <p className="text-muted text-xs mt-1 font-light">
                Guaranteed Response Time: Under 24 Business Hours
              </p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-electric-blue to-violet transition-all duration-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* Card 03: Business Hours */}
          <div className="group relative rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/[0.08] hover:border-white/20 backdrop-blur-xl p-6 sm:p-8 overflow-hidden transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: "radial-gradient(400px circle at 50% 80%, rgba(139, 92, 246, 0.12), transparent 70%)",
              }}
            />
            <div className="relative z-10 flex items-start justify-between">
              <span className="text-6xl font-extrabold text-white/[0.04] leading-none absolute top-4 right-6">
                03
              </span>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-violet group-hover:bg-violet group-hover:text-deep-space group-hover:border-violet transition-all duration-300 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <div className="relative z-10 mt-6">
              <span className="text-teal text-xs font-mono uppercase tracking-wider block mb-1 font-semibold">
                Working Schedule
              </span>
              <h3 className="text-white text-base sm:text-lg font-bold tracking-tight mb-1">
                Mon – Fri: 9:00 AM – 7:00 PM IST
              </h3>
              <p className="text-muted text-xs font-light">
                Enterprise Computer & Network Support: 24/7 Coverage
              </p>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-violet to-teal transition-all duration-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Form Stage (7 / 12 Cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/[0.08] hover:border-white/20 backdrop-blur-xl p-5 sm:p-8 lg:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.6)] relative overflow-hidden transition-colors duration-300">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-teal/20 border border-teal/40 text-teal flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(20,184,166,0.4)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">
                  Inquiry Received!
                </h3>
                <p className="text-muted text-sm max-w-md mx-auto font-light leading-relaxed">
                  Thank you for reaching out to InnoBrain. Our engineering team will review your requirements and respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-medium text-xs border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Pills Selector */}
                <div>
                  <label className="text-teal text-xs font-mono font-semibold uppercase tracking-wider block mb-3">
                    01. Select Capability
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CAPABILITY_SERVICES.map((serv) => {
                      const Icon = serv.icon;
                      const isSelected = selectedService === serv.title;
                      return (
                        <button
                          type="button"
                          key={serv.title}
                          onClick={() => setSelectedService(serv.title)}
                          className={`flex items-center gap-3 p-3.5 rounded-2xl border text-xs font-medium transition-all duration-300 cursor-pointer ${
                            isSelected
                              ? "bg-white/10 text-white border-teal shadow-[0_0_20px_rgba(20,184,166,0.3)] scale-[1.02]"
                              : "bg-white/[0.02] text-white/50 border-white/5 hover:border-white/20 hover:text-white/80"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                              isSelected
                                ? "bg-teal text-deep-space border-teal"
                                : "bg-white/5 border-white/10 text-white/60"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{serv.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label htmlFor="name" className="text-white/60 text-xs font-mono uppercase tracking-wider block mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="e.g. Satyam Rana"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-teal/60 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-white/60 text-xs font-mono uppercase tracking-wider block mb-2">
                      Work Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="e.g. satyam@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-teal/60 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>

                {/* Phone & Company Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="text-white/60 text-xs font-mono uppercase tracking-wider block mb-2">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-teal/60 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="text-white/60 text-xs font-mono uppercase tracking-wider block mb-2">
                      Company / Organization
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="e.g. Enterprise AI Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-teal/60 focus:bg-white/[0.05] transition-all"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="text-teal text-xs font-mono font-semibold uppercase tracking-wider block mb-2">
                    02. Project Overview *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Describe your technical requirements, goals, or infrastructure support needs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-teal/60 focus:bg-white/[0.05] transition-all resize-none"
                  />
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal via-cyan to-electric-blue text-deep-space font-extrabold text-xs sm:text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Project Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
