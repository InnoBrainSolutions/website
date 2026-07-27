"use client";

import { useEffect, useRef } from "react";

export default function SpotlightCursor({ className = "" }: { className?: string }) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip spotlight calculation on touch devices or reduced motion
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const el = spotlightRef.current;
    if (!el) return;

    let mouseX = -1000;
    let mouseY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let isMoving = false;
    let animationFrameId: number;

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        animate();
      }
    };

    const animate = () => {
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      
      currentX += dx * 0.08;
      currentY += dy * 0.08;

      el.style.background = `radial-gradient(600px circle at ${currentX}px ${currentY}px, rgba(20, 184, 166, 0.06), rgba(59, 130, 246, 0.03), transparent 60%)`;

      // If position has settled, pause the animation loop to save CPU
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        isMoving = false;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouse, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className={`fixed inset-0 pointer-events-none z-[1] ${className}`}
      aria-hidden="true"
    />
  );
}
