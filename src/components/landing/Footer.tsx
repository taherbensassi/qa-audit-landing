"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { content } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const { footer } = content;

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <footer ref={ref} className="relative border-t border-gray-100 bg-white overflow-hidden">
      {/* Animated gradient top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        style={{ y, opacity }}
        className="mx-auto max-w-6xl px-6 py-16"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-12 md:grid-cols-4"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp}>
            <p className="mb-2 text-sm font-bold text-violet-700">
              {footer.brand}
            </p>
            <p className="text-sm text-gray-400">{footer.tagline}</p>
          </motion.div>

          {/* Link columns */}
          {footer.columns.map((column, colIndex) => (
            <motion.div key={column.title} variants={fadeInUp}>
              <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-gray-400">
                {column.title}
              </p>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors duration-200 hover:text-violet-600 underline-sweep"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 border-t border-gray-100 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs text-gray-400">{footer.copyright}</p>
          <div className="flex gap-6">
            <Link href="/security" className="text-xs text-gray-400 hover:text-violet-600 transition-colors duration-200 underline-sweep">
              Privacy
            </Link>
            <Link href="/security" className="text-xs text-gray-400 hover:text-violet-600 transition-colors duration-200 underline-sweep">
              Terms
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
