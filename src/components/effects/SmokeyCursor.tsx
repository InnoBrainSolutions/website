"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: { r: number; g: number; b: number };
  angle: number;
  spin: number;
  turbulence: number;
  isEmber?: boolean;
}

// InnoBrain vibrant theme colors
const SMOKE_COLORS = [
  { r: 20, g: 184, b: 166 },  // Teal #14b8a6
  { r: 6, g: 182, b: 212 },   // Cyan #06b6d4
  { r: 56, g: 189, b: 248 },  // Electric Sky Blue #38bdf8
  { r: 45, g: 212, b: 191 },  // Bright Turquoise #2dd4bf
  { r: 99, g: 102, b: 241 },  // Electric Indigo #6366f1
];

const EMBER_COLORS = [
  { r: 255, g: 255, b: 255 }, // Crisp Pure White
  { r: 56, g: 189, b: 248 },  // Electric Sky Blue
  { r: 6, g: 182, b: 212 },   // Cyan Sparkle
  { r: 45, g: 212, b: 191 },  // Bright Turquoise
];

export default function SmokeyCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect reduced motion & touch screens
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let mouseX = -100;
    let mouseY = -100;
    let prevX = -100;
    let prevY = -100;
    let speedX = 0;
    let speedY = 0;
    let isHovered = false;
    let frameCount = 0;
    let isMouseInside = false;

    const particles: Particle[] = [];

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const spawnSmoke = (x: number, y: number, vx: number, vy: number, isHover: boolean, isAmbient = false) => {
      const color = SMOKE_COLORS[Math.floor(Math.random() * SMOKE_COLORS.length)];
      const spreadAngle = Math.random() * Math.PI * 2;
      const spreadDist = Math.random() * (isHover ? 16 : 8);

      // Base fluid smoke particle
      particles.push({
        x: x + Math.cos(spreadAngle) * spreadDist,
        y: y + Math.sin(spreadAngle) * spreadDist,
        vx: Math.cos(spreadAngle) * (isAmbient ? 0.4 : 0.8) + vx * 0.05,
        vy: Math.sin(spreadAngle) * (isAmbient ? 0.4 : 0.8) + vy * 0.05 - 0.35, // Thermal buoyancy
        radius: isAmbient ? Math.random() * 4 + 4 : Math.random() * 6 + 5,
        maxRadius: Math.random() * (isHover ? 44 : 28) + 18,
        alpha: isHover ? 0.45 : isAmbient ? 0.22 : 0.32,
        life: 0,
        maxLife: Math.floor(Math.random() * 25) + 32,
        color,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.03,
        turbulence: (Math.random() - 0.5) * 0.35,
      });

      // Sparkle Ember Burst when hovering ANY interactive element
      if (isHover || (!isAmbient && Math.hypot(vx, vy) > 16 && Math.random() > 0.4)) {
        const emberCount = isHover ? (isAmbient ? 1 : 2) : 1;
        for (let e = 0; e < emberCount; e++) {
          const embColor = EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)];
          const embAngle = Math.random() * Math.PI * 2;
          const embSpeed = Math.random() * 2.6 + 0.8;

          particles.push({
            x: x + (Math.random() - 0.5) * 12,
            y: y + (Math.random() - 0.5) * 12,
            vx: Math.cos(embAngle) * embSpeed + vx * 0.04,
            vy: Math.sin(embAngle) * embSpeed + vy * 0.04 - 0.7,
            radius: Math.random() * 2.2 + 1.2,
            maxRadius: Math.random() * 3 + 2,
            alpha: 0.95,
            life: 0,
            maxLife: Math.floor(Math.random() * 16) + 20,
            color: embColor,
            angle: 0,
            spin: 0,
            turbulence: 0,
            isEmber: true,
          });
        }
      }
    };

    const updatePointer = (cx: number, cy: number, targetEl: HTMLElement | null) => {
      isMouseInside = true;

      if (prevX < 0) {
        prevX = cx;
        prevY = cy;
      }

      speedX = cx - prevX;
      speedY = cy - prevY;
      const speed = Math.hypot(speedX, speedY);

      mouseX = cx;
      mouseY = cy;

      // Comprehensive Hover Detection for ALL interactive elements across the site
      if (targetEl) {
        const isInteractiveSelector = !!targetEl.closest(
          "a, button, [role='button'], input, textarea, select, label, summary, nav, .group, .cursor-pointer, [data-hover]"
        );

        let hasPointerCursor = false;
        try {
          const style = window.getComputedStyle(targetEl);
          hasPointerCursor = style.cursor === "pointer" || style.cursor === "grab";
        } catch {
          // ignore detached element edge case
        }

        isHovered = isInteractiveSelector || hasPointerCursor;
      }

      // Spawn movement particles
      const count = isHovered ? Math.min(5, Math.max(2, Math.floor(speed / 4))) : Math.min(3, Math.max(1, Math.floor(speed / 6)));
      for (let i = 0; i < count; i++) {
        spawnSmoke(mouseX, mouseY, speedX, speedY, isHovered, false);
      }

      prevX = cx;
      prevY = cy;
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY, e.target as HTMLElement | null);
    };

    const onMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY, e.target as HTMLElement | null);
    };

    const onMouseLeave = () => {
      isMouseInside = false;
      prevX = -100;
      prevY = -100;
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, w, h);

      // Continuous ambient emission when mouse is inside window
      if (isMouseInside && mouseX > 0 && mouseY > 0 && frameCount % 3 === 0) {
        spawnSmoke(mouseX, mouseY, speedX * 0.2, speedY * 0.2, isHovered, true);
        speedX *= 0.8;
        speedY *= 0.8;
      }

      // Additive screen blend mode for glowing plasma smoke
      ctx.globalCompositeOperation = "screen";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;

        // Physics & fluid turbulence drift
        p.x += p.vx + Math.sin(p.life * 0.1) * p.turbulence;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.angle += p.spin;

        if (p.isEmber) {
          // Sharp glowing ember spark rendering
          const fade = 1 - progress;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * fade, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha * fade})`;
          ctx.fill();
        } else {
          // Organic radial smoke puff rendering
          const rad = p.radius + (p.maxRadius - p.radius) * Math.sin((progress * Math.PI) / 2);
          const alphaFade = progress < 0.15 ? progress / 0.15 : Math.pow(1 - (progress - 0.15) / 0.85, 1.5);
          const alpha = p.alpha * alphaFade;

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
          grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.85})`);
          grad.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.35})`);
          grad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.beginPath();
          ctx.arc(0, 0, rad, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[99999] mix-blend-screen"
      aria-hidden="true"
    />
  );
}
