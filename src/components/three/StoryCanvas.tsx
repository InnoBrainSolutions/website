"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import QuantumCore from "./QuantumCore";

interface StoryCanvasProps {
  scrollProgress: number;
}

export default function StoryCanvas({ scrollProgress }: StoryCanvasProps) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 55 }}
          dpr={[1, 2]}
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
    </div>
  );
}
