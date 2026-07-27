"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({
  children,
  className = "",
  variant = "primary",
  onClick,
  href,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer overflow-hidden";

  const variants = {
    primary:
      "bg-gradient-to-r from-teal to-electric-blue text-white hover:shadow-[0_0_40px_rgba(20,184,166,0.3)] active:scale-95",
    outline:
      "bg-transparent border border-white/10 text-white hover:border-teal/40 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)] active:scale-95",
  };

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={buttonRef as never}
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            animation: "shimmer 2s ease-in-out infinite",
          }}
        />
      </span>
      <span className="relative z-10">{children}</span>
    </Tag>
  );
}
