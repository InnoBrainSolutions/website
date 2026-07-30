"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { TechNode } from "@/components/three/OrbitalRing";
import { Brain, Cpu, Cloud, Layers, Sparkles } from "lucide-react";

const TechCanvas = dynamic(() => import("@/components/three/TechCanvas"), {
  ssr: false,
});

const CATEGORIES = [
  { id: "all", label: "Connected System" },
  { id: "AI & ML", label: "AI & ML Engine" },
  { id: "Frontend & Mobile", label: "Frontend & App Tier" },
  { id: "Cloud & Infrastructure", label: "Cloud & Scale Tier" },
];

export default function TechStackSection() {
  const [selectedNode, setSelectedNode] = useState<TechNode | null>(null);

  return (
    <section
      id="tech"
      className="relative overflow-hidden bg-deep-space py-24 lg:py-32"
      aria-label="Technology Stack Architecture"
    >
      {/* Background glow overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,var(--teal),transparent_70%)]" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6 max-w-3xl mx-auto">
          <span className="text-teal text-xs font-mono font-semibold tracking-[0.3em] uppercase block mb-4">
            Connected System Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Powered by the tools that
            <br />
            <span className="bg-gradient-to-r from-teal via-cyan to-electric-blue bg-clip-text text-transparent inline-block pb-1.5">
              power the future.
            </span>
          </h2>
          <p className="text-white/50 text-base max-w-xl mx-auto">
            Hover any technology node to see how AI models, cloud infrastructure,
            and web frameworks interconnect inside the InnoBrain engine.
          </p>
        </div>

        {/* 3D Connected Tech Ecosystem Canvas */}
        <div className="relative">
          <TechCanvas onSelectNode={setSelectedNode} />

          {/* Dynamic Live Tech Details Card (Overlaid when hovered) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pointer-events-none">
            <AnimatePresence mode="wait">
              {selectedNode ? (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-2xl bg-white/[0.08] border border-white/20 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] text-center pointer-events-auto"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: selectedNode.color }}
                    />
                    <span className="text-white font-bold text-lg">
                      {selectedNode.name}
                    </span>
                    <span className="text-white/40 text-xs font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {selectedNode.category}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs sm:text-sm">
                    {selectedNode.description}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-center"
                >
                  <span className="text-white/40 text-xs font-mono tracking-wide">
                    ✦ Hover any node to inspect data flow & dependencies
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
