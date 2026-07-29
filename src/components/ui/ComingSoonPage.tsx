"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Send, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ParticleField from "@/components/effects/ParticleField";
import LazyBackgroundVideo from "@/components/effects/LazyBackgroundVideo";
import { CLOUDINARY_VIDEOS } from "@/config/media";

interface ComingSoonPageProps {
  category: string;
  title: string;
  description: string;
  expectedLaunch?: string;
  features?: string[];
}

export default function ComingSoonPage({
  category,
  title,
  description,
  expectedLaunch = "Q3 2026",
  features = [
    "Enterprise-grade Security & Compliance",
    "Real-time AI Model Pipeline Integration",
    "Dedicated 24×7 SLA Engineering Support",
  ],
}: ComingSoonPageProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-32 pb-24 flex flex-col justify-between overflow-hidden bg-deep-space">
        {/* Ambient Video & Particles */}
        <LazyBackgroundVideo
          src={CLOUDINARY_VIDEOS.comingSoonBackground}
          className="opacity-40"
        />
        <ParticleField particleCount={30} />

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space/80 via-transparent to-deep-space pointer-events-none" />

        <div className="container-custom relative z-10 my-auto">
          {/* Breadcrumb / Back Link */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-teal hover:text-white font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to InnoBrain Home
            </Link>
          </motion.div>

          <div className="max-w-3xl">
            {/* Category Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase border border-teal/30 bg-teal/10 text-teal backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-teal" />
                {category} • Coming Soon
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight"
            >
              {title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted text-lg sm:text-xl leading-relaxed mb-8"
            >
              {description}
            </motion.p>

            {/* Features Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl"
            >
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <span className="text-white/80 text-xs font-medium leading-normal">
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Early Access Notification Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 backdrop-blur-2xl max-w-xl"
            >
              <h3 className="text-white text-base font-bold mb-2">
                Get notified upon VIP launch ({expectedLaunch})
              </h3>
              <p className="text-muted text-xs mb-4">
                Be the first to access early beta releases and enterprise deployment specs.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-teal text-sm font-semibold p-3 rounded-lg bg-teal/10 border border-teal/20">
                  <CheckCircle2 className="w-4 h-4" /> You&apos;re on the priority launch list!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your enterprise email..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted/50 focus:outline-none focus:border-teal transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal to-electric-blue text-white text-sm font-semibold hover:shadow-[0_0_25px_rgba(20,184,166,0.4)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Join List</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
