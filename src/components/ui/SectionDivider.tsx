"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "wave" | "mesh" | "line";
  flip?: boolean;
  className?: string;
}

export function SectionDivider({ variant = "wave", flip = false, className = "" }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  if (variant === "line") {
    return (
      <div ref={ref} className={`relative overflow-hidden py-1 ${className}`}>
        <motion.div
          className="h-px w-full bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    );
  }

  if (variant === "mesh") {
    return (
      <div ref={ref} className={`relative h-16 overflow-hidden ${className}`}>
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          className={`absolute inset-0 w-full h-full ${flip ? "rotate-180" : ""}`}
          preserveAspectRatio="none"
        >
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M0,${20 + i * 12} C360,${i * 8} 720,${50 - i * 10} 1440,${15 + i * 15}`}
              stroke="rgba(124, 58, 237, 0.15)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1.5, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </svg>
      </div>
    );
  }

  // wave
  return (
    <div ref={ref} className={`relative h-20 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        className={`absolute inset-0 w-full h-full ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,40 C240,10 480,70 720,40 C960,10 1200,70 1440,40 L1440,80 L0,80 Z"
          fill="rgba(124, 58, 237, 0.04)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M0,50 C360,20 720,70 1080,35 C1260,20 1380,50 1440,45"
          stroke="rgba(124, 58, 237, 0.12)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  );
}
