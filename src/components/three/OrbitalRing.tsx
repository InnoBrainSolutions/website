"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Cloud, Code, Sparkles, Layers } from "lucide-react";

// ────────────────────────────────────────────
// Tech Ecosystem Nodes Data
// ────────────────────────────────────────────

export interface TechNode {
  id: string;
  name: string;
  category: "AI & ML" | "Frontend & Mobile" | "Cloud & Infrastructure";
  iconName: string;
  color: string;
  description: string;
  pos: [number, number, number];
  connections: string[]; // IDs of connected tech
}

export const TECH_NODES: TechNode[] = [
  // AI & ML Tier (Top / Center)
  {
    id: "openai",
    name: "OpenAI",
    category: "AI & ML",
    iconName: "Sparkles",
    color: "#10A37F",
    description: "LLMs, GPT-4o, and Autonomous Agent Systems",
    pos: [0, 1.8, 0.4],
    connections: ["python", "langchain", "tensorflow", "core"],
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "AI & ML",
    iconName: "Brain",
    color: "#FF6F00",
    description: "Deep Learning & Neural Network Training",
    pos: [-2.2, 1.5, -0.5],
    connections: ["python", "openai", "core"],
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "AI & ML",
    iconName: "Cpu",
    color: "#1C3C3C",
    description: "RAG & LLM Orchestration Pipelines",
    pos: [2.2, 1.4, -0.4],
    connections: ["openai", "python", "core"],
  },
  {
    id: "python",
    name: "Python",
    category: "AI & ML",
    iconName: "Code",
    color: "#3776AB",
    description: "Core AI/ML & Data Engineering Language",
    pos: [-1.2, 0.7, 0.8],
    connections: ["openai", "tensorflow", "langchain", "aws", "core"],
  },

  // Frontend & Mobile Tier (Left / Front)
  {
    id: "react",
    name: "React",
    category: "Frontend & Mobile",
    iconName: "Layers",
    color: "#61DAFB",
    description: "Interactive UI & Component Architecture",
    pos: [-3.2, -0.6, 0.6],
    connections: ["nextjs", "flutter", "core"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend & Mobile",
    iconName: "Code",
    color: "#FFFFFF",
    description: "Serverless Web Platform & SSR Engine",
    pos: [-1.8, -1.2, 1.2],
    connections: ["react", "python", "aws", "core"],
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "Frontend & Mobile",
    iconName: "Layers",
    color: "#02569B",
    description: "Cross-Platform Mobile Apps (iOS & Android)",
    pos: [-3.6, -1.8, -0.6],
    connections: ["react", "core"],
  },

  // Cloud & Infrastructure Tier (Right / Back)
  {
    id: "aws",
    name: "AWS",
    category: "Cloud & Infrastructure",
    iconName: "Cloud",
    color: "#FF9900",
    description: "Enterprise Cloud Architecture & Serverless",
    pos: [1.8, -0.6, 1.0],
    connections: ["docker", "kubernetes", "python", "nextjs", "core"],
  },
  {
    id: "azure",
    name: "Azure",
    category: "Cloud & Infrastructure",
    iconName: "Cloud",
    color: "#0089D6",
    description: "Enterprise Hybrid Cloud & Security",
    pos: [3.4, -0.4, -0.8],
    connections: ["aws", "kubernetes", "core"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "Cloud & Infrastructure",
    iconName: "Layers",
    color: "#2496ED",
    description: "Containerization & Reproducible Environments",
    pos: [1.4, -1.6, -0.4],
    connections: ["aws", "kubernetes", "core"],
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "Cloud & Infrastructure",
    iconName: "Cloud",
    color: "#326CE5",
    description: "Auto-Scaling Microservices Orchestration",
    pos: [3.0, -1.5, 0.4],
    connections: ["docker", "aws", "azure", "core"],
  },

  // Central Core Node
  {
    id: "core",
    name: "InnoBrain Engine",
    category: "AI & ML",
    iconName: "Brain",
    color: "#14B8A6",
    description: "Intelligent Neural Architecture",
    pos: [0, -0.1, 0],
    connections: [],
  },
];

const PARTICLE_COUNT = 300;

// ────────────────────────────────────────────
// 3D Neural Connections & Flowing Data Pulses
// ────────────────────────────────────────────

function NeuralConnections({
  hoveredId,
}: {
  hoveredId: string | null;
}) {
  const lineShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying float vUvX;
        void main() {
          vUvX = uv.x;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying float vUvX;
        void main() {
          float pulse = sin(vUvX * 12.0 - uTime * 3.5) * 0.5 + 0.5;
          pulse = pow(pulse, 3.0);
          vec3 cyan = vec3(0.08, 0.85, 0.78);
          vec3 blue = vec3(0.23, 0.51, 0.96);
          vec3 col = mix(cyan, blue, pulse);
          gl_FragColor = vec4(col, 0.15 + pulse * 0.45);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const lines = useMemo(() => {
    const nodeMap = new Map(TECH_NODES.map((n) => [n.id, n]));
    const lineObjs: { line: THREE.Line; from: string; to: string }[] = [];
    const added = new Set<string>();

    TECH_NODES.forEach((node) => {
      node.connections.forEach((targetId) => {
        const target = nodeMap.get(targetId);
        if (!target) return;

        const pairKey = [node.id, targetId].sort().join("--");
        if (added.has(pairKey)) return;
        added.add(pairKey);

        const p1 = new THREE.Vector3(...node.pos);
        const p2 = new THREE.Vector3(...target.pos);

        const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
        const lineObj = new THREE.Line(geo, lineShaderMaterial);
        lineObjs.push({ line: lineObj, from: node.id, to: targetId });
      });
    });

    return lineObjs;
  }, [lineShaderMaterial]);

  useFrame((state) => {
    lineShaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group>
      {lines.map((item, i) => {
        const isConnected =
          hoveredId &&
          (item.from === hoveredId || item.to === hoveredId);

        return (
          <primitive
            key={i}
            object={item.line}
            scale={isConnected ? 1.05 : 1}
          />
        );
      })}
    </group>
  );
}

// ────────────────────────────────────────────
// Main 3D Tech Network Canvas Component
// ────────────────────────────────────────────

export default function TechNetwork({
  onSelectNode,
}: {
  onSelectNode: (node: TechNode | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Background particle dust
  const { particlePos, particleCol } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      col[i * 3] = 0.08;
      col[i * 3 + 1] = 0.72;
      col[i * 3 + 2] = 0.65;
    }
    return { particlePos: pos, particleCol: col };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Gentle slow rotation of entire network
    groupRef.current.rotation.y = Math.sin(time * 0.15) * 0.15 + time * 0.03;
    groupRef.current.rotation.x = Math.cos(time * 0.1) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Background Particle Dust */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePos, 3]} />
          <bufferAttribute attach="attributes-color" args={[particleCol, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 3D Neural Connections */}
      <NeuralConnections hoveredId={hoveredId} />

      {/* Central InnoBrain Engine Core */}
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshBasicMaterial
          color="#14B8A6"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#14B8A6" transparent opacity={0.9} />
      </mesh>

      {/* Tech Nodes (3D Interactive Badges) */}
      {TECH_NODES.map((node) => {
        if (node.id === "core") return null;

        const isHovered = hoveredId === node.id;
        const isConnectedToHovered =
          hoveredId &&
          (node.connections.includes(hoveredId) ||
            TECH_NODES.find((n) => n.id === hoveredId)?.connections.includes(
              node.id
            ));

        return (
          <group key={node.id} position={node.pos}>
            {/* Glowing Sphere Node */}
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredId(node.id);
                onSelectNode(node);
              }}
              onPointerOut={() => {
                setHoveredId(null);
                onSelectNode(null);
              }}
            >
              <sphereGeometry args={[isHovered ? 0.2 : 0.14, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={isHovered ? 1.0 : isConnectedToHovered ? 0.85 : 0.65}
              />
            </mesh>

            {/* HTML Label Floating Badge */}
            <Html
              position={[0, 0.32, 0]}
              center
              distanceFactor={8}
              zIndexRange={[100, 0]}
            >
              <div
                onMouseEnter={() => {
                  setHoveredId(node.id);
                  onSelectNode(node);
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  onSelectNode(null);
                }}
                className={`px-3 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isHovered
                    ? "bg-white/20 text-white border-white scale-110 shadow-[0_0_20px_rgba(20,184,166,0.6)]"
                    : isConnectedToHovered
                    ? "bg-white/10 text-white border-white/40 scale-105"
                    : "bg-black/40 text-white/70 border-white/10 hover:border-white/30"
                }`}
                style={{
                  boxShadow: isHovered
                    ? `0 0 20px ${node.color}`
                    : undefined,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: node.color }}
                />
                <span className="text-xs font-semibold tracking-wide">
                  {node.name}
                </span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
