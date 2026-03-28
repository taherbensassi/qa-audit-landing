"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { content } from "@/lib/content";
import { fadeInUp, scaleIn, staggerFast, slideInFromLeft, slideInFromRight } from "@/lib/animations";
import { getIcon } from "@/lib/icons";

const { platform } = content;

export function Platform() {
  return (
    <Section id="platform" className="bg-white">
      <motion.p variants={fadeInUp} className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600">
        {platform.label}
      </motion.p>
      <motion.h2 variants={fadeInUp} className="mb-4 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl">
        {platform.headline}
      </motion.h2>
      <motion.p variants={fadeInUp} className="mb-16 max-w-2xl text-base text-gray-500">
        {platform.description}
      </motion.p>

      <motion.div variants={scaleIn} className="mb-24 overflow-hidden border border-gray-200 bg-white shadow-xl">
        <Image src={platform.image} alt="Platform overview" width={1200} height={700} className="w-full" />
      </motion.div>

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
                  <motion.div
                    key={item.title}
                    variants={direction}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="group border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center bg-violet-50 transition-colors duration-300 group-hover:bg-violet-100">
                      <Icon size={18} className="text-violet-600" strokeWidth={1.5} />
                    </div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-gray-500">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
