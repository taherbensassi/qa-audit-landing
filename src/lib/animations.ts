import type { Variants } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Core fade / entrance variants                                     */
/* ------------------------------------------------------------------ */

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Stagger containers                                                */
/* ------------------------------------------------------------------ */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

/* ------------------------------------------------------------------ */
/*  Dramatic entrance variants                                        */
/* ------------------------------------------------------------------ */

export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideInFromBottom: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", damping: 15, stiffness: 100 },
  },
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -8, y: 40 },
  visible: {
    opacity: 1,
    rotate: 0,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  3D tilt card helper (for mouse-tracking components)               */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Blur & clip-path reveals                                          */
/* ------------------------------------------------------------------ */

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const clipRevealUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Spring-based entrances                                            */
/* ------------------------------------------------------------------ */

export const tiltIn: Variants = {
  hidden: { opacity: 0, y: 60, rotateX: -15, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: "spring", damping: 20, stiffness: 100 },
  },
};

export const springNumber: Variants = {
  hidden: { opacity: 0, scale: 0.3, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 8, stiffness: 120 },
  },
};

/* ------------------------------------------------------------------ */
/*  Stagger slow (for dramatic reveals)                               */
/* ------------------------------------------------------------------ */

export const staggerSlow: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

/* ------------------------------------------------------------------ */
/*  3D tilt card helper (for mouse-tracking components)               */
/* ------------------------------------------------------------------ */

export function calcTilt(
  e: React.MouseEvent<HTMLElement>,
  intensity: number = 10
): { rotateX: number; rotateY: number } {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  return {
    rotateY: ((x - centerX) / centerX) * intensity,
    rotateX: ((centerY - y) / centerY) * intensity,
  };
}
