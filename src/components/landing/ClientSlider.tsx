"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { fadeInUp } from "@/lib/animations";

const { clients } = content;

/* Duplicate logos enough times to fill the carousel seamlessly */
const logosRow1 = [...clients.logos, ...clients.logos, ...clients.logos];
const logosRow2 = [...clients.logos, ...clients.logos, ...clients.logos].reverse();

export function ClientSlider() {
  return (
    <section className="relative border-y border-gray-100 bg-white py-14 overflow-hidden">
      <motion.p
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-8 text-center text-xs font-medium tracking-widest uppercase text-gray-400"
      >
        {clients.headline}
      </motion.p>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-5">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />
        <div className="flex animate-scroll-left items-center gap-20 w-max">
          {logosRow1.map((logo, i) => (
            <div
              key={`r1-${i}`}
              className="flex-shrink-0 opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:scale-110"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={130}
                height={44}
                className="h-9 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent" />
        <div className="flex animate-scroll-right items-center gap-20 w-max">
          {logosRow2.map((logo, i) => (
            <div
              key={`r2-${i}`}
              className="flex-shrink-0 opacity-25 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 hover:scale-110"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={110}
                height={36}
                className="h-7 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
