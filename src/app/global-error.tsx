"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#09090B] text-white flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-extrabold mb-4">Something went wrong</h1>
        <p className="text-white/60 mb-8 max-w-md font-light">
          A system error occurred. Click below to recover.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl bg-[#14B8A6] text-[#09090B] font-bold text-sm hover:bg-[#14B8A6]/80 transition-colors"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
