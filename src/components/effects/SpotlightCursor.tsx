"use client";

import { useEffect, useRef } from "react";

export default function SpotlightCursor({ className = "" }: { className?: string }) {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;
      el.style.background = `radial-gradient(600px circle at ${currentX}px ${currentY}px, rgba(20, 184, 166, 0.06), rgba(59, 130, 246, 0.03), transparent 60%)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouse);
    const raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(raf);
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
