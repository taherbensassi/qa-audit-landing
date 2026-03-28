"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { content } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const { metrics } = content;

export function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24">
      {/* Aurora animated background */}
      <motion.div
        className="absolute inset-0 animate-aurora"
        style={{ y: bgY }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/90 via-violet-700/90 to-indigo-700/90" />

      {/* Animated background shapes with parallax */}
      <motion.div
        className="pointer-events-none absolute top-0 left-[20%] h-40 w-40 bg-white/[0.04] animate-float"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-[15%] h-32 w-32 bg-white/[0.03] animate-float-delayed"
        style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
      />
      <motion.div
        className="pointer-events-none absolute top-[20%] right-[40%] h-24 w-24 bg-white/[0.02] animate-float-slow keep-round"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-10, 10]) }}
      />

      {/* Grid pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

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
            className={`group px-6 py-8 text-center transition-all duration-300 hover:bg-white/5 ${
              i < metrics.length - 1 ? "border-r border-white/10" : ""
            }`}
          >
            <div className="mb-2 text-4xl font-bold text-white lg:text-5xl">
              <AnimatedCounter value={metric.value} />
            </div>
            <motion.p
              className="text-sm text-white/70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              {metric.label}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
