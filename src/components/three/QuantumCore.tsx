"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface QuantumCoreProps {
  scrollProgress: number;
}

const PARTICLE_COUNT = 300;

export default function QuantumCore({ scrollProgress }: QuantumCoreProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const currentProgressRef = useRef(0);

  // Generate initial particle torus positions
  const { positions, originalPositions, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const origPos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const radius = 2.2 + Math.sin(v * 3) * 0.4;

      const x = radius * Math.cos(u);
      const y = radius * Math.sin(u);
      const z = (Math.random() - 0.5) * 1.5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;

      // Color gradient: Teal to Electric Blue
      const mix = Math.random();
      col[i * 3] = 0.08 * (1 - mix) + 0.23 * mix;
      col[i * 3 + 1] = 0.72 * (1 - mix) + 0.51 * mix;
      col[i * 3 + 2] = 0.65 * (1 - mix) + 0.96 * mix;
    }

    return { positions: pos, originalPositions: origPos, colors: col };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !meshRef.current) return;

    const time = state.clock.elapsedTime;
    
    // Smooth lerp to target scroll progress
    currentProgressRef.current += (scrollProgress - currentProgressRef.current) * 0.1;
    const progress = currentProgressRef.current;

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Morph particle geometry based on scroll progress & time
    const morphScale = 1 + progress * 0.8;
    const turbulence = progress * 0.5;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      const wave = Math.sin(time * (1.5 + progress) + i * 0.1) * (0.05 + turbulence * 0.1);
      const cosWave = Math.cos(time * (1.2 + progress) + i * 0.08) * (0.05 + turbulence * 0.1);

      posArray[i3] = (ox + wave) * morphScale;
      posArray[i3 + 1] = (oy + cosWave) * morphScale;
      posArray[i3 + 2] = oz + Math.sin(time * 2 + i) * (0.1 + progress * 0.3);
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotations driven by scroll + time
    pointsRef.current.rotation.x = time * 0.15 + progress * Math.PI * 0.5;
    pointsRef.current.rotation.y = time * 0.25 + progress * Math.PI * 1.5;

    // Wireframe mesh inside
    meshRef.current.rotation.x = -time * 0.2 - progress * Math.PI;
    meshRef.current.rotation.y = time * 0.3 + progress * Math.PI * 2;
    meshRef.current.scale.setScalar(0.9 + Math.sin(time * 2) * 0.05 + progress * 0.4);
  });

  return (
    <group>
      {/* 3D Wireframe Icosahedron Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial
          wireframe
          color="#14B8A6"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3D Morphing Quantum Swarm */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
