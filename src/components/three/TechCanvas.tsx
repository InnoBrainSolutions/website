"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import TechNetwork, { TechNode } from "./OrbitalRing";
import ViewportCanvas from "./ViewportCanvas";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";

export default function TechCanvas({
  onSelectNode,
}: {
  onSelectNode: (node: TechNode | null) => void;
}) {
  const { dpr } = useAdaptiveQuality();

  return (
    <ViewportCanvas className="w-full h-[50vh] sm:h-[65vh] lg:h-[85vh]">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: 52 }}
          dpr={dpr}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#14B8A6" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3B82F6" />
          <TechNetwork onSelectNode={onSelectNode} />
        </Canvas>
      </Suspense>
    </ViewportCanvas>
  );
}
