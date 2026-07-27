import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-deep-space text-white flex flex-col items-center justify-center text-center px-6 relative z-50">
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none bg-[radial-gradient(circle,var(--electric-blue),transparent)]" />

      <span className="text-teal text-xs font-mono font-semibold tracking-[0.3em] uppercase block mb-4">
        404 — Page Not Found
      </span>

      <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4">
        Lost in space.
      </h1>

      <p className="text-white/60 text-base max-w-md mb-8 font-light">
        The route or resource you requested does not exist in our neural architecture.
      </p>

      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-teal text-deep-space font-bold text-sm hover:bg-teal/80 transition-colors cursor-pointer"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
