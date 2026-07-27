"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ────────────────────────────────────────────
// Realistic deep-space starfield
// Multiple layers of stars with varying size, brightness, and twinkling
// ────────────────────────────────────────────

const STAR_COUNT = 6000;
const NEBULA_COUNT = 300;

function Starfield() {
  const starsRef = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);

  const { starPositions, starSizes, starBrightness } = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);
    const brightness = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i++) {
      // Distribute stars on a large sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 80 + Math.random() * 120;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Varying star sizes — most small, few large (realistic distribution)
      const sizeRand = Math.random();
      if (sizeRand > 0.995) {
        sizes[i] = 2.5 + Math.random() * 1.5; // Bright giants (rare)
      } else if (sizeRand > 0.95) {
        sizes[i] = 1.2 + Math.random() * 0.8; // Medium stars
      } else {
        sizes[i] = 0.3 + Math.random() * 0.6; // Dim background stars
      }

      // Twinkling phase offset
      brightness[i] = Math.random() * Math.PI * 2;
    }
    return { starPositions: pos, starSizes: sizes, starBrightness: brightness };
  }, []);

  // Star colors — white, blue-white, warm-white (realistic stellar colors)
  const starColors = useMemo(() => {
    const colors = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      const t = Math.random();
      if (t < 0.15) {
        // Hot blue-white stars
        colors[i * 3] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 1.0;
      } else if (t < 0.25) {
        // Warm yellow-white
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
        colors[i * 3 + 2] = 0.7 + Math.random() * 0.2;
      } else if (t < 0.3) {
        // Orange-red giants
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.4 + Math.random() * 0.2;
      } else {
        // White (majority)
        const w = 0.85 + Math.random() * 0.15;
        colors[i * 3] = w;
        colors[i * 3 + 1] = w;
        colors[i * 3 + 2] = w + Math.random() * 0.1;
      }
    }
    return colors;
  }, []);

  // Nebula dust — very faint colored clouds in background
  const { nebulaPositions, nebulaColors } = useMemo(() => {
    const pos = new Float32Array(NEBULA_COUNT * 3);
    const col = new Float32Array(NEBULA_COUNT * 3);
    for (let i = 0; i < NEBULA_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 60 + Math.random() * 80;
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Faint teal / blue / violet nebula colors
      const c = Math.random();
      if (c < 0.33) {
        col[i * 3] = 0.08; col[i * 3 + 1] = 0.45; col[i * 3 + 2] = 0.55;
      } else if (c < 0.66) {
        col[i * 3] = 0.2; col[i * 3 + 1] = 0.3; col[i * 3 + 2] = 0.7;
      } else {
        col[i * 3] = 0.4; col[i * 3 + 1] = 0.2; col[i * 3 + 2] = 0.6;
      }
    }
    return { nebulaPositions: pos, nebulaColors: col };
  }, []);

  // Star shader material for twinkling
  const starMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aBrightness;
        varying float vBrightness;
        varying vec3 vColor;
        uniform float uTime;
        void main() {
          vColor = color;
          // Twinkle: subtle brightness oscillation
          float twinkle = sin(uTime * 1.5 + aBrightness * 6.28) * 0.3 + 0.7;
          vBrightness = twinkle;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (200.0 / -mvPosition.z) * twinkle;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vBrightness;
        varying vec3 vColor;
        void main() {
          // Soft circular star with glow falloff
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          // Bright core with soft halo
          float core = 1.0 - smoothstep(0.0, 0.15, dist);
          vec3 col = vColor * (0.6 + core * 0.4) * vBrightness;
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

    // Update twinkling time
    starMaterial.uniforms.uTime.value = time;

    // Very slow starfield rotation for parallax depth
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.003;
      starsRef.current.rotation.x = time * 0.001;
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = time * 0.002;
    }
  });

  return (
    <>
      {/* Main starfield */}
      <points ref={starsRef} material={starMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[starColors, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[starSizes, 1]} />
          <bufferAttribute attach="attributes-aBrightness" args={[starBrightness, 1]} />
        </bufferGeometry>
      </points>

      {/* Background nebula dust */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nebulaPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nebulaColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={4}
          vertexColors
          transparent
          opacity={0.06}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
}

// ────────────────────────────────────────────
// Earth Globe with atmospheric rim glow
// ────────────────────────────────────────────

function EarthGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Procedural Earth surface shader
  const earthMaterial = useMemo(() => {
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

        // Simple procedural noise for continents
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
          for (int i = 0; i < 5; i++) {
            val += amp * noise(p);
            p *= 2.0;
            amp *= 0.5;
          }
          return val;
        }

        void main() {
          // Lighting — key light from top-right (simulating Sun)
          vec3 lightDir = normalize(vec3(0.8, 0.5, 0.6));
          float NdotL = max(dot(vNormal, lightDir), 0.0);
          float ambient = 0.08;
          float diffuse = NdotL;

          // Generate procedural continents
          vec2 uv = vUv * 8.0;
          float continent = fbm(uv + vec2(uTime * 0.01, 0.0));

          // Deep ocean (dark blue) vs land (teal/green)
          vec3 ocean = vec3(0.02, 0.06, 0.15);
          vec3 land = vec3(0.04, 0.28, 0.22);
          vec3 ice = vec3(0.55, 0.65, 0.7);
          vec3 desert = vec3(0.25, 0.2, 0.1);

          vec3 surface;
          if (continent > 0.55) {
            // Land
            float landDetail = fbm(uv * 3.0);
            if (landDetail > 0.6) {
              surface = desert;
            } else {
              surface = land;
            }
          } else {
            surface = ocean;
          }

          // Ice caps at poles
          float polarFactor = abs(vUv.y - 0.5) * 2.0;
          if (polarFactor > 0.8) {
            surface = mix(surface, ice, smoothstep(0.8, 0.95, polarFactor));
          }

          // City lights on the dark side
          float nightSide = 1.0 - smoothstep(0.0, 0.15, NdotL);
          float cityNoise = fbm(uv * 6.0);
          vec3 cityLights = vec3(1.0, 0.85, 0.4) * step(0.65, cityNoise) * 0.4 * nightSide;

          // Cloud layer
          float clouds = fbm(uv * 2.5 + vec2(uTime * 0.02, uTime * 0.005));
          clouds = smoothstep(0.45, 0.7, clouds) * 0.5;

          // Combine
          vec3 color = surface * (ambient + diffuse) + cityLights;
          color = mix(color, vec3(0.7, 0.75, 0.8) * (ambient + diffuse), clouds);

          // Fresnel rim for subtle atmosphere from surface
          float fresnel = pow(1.0 - max(dot(vNormal, normalize(-vPosition)), 0.0), 3.0);
          color += vec3(0.1, 0.4, 0.8) * fresnel * 0.3;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }, []);

  // Atmospheric glow shader (outer shell)
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
          // Atmospheric rim glow
          float intensity = pow(0.72 - dot(vNormal, normalize(-vPosition)), 2.5);
          vec3 atmosColor = vec3(0.15, 0.55, 0.95); // Blue atmosphere
          gl_FragColor = vec4(atmosColor, intensity * 0.7);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  // Outer glow halo
  const glowMaterial = useMemo(() => {
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
          float intensity = pow(0.55 - dot(vNormal, normalize(-vPosition)), 3.0);
          vec3 glowColor = vec3(0.1, 0.7, 0.6); // Teal outer glow (InnoBrain brand)
          gl_FragColor = vec4(glowColor, intensity * 0.35);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Slow Earth rotation
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.04;
      earthMaterial.uniforms.uTime.value = time;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <group position={[1.8, -0.5, 0]}>
      {/* Earth surface */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <primitive object={earthMaterial} attach="material" />
      </mesh>

      {/* Inner atmosphere rim */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.08, 64, 64]} />
        <primitive object={atmosphereMaterial} attach="material" />
      </mesh>

      {/* Outer glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.3, 32, 32]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
    </group>
  );
}

// ────────────────────────────────────────────
// Main Exported Scene
// ────────────────────────────────────────────

export default function SpaceScene() {
  return (
    <group>
      <Starfield />
      <EarthGlobe />
    </group>
  );
}
