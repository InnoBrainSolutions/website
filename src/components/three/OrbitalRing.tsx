"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TECH = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "Flutter", color: "#02569B" },
  { name: "Python", color: "#3776AB" },
  { name: "AWS", color: "#FF9900" },
  { name: "Azure", color: "#0089D6" },
  { name: "Docker", color: "#2496ED" },
  { name: "K8s", color: "#326CE5" },
  { name: "TF", color: "#FF6F00" },
  { name: "OpenAI", color: "#10A37F" },
  { name: "Java", color: "#ED8B00" },
  { name: "Go", color: "#00ADD8" },
];

const NODE_COUNT = TECH.length;
const ORBIT_RADIUS = 3;
const PARTICLE_COUNT = 200;

export default function OrbitalRing() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const nodesRef = useRef<THREE.Group>(null);

  // Ambient particle cloud
  const { particlePositions, particleColors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = ORBIT_RADIUS * (0.5 + Math.random() * 1.2);
      pos[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * 1.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 1.5;
      col[i * 3] = 0.08;
      col[i * 3 + 1] = 0.72;
      col[i * 3 + 2] = 0.65;
    }
    return { particlePositions: pos, particleColors: col };
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !pointsRef.current || !nodesRef.current) return;
    const time = state.clock.elapsedTime;

    // Slow group rotation
    groupRef.current.rotation.y = time * 0.08;
    groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.1;

    // Orbit each tech node
    nodesRef.current.children.forEach((child, i) => {
      const angle = (i / NODE_COUNT) * Math.PI * 2 + time * 0.2;
      const yOffset = Math.sin(time * 0.5 + i * 0.8) * 0.3;
      child.position.set(
        Math.cos(angle) * ORBIT_RADIUS,
        yOffset,
        Math.sin(angle) * ORBIT_RADIUS
      );
    });

    // Gently animate ambient particles
    const posArr = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      posArr[i * 3 + 1] +=
        Math.sin(time * 1.5 + i * 0.3) * 0.0008;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {/* Orbit ring wireframe */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ORBIT_RADIUS, 0.005, 16, 100]} />
        <meshBasicMaterial
          color="#14B8A6"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Second orbit ring — offset angle */}
      <mesh rotation={[Math.PI / 2.3, 0.3, 0]}>
        <torusGeometry args={[ORBIT_RADIUS * 0.85, 0.004, 16, 80]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Tech Node Spheres */}
      <group ref={nodesRef}>
        {TECH.map((tech, i) => {
          const angle = (i / NODE_COUNT) * Math.PI * 2;
          return (
            <mesh
              key={tech.name}
              position={[
                Math.cos(angle) * ORBIT_RADIUS,
                0,
                Math.sin(angle) * ORBIT_RADIUS,
              ]}
            >
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshBasicMaterial
                color={tech.color}
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          );
        })}
      </group>

      {/* Ambient particle dust */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Central core glow sphere */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial
          color="#14B8A6"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
