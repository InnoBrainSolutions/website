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
// Restrained InnoBrain Brand Palette (Skills.md Compliant)
// Primary Teal (#14B8A6) | Electric Blue (#3B82F6) | Cyber Cyan (#06B6D4) | Accent Violet (#8B5CF6)
// ────────────────────────────────────────────

const RAW_NODES: Omit<TechNode, "pos">[] = [
  // Ring 1: AI & Intelligence Core (Teal & Cyan Brand Spectrum)
  {
    id: "openai",
    name: "OpenAI GPT-4o",
    category: "AI & Intelligence",
    color: "#14B8A6", // Primary Teal
    description: "LLMs, Fine-Tuning & Autonomous AI Agents",
    ring: 1,
    angle: 0,
  },
  {
    id: "pytorch",
    name: "PyTorch",
    category: "AI & Intelligence",
    color: "#06B6D4", // Cyber Cyan
    description: "Deep Learning & Model Training Framework",
    ring: 1,
    angle: (Math.PI * 2) / 6,
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "AI & Intelligence",
    color: "#2DD4BF", // Bright Mint Teal
    description: "RAG Pipelines & Agent Orchestration",
    ring: 1,
    angle: ((Math.PI * 2) / 6) * 2,
  },
  {
    id: "python",
    name: "Python AI",
    category: "AI & Intelligence",
    color: "#3B82F6", // Electric Blue
    description: "Core AI/ML Runtime & Data Engineering",
    ring: 1,
    angle: ((Math.PI * 2) / 6) * 3,
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "AI & Intelligence",
    color: "#06B6D4", // Cyber Cyan
    description: "Neural Network Training & Edge Deployment",
    ring: 1,
    angle: ((Math.PI * 2) / 6) * 4,
  },
  {
    id: "anthropic",
    name: "Anthropic Claude",
    category: "AI & Intelligence",
    color: "#14B8A6", // Primary Teal
    description: "Reasoning Models & Safety Alignment",
    ring: 1,
    angle: ((Math.PI * 2) / 6) * 5,
  },

  // Ring 2: Application Architecture (Electric Blue & Crisp Light Spectrum)
  {
    id: "nextjs",
    name: "Next.js 15",
    category: "Application Architecture",
    color: "#F8FAFC", // Crisp Light
    description: "Serverless Web Engine & SSR Architecture",
    ring: 2,
    angle: 0,
  },
  {
    id: "react",
    name: "React 19",
    category: "Application Architecture",
    color: "#38BDF8", // Sky Blue
    description: "Interactive Component UI & Concurrent Rendering",
    ring: 2,
    angle: (Math.PI * 2) / 7,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Application Architecture",
    color: "#3B82F6", // Electric Blue
    description: "Type-Safe Enterprise Application Logic",
    ring: 2,
    angle: ((Math.PI * 2) / 7) * 2,
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "Application Architecture",
    color: "#0284C7", // Deep Sky
    description: "Native Cross-Platform iOS & Android Apps",
    ring: 2,
    angle: ((Math.PI * 2) / 7) * 3,
  },
  {
    id: "graphql",
    name: "GraphQL",
    category: "Application Architecture",
    color: "#8B5CF6", // Accent Violet
    description: "Declarative Unified Data API Layer",
    ring: 2,
    angle: ((Math.PI * 2) / 7) * 4,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Application Architecture",
    color: "#06B6D4", // Cyber Cyan
    description: "Modern Design System & Utility Styling",
    ring: 2,
    angle: ((Math.PI * 2) / 7) * 5,
  },
  {
    id: "node",
    name: "Node.js",
    category: "Application Architecture",
    color: "#10B981", // Emerald
    description: "Asynchronous Enterprise Backend Services",
    ring: 2,
    angle: ((Math.PI * 2) / 7) * 6,
  },

  // Ring 3: Cloud & Scale (Violet & Deep Electric Spectrum)
  {
    id: "aws",
    name: "AWS Enterprise",
    category: "Cloud & Infrastructure",
    color: "#3B82F6", // Electric Blue
    description: "Scalable Cloud Compute & Serverless",
    ring: 3,
    angle: 0,
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "Cloud & Infrastructure",
    color: "#6366F1", // Indigo
    description: "Auto-Scaling Microservices Orchestration",
    ring: 3,
    angle: (Math.PI * 2) / 7,
  },
  {
    id: "docker",
    name: "Docker",
    category: "Cloud & Infrastructure",
    color: "#0284C7", // Deep Sky
    description: "Containerization & Isolated Services",
    ring: 3,
    angle: ((Math.PI * 2) / 7) * 2,
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Cloud & Infrastructure",
    color: "#8B5CF6", // Accent Violet
    description: "Reliable Relational Database & Vector Store",
    ring: 3,
    angle: ((Math.PI * 2) / 7) * 3,
  },
  {
    id: "redis",
    name: "Redis",
    category: "Cloud & Infrastructure",
    color: "#06B6D4", // Cyber Cyan
    description: "Ultra-Fast In-Memory Cache & Message Broker",
    ring: 3,
    angle: ((Math.PI * 2) / 7) * 4,
  },
  {
    id: "azure",
    name: "Azure",
    category: "Cloud & Infrastructure",
    color: "#3B82F6", // Electric Blue
    description: "Enterprise Hybrid Cloud & Security",
    ring: 3,
    angle: ((Math.PI * 2) / 7) * 5,
  },
  {
    id: "gcp",
    name: "Google Cloud",
    category: "Cloud & Infrastructure",
    color: "#6366F1", // Indigo
    description: "AI Cloud Compute & BigData Processing",
    ring: 3,
    angle: ((Math.PI * 2) / 7) * 6,
  },
];

// Calculate 3D positions on concentric rings with subtle height elevation
export const TECH_NODES: TechNode[] = RAW_NODES.map((node) => {
  const radii = [0, 2.0, 3.6, 5.2];
  const r = radii[node.ring];
  const x = Math.cos(node.angle) * r;
  const z = Math.sin(node.angle) * r;
  const y = (node.ring - 2) * 0.3 + Math.sin(node.angle * 2) * 0.15;
  return { ...node, pos: [x, y, z] };
});

const DUST_COUNT = 400;

// Map of connections between nodes for interactive highlighting
const CONNECTIONS_MAP: { [key: string]: string[] } = {};
TECH_NODES.forEach((node) => {
  CONNECTIONS_MAP[node.id] = ["core"];
});

// Radial connections
TECH_NODES.filter((n) => n.ring === 2).forEach((node) => {
  const r1Nodes = TECH_NODES.filter((n1) => n1.ring === 1);
  const closest1 = r1Nodes.reduce((prev, curr) => {
    const d1 = new THREE.Vector3(...node.pos).distanceTo(new THREE.Vector3(...prev.pos));
    const d2 = new THREE.Vector3(...node.pos).distanceTo(new THREE.Vector3(...curr.pos));
    return d1 < d2 ? prev : curr;
  });
  if (!CONNECTIONS_MAP[node.id].includes(closest1.id)) CONNECTIONS_MAP[node.id].push(closest1.id);
  if (!CONNECTIONS_MAP[closest1.id].includes(node.id)) CONNECTIONS_MAP[closest1.id].push(node.id);
});

TECH_NODES.filter((n) => n.ring === 3).forEach((node) => {
  const r2Nodes = TECH_NODES.filter((n2) => n2.ring === 2);
  const closest2 = r2Nodes.reduce((prev, curr) => {
    const d1 = new THREE.Vector3(...node.pos).distanceTo(new THREE.Vector3(...prev.pos));
    const d2 = new THREE.Vector3(...node.pos).distanceTo(new THREE.Vector3(...curr.pos));
    return d1 < d2 ? prev : curr;
  });
  if (!CONNECTIONS_MAP[node.id].includes(closest2.id)) CONNECTIONS_MAP[node.id].push(closest2.id);
  if (!CONNECTIONS_MAP[closest2.id].includes(node.id)) CONNECTIONS_MAP[closest2.id].push(node.id);
});

// ────────────────────────────────────────────
// Structured Synaptic Energy Paths with Hover Highlighting
// ────────────────────────────────────────────

function SynapticPathways({ hoveredId }: { hoveredId: string | null }) {
  const defaultMaterial = useMemo(() => {
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
          gl_FragColor = vec4(col, 0.14 + pulse * 0.55);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const activeMaterial = useMemo(() => {
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
          float pulse = sin(vUvX * 24.0 - uTime * 6.0) * 0.5 + 0.5;
          pulse = pow(pulse, 2.5);
          vec3 brightCyan = vec3(0.1, 0.98, 0.9);
          vec3 violetPulse = vec3(0.55, 0.36, 0.96);
          vec3 col = mix(brightCyan, violetPulse, pulse);
          gl_FragColor = vec4(col, 0.75 + pulse * 0.25);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const dimMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        void main() {
          gl_FragColor = vec4(0.08, 0.5, 0.6, 0.03);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  const lines = useMemo(() => {
    const lineObjs: { defaultLine: THREE.Line; activeLine: THREE.Line; dimLine: THREE.Line; id1: string; id2: string }[] = [];

    // 1. Spoke Connections Core -> Ring 1
    TECH_NODES.filter((n) => n.ring === 1).forEach((node) => {
      const p1 = new THREE.Vector3(0, 0, 0);
      const p2 = new THREE.Vector3(...node.pos);
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      lineObjs.push({
        defaultLine: new THREE.Line(geo, defaultMaterial),
        activeLine: new THREE.Line(geo, activeMaterial),
        dimLine: new THREE.Line(geo, dimMaterial),
        id1: "core",
        id2: node.id,
      });
    });

    // 2. Inter-Ring Radial Connections (Ring 1 -> Ring 2 -> Ring 3)
    TECH_NODES.filter((n) => n.ring === 2).forEach((node) => {
      const r1Nodes = TECH_NODES.filter((n1) => n1.ring === 1);
      const closest1 = r1Nodes.reduce((prev, curr) => {
        const d1 = new THREE.Vector3(...node.pos).distanceTo(new THREE.Vector3(...prev.pos));
        const d2 = new THREE.Vector3(...node.pos).distanceTo(new THREE.Vector3(...curr.pos));
        return d1 < d2 ? prev : curr;
      });
      const p1 = new THREE.Vector3(...closest1.pos);
      const p2 = new THREE.Vector3(...node.pos);
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      lineObjs.push({
        defaultLine: new THREE.Line(geo, defaultMaterial),
        activeLine: new THREE.Line(geo, activeMaterial),
        dimLine: new THREE.Line(geo, dimMaterial),
        id1: closest1.id,
        id2: node.id,
      });
    });

    TECH_NODES.filter((n) => n.ring === 3).forEach((node) => {
      const r2Nodes = TECH_NODES.filter((n2) => n2.ring === 2);
      const closest2 = r2Nodes.reduce((prev, curr) => {
        const d1 = new THREE.Vector3(...node.pos).distanceTo(new THREE.Vector3(...prev.pos));
        const d2 = new THREE.Vector3(...node.pos).distanceTo(new THREE.Vector3(...curr.pos));
        return d1 < d2 ? prev : curr;
      });
      const p1 = new THREE.Vector3(...closest2.pos);
      const p2 = new THREE.Vector3(...node.pos);
      const geo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      lineObjs.push({
        defaultLine: new THREE.Line(geo, defaultMaterial),
        activeLine: new THREE.Line(geo, activeMaterial),
        dimLine: new THREE.Line(geo, dimMaterial),
        id1: closest2.id,
        id2: node.id,
      });
    });

    return lineObjs;
  }, [defaultMaterial, activeMaterial, dimMaterial]);

  useFrame((state) => {
    defaultMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    activeMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group>
      {lines.map((item, i) => {
        const isConnected =
          hoveredId && (item.id1 === hoveredId || item.id2 === hoveredId);
        const isDim = hoveredId && !isConnected;

        return (
          <primitive
            key={i}
            object={
              isConnected
                ? item.activeLine
                : isDim
                ? item.dimLine
                : item.defaultLine
            }
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
        <torusGeometry args={[2.0, 0.005, 16, 100]} />
        <meshBasicMaterial color="#14B8A6" transparent opacity={0.18} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Ring 2 Guide */}
      <mesh>
        <torusGeometry args={[3.6, 0.004, 16, 120]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.14} blending={THREE.AdditiveBlending} />
      </mesh>
      {/* Ring 3 Guide */}
      <mesh>
        <torusGeometry args={[5.2, 0.003, 16, 140]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// ────────────────────────────────────────────
// Central InnoBrain Engine Core
// ────────────────────────────────────────────

function CentralNeuralCore({ isHovered }: { isHovered: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (coreRef.current) coreRef.current.rotation.y = time * 0.25;
    if (shellRef.current) shellRef.current.rotation.y = -time * 0.18;
    if (ringRef.current) ringRef.current.rotation.z = time * 0.3;
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Rotating Energy Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.9, 0.008, 16, 80]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Wireframe Shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[0.65, 2]} />
        <meshBasicMaterial wireframe color="#14B8A6" transparent opacity={isHovered ? 0.6 : 0.35} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Inner Glowing Core Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.36, 32, 32]} />
        <meshBasicMaterial color="#14B8A6" transparent opacity={isHovered ? 1.0 : 0.85} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Outer Halo Aura */}
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={isHovered ? 0.4 : 0.2} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Enhanced Core HTML Badge — Fixed Scale & Uniform Sizing */}
      <Html center position={[0, 0, 0]} zIndexRange={[100, 0]}>
        <div className="px-3.5 py-1.5 rounded-full bg-black/85 border border-teal/60 backdrop-blur-xl flex items-center gap-2 shadow-[0_0_20px_rgba(20,184,166,0.5)] cursor-pointer whitespace-nowrap">
          <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
          <span className="text-[11px] font-black tracking-widest text-white uppercase">
            InnoBrain <span className="text-teal">Engine</span>
          </span>
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
      const r = 1.0 + Math.random() * 6.0;
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

    const targetY = time * 0.03 + mouseRef.current.x * 0.1;
    const targetX = 0.3 + mouseRef.current.y * 0.06;

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
      <CentralNeuralCore isHovered={hoveredId === "core"} />

      {/* Clean Structured Synaptic Pathways with Highlighting */}
      <SynapticPathways hoveredId={hoveredId} />

      {/* 20 Technology Synapse Nodes */}
      {TECH_NODES.map((node) => {
        const isHovered = hoveredId === node.id;
        const isConnected = hoveredId && CONNECTIONS_MAP[hoveredId]?.includes(node.id);
        const isDim = hoveredId && !isHovered && !isConnected;

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
              <sphereGeometry args={[isHovered ? 0.2 : isConnected ? 0.16 : 0.12, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={isDim ? 0.25 : isHovered ? 1.0 : isConnected ? 0.95 : 0.8}
              />
            </mesh>

            {/* Glowing Aura Ring */}
            <mesh>
              <sphereGeometry args={[isHovered ? 0.35 : isConnected ? 0.26 : 0.18, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={isDim ? 0.05 : isHovered ? 0.45 : isConnected ? 0.3 : 0.12}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* Uniform Crisp HTML Badge (Fixed Scale, No Camera Distance Ballooning) */}
            <Html position={[0, 0.3, 0]} center zIndexRange={[100, 0]}>
              <div
                onMouseEnter={() => {
                  setHoveredId(node.id);
                  onSelectNode(node);
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  onSelectNode(null);
                }}
                className={`px-2.5 py-1 rounded-lg border backdrop-blur-md transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-md ${
                  isHovered
                    ? "bg-white/25 text-white border-white scale-110 shadow-[0_0_20px_rgba(20,184,166,0.9)] opacity-100 z-50"
                    : isConnected
                    ? "bg-teal/20 text-white border-teal/60 scale-105 opacity-100 shadow-[0_0_12px_rgba(20,184,166,0.4)]"
                    : isDim
                    ? "bg-black/80 text-white/20 border-white/5 opacity-30 scale-95"
                    : "bg-black/70 text-white/85 border-white/15 hover:border-white/40 opacity-90"
                }`}
                style={{ boxShadow: isHovered ? `0 0 16px ${node.color}` : undefined }}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isHovered || isConnected ? "animate-ping" : ""}`}
                  style={{ backgroundColor: node.color }}
                />
                <span className="text-[11px] font-semibold tracking-wide">{node.name}</span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
