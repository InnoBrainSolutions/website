"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface QuantumCoreProps {
  scrollProgress: number;
}

const STAR_COUNT = 6000;
const NEBULA_COUNT = 350;

// ────────────────────────────────────────────
// Realistic Deep Space Starfield with Twinkle
// ────────────────────────────────────────────

function SpaceStarfield() {
  const starsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);

  const { starPositions, starSizes, starBrightness } = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);
    const brightness = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 60 + Math.random() * 100;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const sizeRand = Math.random();
      if (sizeRand > 0.995) {
        sizes[i] = 2.4 + Math.random() * 1.6; // Rare bright giants
      } else if (sizeRand > 0.94) {
        sizes[i] = 1.2 + Math.random() * 0.8; // Medium stars
      } else {
        sizes[i] = 0.4 + Math.random() * 0.5; // Dim background stars
      }

      brightness[i] = Math.random() * Math.PI * 2;
    }
    return { starPositions: pos, starSizes: sizes, starBrightness: brightness };
  }, []);

  const starColors = useMemo(() => {
    const colors = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const t = Math.random();
      if (t < 0.18) {
        // Hot blue-white
        colors[i * 3] = 0.65 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 1.0;
      } else if (t < 0.28) {
        // Warm gold-white
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.88 + Math.random() * 0.12;
        colors[i * 3 + 2] = 0.6 + Math.random() * 0.3;
      } else if (t < 0.32) {
        // Orange giant
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.55 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.35 + Math.random() * 0.2;
      } else {
        // Pure crisp white
        const w = 0.88 + Math.random() * 0.12;
        colors[i * 3] = w;
        colors[i * 3 + 1] = w;
        colors[i * 3 + 2] = w + Math.random() * 0.08;
      }
    }
    return colors;
  }, []);

  const { nebulaPositions, nebulaColors } = useMemo(() => {
    const pos = new Float32Array(NEBULA_COUNT * 3);
    const col = new Float32Array(NEBULA_COUNT * 3);
    for (let i = 0; i < NEBULA_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 50 + Math.random() * 70;
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const c = Math.random();
      if (c < 0.33) {
        col[i * 3] = 0.05; col[i * 3 + 1] = 0.45; col[i * 3 + 2] = 0.55;
      } else if (c < 0.66) {
        col[i * 3] = 0.15; col[i * 3 + 1] = 0.25; col[i * 3 + 2] = 0.65;
      } else {
        col[i * 3] = 0.35; col[i * 3 + 1] = 0.15; col[i * 3 + 2] = 0.55;
      }
    }
    return { nebulaPositions: pos, nebulaColors: col };
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
          float twinkle = sin(uTime * 1.8 + aBrightness * 6.28) * 0.35 + 0.65;
          vBrightness = twinkle;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (180.0 / -mvPosition.z) * twinkle;
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
          vec3 col = vColor * (0.65 + core * 0.45) * vBrightness;
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
    const time = state.clock.elapsedTime;
    starMaterial.uniforms.uTime.value = time;
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.002;
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = time * 0.001;
    }
  });

  return (
    <>
      <points ref={starsRef} material={starMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[starSizes, 1]} />
          <bufferAttribute attach="attributes-aBrightness" args={[starBrightness, 1]} />
        </bufferGeometry>
      </points>
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nebulaPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nebulaColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={5}
          vertexColors
          transparent
          opacity={0.07}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

// ────────────────────────────────────────────
// Photorealistic 3D Earth Globe
// ────────────────────────────────────────────

function PhotorealisticEarth({ scrollProgress }: { scrollProgress: number }) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const earthMeshRef = useRef<THREE.Mesh>(null);
  const cloudsMeshRef = useRef<THREE.Mesh>(null);
  const lerpedProgress = useRef(0);

  const earthShader = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
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
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
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
          vec3 lightDir = normalize(vec3(0.85, 0.45, 0.7));
          float NdotL = max(dot(vNormal, lightDir), 0.0);
          float ambient = 0.09;
          float diffuse = NdotL;

          vec2 uv = vUv * 9.0;
          float continent = fbm(uv);

          vec3 deepOcean = vec3(0.01, 0.04, 0.14);
          vec3 shallowOcean = vec3(0.03, 0.15, 0.3);
          vec3 landForest = vec3(0.04, 0.26, 0.18);
          vec3 landDesert = vec3(0.24, 0.19, 0.1);
          vec3 iceCaps = vec3(0.7, 0.78, 0.85);

          vec3 surface;
          if (continent > 0.54) {
            float detail = fbm(uv * 3.5);
            surface = mix(landForest, landDesert, smoothstep(0.4, 0.75, detail));
          } else {
            surface = mix(deepOcean, shallowOcean, smoothstep(0.3, 0.54, continent));
          }

          // Polar Ice
          float polar = abs(vUv.y - 0.5) * 2.0;
          if (polar > 0.78) {
            surface = mix(surface, iceCaps, smoothstep(0.78, 0.96, polar));
          }

          // City lights on night side
          float nightSide = 1.0 - smoothstep(0.0, 0.18, NdotL);
          float cityMap = fbm(uv * 7.0);
          vec3 cityGold = vec3(1.0, 0.82, 0.35) * step(0.66, cityMap) * 0.5 * nightSide;

          vec3 finalColor = surface * (ambient + diffuse) + cityGold;

          // Atmosphere fresnel
          float fresnel = pow(1.0 - max(dot(vNormal, normalize(-vPosition)), 0.0), 3.2);
          finalColor += vec3(0.08, 0.45, 0.9) * fresnel * 0.4;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
  }, []);

  const atmosphereShader = useMemo(() => {
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
          float intensity = pow(0.7 - dot(vNormal, normalize(-vPosition)), 2.8);
          vec3 atmos = vec3(0.12, 0.58, 0.98);
          gl_FragColor = vec4(atmos, intensity * 0.75);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  const cloudsShader = useMemo(() => {
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
          vec3 lightDir = normalize(vec3(0.85, 0.45, 0.7));
          float NdotL = max(dot(vNormal, lightDir), 0.1);
          vec2 uv = vUv * 6.0 + vec2(uTime * 0.015, uTime * 0.005);
          float c = fbm(uv);
          float alpha = smoothstep(0.48, 0.72, c) * 0.45;
          gl_FragColor = vec4(vec3(0.85, 0.92, 1.0) * NdotL, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    earthShader.uniforms.uTime.value = time;
    cloudsShader.uniforms.uTime.value = time;

    // Lerp scroll progress for smooth cinematic motion
    lerpedProgress.current += (scrollProgress - lerpedProgress.current) * 0.08;
    const p = lerpedProgress.current;

    if (globeGroupRef.current) {
      // Rotation driven by time + scroll
      globeGroupRef.current.rotation.y = time * 0.05 + p * Math.PI * 2.2;
      globeGroupRef.current.rotation.x = 0.2 + Math.sin(time * 0.2) * 0.05 + p * 0.4;
      
      // Dynamic camera zoom/scale across scroll
      const scale = 1.0 + Math.sin(p * Math.PI) * 0.35;
      globeGroupRef.current.scale.setScalar(scale);

      // Subtle position shift for split-screen balance
      globeGroupRef.current.position.y = -0.1 + Math.cos(p * Math.PI * 2) * 0.2;
    }

    if (cloudsMeshRef.current) {
      cloudsMeshRef.current.rotation.y = time * 0.07 + p * Math.PI * 2.5;
    }
  });

  return (
    <group ref={globeGroupRef} position={[0, 0, 0]}>
      {/* Globe Surface */}
      <mesh ref={earthMeshRef}>
        <sphereGeometry args={[1.8, 64, 64]} />
        <primitive object={earthShader} attach="material" />
      </mesh>

      {/* Clouds Layer */}
      <mesh ref={cloudsMeshRef}>
        <sphereGeometry args={[1.83, 64, 64]} />
        <primitive object={cloudsShader} attach="material" />
      </mesh>

      {/* Atmospheric Rim Glow */}
      <mesh>
        <sphereGeometry args={[1.92, 64, 64]} />
        <primitive object={atmosphereShader} attach="material" />
      </mesh>
    </group>
  );
}

// ────────────────────────────────────────────
// Main QuantumCore Export for StorySection
// ────────────────────────────────────────────

export default function QuantumCore({ scrollProgress }: QuantumCoreProps) {
  return (
    <group>
      <SpaceStarfield />
      <PhotorealisticEarth scrollProgress={scrollProgress} />
    </group>
  );
}
