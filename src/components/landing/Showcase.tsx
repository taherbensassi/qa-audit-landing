"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { content } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Play } from "lucide-react";

const { showcase } = content;

export function Showcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = showcase.items[activeIndex];
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#0f0f23] py-24 lg:py-32">
      {/* Decorative grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated glow */}
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] bg-violet-500/[0.08] blur-[120px] keep-round"
        style={{ scale: glowScale }}
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

        {/* Tabs */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 flex justify-center gap-2"
        >
          {showcase.items.map((item, i) => (
            <motion.button
              key={item.title}
              onClick={() => setActiveIndex(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                i === activeIndex
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              }`}
            >
              {item.title}
              {i === activeIndex && (
                <motion.div
                  layoutId="showcase-tab-bg"
                  className="absolute inset-0 bg-violet-600 -z-10"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Preview with cinematic transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="group relative overflow-hidden border border-white/[0.08] bg-[#12121e] shadow-2xl shadow-violet-500/5">
              {/* Browser chrome mockup */}
              <div className="flex items-center gap-2 border-b border-white/[0.05] bg-[#0a0a16] px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 bg-red-400/60 keep-round" />
                  <span className="h-2.5 w-2.5 bg-yellow-400/60 keep-round" />
                  <span className="h-2.5 w-2.5 bg-green-400/60 keep-round" />
                </div>
                <div className="ml-3 flex-1 bg-white/[0.04] px-3 py-1 text-[10px] text-white/20 font-mono">
                  app.nouraisolution.com/dashboard
                </div>
              </div>

              {/* Play overlay hint */}
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-violet-900/0 opacity-0 transition-all duration-500 group-hover:bg-violet-900/10 group-hover:opacity-100">
                <motion.div
                  className="flex h-16 w-16 items-center justify-center bg-violet-600 shadow-xl shadow-violet-500/30 keep-round"
                  whileHover={{ scale: 1.1 }}
                >
                  <Play size={24} className="ml-1 text-white" fill="white" />
                </motion.div>
              </div>

              {/* Floating image */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={active.image}
                  alt={active.title}
                  width={900}
                  height={550}
                  className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </motion.div>

              {/* Decorative corner elements */}
              <div className="absolute top-4 right-4 h-8 w-8 border-t border-r border-violet-400/20" />
              <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-violet-400/20" />
            </div>
            <p className="mt-6 text-center text-sm text-white/50">
              {active.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
