"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { content } from "@/lib/content";

const { nav } = content;

function EvavocLogo() {
  return (
    <div className="flex items-center gap-2.5">
      {/* Waveform mark — three vertical bars symbolising voice analysis */}
      <div className="flex items-end gap-[3px] h-[18px]">
        <div className="w-[3px] h-[8px] bg-violet-500" />
        <div className="w-[3px] h-[16px] bg-violet-400" />
        <div className="w-[3px] h-[11px] bg-violet-500" />
      </div>
      <span className="text-[16px] font-bold text-white tracking-tight leading-none">
        eva-voc
      </span>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090b]/95 backdrop-blur-xl border-b border-white/[0.07]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 h-[64px]">

        {/* Brand */}
        <Link href="/" className="group">
          <EvavocLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center md:flex">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-[13px] font-medium text-white/45 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={nav.cta.href}
            className="px-5 py-2.5 text-[13px] font-semibold bg-violet-600 text-white transition-colors duration-200 hover:bg-violet-500 select-none"
          >
            {nav.cta.label}
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/60 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.07] bg-[#09090b] md:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col px-6 py-4">
              {nav.links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-[14px] font-medium text-white/50 hover:text-white transition-colors border-b border-white/[0.05]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href={nav.cta.href}
                onClick={() => setMobileOpen(false)}
                className="mt-4 bg-violet-600 px-5 py-3 text-center text-[13px] font-semibold text-white hover:bg-violet-500 transition-colors"
              >
                {nav.cta.label}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
