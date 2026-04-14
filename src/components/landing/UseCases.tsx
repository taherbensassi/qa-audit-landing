"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { AppPreview, AppPreviewVariant } from "@/components/ui/AppPreview";
import { content } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const { useCases } = content;

// Map use case index to the most relevant AppPreview variant
const previewVariants: AppPreviewVariant[] = [
  "evaluations", // Assurance Qualite
  "compliance",  // Conformite & Risques
  "dashboard",   // Performance Commerciale
];

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

/* ------------------------------------------------------------------ */
/*  3D flip transition variants                                        */
/* ------------------------------------------------------------------ */

const flipVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    rotateY: direction > 0 ? 45 : -45,
    scale: 0.92,
    z: -100,
  }),
  center: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    z: 0,
    transition: { type: "spring" as const, damping: 22, stiffness: 160 },
  },
  exit: (direction: number) => ({
    opacity: 0,
    rotateY: direction > 0 ? -45 : 45,
    scale: 0.92,
    z: -100,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const active = useCases.items[activeIndex];

  const handleTabChange = (i: number) => {
    setDirection(i > activeIndex ? 1 : -1);
    setActiveIndex(i);
  };

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
        <motion.p
          variants={fadeInUp}
          className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600"
        >
          {useCases.label}
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="mb-16 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          style={{ lineHeight: 1.1 }}
        >
          {useCases.headline}
        </motion.h2>

        <motion.div variants={fadeInUp}>
          {/* Tabs */}
          <div className="mb-12 flex flex-wrap gap-0 border-b border-gray-200">
            {useCases.items.map((item, i) => (
              <button
                key={item.title}
                onClick={() => handleTabChange(i)}
                className={`relative px-6 py-3 text-sm font-medium transition-all duration-300 border-b-2 -mb-px cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
                  i === activeIndex
                    ? "border-violet-600 text-violet-700"
                    : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Panel with 3D perspective flip */}
          <div style={{ perspective: 1200 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={flipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{ transformStyle: "preserve-3d" }}
                className="grid items-center gap-12 lg:grid-cols-2"
              >
                {/* Text */}
                <div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">
                    {active.title}
                  </h3>
                  <p className="mb-6 text-base leading-relaxed text-gray-500 lg:text-lg">
                    {active.description}
                  </p>
                  <motion.div
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 px-4 py-2.5"
                  >
                    <span className="h-2 w-2 keep-round bg-violet-500 animate-pulse" />
                    <span className="text-sm font-semibold text-violet-700">
                      <AnimatedStat text={active.stats} />
                    </span>
                    {(active as { statsContext?: string }).statsContext && (
                      <span className="text-xs text-violet-500">
                        {(active as { statsContext?: string }).statsContext}
                      </span>
                    )}
                  </motion.div>
                </div>

                {/* AppPreview with 3D entrance */}
                <motion.div
                  initial={{ rotateY: 20, opacity: 0, scale: 0.95 }}
                  animate={{ rotateY: 0, opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 140,
                    delay: 0.1,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="shadow-2xl shadow-black/20"
                >
                  <AppPreview
                    variant={previewVariants[activeIndex]}
                    aspectRatio="16/10"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
