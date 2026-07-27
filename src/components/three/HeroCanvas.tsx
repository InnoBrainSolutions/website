"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import NeuralNetwork from "./NeuralNetwork";

function FallbackGradient() {
  return (
    <div className="absolute inset-0 aurora-bg opacity-50" />
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0">
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
          <color attach="background" args={["#09090B"]} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#14B8A6" />
          <pointLight position={[-10, -10, -5]} intensity={0.3} color="#8B5CF6" />
          <NeuralNetwork />
        </Canvas>
      </Suspense>
    </div>
  );
}
