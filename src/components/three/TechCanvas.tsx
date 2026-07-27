"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import OrbitalRing from "./OrbitalRing";

export default function TechCanvas() {
  return (
    <div className="w-full h-[60vh] lg:h-[70vh]">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 2, 6], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.6} color="#14B8A6" />
          <pointLight position={[-5, -3, -5]} intensity={0.3} color="#3B82F6" />
          <OrbitalRing />
        </Canvas>
      </Suspense>
    </div>
  );
}
