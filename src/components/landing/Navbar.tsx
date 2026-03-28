"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { content } from "@/lib/content";

const { nav } = content;

/* Multi-level mega menu configuration */
const megaMenus: Record<string, { title: string; href: string; desc: string }[]> = {
  Platform: [
    { title: "Evaluation Engine", href: "#platform", desc: "AI-powered call scoring against your grilles" },
    { title: "Transcription", href: "#platform", desc: "Multi-language audio transcription" },
    { title: "Analytics Dashboard", href: "#platform", desc: "Real-time quality metrics and trends" },
    { title: "Compliance Reports", href: "#platform", desc: "Audit-ready regulatory documentation" },
  ],
  Features: [
    { title: "100% Call Coverage", href: "#features", desc: "Evaluate every conversation, not just 2%" },
    { title: "Custom Grilles", href: "#features", desc: "Your evaluation frameworks, your rules" },
    { title: "Human-in-the-Loop", href: "#features", desc: "AI handles volume, your team handles judgment" },
    { title: "Multi-Industry", href: "#features", desc: "Energy, telecom, insurance, banking" },
  ],
};

function MegaMenu({ items, onClose }: { items: typeof megaMenus[string]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] border border-gray-100 bg-white shadow-xl shadow-violet-100/10 p-2"
      onMouseLeave={onClose}
    >
      <div className="grid grid-cols-2 gap-1">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={onClose}
            className="group p-3 transition-colors hover:bg-violet-50"
          >
            <p className="text-sm font-medium text-gray-900 group-hover:text-violet-700 transition-colors">
              {item.title}
            </p>
            <p className="mt-0.5 text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMenuEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (megaMenus[label]) setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

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
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-violet-500/60 via-purple-400/40 to-indigo-500/60 origin-left"
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
          {nav.links.map((link) => {
            const hasMega = !!megaMenus[link.label];
            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => handleMenuEnter(link.label)}
                onMouseLeave={handleMenuLeave}
              >
                <Link
                  href={link.href}
                  className={`relative flex items-center gap-1 px-3 py-2 text-sm transition-colors ${
                    scrolled
                      ? "text-gray-500 hover:text-violet-600"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  {hasMega && (
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${activeMenu === link.label ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>

                {/* Mega menu dropdown */}
                <AnimatePresence>
                  {activeMenu === link.label && megaMenus[link.label] && (
                    <MegaMenu
                      items={megaMenus[link.label]}
                      onClose={() => setActiveMenu(null)}
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}

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
                <div key={link.href}>
                  <motion.div
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
                  {/* Mobile sub-links */}
                  {megaMenus[link.label] && (
                    <div className="pl-4 pb-2">
                      {megaMenus[link.label].map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-xs text-gray-400 hover:text-violet-600 transition-colors"
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
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
