"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "@/lib/gsap-config";
import SmokeyCursor from "@/components/effects/SmokeyCursor";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let lenis: Lenis | null = null;
    let rafId: number;

    const initTimer = setTimeout(() => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
      });

      function raf(time: number) {
        if (lenis) lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }, 200);

    return () => {
      clearTimeout(initTimer);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <>
      <SmokeyCursor />
      {children}
    </>
  );
}
