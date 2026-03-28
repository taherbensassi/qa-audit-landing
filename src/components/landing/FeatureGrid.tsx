"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { fadeInUp, slideInFromLeft, slideInFromRight, slideInFromBottom, calcTilt } from "@/lib/animations";
import { getIcon } from "@/lib/icons";

const { features } = content;

const entranceVariants = [slideInFromLeft, fadeInUp, slideInFromRight, slideInFromRight, slideInFromBottom, slideInFromLeft];

function FeatureCard({ feature, index }: { feature: typeof features.items[0]; index: number }) {
  const Icon = getIcon(feature.icon);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setTilt(calcTilt(e, 12));
  }, []);

  const handleLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <motion.div
      variants={entranceVariants[index % entranceVariants.length]}
      className="perspective"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        animate={tilt}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="group preserve-3d relative overflow-hidden"
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-200/0 via-violet-200/0 to-violet-200/0 transition-all duration-500 group-hover:from-violet-200/20 group-hover:via-transparent group-hover:to-indigo-200/20" />

        <div className="relative border border-gray-100 bg-white p-8 transition-all duration-300 group-hover:border-violet-200/50 group-hover:shadow-lg group-hover:shadow-violet-100/30">
          <motion.div
            className="mb-4 flex h-12 w-12 items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50 transition-all duration-300 group-hover:from-violet-100 group-hover:to-indigo-100 group-hover:shadow-md group-hover:shadow-violet-100/50"
            whileInView={{ rotate: [0, -10, 10, 0] }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
          >
            <Icon
              size={20}
              className="text-violet-600 transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.5}
            />
          </motion.div>
          <h3 className="mb-2 text-base font-semibold text-gray-900">
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed text-gray-500">
            {feature.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FeatureGrid() {
  return (
    <Section id="features" className="bg-white">
      <motion.p
        variants={fadeInUp}
        className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600"
      >
        {features.label}
      </motion.p>

      <motion.h2
        variants={fadeInUp}
        className="mb-16 max-w-2xl text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl"
        style={{ lineHeight: 1.2 }}
      >
        {features.headline.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            {i === 0 && <br />}
          </span>
        ))}
      </motion.h2>

      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {features.items.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </Section>
  );
}
