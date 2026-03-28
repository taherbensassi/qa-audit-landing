"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { Upload, BrainCircuit, ClipboardCheck, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "Upload your calls",
    description:
      "Batch upload audio files or connect your telephony system via our REST API. We accept any format — MP3, WAV, FLAC, OGG — in any language. Real-time or batch processing, your choice.",
    image: "/images/product/dashboard.png",
    details: ["Multi-format audio support", "API & manual upload", "Automatic speaker detection"],
  },
  {
    num: "02",
    icon: BrainCircuit,
    title: "AI transcribes & analyzes",
    description:
      "Our LLM pipeline transcribes each call with speaker diarization, then evaluates the conversation against your custom evaluation grille — every theme, every criterion, every compliance rule.",
    image: "/images/product/workflow.png",
    details: ["Multi-language transcription", "Speaker diarization", "10-step automated pipeline"],
  },
  {
    num: "03",
    icon: ClipboardCheck,
    title: "Review & validate",
    description:
      "Human-in-the-loop quality assurance. Your QA managers review AI evaluations, calibrate scoring, and validate results. The AI learns from your corrections over time.",
    image: "/images/product/evaltion.png",
    details: ["Side-by-side comparison", "Calibration system", "Audit trail"],
  },
  {
    num: "04",
    icon: BarChart3,
    title: "Act on insights",
    description:
      "Surface coaching opportunities, track agent performance trends, and export audit-ready compliance reports. Your team focuses on improving quality — not listening to calls.",
    image: "/images/product/dashboard.png",
    details: ["Score distribution analytics", "Agent performance trends", "PDF & Excel exports"],
  },
];

export function HowItWorksContent() {
  return (
    <section className="bg-white pt-40 pb-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-6"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600"
        >
          How It Works
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="mb-6 max-w-3xl text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl"
          style={{ lineHeight: 1.1 }}
        >
          From raw audio to actionable insight
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mb-24 max-w-2xl text-lg text-gray-500"
        >
          Four automated steps. Zero manual listening. Every call scored against your standards in under two minutes.
        </motion.p>

        <div className="space-y-32">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Text side */}
              <motion.div
                variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
                className={i % 2 === 1 ? "lg:order-2" : ""}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center border-2 border-violet-200 bg-violet-50 font-mono text-sm font-bold text-violet-600">
                    {step.num}
                  </span>
                  <step.icon size={20} className="text-violet-500" strokeWidth={1.5} />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">
                  {step.title}
                </h2>
                <p className="mb-6 text-base leading-relaxed text-gray-500">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-gray-600">
                      <ArrowRight size={12} className="text-violet-400" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Image side */}
              <motion.div
                variants={i % 2 === 0 ? fadeInRight : fadeInLeft}
                className={i % 2 === 1 ? "lg:order-1" : ""}
              >
                <div className="overflow-hidden border border-gray-200 bg-gray-50 shadow-lg shadow-gray-200/50">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={800}
                    height={500}
                    className="w-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
