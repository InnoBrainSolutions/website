"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import TechNetwork, { TechNode } from "./OrbitalRing";

export default function TechCanvas({
  onSelectNode,
}: {
  onSelectNode: (node: TechNode | null) => void;
}) {
  return (
    <div className="w-full h-[65vh] lg:h-[75vh]">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 48 }}
          dpr={[1, 2]}
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
    </div>
  );
}
