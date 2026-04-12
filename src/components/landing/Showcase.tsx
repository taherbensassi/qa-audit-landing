"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { AppPreview, AppPreviewVariant } from "@/components/ui/AppPreview";

const { showcase } = content;

// Map showcase tab index to AppPreview variant
const tabVariants: AppPreviewVariant[] = [
  "dashboard",    // Dashboard
  "evaluations",  // Évaluations
  "grille",       // Éditeur de Grilles
  "pipeline",     // Pipeline IA
];

export function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = showcase.items[activeIndex];

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
          variants={fadeInUp}
          className="mb-16 text-center text-3xl font-bold tracking-tight text-white lg:text-4xl"
        >
          {showcase.headline}
        </motion.h2>

        {/* Tab bar */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 flex justify-center gap-1 flex-wrap"
        >
          {showcase.items.map((item, i) => (
            <button
              key={item.title}
              onClick={() => setActiveIndex(i)}
              className={`px-5 py-2.5 text-sm font-medium transition-all duration-250 ${
                i === activeIndex
                  ? "bg-violet-600 text-white"
                  : "text-white/35 hover:text-white/65 hover:bg-white/[0.05]"
              }`}
            >
              {item.title}
            </button>
          ))}
        </motion.div>

        {/* Preview panel */}
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
      </motion.div>
    </section>
  );
}
