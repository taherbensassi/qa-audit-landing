"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const { metrics } = content;

export function Metrics() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-violet-700 via-violet-600 to-indigo-700 py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 px-6 lg:grid-cols-4"
      >
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            variants={fadeInUp}
            className={`px-6 py-8 text-center ${
              i < metrics.length - 1 ? "border-r border-white/10" : ""
            }`}
          >
            <div className="mb-2 font-mono text-4xl font-bold text-white lg:text-5xl">
              <AnimatedCounter value={metric.value} />
            </div>
            <p className="text-sm text-white/70">{metric.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
