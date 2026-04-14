"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { content } from "@/lib/content";
import { staggerContainer } from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import { AppPreview } from "@/components/ui/AppPreview";
import { HeroNetwork } from "./HeroNetwork";

const { hero } = content;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const networkY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const networkOpacity = useTransform(scrollYProgress, [0, 0.6], [0.6, 0]);

  const lines = hero.headline.split("\n");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[var(--dark-bg)] pt-32 pb-0"
    >
      {/* Animated network background */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ y: networkY, opacity: networkOpacity }}
      >
        <HeroNetwork />
      </motion.div>

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 45% 25%, rgba(124,58,237,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 55% 35%, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute top-[15%] left-[20%] w-[350px] h-[350px] bg-violet-600/15 blur-[120px] keep-round animate-orb-1" />
        <div className="absolute top-[25%] right-[15%] w-[300px] h-[300px] bg-indigo-500/12 blur-[100px] keep-round animate-orb-2" />
        <div className="absolute top-[10%] left-[50%] w-[250px] h-[250px] bg-violet-400/10 blur-[110px] keep-round animate-orb-3" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[var(--dark-bg)]/40 via-transparent to-[var(--dark-bg)]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          custom={0.1}
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 bg-violet-500 keep-round animate-pulse" />
          <span className="font-mono text-xs tracking-wider uppercase text-zinc-400">
            {hero.label}
          </span>
        </motion.div>

        {/* Headline — fast fade-in, no per-letter animation */}
        <motion.h1
          custom={0.2}
          variants={fadeUp}
          className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl"
          style={{ lineHeight: 1.08 }}
        >
          <span>{lines[0]}</span>
          <br />
          {lines[1] && (
            <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
              {lines[1]}
            </span>
          )}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={0.4}
          variants={fadeUp}
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          {hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={0.6}
          variants={fadeUp}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto"
        >
          <Button href={hero.cta.href} variant="primaryDark" size="lg" className="animate-pulse-glow btn-shine">
            <span className="flex items-center">
              {hero.cta.label}
              <ArrowRight
                size={16}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Button>
          <Button
            href={hero.secondaryCta.href}
            variant="secondaryDark"
            size="lg"
          >
            {hero.secondaryCta.label}
          </Button>
        </motion.div>
      </motion.div>

      {/* Platform preview */}
      <div className="relative z-10 mx-auto mt-16 sm:mt-24 max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative shadow-2xl shadow-black/50"
        >
          <AppPreview variant="dashboard" aspectRatio="16/9" />
        </motion.div>
      </div>

      {/* Fade to white */}
      <div className="relative z-10 h-32 bg-gradient-to-b from-[var(--dark-bg)] to-white" />
    </section>
  );
}
