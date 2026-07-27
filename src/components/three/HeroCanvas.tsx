"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import SpaceScene from "./NeuralNetwork";

function FallbackGradient() {
  return <div className="absolute inset-0 bg-black" />;
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <Suspense fallback={<FallbackGradient />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 55 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            toneMapping: 0, // NoToneMapping — we handle color in shaders
          }}
          style={{ background: "#000000" }}
        >
          {/* No ambient/point lights — the space scene has its own lighting via shaders */}
          <SpaceScene />
        </Canvas>
      </Suspense>
    </div>
  );
}
