"use client";

import { useEffect, useRef } from "react";

interface BackgroundVideoProps {
  src: string;
  className?: string;
}

export default function LazyBackgroundVideo({
  src,
  className = "",
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure playback starts immediately
    const playVideo = () => {
      video.play().catch(() => {
        // Fallback for strict browser policies
      });
    };

    playVideo();

    // Pause video when tab is hidden or user scrolls far past to save GPU/CPU
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
  }, []);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover transform-gpu translate-z-0 will-change-transform"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
