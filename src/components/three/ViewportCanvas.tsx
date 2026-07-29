"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ViewportCanvasProps {
  children: ReactNode;
  fallback?: ReactNode;
  idleDelayMs?: number;
  className?: string;
  rootMargin?: string;
}

export default function ViewportCanvas({
  children,
  fallback = null,
  idleDelayMs = 150,
  className = "w-full h-full",
  rootMargin = "200px 0px",
}: ViewportCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isIdleReady, setIsIdleReady] = useState(false);

  // 1. Defer WebGL mounting until initial hydration & LCP paint finish
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if ("requestIdleCallback" in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(() => {
        timer = setTimeout(() => setIsIdleReady(true), idleDelayMs);
      });
      return () => {
        if ("cancelIdleCallback" in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
        clearTimeout(timer);
      };
    } else {
      timer = setTimeout(() => setIsIdleReady(true), idleDelayMs);
      return () => clearTimeout(timer);
    }
  }, [idleDelayMs]);

  // 2. IntersectionObserver to unmount / pause when offscreen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  const shouldRenderCanvas = isIdleReady && isInViewport;

  return (
    <div ref={containerRef} className={className}>
      {shouldRenderCanvas ? children : fallback}
    </div>
  );
}
