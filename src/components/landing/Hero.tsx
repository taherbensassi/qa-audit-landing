"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { content } from "@/lib/content";
import { staggerContainer } from "@/lib/animations";
import {
  ArrowRight,
  BrainCircuit,
  Network,
  Layers,
  Zap,
  Lock,
  Activity,
} from "lucide-react";
import { HeroWorkflow } from "./HeroWorkflow";
import { HeroNetwork } from "./HeroNetwork";

const { hero } = content;

const letterVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.4 + i * 0.02,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const fadeUpStagger = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function StaggeredText({
  text,
  startIndex = 0,
  className = "",
}: {
  text: string;
  startIndex?: number;
  className?: string;
}) {
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

/* Floating tech orbitals */
const orbitals = [
  { icon: BrainCircuit, label: "Moteur LLM", x: "5%", y: "22%", delay: 0.5, accent: true },
  { icon: Network, label: "Protocole MCP", x: "88%", y: "18%", delay: 1.0, accent: false },
  { icon: Layers, label: "Multi-modèle", x: "3%", y: "65%", delay: 1.5, accent: false },
  { icon: Zap, label: "Temps réel", x: "92%", y: "58%", delay: 2.0, accent: true },
  { icon: Lock, label: "SOC2", x: "12%", y: "45%", delay: 2.5, accent: false },
  { icon: Activity, label: "Streaming", x: "82%", y: "40%", delay: 3.0, accent: false },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const networkY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const networkOpacity = useTransform(scrollYProgress, [0, 0.6], [0.6, 0]);
  const orbitalY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const workflowY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const lines = hero.headline.split("\n");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#09090b] pt-32 pb-0"
    >
      {/* Animated network background — deepest parallax layer */}
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

      {/* Radial glow center — red + violet layers */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 45% 25%, rgba(220,38,38,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 55% 35%, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#09090b]/40 via-transparent to-[#09090b]" />

      {/* Floating tech orbitals — mid parallax layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
        style={{ y: orbitalY }}
      >
        {orbitals.map((orb) => (
          <motion.div
            key={orb.label}
            className="absolute flex items-center gap-1.5"
            style={{ left: orb.x, top: orb.y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.25, 0.15, 0.25],
              scale: 1,
              y: [0, -6, 0, 6, 0],
            }}
            transition={{
              delay: orb.delay + 1,
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className={`flex h-6 w-6 items-center justify-center border backdrop-blur-sm ${orb.accent ? "border-red-500/15 bg-red-500/5" : "border-violet-500/10 bg-violet-500/5"}`}>
              <orb.icon size={10} className={orb.accent ? "text-red-400/60" : "text-violet-400/50"} />
            </div>
            <span className={`font-mono text-[8px] uppercase tracking-widest ${orb.accent ? "text-red-400/35" : "text-violet-400/30"}`}>
              {orb.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          custom={0.2}
          variants={fadeUpStagger}
          className="mb-6 inline-flex items-center gap-2 border border-white/[0.06] bg-white/[0.02] px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 bg-red-500 keep-round animate-pulse" />
          <span className="font-mono text-xs tracking-wider uppercase text-zinc-500">
            {hero.label}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl"
          style={{ lineHeight: 1.05 }}
        >
          <StaggeredText text={lines[0]} startIndex={0} />
          <br />
          {lines[1] && (
            <StaggeredText
              text={lines[1]}
              startIndex={lines[0].length}
              className="bg-gradient-to-r from-red-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent"
            />
          )}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={1.2}
          variants={fadeUpStagger}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400"
        >
          {hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={1.5}
          variants={fadeUpStagger}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto"
        >
          <Button href={hero.cta.href} variant="primaryDark" size="lg">
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

        {/* Workflow animation — own parallax layer */}
        <motion.div
          custom={1.8}
          variants={fadeUpStagger}
          className="mt-20"
          style={{ y: workflowY }}
        >
          <HeroWorkflow />
        </motion.div>
      </motion.div>

      {/* Hero dashboard image with parallax */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="relative z-10 mx-auto mt-12 sm:mt-20 max-w-6xl px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden border border-white/[0.08] bg-[#111113]/80 shadow-2xl shadow-black/40 backdrop-blur-sm"
        >
          {/* Glow corners */}
          <span className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-red-500/30 to-transparent" />
          <span className="absolute top-0 left-0 h-16 w-px bg-gradient-to-b from-red-500/30 to-transparent" />
          <span className="absolute bottom-0 right-0 w-16 h-px bg-gradient-to-l from-indigo-500/30 to-transparent" />
          <span className="absolute bottom-0 right-0 h-16 w-px bg-gradient-to-t from-indigo-500/30 to-transparent" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/product/dashboard.png"
            alt="Platform dashboard"
            width={1200}
            height={700}
            className="relative w-full"
          />
        </motion.div>
      </motion.div>

      {/* Fade to white */}
      <div className="relative z-10 h-32 bg-gradient-to-b from-[#09090b] to-white" />
    </section>
  );
}
