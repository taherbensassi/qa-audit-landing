"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { content } from "@/lib/content";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Shield, Lock, Server, ArrowRight } from "lucide-react";

const { footer } = content;

const trustIcons = [Shield, Lock, Server];

export function Footer() {
  const trustBadges = (footer as { trust?: string[] }).trust ?? [];

  return (
    <footer className="relative border-t border-white/[0.04] bg-[var(--dark-bg)] overflow-hidden">
      {/* Animated gradient top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
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
        {/* Mini CTA banner */}
        <motion.div
          variants={fadeInUp}
          className="mb-16 border border-violet-500/20 bg-violet-600/[0.04] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <p className="text-base font-bold text-white lg:text-lg">
              Prêt à évaluer 100% de vos appels ?
            </p>
            <p className="mt-1 text-sm text-zinc-400">
              Obtenez votre audit gratuit en 24h — sans engagement.
            </p>
          </div>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors shrink-0 btn-shine cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            Demander un audit
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-4">
          <motion.div variants={fadeInUp}>
            <p className="mb-2 text-sm font-bold text-white">{footer.brand}</p>
            <p className="text-sm text-zinc-400">{footer.tagline}</p>
          </motion.div>

          {footer.columns.map((column: { title: string; links: { label: string; href: string }[] }) => (
            <motion.div key={column.title} variants={fadeInUp}>
              <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-zinc-400">
                {column.title}
              </p>
              <ul className="flex flex-col gap-3">
                {column.links.map((link: { label: string; href: string }) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 transition-colors duration-200 hover:text-white underline-sweep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        {trustBadges.length > 0 && (
          <motion.div variants={fadeInUp} className="mt-12 flex flex-wrap gap-4">
            {trustBadges.map((badge: string, i: number) => {
              const TrustIcon = trustIcons[i % trustIcons.length];
              return (
                <div
                  key={badge}
                  className="inline-flex items-center gap-2 border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-xs text-zinc-400"
                >
                  <TrustIcon size={12} className="text-violet-400" strokeWidth={1.5} />
                  {badge}
                </div>
              );
            })}
          </motion.div>
        )}

        <div className="mt-12 border-t border-white/[0.04] pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">{footer.copyright}</p>
          <div className="flex gap-6">
            <Link href="/security" className="text-xs text-zinc-500 hover:text-white transition-colors duration-200 underline-sweep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500">Confidentialité</Link>
            <Link href="/security" className="text-xs text-zinc-500 hover:text-white transition-colors duration-200 underline-sweep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500">Mentions légales</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
