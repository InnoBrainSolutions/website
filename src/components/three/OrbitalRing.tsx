"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export interface TechNode {
  id: string;
  name: string;
  category: "AI & Intelligence" | "Application Architecture" | "Cloud & Infrastructure";
  color: string;
  description: string;
  ring: number; // 1: Inner AI, 2: Middle App, 3: Outer Cloud
  angle: number; // Angle around concentric ring
  pos: [number, number, number];
}

// ────────────────────────────────────────────
// Structured Neural Synapse Network (20 Technologies)
// Concentric Rings — Zero Tangled Wires!
// ────────────────────────────────────────────

const RAW_NODES: Omit<TechNode, "pos">[] = [
  // Ring 1: AI & Intelligence Core (Inner Ring R = 2.2)
  {
    id: "openai",
    name: "OpenAI GPT-4o",
    category: "AI & Intelligence",
    color: "#10A37F",
    description: "LLMs, Fine-Tuning & Autonomous AI Agents",
    ring: 1,
    angle: 0,
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI & Intelligence",
    color: "#EE4C2C",
    description: "Deep Learning & Model Training Framework",
    ring: 1,
    angle: (Math.PI * 2) / 6,
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "AI & Intelligence",
    color: "#1C3C3C",
    description: "RAG Pipelines & Agent Orchestration",
    ring: 1,
    angle: ((Math.PI * 2) / 6) * 2,
  },
  {
    id: "python",
    name: "Python AI",
    category: "AI & Intelligence",
    color: "#3776AB",
    description: "Core AI/ML Runtime & Data Engineering",
    ring: 1,
    angle: ((Math.PI * 2) / 6) * 3,
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "AI & Intelligence",
    color: "#FF6F00",
    description: "Neural Network Training & Edge Deployment",
    ring: 1,
    angle: ((Math.PI * 2) / 6) * 4,
  },
  {
    id: "anthropic",
    name: "Anthropic Claude",
    category: "AI & Intelligence",
    color: "#D97706",
    description: "Reasoning Models & Safety Alignment",
    ring: 1,
    angle: ((Math.PI * 2) / 6) * 5,
  },

  // Ring 2: Application Architecture (Middle Ring R = 4.0)
  {
    id: "nextjs",
    name: "Next.js 15",
    category: "Application Architecture",
    color: "#FFFFFF",
    description: "Serverless Web Engine & SSR Architecture",
    ring: 2,
    angle: 0,
  },
  {
    id: "react",
    name: "React 19",
    category: "Application Architecture",
    color: "#61DAFB",
    description: "Interactive Component UI & Concurrent Rendering",
    ring: 2,
    angle: (Math.PI * 2) / 7,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Application Architecture",
    color: "#3178C6",
    description: "Type-Safe Enterprise Application Logic",
    ring: 2,
    angle: ((Math.PI * 2) / 7) * 2,
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "Application Architecture",
    color: "#02569B",
    description: "Native Cross-Platform iOS & Android Apps",
    ring: 2,
    angle: ((Math.PI * 2) / 7) * 3,
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "Application Architecture",
    color: "#E535AB",
    description: "Declarative Unified Data API Layer",
    ring: 2,
    angle: ((Math.PI * 2) / 7) * 4,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Application Architecture",
    color: "#06B6D4",
    description: "Modern Design System & Utility Styling",
    ring: 2,
    angle: ((Math.PI * 2) / 7) * 5,
  },
  {
    id: "node",
    name: "Node.js",
    category: "Application Architecture",
    color: "#5FA04E",
    description: "Asynchronous Enterprise Backend Services",
    ring: 2,
    angle: ((Math.PI * 2) / 7) * 6,
  },

  // Ring 3: Cloud & Scale (Outer Ring R = 5.8)
  {
    id: "aws",
    name: "AWS Enterprise",
    category: "Cloud & Infrastructure",
    color: "#FF9900",
    description: "Scalable Cloud Compute & Serverless",
    ring: 3,
    angle: 0,
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "Cloud & Infrastructure",
    color: "#326CE5",
    description: "Auto-Scaling Microservices Orchestration",
    ring: 3,
    angle: (Math.PI * 2) / 7,
  },
  {
    id: "docker",
    name: "Docker",
    category: "Cloud & Infrastructure",
    color: "#2496ED",
    description: "Containerization & Isolated Services",
    ring: 3,
    angle: ((Math.PI * 2) / 7) * 2,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Cloud & Infrastructure",
    color: "#4169E1",
    description: "Reliable Relational Database & Vector Store",
    ring: 3,
    angle: ((Math.PI * 2) / 7) * 3,
  },
  {
    id: "redis",
    name: "Redis",
    category: "Cloud & Infrastructure",
    color: "#DC2626",
    description: "Ultra-Fast In-Memory Cache & Message Broker",
    ring: 3,
    angle: ((Math.PI * 2) / 7) * 4,
  },
  {
    id: "azure",
    name: "Azure",
    category: "Cloud & Infrastructure",
    color: "#0089D6",
    description: "Enterprise Hybrid Cloud & Security",
    ring: 3,
    angle: ((Math.PI * 2) / 7) * 5,
  },
  {
    id: "gcp",
    name: "Google Cloud",
    category: "Cloud & Infrastructure",
    color: "#4285F4",
    description: "AI Cloud Compute & BigData Processing",
    ring: 3,
    angle: ((Math.PI * 2) / 7) * 6,
  },
];

// Calculate 3D positions on concentric rings with subtle height elevation
export const TECH_NODES: TechNode[] = RAW_NODES.map((node) => {
  const radii = [0, 2.2, 4.0, 5.8];
  const r = radii[node.ring];
  const x = Math.cos(node.angle) * r;
  const z = Math.sin(node.angle) * r;
  const y = (node.ring - 2) * 0.4 + Math.sin(node.angle * 2) * 0.2;
  return { ...node, pos: [x, y, z] };
});

const DUST_COUNT = 400;

// ────────────────────────────────────────────
// Structured Synaptic Energy Paths (Clean, Radial & Ring Pathways)
// ────────────────────────────────────────────

function SynapticPathways({ hoveredId }: { hoveredId: string | null }) {
  const pathMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
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
          float pulse = sin(vUvX * 16.0 - uTime * 4.0) * 0.5 + 0.5;
          pulse = pow(pulse, 4.0);
          vec3 cyan = vec3(0.08, 0.88, 0.78);
          vec3 blue = vec3(0.23, 0.55, 1.0);
          vec3 col = mix(cyan, blue, pulse);
          gl_FragColor = vec4(col, 0.12 + pulse * 0.55);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const lines = useMemo(() => {
    const lineObjs: { line: THREE.Line; id1: string; id2: string }[] = [];

    // 1. Radial Spoke Connections from Central Core to Ring 1 Nodes
    TECH_NODES.filter((n) => n.ring === 1).forEach((node) => {
      const p1 = new THREE.Vector3(0, 0, 0);
      const p2 = new THREE.Vector3(...node.pos);
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      lineObjs.push({ line: new THREE.Line(geo, pathMaterial), id1: "core", id2: node.id });
    });

    // 2. Inter-Ring Radial Connections (Ring 1 -> Ring 2 -> Ring 3)
    TECH_NODES.filter((n) => n.ring === 2).forEach((node) => {
      // Connect to closest Ring 1 node
      const r1Nodes = TECH_NODES.filter((n1) => n1.ring === 1);
      const closest1 = r1Nodes.reduce((prev, curr) => {
        const d1 = new THREE.Vector3(...node.pos).distanceTo(new THREE.Vector3(...prev.pos));
        const d2 = new THREE.Vector3(...node.pos).distanceTo(new THREE.Vector3(...curr.pos));
        return d1 < d2 ? prev : curr;
      });

      const p1 = new THREE.Vector3(...closest1.pos);
      const p2 = new THREE.Vector3(...node.pos);
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      lineObjs.push({ line: new THREE.Line(geo, pathMaterial), id1: closest1.id, id2: node.id });
    });

    TECH_NODES.filter((n) => n.ring === 3).forEach((node) => {
      // Connect to closest Ring 2 node
      const r2Nodes = TECH_NODES.filter((n2) => n2.ring === 2);
      const closest2 = r2Nodes.reduce((prev, curr) => {
        const d1 = new THREE.Vector3(...node.pos).distanceTo(new THREE.Vector3(...prev.pos));
        const d2 = new THREE.Vector3(...node.pos).distanceTo(new THREE.Vector3(...curr.pos));
        return d1 < d2 ? prev : curr;
      });

      const p1 = new THREE.Vector3(...closest2.pos);
      const p2 = new THREE.Vector3(...node.pos);
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      lineObjs.push({ line: new THREE.Line(geo, pathMaterial), id1: closest2.id, id2: node.id });
    });

    return lineObjs;
  }, [pathMaterial]);

  useFrame((state) => {
    pathMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group>
      {lines.map((item, i) => {
        const isHovered =
          hoveredId && (item.id1 === hoveredId || item.id2 === hoveredId);
        return (
          <primitive
            key={i}
            object={item.line}
            scale={isHovered ? 1.05 : 1}
          />
        );
      })}
    </group>
  );
}

// ────────────────────────────────────────────
// Concentric Orbital Ring Guides
// ────────────────────────────────────────────

function ConcentricRingGuides() {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {/* Ring 1 Guide */}
      <mesh>
        <torusGeometry args={[2.2, 0.006, 16, 100]} />
        <meshBasicMaterial color="#14B8A6" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Ring 2 Guide */}
      <mesh>
        <torusGeometry args={[4.0, 0.005, 16, 120]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.12} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Ring 3 Guide */}
      <mesh>
        <torusGeometry args={[5.8, 0.004, 16, 140]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// ────────────────────────────────────────────
// Central InnoBrain Neural Brain Node
// ────────────────────────────────────────────

function CentralNeuralCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (coreRef.current) coreRef.current.rotation.y = time * 0.2;
    if (shellRef.current) shellRef.current.rotation.y = -time * 0.15;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[0.7, 2]} />
        <meshBasicMaterial wireframe color="#14B8A6" transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Inner Glowing Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshBasicMaterial color="#14B8A6" transparent opacity={0.8} blending={THREE.AdditiveBlending} />
      </mesh>
      <Html center position={[0, 0, 0]} zIndexRange={[10, 0]}>
        <div className="px-3 py-1 rounded-full bg-teal/20 border border-teal/40 backdrop-blur-md text-[10px] font-extrabold text-teal tracking-widest uppercase shadow-[0_0_15px_rgba(20,184,166,0.5)]">
          InnoBrain Engine
        </div>
      </Html>
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
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { particlePos, particleCol } = useMemo(() => {
    const pos = new Float32Array(DUST_COUNT * 3);
    const col = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      const r = 1.0 + Math.random() * 6.5;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pos[i * 3 + 2] = Math.sin(angle) * r;

      col[i * 3] = 0.08;
      col[i * 3 + 1] = 0.85;
      col[i * 3 + 2] = 0.78;
    }
    return { particlePos: pos, particleCol: col };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Smooth subtle rotational animation & mouse tilt
    const targetY = time * 0.03 + mouseRef.current.x * 0.12;
    const targetX = 0.35 + mouseRef.current.y * 0.08;

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Concentric Guide Rings */}
      <ConcentricRingGuides />

      {/* Ambient Neural Dust */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePos, 3]} />
          <bufferAttribute attach="attributes-color" args={[particleCol, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.035} vertexColors transparent opacity={0.3} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>

      {/* Central InnoBrain Engine Core */}
      <CentralNeuralCore />

      {/* Clean Structured Synaptic Pathways */}
      <SynapticPathways hoveredId={hoveredId} />

      {/* 20 Technology Synapse Nodes */}
      {TECH_NODES.map((node) => {
        const isHovered = hoveredId === node.id;

        return (
          <group key={node.id} position={node.pos}>
            {/* Synapse Node Sphere */}
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
              <sphereGeometry args={[isHovered ? 0.22 : 0.14, 16, 16]} />
              <meshBasicMaterial color={node.color} transparent opacity={isHovered ? 1.0 : 0.75} />
            </mesh>

            {/* Glowing Aura Ring */}
            <mesh>
              <sphereGeometry args={[isHovered ? 0.36 : 0.24, 16, 16]} />
              <meshBasicMaterial color={node.color} transparent opacity={isHovered ? 0.4 : 0.12} blending={THREE.AdditiveBlending} />
            </mesh>

            {/* Clean HTML Badge Label */}
            <Html position={[0, 0.38, 0]} center distanceFactor={9.5} zIndexRange={[100, 0]}>
              <div
                onMouseEnter={() => {
                  setHoveredId(node.id);
                  onSelectNode(node);
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  onSelectNode(null);
                }}
                className={`px-3 py-1.5 rounded-xl border backdrop-blur-xl transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2 shadow-lg ${
                  isHovered
                    ? "bg-white/20 text-white border-white scale-110 shadow-[0_0_25px_rgba(20,184,166,0.8)]"
                    : "bg-black/60 text-white/80 border-white/10 hover:border-white/40"
                }`}
                style={{ boxShadow: isHovered ? `0 0 20px ${node.color}` : undefined }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: node.color }} />
                <span className="text-xs font-bold tracking-wide">{node.name}</span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
