"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 150;
const CONNECTION_DISTANCE = 2.2;
const SPREAD = 8;

export default function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Generate initial positions
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * 0.5;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, []);

  // Pre-allocate line buffers (max possible connections)
  const maxConnections = PARTICLE_COUNT * 5;
  const linePositions = useMemo(
    () => new Float32Array(maxConnections * 6),
    [maxConnections]
  );
  const lineColors = useMemo(
    () => new Float32Array(maxConnections * 6),
    [maxConnections]
  );

  // Colors for particles
  const particleColors = useMemo(() => {
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = Math.random();
      if (t < 0.33) {
        // Teal
        colors[i * 3] = 0.08;
        colors[i * 3 + 1] = 0.72;
        colors[i * 3 + 2] = 0.65;
      } else if (t < 0.66) {
        // Electric Blue
        colors[i * 3] = 0.23;
        colors[i * 3 + 1] = 0.51;
        colors[i * 3 + 2] = 0.96;
      } else {
        // Violet
        colors[i * 3] = 0.55;
        colors[i * 3 + 1] = 0.36;
        colors[i * 3 + 2] = 0.96;
      }
    }
    return colors;
  }, []);

  // Mouse tracking side-effect inside useEffect
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.elapsedTime;
    const posArray = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    // Update particle positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      posArray[i3] +=
        velocities[i3] + Math.sin(time * 0.3 + i * 0.1) * 0.002;
      posArray[i3 + 1] +=
        velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.15) * 0.002;
      posArray[i3 + 2] +=
        velocities[i3 + 2] + Math.sin(time * 0.4 + i * 0.05) * 0.001;

      // Gentle mouse influence
      posArray[i3] += mouseRef.current.x * 0.0003;
      posArray[i3 + 1] += mouseRef.current.y * 0.0003;

      // Boundary wrapping
      const half = SPREAD / 2;
      if (posArray[i3] > half) posArray[i3] = -half;
      if (posArray[i3] < -half) posArray[i3] = half;
      if (posArray[i3 + 1] > half) posArray[i3 + 1] = -half;
      if (posArray[i3 + 1] < -half) posArray[i3 + 1] = half;
      if (posArray[i3 + 2] > half * 0.5) posArray[i3 + 2] = -half * 0.5;
      if (posArray[i3 + 2] < -half * 0.5) posArray[i3 + 2] = half * 0.5;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Calculate connections
    let lineIndex = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE && lineIndex < maxConnections) {
          const alpha = 1 - dist / CONNECTION_DISTANCE;
          const l6 = lineIndex * 6;
          linePositions[l6] = posArray[i * 3];
          linePositions[l6 + 1] = posArray[i * 3 + 1];
          linePositions[l6 + 2] = posArray[i * 3 + 2];
          linePositions[l6 + 3] = posArray[j * 3];
          linePositions[l6 + 4] = posArray[j * 3 + 1];
          linePositions[l6 + 5] = posArray[j * 3 + 2];

          // Teal-cyan connection colors
          lineColors[l6] = 0.08 * alpha;
          lineColors[l6 + 1] = 0.72 * alpha;
          lineColors[l6 + 2] = 0.65 * alpha;
          lineColors[l6 + 3] = 0.02 * alpha;
          lineColors[l6 + 4] = 0.71 * alpha;
          lineColors[l6 + 5] = 0.83 * alpha;

          lineIndex++;
        }
      }
    }

    // Zero-allocation buffer update
    const lineGeo = linesRef.current.geometry;
    lineGeo.setDrawRange(0, lineIndex * 2);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color.needsUpdate = true;

    // Subtle group rotation
    pointsRef.current.rotation.y = time * 0.03;
    linesRef.current.rotation.y = time * 0.03;
  });

  return (
    <group>
      {/* Particles / Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connections / Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
