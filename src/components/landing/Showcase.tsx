"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { DemoPlaceholder } from "@/components/ui/DemoPlaceholder";

const { showcase } = content;

export function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = showcase.items[activeIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#0f0f23] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
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
        <motion.h2 variants={fadeInUp} className="mb-16 text-center text-3xl font-bold tracking-tight text-white lg:text-4xl">
          {showcase.headline}
        </motion.h2>

        <motion.div variants={fadeInUp} className="mb-8 flex justify-center gap-2">
          {showcase.items.map((item, i) => (
            <button
              key={item.title}
              onClick={() => setActiveIndex(i)}
              className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                i === activeIndex
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              }`}
            >
              {item.title}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="group relative overflow-hidden border border-white/[0.08] bg-[#12121e] shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/[0.05] bg-[#0a0a16] px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 bg-zinc-400/60 keep-round" />
                  <span className="h-2.5 w-2.5 bg-yellow-400/60 keep-round" />
                  <span className="h-2.5 w-2.5 bg-green-400/60 keep-round" />
                </div>
                <div className="ml-3 flex-1 bg-white/[0.04] px-3 py-1 text-[10px] text-white/20 font-mono">
                  app.eva-voc.com/dashboard
                </div>
              </div>
              <DemoPlaceholder label={active.title} aspectRatio="16/10" />
            </div>
            <p className="mt-6 text-center text-sm text-white/50">{active.description}</p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
