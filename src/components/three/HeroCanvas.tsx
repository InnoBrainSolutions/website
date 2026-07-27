"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import NeuralNetwork from "./NeuralNetwork";

function FallbackGradient() {
  return <div className="absolute inset-0 aurora-bg opacity-50" />;
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <Suspense fallback={<FallbackGradient />}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.6} color="#14B8A6" />
          <pointLight position={[-10, -10, -5]} intensity={0.4} color="#8B5CF6" />
          <NeuralNetwork />
        </Canvas>
      </Suspense>
    </div>
  );
}
