"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
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

export function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = showcase.items[activeIndex];
  const panelRef = useRef<HTMLDivElement>(null);
  const tiltX = useRef(0);
  const tiltY = useRef(0);
  const [tiltStyle, setTiltStyle] = useState({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" });

  const handlePanelMouse = useCallback((e: React.MouseEvent) => {
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.current = y * -3; // max 3 degrees
    tiltY.current = x * 3;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${tiltX.current}deg) rotateY(${tiltY.current}deg)`,
    });
  }, []);

  const handlePanelLeave = useCallback(() => {
    setTiltStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" });
  }, []);

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
                    : "text-white/40 hover:text-white/70"
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

        {/* Preview panel with light 3D tilt */}
        <div
          ref={panelRef}
          onMouseMove={handlePanelMouse}
          onMouseLeave={handlePanelLeave}
          style={{ ...tiltStyle, transition: "transform 0.15s ease-out", willChange: "transform" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.01, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="shadow-2xl shadow-black/60">
                <AppPreview
                  variant={tabVariants[activeIndex]}
                  aspectRatio="16/10"
                />
              </div>
              <p className="mt-6 text-center text-sm text-white/40">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
