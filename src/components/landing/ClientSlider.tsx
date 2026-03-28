"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { fadeIn } from "@/lib/animations";

const { clients } = content;

export function ClientSlider() {
  return (
    <motion.section
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative border-y border-gray-100 bg-white py-16 overflow-hidden"
    >
      <p className="mb-10 text-center text-xs font-medium tracking-widest uppercase text-gray-400">
        {clients.headline}
      </p>

      {/* Row 1 — scrolls left */}
      <div className="relative mx-auto max-w-5xl overflow-hidden mb-6 animate-sweep-glow">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />
        <div className="flex animate-scroll-left items-center gap-16">
          {[...clients.logos, ...clients.logos].map((logo, i) => (
            <motion.div
              key={`row1-${logo.name}-${i}`}
              className="flex-shrink-0 opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 perspective"
              whileHover={{
                scale: 1.1,
                rotateY: 8,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain preserve-3d"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right (reversed + shifted) */}
      <div className="relative mx-auto max-w-5xl overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />
        <div className="flex animate-scroll-right items-center gap-16">
          {[...clients.logos, ...clients.logos].reverse().map((logo, i) => (
            <motion.div
              key={`row2-${logo.name}-${i}`}
              className="flex-shrink-0 opacity-30 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 perspective"
              whileHover={{
                scale: 1.1,
                rotateY: -8,
                transition: { duration: 0.3 },
              }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={100}
                height={32}
                className="h-6 w-auto object-contain preserve-3d"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
