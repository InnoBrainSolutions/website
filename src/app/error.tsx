"use client";

import { useEffect } from "react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime error caught by root App Router boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-deep-space text-white flex flex-col items-center justify-center text-center px-6 relative z-50">
      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none bg-[radial-gradient(circle,var(--teal),transparent)]" />

      <span className="text-teal text-xs font-mono font-semibold tracking-[0.3em] uppercase block mb-4">
        System Notice
      </span>

      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
        Something went wrong.
      </h1>

      <p className="text-white/60 text-base max-w-md mb-8 font-light">
        A temporary rendering or graphics pipeline issue occurred. Click below to re-initialize the application.
      </p>

      <button
        onClick={() => reset()}
        className="px-6 py-3 rounded-xl bg-teal text-deep-space font-bold text-sm hover:bg-teal/80 transition-colors cursor-pointer"
      >
        Re-initialize Application
      </button>
    </div>
  );
}
