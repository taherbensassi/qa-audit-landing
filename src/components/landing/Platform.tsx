"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { fadeInUp, scaleIn, staggerFast, slideInFromLeft, slideInFromRight, calcTilt } from "@/lib/animations";
import { getIcon } from "@/lib/icons";

const { platform } = content;

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setTilt(calcTilt(e, 8));
  }, []);

  const handleLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      className={`perspective ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={tilt}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}

export function Platform() {
  return (
    <Section id="platform" className="bg-[#f8f8fc]">
      <motion.p
        variants={fadeInUp}
        className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600"
      >
        {platform.label}
      </motion.p>

      <motion.h2
        variants={fadeInUp}
        className="mb-4 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl"
      >
        {platform.headline}
      </motion.h2>

      <motion.p
        variants={fadeInUp}
        className="mb-16 max-w-2xl text-base text-gray-500"
      >
        {platform.description}
      </motion.p>

      {/* Platform overview image with parallax zoom */}
      <motion.div
        variants={scaleIn}
        whileHover={{ scale: 1.01, transition: { duration: 0.5 } }}
        className="mb-24 overflow-hidden border border-violet-100 bg-white shadow-xl shadow-violet-100/20"
      >
        <Image
          src={platform.image}
          alt="Platform overview"
          width={1200}
          height={700}
          className="w-full transition-transform duration-700"
        />
      </motion.div>

      {/* Capability categories */}
      <div className="space-y-20">
        {platform.capabilities.map((category, catIndex) => (
          <motion.div
            key={category.category}
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3
              variants={catIndex % 2 === 0 ? slideInFromLeft : slideInFromRight}
              className="mb-8 flex items-center gap-3 text-xs font-semibold tracking-widest uppercase text-gray-400"
            >
              <motion.span
                className="h-px bg-violet-300"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
              {category.category}
            </motion.h3>
            <div className="grid gap-6 md:grid-cols-3">
              {category.items.map((item, itemIndex) => {
                const Icon = getIcon(item.icon);
                const direction = itemIndex % 2 === 0 ? slideInFromLeft : slideInFromRight;
                return (
                  <TiltCard key={item.title}>
                    <motion.div
                      variants={direction}
                      className="group border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50 glass-light preserve-3d"
                    >
                      <motion.div
                        className="mb-4 flex h-10 w-10 items-center justify-center bg-violet-50 transition-colors duration-300 group-hover:bg-violet-100"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon
                          size={18}
                          className="text-violet-500 transition-colors duration-300 group-hover:text-violet-600"
                          strokeWidth={1.5}
                        />
                      </motion.div>
                      <h4 className="mb-2 text-sm font-semibold text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-gray-500">
                        {item.description}
                      </p>
                    </motion.div>
                  </TiltCard>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
