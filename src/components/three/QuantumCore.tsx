"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface QuantumCoreProps {
  scrollProgress: number;
}

// ────────────────────────────────────────────
// Major Global Tech & Financial Hubs (Lat/Lon)
// ────────────────────────────────────────────

const HUBS = [
  { name: "Silicon Valley", lat: 37.3875, lon: -122.0575 },
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Frankfurt", lat: 50.1109, lon: 8.6821 },
  { name: "Dubai", lat: 25.2048, lon: 55.2708 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
];

// Helper to convert Lat/Lon to 3D Cartesian coordinates on sphere of radius R
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// ────────────────────────────────────────────
// 1. Deep Space Starfield & Digital Dust
// ────────────────────────────────────────────

const STAR_COUNT = 5500;

function StarfieldBackground() {
  const starsRef = useRef<THREE.Points>(null);

  const { positions, colors, sizes, brightness } = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    const col = new Float32Array(STAR_COUNT * 3);
    const sz = new Float32Array(STAR_COUNT);
    const br = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 50 + Math.random() * 80;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const rnd = Math.random();
      if (rnd > 0.98) {
        // Bright blue-white / cyan stars
        col[i * 3] = 0.4; col[i * 3 + 1] = 0.85; col[i * 3 + 2] = 1.0;
        sz[i] = 2.2 + Math.random() * 1.2;
      } else if (rnd > 0.90) {
        // Warm gold stars
        col[i * 3] = 1.0; col[i * 3 + 1] = 0.88; col[i * 3 + 2] = 0.6;
        sz[i] = 1.2 + Math.random() * 0.8;
      } else {
        // Subtle white stars
        const w = 0.8 + Math.random() * 0.2;
        col[i * 3] = w; col[i * 3 + 1] = w; col[i * 3 + 2] = w;
        sz[i] = 0.4 + Math.random() * 0.5;
      }

      br[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, colors: col, sizes: sz, brightness: br };
  }, []);

  const starMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float aSize;
        attribute float aBrightness;
        varying float vBrightness;
        varying vec3 vColor;
        uniform float uTime;
        void main() {
          vColor = color;
          float twinkle = sin(uTime * 1.6 + aBrightness * 6.28) * 0.35 + 0.65;
          vBrightness = twinkle;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (160.0 / -mvPosition.z) * twinkle;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vBrightness;
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          float core = 1.0 - smoothstep(0.0, 0.12, dist);
          vec3 col = vColor * (0.6 + core * 0.5) * vBrightness;
          gl_FragColor = vec4(col, alpha * vBrightness);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
  }, []);

  useFrame((state) => {
    starMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.002;
    }
  });

  return (
    <points ref={starsRef} material={starMaterial}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aBrightness" args={[brightness, 1]} />
      </bufferGeometry>
    </points>
  );
}

// ────────────────────────────────────────────
// 2. Global Connection Arcs & Data Streams
// ────────────────────────────────────────────

function GlobalArcs({ progress }: { progress: number }) {
  const lineGroupRef = useRef<THREE.Group>(null);

  const arcShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
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
        uniform float uProgress;
        varying float vUvX;
        void main() {
          // Flowing data packets along the arc
          float dash = sin(vUvX * 15.0 - uTime * 4.0) * 0.5 + 0.5;
          dash = pow(dash, 4.0);

          vec3 cyanGlow = vec3(0.08, 0.9, 0.85);
          vec3 bluePulse = vec3(0.23, 0.55, 1.0);
          vec3 color = mix(cyanGlow, bluePulse, dash);

          float alpha = smoothstep(0.4, 0.6, uProgress) * (0.2 + dash * 0.8);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const arcLines = useMemo(() => {
    const radius = 1.81;
    const lines: THREE.Line[] = [];

    const connections = [
      [0, 1], // SF -> NY
      [1, 2], // NY -> London
      [2, 3], // London -> Frankfurt
      [2, 4], // London -> Dubai
      [4, 5], // Dubai -> Mumbai
      [5, 6], // Mumbai -> Singapore
      [6, 7], // Singapore -> Tokyo
      [7, 0], // Tokyo -> SF
      [1, 9], // NY -> Sao Paulo
      [6, 8], // Singapore -> Sydney
    ];

    connections.forEach(([i1, i2]) => {
      const p1 = latLonToVector3(HUBS[i1].lat, HUBS[i1].lon, radius);
      const p2 = latLonToVector3(HUBS[i2].lat, HUBS[i2].lon, radius);

      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const dist = p1.distanceTo(p2);
      mid.normalize().multiplyScalar(radius + dist * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(50);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      
      const line = new THREE.Line(geo, arcShaderMaterial);
      lines.push(line);
    });

    return lines;
  }, [arcShaderMaterial]);

  useFrame((state) => {
    arcShaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    arcShaderMaterial.uniforms.uProgress.value = progress;
  });

  return (
    <group ref={lineGroupRef}>
      {arcLines.map((lineObj, idx) => (
        <primitive key={idx} object={lineObj} />
      ))}
    </group>
  );
}

// ────────────────────────────────────────────
// 3. InnoBrain Cyan AI Neural Network Lattice
// ────────────────────────────────────────────

function AINeuralLattice({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const latticeMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float wave = sin(vPosition.y * 8.0 + uTime * 2.5) * 0.5 + 0.5;
          vec3 cyan = vec3(0.08, 0.85, 0.78);
          float alpha = smoothstep(0.65, 0.85, uProgress) * (0.15 + wave * 0.3);
          gl_FragColor = vec4(cyan, alpha);
        }
      `,
      wireframe: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    latticeMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    latticeMaterial.uniforms.uProgress.value = progress;
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.06;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.86, 3]} />
      <primitive object={latticeMaterial} attach="material" />
    </mesh>
  );
}

// ────────────────────────────────────────────
// 4. Photorealistic Earth & Hub Nodes
// ────────────────────────────────────────────

function EarthCore({ progress, mouse }: { progress: number; mouse: { x: number; y: number } }) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const earthMeshRef = useRef<THREE.Mesh>(null);
  const cloudsMeshRef = useRef<THREE.Mesh>(null);
  const lerpedProgress = useRef(0);

  // Hub marker positions on sphere
  const hubPositions = useMemo(() => {
    return HUBS.map((h) => latLonToVector3(h.lat, h.lon, 1.815));
  }, []);

  // Procedural Earth surface shader with ocean specularity & night city lights
  const earthShaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uProgress;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                     mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
        }

        float fbm(vec2 p) {
          float val = 0.0;
          float amp = 0.5;
          for (int i = 0; i < 6; i++) {
            val += amp * noise(p);
            p *= 2.0;
            amp *= 0.5;
          }
          return val;
        }

        void main() {
          // Directional Sun Light
          vec3 lightDir = normalize(vec3(0.85, 0.45, 0.75));
          float NdotL = max(dot(vNormal, lightDir), 0.0);
          float ambient = 0.08;
          float diffuse = NdotL;

          vec2 uv = vUv * 9.0;
          float continent = fbm(uv);

          vec3 deepOcean = vec3(0.01, 0.05, 0.16);
          vec3 shallowOcean = vec3(0.03, 0.16, 0.32);
          vec3 landForest = vec3(0.04, 0.28, 0.19);
          vec3 landDesert = vec3(0.24, 0.19, 0.11);
          vec3 iceCaps = vec3(0.72, 0.8, 0.88);

          vec3 surface;
          if (continent > 0.54) {
            float detail = fbm(uv * 3.5);
            surface = mix(landForest, landDesert, smoothstep(0.4, 0.75, detail));
          } else {
            surface = mix(deepOcean, shallowOcean, smoothstep(0.3, 0.54, continent));
          }

          // Polar Ice caps
          float polar = abs(vUv.y - 0.5) * 2.0;
          if (polar > 0.78) {
            surface = mix(surface, iceCaps, smoothstep(0.78, 0.96, polar));
          }

          // Night side city lights (activates progressively with scroll)
          float nightSide = 1.0 - smoothstep(0.0, 0.18, NdotL);
          float cityMap = fbm(uv * 7.0);
          float cityIntensity = smoothstep(0.2, 0.5, uProgress) * step(0.65, cityMap);
          
          // Pulsing city lights
          float pulse = sin(uTime * 2.0 + cityMap * 10.0) * 0.2 + 0.8;
          vec3 cityGold = vec3(1.0, 0.82, 0.38) * cityIntensity * 0.65 * pulse * nightSide;

          vec3 finalColor = surface * (ambient + diffuse) + cityGold;

          // Atmospheric scattering & ocean specular highlight
          vec3 viewDir = normalize(-vPosition);
          float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.2);
          finalColor += vec3(0.08, 0.48, 0.92) * fresnel * 0.4;

          // Specular highlight on ocean
          if (continent <= 0.54) {
            vec3 halfDir = normalize(lightDir + viewDir);
            float spec = pow(max(dot(vNormal, halfDir), 0.0), 32.0);
            finalColor += vec3(0.6, 0.8, 1.0) * spec * 0.4 * NdotL;
          }

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
  }, []);

  // Atmospheric scattering outer shell
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, normalize(-vPosition)), 2.8);
          vec3 atmosColor = vec3(0.12, 0.58, 0.98);
          gl_FragColor = vec4(atmosColor, intensity * 0.75);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Rotating Cloud layer shader
  const cloudsMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        varying vec2 vUv;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec2 vUv;

        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float noise(vec2 p) {
          vec2 i = floor(p); vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
                     mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
        }
        float fbm(vec2 p) {
          float v = 0.0; float a = 0.5;
          for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
          return v;
        }

        void main() {
          vec3 lightDir = normalize(vec3(0.85, 0.45, 0.75));
          float NdotL = max(dot(vNormal, lightDir), 0.1);
          vec2 uv = vUv * 6.0 + vec2(uTime * 0.015, uTime * 0.005);
          float c = fbm(uv);
          float alpha = smoothstep(0.48, 0.72, c) * 0.45;
          gl_FragColor = vec4(vec3(0.88, 0.94, 1.0) * NdotL, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    earthShaderMaterial.uniforms.uTime.value = time;
    earthShaderMaterial.uniforms.uProgress.value = progress;
    cloudsMaterial.uniforms.uTime.value = time;

    lerpedProgress.current += (progress - lerpedProgress.current) * 0.07;
    const p = lerpedProgress.current;

    if (globeGroupRef.current) {
      // Base rotation + scroll rotation + subtle cursor parallax
      const targetRotY = time * 0.05 + p * Math.PI * 2.2 + mouse.x * 0.25;
      const targetRotX = 0.18 + Math.sin(time * 0.2) * 0.04 + p * 0.35 + mouse.y * 0.2;

      globeGroupRef.current.rotation.y += (targetRotY - globeGroupRef.current.rotation.y) * 0.05;
      globeGroupRef.current.rotation.x += (targetRotX - globeGroupRef.current.rotation.x) * 0.05;

      // Dynamic scale & subtle position shift across story progression
      const scale = 1.0 + Math.sin(p * Math.PI) * 0.28;
      globeGroupRef.current.scale.setScalar(scale);
    }

    if (cloudsMeshRef.current) {
      cloudsMeshRef.current.rotation.y = time * 0.07 + p * Math.PI * 2.5;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* Earth Surface */}
      <mesh ref={earthMeshRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <primitive object={earthShaderMaterial} attach="material" />
      </mesh>

      {/* Cloud Layer */}
      <mesh ref={cloudsMeshRef}>
        <sphereGeometry args={[1.83, 64, 64]} />
        <primitive object={cloudsMaterial} attach="material" />
      </mesh>

      {/* Atmospheric Rim Glow */}
      <mesh>
        <sphereGeometry args={[1.92, 64, 64]} />
        <primitive object={atmosphereMaterial} attach="material" />
      </mesh>

      {/* Global Tech Hub Glowing Nodes */}
      {hubPositions.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshBasicMaterial color="#14B8A6" transparent opacity={0.9} />
        </mesh>
      ))}

      {/* Connection Arcs */}
      <GlobalArcs progress={progress} />

      {/* InnoBrain Cyan Neural Lattice */}
      <AINeuralLattice progress={progress} />
    </group>
  );
}

// ────────────────────────────────────────────
// Main QuantumCore Scene Export
// ────────────────────────────────────────────

export default function QuantumCore({ scrollProgress }: QuantumCoreProps) {
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <group>
      <StarfieldBackground />
      <EarthCore progress={scrollProgress} mouse={mouseRef.current} />
    </group>
  );
}
