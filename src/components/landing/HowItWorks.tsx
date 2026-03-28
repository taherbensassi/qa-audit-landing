"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Upload, Brain, LineChart } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "Ingest",
    description:
      "Upload calls or connect your telephony system via API. Batch or real-time — we handle audio in any format, any language.",
  },
  {
    num: "02",
    icon: Brain,
    title: "Evaluate",
    description:
      "AI transcribes and analyzes each call against your custom evaluation grilles. Every theme, every criterion, every compliance rule — scored in seconds.",
  },
  {
    num: "03",
    icon: LineChart,
    title: "Act",
    description:
      "Review scores, surface coaching opportunities, and export audit-ready compliance reports. Your team focuses on improving quality — not listening to calls.",
  },
];

export function HowItWorks() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          variants={fadeInUp}
          className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600"
        >
          How It Works
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="mb-20 max-w-2xl text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl"
          style={{ lineHeight: 1.2 }}
        >
          From raw audio to actionable insight
          <br />
          <span className="text-gray-400">in three steps</span>
        </motion.h2>

        <div className="relative grid gap-12 md:grid-cols-3">
          {/* Connecting line */}
          <div className="pointer-events-none absolute top-16 left-[16.5%] right-[16.5%] hidden md:block">
            <motion.div
              className="h-px w-full bg-gradient-to-r from-violet-200 via-violet-300 to-violet-200"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeInUp}
              className="group relative text-center"
            >
              {/* Number badge */}
              <motion.div
                className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border-2 border-violet-200 bg-white text-lg font-bold text-violet-600 keep-round shadow-sm relative z-10"
                whileInView={{ scale: [0.8, 1.05, 1] }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
              >
                {step.num}
              </motion.div>

              {/* Icon */}
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-violet-50 transition-colors duration-300 group-hover:bg-violet-100">
                <step.icon size={22} className="text-violet-600" strokeWidth={1.5} />
              </div>

              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
