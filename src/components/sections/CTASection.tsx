"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import TextReveal from "@/components/ui/TextReveal";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="relative py-32 lg:py-40 overflow-hidden"
      aria-label="Call to Action"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[0] opacity-30 mix-blend-screen pointer-events-none"
      >
        <source src="/12649331_1920_1080_30fps.mp4" type="video/mp4" />
      </video>

      {/* Aurora background */}
      <div className="absolute inset-0 aurora-bg" />

      {/* Animated orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
        style={{ background: "radial-gradient(circle, var(--teal), transparent)" }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] opacity-15"
        style={{ background: "radial-gradient(circle, var(--violet), transparent)" }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      <div className="container-custom relative z-10 text-center">
        <motion.span
          className="inline-block text-teal text-sm font-medium tracking-wider uppercase mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Let&apos;s Build Together
        </motion.span>

        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 max-w-4xl mx-auto">
          <TextReveal>Ready to build</TextReveal>
          <br />
          <span className="glow-text">
            <TextReveal delay={0.2}>the future?</TextReveal>
          </span>
        </h2>

        <motion.p
          className="text-muted text-lg max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Whether you&apos;re starting from scratch or scaling to millions, our team
          of engineers and AI specialists is ready to bring your vision to life.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <MagneticButton variant="primary">Start Your Project</MagneticButton>
          <MagneticButton variant="outline">Schedule a Call</MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
