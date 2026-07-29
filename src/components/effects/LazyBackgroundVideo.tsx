"use client";

import { useEffect, useRef, useState } from "react";

interface BackgroundVideoProps {
  src: string;
  className?: string;
  isPriority?: boolean;
}

export default function LazyBackgroundVideo({
  src,
  className = "",
  isPriority = false,
}: BackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(isPriority);
  const [skipVideoForSaveData, setSkipVideoForSaveData] = useState(false);

  // 1. Respect Save-Data & Reduced-Motion preferences
  useEffect(() => {
    const isSaveData =
      typeof navigator !== "undefined" &&
      "connection" in navigator &&
      (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData === true;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isSaveData || prefersReducedMotion) {
      setSkipVideoForSaveData(true);
    }
  }, []);

  // 2. IntersectionObserver for below-the-fold videos
  useEffect(() => {
    if (isPriority || shouldLoadVideo || skipVideoForSaveData) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isPriority, shouldLoadVideo, skipVideoForSaveData]);

  // 3. Playback visibility controller
  useEffect(() => {
    if (!shouldLoadVideo || skipVideoForSaveData) return;

    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    playVideo();

    const handleVisibility = () => {
      if (document.hidden) {
        video.pause();
      } else {
        playVideo();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [shouldLoadVideo, skipVideoForSaveData]);

  if (skipVideoForSaveData) {
    return <div className={`absolute inset-0 aurora-bg opacity-30 pointer-events-none ${className}`} />;
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload={isPriority ? "metadata" : "none"}
          className="w-full h-full object-cover transform-gpu translate-z-0 will-change-transform"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
