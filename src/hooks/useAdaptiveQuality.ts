"use client";

import { useEffect, useState } from "react";

export interface QualitySettings {
  dpr: [number, number];
  isLowPower: boolean;
  prefersReducedMotion: boolean;
}

export function useAdaptiveQuality(): QualitySettings {
  const [settings, setSettings] = useState<QualitySettings>({
    dpr: [1, 1.5],
    isLowPower: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowMemory = "deviceMemory" in navigator && (navigator as any).deviceMemory <= 4;
    const isLowCpu = "hardwareConcurrency" in navigator && navigator.hardwareConcurrency <= 4;

    const isLowPower = isTouch || isLowMemory || isLowCpu;

    setSettings({
      dpr: isLowPower ? [1, 1] : [1, 1.5],
      isLowPower,
      prefersReducedMotion: isReduced,
    });
  }, []);

  return settings;
}
