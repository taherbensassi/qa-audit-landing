"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { content } from "@/lib/content";
import { staggerContainer } from "@/lib/animations";
import { ArrowRight, Headphones, BarChart3, Shield } from "lucide-react";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

const { hero } = content;

/* Letter-stagger animation for headline */
const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.6 + i * 0.025,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const fadeUpStagger = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

function StaggeredText({ text, startIndex = 0, className = "" }: { text: string; startIndex?: number; className?: string }) {
  return (
    <span className={className} style={{ perspective: 600 }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${startIndex + i}-${char}`}
          custom={startIndex + i}
          variants={letterVariants}
          className="inline-block"
          style={{ display: char === " " ? "inline" : "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const lines = hero.headline.split("\n");

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-gray-950 pt-32 pb-0">
      {/* 3D Globe Background */}
      <motion.div style={{ opacity: bgOpacity }}>
        <HeroScene />
      </motion.div>

      {/* Gradient overlays for depth */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-gray-950/60 via-transparent to-gray-950" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-gray-950/40 via-transparent to-gray-950/40" />

      {/* Animated grid lines background */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          custom={0.3}
          variants={fadeUpStagger}
          className="mb-6 inline-flex items-center gap-2 border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 backdrop-blur-md animate-pulse-glow"
        >
          <span className="h-1.5 w-1.5 bg-violet-400 keep-round animate-pulse" />
          <span className="font-mono text-xs tracking-wider uppercase text-violet-300">
            {hero.label}
          </span>
        </motion.div>

        {/* Headline with letter stagger */}
        <motion.h1
          initial="hidden"
          animate="visible"
          className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl"
          style={{ lineHeight: 1.05 }}
        >
          <StaggeredText text={lines[0]} startIndex={0} />
          <br />
          {lines[1] && (
            <StaggeredText
              text={lines[1]}
              startIndex={lines[0].length}
              className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
            />
          )}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={1.8}
          variants={fadeUpStagger}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400"
        >
          {hero.subheadline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={2.1}
          variants={fadeUpStagger}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href={hero.cta.href} size="lg">
            <span className="relative z-10 flex items-center">
              {hero.cta.label}
              <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary" size="lg">
            {hero.secondaryCta.label}
          </Button>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          custom={2.5}
          variants={fadeUpStagger}
          className="mt-12 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { icon: Headphones, label: "Call Analysis" },
            { icon: BarChart3, label: "Quality Scoring" },
            { icon: Shield, label: "Compliance" },
          ].map(({ icon: Icon, label }, i) => (
            <motion.span
              key={label}
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 text-xs text-gray-300 backdrop-blur-md"
            >
              <Icon size={14} className="text-violet-400" />
              {label}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Hero image with parallax */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="relative z-10 mx-auto mt-16 max-w-6xl px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden border border-violet-500/20 bg-gray-900/50 shadow-2xl shadow-violet-500/10 backdrop-blur-sm"
        >
          {/* Glow behind image */}
          <div className="absolute -inset-4 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent blur-xl" />
          {/* Animated border glow */}
          <div className="absolute inset-0 z-20 pointer-events-none border border-violet-400/10 animate-border-glow" />
          <Image
            src={hero.image}
            alt="Platform dashboard"
            width={1200}
            height={700}
            className="relative w-full"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade to next section */}
      <div className="relative z-10 h-32 bg-gradient-to-b from-gray-950 to-white" />
    </section>
  );
}
