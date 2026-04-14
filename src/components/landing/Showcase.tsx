"use client";

import { useState, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { content } from "@/lib/content";
import { blurIn, staggerContainer } from "@/lib/animations";
import { AppPreview, AppPreviewVariant } from "@/components/ui/AppPreview";

const { showcase } = content;

// Map showcase tab index to AppPreview variant
const tabVariants: AppPreviewVariant[] = [
  "dashboard",    // Dashboard
  "evaluations",  // Evaluations
  "grille",       // Editeur de Grilles
  "pipeline",     // Pipeline IA
];

/* ------------------------------------------------------------------ */
/*  Floating UI badges around the preview                              */
/* ------------------------------------------------------------------ */

const floatingBadges = [
  { label: "98.2% Score", x: "-6%", y: "20%", delay: 0 },
  { label: "RGPD OK", x: "102%", y: "30%", delay: 0.6 },
  { label: "AI Audit", x: "-4%", y: "70%", delay: 1.2 },
  { label: "Real-time", x: "103%", y: "65%", delay: 1.8 },
  { label: "Multi-lang", x: "20%", y: "-8%", delay: 0.3 },
  { label: "Export PDF", x: "75%", y: "105%", delay: 0.9 },
];

function FloatingBadges() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">
      {floatingBadges.map((badge) => (
        <motion.div
          key={badge.label}
          className="absolute font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] text-white/50"
          style={{ left: badge.x, top: badge.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{
            opacity: [0, 0.7, 0.5],
            scale: 1,
            y: [0, -6, 0],
          }}
          viewport={{ once: true }}
          transition={{
            delay: badge.delay + 0.5,
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {badge.label}
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Showcase                                                           */
/* ------------------------------------------------------------------ */

export function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = showcase.items[activeIndex];
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handlePanelMouse = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReduced) return;
      const rect = panelRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(y * -4);
      rotateY.set(x * 4);
    },
    [rotateX, rotateY, prefersReduced]
  );

  const handlePanelLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#0f0f23] py-24 lg:py-32">
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto max-w-6xl px-6"
      >
        <motion.h2
          variants={blurIn}
          className="mb-16 text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          {showcase.headline}
        </motion.h2>

        {/* Tab bar with sliding indicator */}
        <motion.div
          variants={blurIn}
          className="mb-8 flex justify-center gap-1 flex-wrap"
        >
          <LayoutGroup>
            {showcase.items.map((item, i) => (
              <button
                key={item.title}
                onClick={() => setActiveIndex(i)}
                className={`relative px-5 py-2.5 text-sm font-medium transition-colors duration-250 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
                  i === activeIndex
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {i === activeIndex && (
                  <motion.div
                    layoutId="showcase-tab"
                    className="absolute inset-0 bg-violet-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.title}</span>
              </button>
            ))}
          </LayoutGroup>
        </motion.div>

        {/* Preview panel with 3D tilt + reflection + floating badges */}
        <div className="relative">
          <FloatingBadges />

          <motion.div
            ref={panelRef}
            onMouseMove={handlePanelMouse}
            onMouseLeave={handlePanelLeave}
            style={{
              rotateX: springX,
              rotateY: springY,
              transformStyle: "preserve-3d",
              perspective: 1200,
              willChange: "transform",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.01, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Main preview */}
                <div className="relative shadow-2xl shadow-black/60">
                  <AppPreview
                    variant={tabVariants[activeIndex]}
                    aspectRatio="16/10"
                  />
                  {/* Edge glow */}
                  <div className="absolute inset-0 pointer-events-none border border-white/[0.06]" />
                </div>

                {/* Mirror reflection effect */}
                <div
                  className="relative mt-1 overflow-hidden pointer-events-none hidden lg:block"
                  style={{ height: 80 }}
                >
                  <div
                    className="absolute inset-x-0 top-0"
                    style={{
                      transform: "scaleY(-1)",
                      filter: "blur(2px)",
                      opacity: 0.12,
                      maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
                      WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)",
                    }}
                  >
                    <AppPreview
                      variant={tabVariants[activeIndex]}
                      aspectRatio="16/10"
                    />
                  </div>
                </div>

                <p className="mt-4 text-center text-sm text-white/70">
                  {active.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
