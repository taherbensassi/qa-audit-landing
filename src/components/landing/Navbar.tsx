"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { content } from "@/lib/content";

const { nav } = content;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-violet-100/50 shadow-sm shadow-violet-100/20"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-violet-500/60 via-violet-400/40 to-indigo-500/60 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={`text-base font-bold tracking-tight transition-colors ${
            scrolled ? "text-violet-700 hover:text-violet-600" : "text-white hover:text-violet-200"
          }`}
        >
          {nav.brand}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm transition-colors ${
                scrolled
                  ? "text-gray-500 hover:text-violet-600"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={nav.cta.href}
            className={`ml-4 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
              scrolled
                ? "bg-violet-600 text-white shadow-md shadow-violet-500/20 hover:bg-violet-700"
                : "bg-white text-zinc-900 font-semibold hover:bg-zinc-100"
            }`}
          >
            {nav.cta.label}
          </Link>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden ${scrolled ? "text-gray-600" : "text-white"}`}
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-violet-50 bg-white md:hidden"
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
              {nav.links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-sm font-medium text-gray-700 transition-colors hover:text-violet-600 border-b border-gray-50"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href={nav.cta.href}
                onClick={() => setMobileOpen(false)}
                className="mt-3 bg-violet-600 px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-violet-700"
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
