"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { content } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const { useCases } = content;

function AnimatedStat({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const match = text.match(/(\d+)/);
  const num = match ? parseInt(match[1]) : null;
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  if (isInView && !started && num) {
    setStarted(true);
    let frame = 0;
    const totalFrames = 60;
    const step = () => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * num));
      if (frame < totalFrames) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return (
    <span ref={ref}>
      {num ? text.replace(String(num), String(isInView ? display : 0)) : text}
    </span>
  );
}

export function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = useCases.items[activeIndex];

  return (
    <motion.section
      id="use-cases"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative bg-[#fafafa] py-24 lg:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.p variants={fadeInUp} className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600">
          {useCases.label}
        </motion.p>
        <motion.h2 variants={fadeInUp} className="mb-16 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
          {useCases.headline}
        </motion.h2>

        <motion.div variants={fadeInUp}>
          <div className="mb-12 flex flex-wrap gap-2 border-b border-gray-200">
            {useCases.items.map((item, i) => (
              <button
                key={item.title}
                onClick={() => setActiveIndex(i)}
                className={`relative px-5 py-3 text-sm font-medium transition-all duration-300 border-b-2 -mb-px ${
                  i === activeIndex
                    ? "border-violet-600 text-violet-700"
                    : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="grid items-center gap-12 lg:grid-cols-2"
            >
              <div>
                <h3 className="mb-4 text-2xl font-semibold text-gray-900">{active.title}</h3>
                <p className="mb-6 text-base leading-relaxed text-gray-500">{active.description}</p>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 px-4 py-2 text-sm font-semibold text-violet-700"
                >
                  <span className="h-2 w-2 bg-violet-500 keep-round animate-pulse" />
                  <AnimatedStat text={active.stats} />
                </motion.div>
              </div>

              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="overflow-hidden border border-gray-200 bg-white shadow-lg transition-shadow duration-500 hover:shadow-xl"
              >
                <Image src={active.image} alt={active.title} width={800} height={500} className="w-full" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
