"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  variant?: "word" | "character" | "line";
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.05,
  variant = "word",
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (variant === "line") {
    return (
      <motion.span
        ref={ref}
        className={`block overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.span>
    );
  }

  const elements = variant === "word" ? children.split(" ") : children.split("");
  const separator = variant === "word" ? "\u00A0" : "";

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {elements.map((el, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {el}
            {separator}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
