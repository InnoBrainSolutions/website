"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

// ────────────────────────────────────────────
// Epic Tech Ecosystem Nodes Data
// ────────────────────────────────────────────

export interface TechNode {
  id: string;
  name: string;
  category: "AI & Neural" | "Frontend & Mobile" | "Cloud & Scale";
  color: string;
  description: string;
  pos: [number, number, number];
  connections: string[];
}

export const TECH_NODES: TechNode[] = [
  // AI & Neural Tier (Top Arc - Spread Wide)
  {
    id: "openai",
    name: "OpenAI GPT-4o",
    category: "AI & Neural",
    color: "#10A37F",
    description: "LLMs, Fine-Tuning & Autonomous AI Agents",
    pos: [0, 2.4, 0.6],
    connections: ["python", "langchain", "tensorflow", "core"],
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "AI & Neural",
    color: "#FF6F00",
    description: "Deep Neural Networks & Machine Learning Models",
    pos: [-3.2, 2.0, -0.6],
    connections: ["python", "openai", "core"],
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "AI & Neural",
    color: "#1C3C3C",
    description: "RAG Pipelines & Multi-Agent Workflows",
    pos: [3.2, 1.9, -0.5],
    connections: ["openai", "python", "core"],
  },
  {
    id: "python",
    name: "Python AI",
    category: "AI & Neural",
    color: "#3776AB",
    description: "High-Performance Data Engineering & ML Runtime",
    pos: [-1.6, 1.1, 1.2],
    connections: ["openai", "tensorflow", "langchain", "aws", "core"],
  },

  // Frontend & Mobile Tier (Left Arc - Wide Spread)
  {
    id: "react",
    name: "React 19",
    category: "Frontend & Mobile",
    color: "#61DAFB",
    description: "Interactive UI & Ultra-Fast Component System",
    pos: [-4.8, -0.6, 0.8],
    connections: ["nextjs", "flutter", "core"],
  },
  {
    id: "nextjs",
    name: "Next.js 15",
    category: "Frontend & Mobile",
    color: "#FFFFFF",
    description: "Serverless Web Engine & SSR Architecture",
    pos: [-2.6, -1.4, 1.5],
    connections: ["react", "python", "aws", "core"],
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "Frontend & Mobile",
    color: "#02569B",
    description: "Cross-Platform Native iOS & Android Apps",
    pos: [-5.2, -2.1, -0.8],
    connections: ["react", "core"],
  },

  // Cloud & Scale Tier (Right Arc - Wide Spread)
  {
    id: "aws",
    name: "AWS Enterprise",
    category: "Cloud & Scale",
    color: "#FF9900",
    description: "Scalable Cloud Architecture & Serverless Compute",
    pos: [2.6, -0.7, 1.3],
    connections: ["docker", "kubernetes", "python", "nextjs", "core"],
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    category: "Cloud & Scale",
    color: "#0089D6",
    description: "Enterprise Hybrid Cloud & Compliance Security",
    pos: [5.0, -0.3, -1.0],
    connections: ["aws", "kubernetes", "core"],
  },
  {
    id: "docker",
    name: "Docker",
    category: "Cloud & Scale",
    color: "#2496ED",
    description: "Containerization & Reproducible Environments",
    pos: [2.1, -2.1, -0.5],
    connections: ["aws", "kubernetes", "core"],
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "Cloud & Scale",
    color: "#326CE5",
    description: "Auto-Scaling Microservices & Cluster Management",
    pos: [4.4, -1.9, 0.6],
    connections: ["docker", "aws", "azure", "core"],
  },

  // Central Core Node
  {
    id: "core",
    name: "InnoBrain Core",
    category: "AI & Neural",
    color: "#14B8A6",
    description: "Central AI Systems Architecture",
    pos: [0, -0.1, 0],
    connections: [],
  },
];

const DUST_COUNT = 500;

// ────────────────────────────────────────────
// Epic 3D Laser Stream Bezier Connections
// ────────────────────────────────────────────

function EpicNeuralStreams({ hoveredId }: { hoveredId: string | null }) {
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
          float pulse = sin(vUvX * 18.0 - uTime * 5.0) * 0.5 + 0.5;
          pulse = pow(pulse, 3.5);
          vec3 cyan = vec3(0.08, 0.92, 0.85);
          vec3 blue = vec3(0.23, 0.55, 1.0);
          vec3 col = mix(cyan, blue, pulse);
          gl_FragColor = vec4(col, 0.18 + pulse * 0.65);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const streamLines = useMemo(() => {
    const nodeMap = new Map(TECH_NODES.map((n) => [n.id, n]));
    const lines: { line: THREE.Line; from: string; to: string }[] = [];
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

        // Curved Bezier arch for epic 3D volumetric feel
        const mid = p1.clone().add(p2).multiplyScalar(0.5);
        const dist = p1.distanceTo(p2);
        mid.y += dist * 0.15;
        mid.z += dist * 0.1;

        const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
        const points = curve.getPoints(40);
        const geo = new THREE.BufferGeometry().setFromPoints(points);

        const lineObj = new THREE.Line(geo, lineShaderMaterial);
        lines.push({ line: lineObj, from: node.id, to: targetId });
      });
    });

    return lines;
  }, [lineShaderMaterial]);

  useFrame((state) => {
    lineShaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group>
      {streamLines.map((item, i) => {
        const isConnected =
          hoveredId && (item.from === hoveredId || item.to === hoveredId);

        return (
          <primitive
            key={i}
            object={item.line}
            scale={isConnected ? 1.08 : 1}
          />
        );
      })}
    </group>
  );
}

// ────────────────────────────────────────────
// Central Quantum Core Core (Volumetric Brain)
// ────────────────────────────────────────────

function CentralQuantumCore() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.y = time * 0.2;
      outerRef.current.rotation.x = time * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -time * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.15;
    }
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[0.75, 2]} />
        <meshBasicMaterial
          wireframe
          color="#14B8A6"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner Glowing Orb */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshBasicMaterial
          color="#14B8A6"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer Orbiting Halo Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.1, 0.008, 16, 80]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Center Label */}
      <Html center position={[0, 0, 0]} zIndexRange={[10, 0]}>
        <div className="px-3 py-1 rounded-full bg-teal/20 border border-teal/40 backdrop-blur-md text-[11px] font-extrabold text-teal tracking-widest uppercase shadow-[0_0_20px_rgba(20,184,166,0.5)]">
          InnoBrain Core
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

  // Background particle dust cloud
  const { particlePos, particleCol } = useMemo(() => {
    const pos = new Float32Array(DUST_COUNT * 3);
    const col = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const rnd = Math.random();
      if (rnd > 0.5) {
        col[i * 3] = 0.08; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 0.78;
      } else {
        col[i * 3] = 0.23; col[i * 3 + 1] = 0.51; col[i * 3 + 2] = 0.96;
      }
    }
    return { particlePos: pos, particleCol: col };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    // Dynamic rotation + mouse parallax
    const targetY = Math.sin(time * 0.12) * 0.12 + time * 0.02 + mouseRef.current.x * 0.15;
    const targetX = Math.cos(time * 0.08) * 0.06 + mouseRef.current.y * 0.1;

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Ambient Space Dust */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePos, 3]} />
          <bufferAttribute attach="attributes-color" args={[particleCol, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Central Quantum Brain Core */}
      <CentralQuantumCore />

      {/* 3D Curved Neural Laser Streams */}
      <EpicNeuralStreams hoveredId={hoveredId} />

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
            {/* Glowing Sphere Core */}
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
              <sphereGeometry args={[isHovered ? 0.22 : 0.15, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={isHovered ? 1.0 : isConnectedToHovered ? 0.9 : 0.7}
              />
            </mesh>

            {/* Outer Aura Glow Mesh */}
            <mesh>
              <sphereGeometry args={[isHovered ? 0.38 : 0.25, 16, 16]} />
              <meshBasicMaterial
                color={node.color}
                transparent
                opacity={isHovered ? 0.4 : isConnectedToHovered ? 0.25 : 0.12}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* HTML Floating Glass Badge */}
            <Html
              position={[0, 0.4, 0]}
              center
              distanceFactor={9.5}
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
                className={`px-3.5 py-1.5 rounded-xl border backdrop-blur-xl transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2.5 shadow-xl ${
                  isHovered
                    ? "bg-white/20 text-white border-white scale-110 shadow-[0_0_30px_rgba(20,184,166,0.8)]"
                    : isConnectedToHovered
                    ? "bg-white/10 text-white border-white/50 scale-105"
                    : "bg-black/50 text-white/80 border-white/10 hover:border-white/40"
                }`}
                style={{
                  boxShadow: isHovered ? `0 0 25px ${node.color}` : undefined,
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: node.color }}
                />
                <span className="text-xs sm:text-sm font-bold tracking-wide">
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
