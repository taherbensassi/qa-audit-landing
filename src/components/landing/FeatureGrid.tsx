"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { fadeInUp } from "@/lib/animations";
import { getIcon } from "@/lib/icons";

const { features } = content;

export function FeatureGrid() {
  return (
    <Section id="features" className="bg-[#fafafa]">
      <motion.p variants={fadeInUp} className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600">
        {features.label}
      </motion.p>
      <motion.h2
        variants={fadeInUp}
        className="mb-16 max-w-2xl text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl"
        style={{ lineHeight: 1.2 }}
      >
        {features.headline.split("\n").map((line, i) => (
          <span key={i}>{line}{i === 0 && <br />}</span>
        ))}
      </motion.h2>

      <div className="grid gap-x-12 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {features.items.map((feature) => {
          const Icon = getIcon(feature.icon);
          return (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center bg-gradient-to-br from-violet-50 to-violet-50 transition-all duration-300 group-hover:from-violet-100 group-hover:to-violet-100 group-hover:shadow-md group-hover:shadow-violet-100/50">
                <Icon size={20} className="text-violet-600 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-base font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
