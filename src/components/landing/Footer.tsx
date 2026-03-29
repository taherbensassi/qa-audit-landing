"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const { footer } = content;

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] bg-[#09090b] overflow-hidden">
      {/* Animated gradient top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-6xl px-6 py-16"
      >
        <div className="grid gap-12 md:grid-cols-4">
          <motion.div variants={fadeInUp}>
            <p className="mb-2 text-sm font-bold text-white">{footer.brand}</p>
            <p className="text-sm text-zinc-500">{footer.tagline}</p>
          </motion.div>

          {footer.columns.map((column) => (
            <motion.div key={column.title} variants={fadeInUp}>
              <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-zinc-500">
                {column.title}
              </p>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 transition-colors duration-200 hover:text-white underline-sweep"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/[0.04] pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600">{footer.copyright}</p>
          <div className="flex gap-6">
            <Link href="/security" className="text-xs text-zinc-600 hover:text-white transition-colors duration-200 underline-sweep">Confidentialité</Link>
            <Link href="/security" className="text-xs text-zinc-600 hover:text-white transition-colors duration-200 underline-sweep">Mentions légales</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
