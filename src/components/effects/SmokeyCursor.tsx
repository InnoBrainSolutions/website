"use client";

import { useEffect, useRef } from "react";

interface SmokeParticle {
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
  spin: number;
  angle: number;
  isEmber?: boolean;
}

const THEME_PALETTE = [
  { r: 20, g: 184, b: 166 }, // Teal
  { r: 6, g: 182, b: 212 }, // Cyan
  { r: 56, g: 189, b: 248 }, // Electric Sky Blue
  { r: 45, g: 212, b: 191 }, // Bright Turquoise
  { r: 99, g: 102, b: 241 }, // Indigo/Electric Blue
];

export default function SmokeyCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable on touch devices or reduced motion preference
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let isHovering = false;

    const particles: SmokeParticle[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const dx = currentX - prevMouseX;
      const dy = currentY - prevMouseY;
      const dist = Math.hypot(dx, dy);

      mouseX = currentX;
      mouseY = currentY;

      // Determine hover state
      const target = e.target as HTMLElement | null;
      if (target) {
        isHovering = !!target.closest(
          "a, button, [role='button'], input, textarea, select, .group, [data-hover]"
        );
      }

      // Emit smoke particles based on mouse movement distance
      const spawnCount = isHovering ? Math.min(6, Math.max(3, Math.floor(dist / 4))) : Math.min(4, Math.max(1, Math.floor(dist / 6)));

      for (let i = 0; i < spawnCount; i++) {
        const color = THEME_PALETTE[Math.floor(Math.random() * THEME_PALETTE.length)];
        const spread = isHovering ? 18 : 10;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (isHovering ? 1.8 : 1.2) + 0.3;

        // Base smoke particle
        particles.push({
          x: mouseX + (Math.random() - 0.5) * spread,
          y: mouseY + (Math.random() - 0.5) * spread,
          vx: Math.cos(angle) * speed + dx * 0.08,
          vy: Math.sin(angle) * speed + dy * 0.08 - 0.4, // Slight upward drift for realism
          radius: Math.random() * 8 + 6,
          maxRadius: Math.random() * (isHovering ? 45 : 32) + 20,
          alpha: isHovering ? 0.45 : 0.32,
          life: 0,
          maxLife: Math.floor(Math.random() * 25) + 35,
          color,
          spin: (Math.random() - 0.5) * 0.04,
          angle: Math.random() * Math.PI * 2,
        });

        // Occasional glowing ember spark when hovering or moving fast
        if (isHovering || (dist > 25 && Math.random() > 0.5)) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 8,
            y: mouseY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 3 + dx * 0.05,
            vy: (Math.random() - 0.5) * 3 + dy * 0.05 - 0.8,
            radius: Math.random() * 2.5 + 1,
            maxRadius: Math.random() * 3 + 2,
            alpha: 0.9,
            life: 0,
            maxLife: Math.floor(Math.random() * 15) + 20,
            color: { r: 255, g: 255, b: 255 }, // Bright core spark
            spin: 0,
            angle: 0,
            isEmber: true,
          });
        }
      }

      prevMouseX = currentX;
      prevMouseY = currentY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Use screen blend mode for luminescent plasma smoke effect
      ctx.globalCompositeOperation = "screen";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.life / p.maxLife;

        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.angle += p.spin;

        if (p.isEmber) {
          // Ember particle rendering (sharp glowing dot)
          const currentAlpha = (1 - progress) * p.alpha;
          const rad = p.radius * (1 - progress * 0.5);

          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`;
          ctx.fill();
        } else {
          // Smoke puff rendering (expanding radial gradient with soft falloff)
          const currentRadius = p.radius + (p.maxRadius - p.radius) * Math.sin((progress * Math.PI) / 2);
          // Ease alpha: fade in rapidly, then smooth exponential fade out
          const alphaFade = progress < 0.2 ? progress / 0.2 : Math.pow(1 - (progress - 0.2) / 0.8, 1.5);
          const currentAlpha = p.alpha * alphaFade;

          const gradient = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            currentRadius
          );

          gradient.addColorStop(
            0,
            `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.9})`
          );
          gradient.addColorStop(
            0.4,
            `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.4})`
          );
          gradient.addColorStop(
            1,
            `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`
          );

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.beginPath();
          ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          ctx.restore();
        }
      }

      // Draw custom crisp cursor core dot
      if (mouseX !== width / 2 || mouseY !== height / 2) {
        ctx.globalCompositeOperation = "source-over";
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, isHovering ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isHovering ? "rgba(56, 189, 248, 0.95)" : "rgba(20, 184, 166, 0.85)";
        ctx.shadowColor = "rgba(6, 182, 212, 0.8)";
        ctx.shadowBlur = isHovering ? 15 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
