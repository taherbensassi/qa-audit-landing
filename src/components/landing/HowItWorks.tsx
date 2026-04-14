"use client";

import { motion, useReducedMotion } from "framer-motion";
import { content } from "@/lib/content";
import { clipReveal, springNumber, staggerSlow, liftGlow } from "@/lib/animations";
import { getIcon } from "@/lib/icons";

const { howItWorks } = content;

const steps = howItWorks?.steps ?? [
  {
    title: "Connectez",
    description: "Importez vos appels ou connectez votre systeme de telephonie via API. En lot ou en temps reel — tous formats, toutes langues.",
    time: "< 30 min",
    icon: "Upload",
  },
  {
    title: "Evaluez",
    description: "L'IA transcrit et analyse chaque appel selon vos grilles d'evaluation. Chaque critere, chaque regle de conformite — note automatiquement.",
    time: "Temps reel",
    icon: "Brain",
  },
  {
    title: "Agissez",
    description: "Identifiez les opportunites de coaching, exportez des rapports prets pour l'audit. Votre equipe se concentre sur l'amelioration — pas sur l'ecoute.",
    time: "Instantane",
    icon: "TrendingUp",
  },
];

/* ------------------------------------------------------------------ */
/*  Data particles flowing along connecting line                       */
/* ------------------------------------------------------------------ */

function DataParticles() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  return (
    <>
      {[0, 1.2, 2.4, 3.6].map((delay, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 h-2 w-2 keep-round bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.6)]"
          initial={{ left: "0%", opacity: 0 }}
          whileInView={{
            left: ["0%", "100%"],
            opacity: [0, 1, 1, 0],
          }}
          viewport={{ once: false }}
          transition={{
            delay: 0.8 + delay,
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear",
          }}
        />
      ))}
    </>
  );
}

export function HowItWorks() {
  return (
    <motion.section
      variants={staggerSlow}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          variants={clipReveal}
          className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600"
        >
          {howItWorks?.label ?? "Comment ca marche"}
        </motion.p>
        <motion.h2
          variants={clipReveal}
          className="mb-20 max-w-2xl text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl"
          style={{ lineHeight: 1.1 }}
        >
          {(howItWorks?.headline ?? "Operationnel en 48h.\nSans changer vos processus.").split("\n").map((line: string, i: number) => (
            <span key={i}>
              {i === 0 ? line : <span className="text-gray-400">{line}</span>}
              {i === 0 && <br />}
            </span>
          ))}
        </motion.h2>

        <div className="relative grid gap-12 md:grid-cols-3" style={{ perspective: 1000 }}>
          {/* Connecting line with data particles */}
          <div className="pointer-events-none absolute top-16 left-[16.5%] right-[16.5%] hidden md:block">
            <motion.div
              className="h-px w-full bg-gradient-to-r from-violet-200 via-violet-300 to-violet-200"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Glow line underneath */}
            <motion.div
              className="absolute top-0 h-px w-full bg-gradient-to-r from-violet-400/0 via-violet-400/50 to-violet-400/0 blur-sm"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            <DataParticles />
          </div>

          {steps.map((step: { title: string; description: string; time?: string; icon: string }, i: number) => {
            const Icon = getIcon(step.icon);
            return (
              <motion.div
                key={step.title}
                variants={liftGlow}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                }}
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(124, 58, 237, 0.12)",
                  transition: { duration: 0.3 },
                }}
                className="group relative text-center bg-white border border-gray-100 p-8 transition-colors duration-300 hover:border-violet-200"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Top glow bar on hover */}
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-violet-400 to-indigo-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Number badge */}
                <motion.div
                  className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border-2 border-violet-200 bg-white text-lg font-bold text-violet-600 keep-round shadow-sm relative z-10"
                  variants={springNumber}
                  style={{ transform: "translateZ(20px)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.div>

                {/* Icon with 3D float */}
                <motion.div
                  className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-violet-50 transition-colors duration-300 group-hover:bg-violet-100"
                  style={{ transform: "translateZ(15px)" }}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon size={22} className="text-violet-600" strokeWidth={1.5} />
                </motion.div>

                <div style={{ transform: "translateZ(10px)" }}>
                  <h3 className="mb-2 text-lg font-bold text-gray-900 lg:text-xl">
                    {step.title}
                  </h3>

                  {/* Time badge */}
                  {step.time && (
                    <span className="mb-3 inline-block font-mono text-xs tracking-wider text-violet-600 bg-violet-50 px-2 py-0.5">
                      {step.time}
                    </span>
                  )}

                  <p className="text-sm leading-relaxed text-gray-500 lg:text-base">
                    {step.description}
                  </p>
                </div>

                {/* Bottom glow effect */}
                <motion.div
                  className="absolute -bottom-2 left-1/4 right-1/4 h-4 bg-violet-400/0 blur-xl transition-all duration-300 group-hover:bg-violet-400/20"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
