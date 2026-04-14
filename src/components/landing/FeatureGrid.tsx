"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { fadeInLeft, fadeInRight, blurIn } from "@/lib/animations";
import { getIcon } from "@/lib/icons";

const { features } = content;

export function FeatureGrid() {
  return (
    <Section id="features" className="bg-[var(--surface)]">
      <motion.p variants={blurIn} className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600">
        {features.label}
      </motion.p>
      <motion.h2
        variants={blurIn}
        className="mb-16 max-w-2xl text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
        style={{ lineHeight: 1.1 }}
      >
        {features.headline.split("\n").map((line: string, i: number) => (
          <span key={i}>{line}{i === 0 && <br />}</span>
        ))}
      </motion.h2>

      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {features.items.map((feature: { title: string; description: string; icon: string; stat?: string }, idx: number) => {
          const Icon = getIcon(feature.icon);
          const variant = idx % 2 === 0 ? fadeInLeft : fadeInRight;
          return (
            <motion.div
              key={feature.title}
              variants={variant}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="group"
            >
              <motion.div
                className="mb-4 flex h-12 w-12 items-center justify-center bg-gradient-to-br from-violet-50 to-violet-50 transition-all duration-300 group-hover:from-violet-100 group-hover:to-violet-100 group-hover:shadow-md group-hover:shadow-violet-100/50"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                <Icon size={20} className="text-violet-600 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              </motion.div>
              <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
              <p className="mb-3 text-base leading-relaxed text-gray-500">{feature.description}</p>
              {feature.stat && (
                <span className="inline-block font-mono text-xs tracking-wider text-violet-600 bg-violet-50 px-2 py-0.5">
                  {feature.stat}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
