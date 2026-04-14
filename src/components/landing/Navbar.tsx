"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X } from "lucide-react";
import { content } from "@/lib/content";

const { nav } = content;

/* ------------------------------------------------------------------ */
/*  Scroll-spy hook                                                    */
/* ------------------------------------------------------------------ */

function useActiveSection(sectionIds: string[]): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

/* ------------------------------------------------------------------ */
/*  Logo                                                               */
/* ------------------------------------------------------------------ */

function EvavocLogo() {
  return (
    <div className="flex items-center gap-2.5">
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

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Only observe anchor sections (skip /security page link)
  const sectionIds = useMemo(
    () =>
      nav.links
        .map((l) => l.href)
        .filter((h) => h.startsWith("#"))
        .map((h) => h.slice(1)),
    []
  );

  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return; // let page links work normally
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#09090b]/95 backdrop-blur-xl ${
        scrolled ? "border-b border-white/[0.07]" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 h-[64px]">
        {/* Brand */}
        <Link href="/" className="group">
          <EvavocLogo />
        </Link>

        {/* Desktop nav */}
        <LayoutGroup>
          <nav className="hidden items-center md:flex">
            {nav.links.map((link) => {
              const isActive =
                link.href.startsWith("#") &&
                link.href.slice(1) === activeSection;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative px-4 py-2 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-violet-500"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </LayoutGroup>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href={nav.cta.href}
            onClick={(e) => handleNavClick(e, nav.cta.href)}
            className="px-5 py-2.5 text-[13px] font-semibold bg-violet-600 text-white transition-colors duration-200 hover:bg-violet-500 select-none btn-shine cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            {nav.cta.label}
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white/60 hover:text-white transition-colors p-2 -mr-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
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
              {nav.links.map((link, i) => {
                const isActive =
                  link.href.startsWith("#") &&
                  link.href.slice(1) === activeSection;

                return (
                  <motion.div
                    key={link.href}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`block py-3 text-[14px] font-medium transition-colors border-b border-white/[0.05] ${
                        isActive
                          ? "text-white border-l-2 border-l-violet-500 pl-3"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                href={nav.cta.href}
                onClick={(e) => handleNavClick(e, nav.cta.href)}
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
