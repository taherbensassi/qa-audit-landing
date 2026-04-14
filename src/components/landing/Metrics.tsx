"use client";

import { useRef, useCallback, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { content } from "@/lib/content";
import { springNumber, staggerSlow } from "@/lib/animations";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const { metrics } = content;

/* ------------------------------------------------------------------ */
/*  Floating particles background                                      */
/* ------------------------------------------------------------------ */

const PARTICLE_COUNT = 18;

function FloatingParticles() {
  const prefersReduced = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        x: `${(i * 37 + 13) % 100}%`,
        y: `${(i * 53 + 7) % 100}%`,
        size: 2 + (i % 3),
        delay: (i * 0.3) % 4,
        duration: 4 + (i % 3) * 2,
      })),
    []
  );

  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute keep-round bg-white"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.08, 0.2, 0.08],
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3D Tilt Metric Card                                                */
/* ------------------------------------------------------------------ */

function TiltMetricCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReduced) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      rotateY.set(((x - rect.width / 2) / (rect.width / 2)) * 8);
      rotateX.set(((rect.height / 2 - y) / (rect.height / 2)) * 8);
    },
    [rotateX, rotateY, prefersReduced]
  );

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      whileHover={{
        scale: 1.04,
        transition: { duration: 0.25 },
      }}
      className={className}
    >
      {/* Glassmorphism card surface */}
      <div className="relative h-full bg-white/[0.08] backdrop-blur-md border border-white/[0.12] shadow-lg shadow-black/10 overflow-hidden">
        {/* Inner glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {/* Subtle shine line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        {children}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Metrics section                                                    */
/* ------------------------------------------------------------------ */

export function Metrics() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-violet-700 via-violet-600 to-indigo-700 py-20 lg:py-24 animate-gradient">
      <FloatingParticles />

      {/* One-time shimmer sweep on entrance */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.15, 0] }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </motion.div>

      <motion.div
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 lg:grid-cols-4"
        style={{ perspective: 800 }}
      >
        {metrics.map((metric: { value: string; label: string; context?: string }, i: number) => (
          <motion.div key={metric.label} variants={springNumber} className="group">
            <TiltMetricCard>
              <div className="px-4 py-6 text-center sm:px-6 sm:py-8">
                <div className="mb-2 font-mono text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                  <AnimatedCounter value={metric.value} />
                </div>
                <p className="text-sm font-semibold text-white/80">{metric.label}</p>
                {metric.context && (
                  <p className="mt-1 text-xs text-white/50">{metric.context}</p>
                )}
              </div>
            </TiltMetricCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
