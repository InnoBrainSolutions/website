"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, MapPin, Mail, Phone, Clock, ArrowRight, Sparkles } from "lucide-react";

const SERVICES = [
  "AI & Machine Learning",
  "Software Engineering",
  "Cloud & DevOps",
  "Cybersecurity",
  "Computer Support & IT",
];

const BUDGET_RANGES = [
  "< $10,000",
  "$10k - $30k",
  "$30k - $75k",
  "$75k+",
];

export default function ContactFormUI() {
  const [selectedService, setSelectedService] = useState("AI & Machine Learning");
  const [selectedBudget, setSelectedBudget] = useState("$10k - $30k");
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* LEFT COLUMN: Office Info & Quick Connect (5 / 12 Cols) */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal/10 border border-teal/30 text-teal text-xs font-mono font-semibold tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[0.95] mb-6">
            Let&apos;s build <br />
            <span className="bg-gradient-to-r from-teal via-cyan to-electric-blue bg-clip-text text-transparent">
              something epic.
            </span>
          </h1>

          <p className="text-white/60 text-base leading-relaxed font-light">
            Have a project in mind, need enterprise computer support, or looking to scale with AI? Fill out the form or reach out directly.
          </p>
        </div>

        {/* Info Cards */}
        <div className="space-y-4 pt-2">
          {/* Office Address Card */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex items-start gap-4 hover:border-teal/40 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal shrink-0 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white/40 text-xs font-mono uppercase tracking-wider block mb-1">
                Official Head Office
              </span>
              <p className="text-white text-sm font-medium leading-snug">
                InnoBrain IT & AI Services Pvt. Ltd.
              </p>
              <p className="text-white/60 text-xs mt-1 font-light leading-relaxed">
                Vijay Nagar, Scheme No 54, Indore, Madhya Pradesh 452010
              </p>
            </div>
          </div>

          {/* Email Card */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex items-start gap-4 hover:border-cyan/40 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan shrink-0 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white/40 text-xs font-mono uppercase tracking-wider block mb-1">
                Email Inquiries
              </span>
              <a
                href="mailto:contact@innobrain.in"
                className="text-white text-sm font-medium hover:text-cyan transition-colors"
              >
                contact@innobrain.in
              </a>
              <p className="text-white/40 text-xs mt-0.5 font-light">
                Guaranteed reply within 24 hours
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center text-electric-blue shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white/40 text-xs font-mono uppercase tracking-wider block mb-1">
                Working Hours
              </span>
              <p className="text-white text-sm font-medium">
                Monday – Friday: 9:00 AM – 7:00 PM IST
              </p>
              <p className="text-white/40 text-xs mt-0.5 font-light">
                Emergency IT Support: 24/7
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Easy Form Card (7 / 12 Cols) */}
      <div className="lg:col-span-7">
        <div className="rounded-3xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 backdrop-blur-2xl p-8 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-teal/20 border border-teal/50 text-teal flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(20,184,166,0.4)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-extrabold text-white tracking-tight">
                Inquiry Received!
              </h3>
              <p className="text-white/60 text-sm max-w-md mx-auto font-light leading-relaxed">
                Thank you for reaching out to InnoBrain. Our engineering team will review your project details and get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-medium text-xs border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Service Pills Selector */}
              <div>
                <label className="text-white/70 text-xs font-mono uppercase tracking-wider block mb-3 font-medium">
                  1. What service do you need?
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {SERVICES.map((service) => {
                    const isSelected = selectedService === service;
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => setSelectedService(service)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-teal/20 text-white border-teal/60 shadow-[0_0_15px_rgba(20,184,166,0.3)] scale-[1.02]"
                            : "bg-white/[0.02] text-white/50 border-white/10 hover:border-white/30 hover:text-white/80"
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-white/70 text-xs font-mono uppercase tracking-wider block mb-2 font-medium">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-teal/60 focus:bg-white/[0.05] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-white/70 text-xs font-mono uppercase tracking-wider block mb-2 font-medium">
                    Work Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-teal/60 focus:bg-white/[0.05] transition-all"
                  />
                </div>
              </div>

              {/* Phone & Company Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="text-white/70 text-xs font-mono uppercase tracking-wider block mb-2 font-medium">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-teal/60 focus:bg-white/[0.05] transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="text-white/70 text-xs font-mono uppercase tracking-wider block mb-2 font-medium">
                    Company / Organization
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-teal/60 focus:bg-white/[0.05] transition-all"
                  />
                </div>
              </div>

              {/* Budget Range Pills */}
              <div>
                <label className="text-white/70 text-xs font-mono uppercase tracking-wider block mb-2.5 font-medium">
                  Expected Budget Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {BUDGET_RANGES.map((b) => {
                    const isSelected = selectedBudget === b;
                    return (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setSelectedBudget(b)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-cyan/20 text-white border-cyan/60 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                            : "bg-white/[0.02] text-white/40 border-white/10 hover:border-white/30 hover:text-white/80"
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="text-white/70 text-xs font-mono uppercase tracking-wider block mb-2 font-medium">
                  Project Details / Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us about your goals, timelines, and technical requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-teal/60 focus:bg-white/[0.05] transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal via-cyan to-electric-blue text-deep-space font-extrabold text-sm tracking-wider uppercase hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
