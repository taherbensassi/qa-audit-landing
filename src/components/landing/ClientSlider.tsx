"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  animate,
  useReducedMotion,
} from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { Building2, Zap, Shield, Globe, BarChart3, BrainCircuit } from "lucide-react";

const industries = [
  { icon: Zap, label: "Energie" },
  { icon: Globe, label: "Telecom" },
  { icon: Shield, label: "Assurance" },
  { icon: Building2, label: "Banque" },
  { icon: BarChart3, label: "Commerce" },
  { icon: BrainCircuit, label: "BPO" },
];

const ITEM_COUNT = industries.length;
const ANGLE_STEP = 360 / ITEM_COUNT;

/* ------------------------------------------------------------------ */
/*  3D Carousel Ring                                                   */
/* ------------------------------------------------------------------ */

function CarouselRing() {
  const prefersReduced = useReducedMotion();
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, { stiffness: 30, damping: 25 });
  const [hovered, setHovered] = useState(false);

  // Auto-rotate
  useEffect(() => {
    if (prefersReduced) return;
    const controls = animate(rotation, rotation.get() - 360, {
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    });

    // Pause/resume on hover
    if (hovered) {
      controls.pause();
    }

    return () => controls.stop();
  }, [rotation, hovered, prefersReduced]);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => setHovered(false), []);

  // Responsive radius
  const radiusX = typeof window !== "undefined" && window.innerWidth < 640 ? 140 : 260;
  const radiusZ = typeof window !== "undefined" && window.innerWidth < 640 ? 80 : 140;

  return (
    <div
      className="relative mx-auto h-56 w-full max-w-3xl"
      style={{ perspective: 900 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Center badge */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring", damping: 12 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex h-16 w-16 items-center justify-center border-2 border-violet-200 bg-violet-50">
            <Shield size={24} className="text-violet-600" strokeWidth={1.5} />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-violet-500">
            Multi-Industrie
          </span>
        </motion.div>
      </div>

      {/* 3D rotating carousel */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
          rotateX: 12,
          rotateY: prefersReduced ? 0 : smoothRotation,
        }}
      >
        {industries.map((item, i) => {
          const angle = i * ANGLE_STEP;
          return (
            <motion.div
              key={item.label}
              className="absolute"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${angle}deg) translateZ(${radiusZ}px) translateX(${
                  Math.sin((angle * Math.PI) / 180) * (radiusX - radiusZ)
                }px)`,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i + 0.4, type: "spring", damping: 14 }}
            >
              <motion.div
                className="flex items-center gap-2 border border-gray-100 bg-white px-4 py-2.5 shadow-md transition-all duration-300 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/30 cursor-default whitespace-nowrap"
                style={{
                  /* Counter-rotate text so it stays readable */
                  backfaceVisibility: "hidden",
                }}
                whileHover={{ scale: 1.1, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <item.icon size={16} className="text-violet-500" strokeWidth={1.5} />
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ClientSlider section                                               */
/* ------------------------------------------------------------------ */

export function ClientSlider() {
  return (
    <section className="relative border-y border-gray-100 bg-white py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-50/20 via-transparent to-violet-50/20" />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400">
          Adopte par les leaders de l&apos;industrie
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Plus de 500 000 appels analyses dans 6+ secteurs
        </p>
      </motion.div>

      <CarouselRing />
    </section>
  );
}
