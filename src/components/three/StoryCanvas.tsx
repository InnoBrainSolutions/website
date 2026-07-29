"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import QuantumCore from "./QuantumCore";
import ViewportCanvas from "./ViewportCanvas";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";

interface StoryCanvasProps {
  scrollProgress: number;
}

export default function StoryCanvas({ scrollProgress }: StoryCanvasProps) {
  const { dpr } = useAdaptiveQuality();

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <ViewportCanvas className="w-full h-full">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 55 }}
            dpr={dpr}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            style={{ background: "transparent" }}
          >
            <QuantumCore scrollProgress={scrollProgress} />
          </Canvas>
        </Suspense>
      </ViewportCanvas>
    </div>
  );
}
