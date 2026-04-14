"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Section } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { blurIn } from "@/lib/animations";
import { getIcon } from "@/lib/icons";

const { features } = content;

/* ------------------------------------------------------------------ */
/*  3D Tilt Feature Card                                               */
/* ------------------------------------------------------------------ */

function TiltFeatureCard({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 18 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReduced) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      rotateY.set(((x - rect.width / 2) / (rect.width / 2)) * 10);
      rotateX.set(((rect.height / 2 - y) / (rect.height / 2)) * 10);
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
      initial={{ opacity: 0, y: 40, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.08,
        type: "spring",
        damping: 18,
        stiffness: 100,
      }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 800,
        willChange: "transform",
      }}
      className="group cursor-default"
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FeatureGrid                                                        */
/* ------------------------------------------------------------------ */

export function FeatureGrid() {
  return (
    <Section id="features" className="bg-[var(--surface)]">
      <motion.p variants={blurIn} className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600">
        {features.label}
      </motion.p>
      <motion.h2
        variants={blurIn}
        className="mb-16 max-w-2xl text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        style={{ lineHeight: 1.1 }}
      >
        {features.headline.split("\n").map((line: string, i: number) => (
          <span key={i}>{line}{i === 0 && <br />}</span>
        ))}
      </motion.h2>

      <div className="grid gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1000 }}>
        {features.items.map((feature: { title: string; description: string; icon: string; stat?: string }, idx: number) => {
          const Icon = getIcon(feature.icon);
          return (
            <TiltFeatureCard key={feature.title} index={idx}>
              {/* Card surface with subtle border glow on hover */}
              <div className="relative h-full border border-gray-100 bg-white p-6 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-violet-100/40 overflow-hidden">
                {/* Top shine line */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-200/0 to-transparent transition-all duration-300 group-hover:via-violet-300/60" />
                {/* Hover glow background */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50/0 to-violet-50/0 transition-all duration-300 group-hover:from-violet-50/50 group-hover:to-transparent" />

                {/* Icon — floats above card surface with translateZ */}
                <motion.div
                  className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center bg-gradient-to-br from-violet-50 to-violet-100/50 border border-violet-100/50"
                  style={{ transform: "translateZ(30px)" }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 8px 24px rgba(124, 58, 237, 0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Icon
                    size={22}
                    className="text-violet-600 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </motion.div>

                <div className="relative z-10" style={{ transform: "translateZ(15px)" }}>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
                  <p className="mb-3 text-base leading-relaxed text-gray-500">{feature.description}</p>
                  {feature.stat && (
                    <span className="inline-block font-mono text-xs tracking-wider text-violet-600 bg-violet-50 px-2 py-0.5">
                      {feature.stat}
                    </span>
                  )}
                </div>
              </div>
            </TiltFeatureCard>
          );
        })}
      </div>
    </Section>
  );
}
