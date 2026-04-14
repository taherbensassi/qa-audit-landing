"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { springNumber, staggerSlow } from "@/lib/animations";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const { metrics } = content;

export function Metrics() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-violet-700 via-violet-600 to-indigo-700 py-20 lg:py-24 animate-gradient">
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
        className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 px-6 lg:grid-cols-4"
      >
        {metrics.map((metric: { value: string; label: string; context?: string }, i: number) => (
          <motion.div
            key={metric.label}
            variants={springNumber}
            className={`px-6 py-8 text-center ${
              i < metrics.length - 1 ? "border-r border-white/10" : ""
            }`}
          >
            <div className="mb-2 font-mono text-3xl font-bold text-white lg:text-5xl">
              <AnimatedCounter value={metric.value} />
            </div>
            <p className="text-sm font-medium text-white/80">{metric.label}</p>
            {metric.context && (
              <p className="mt-1 text-xs text-white/50">{metric.context}</p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
