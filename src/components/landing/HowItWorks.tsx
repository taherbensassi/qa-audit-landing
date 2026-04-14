"use client";

import { motion } from "framer-motion";
import { clipReveal, tiltIn, springNumber, staggerSlow } from "@/lib/animations";
import { Upload, Brain, LineChart } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "Ingestion",
    description:
      "Importez vos appels ou connectez votre système de téléphonie via API. En lot ou en temps réel — nous traitons l'audio dans tous les formats et toutes les langues.",
  },
  {
    num: "02",
    icon: Brain,
    title: "Évaluation",
    description:
      "L'IA transcrit et analyse chaque appel selon vos grilles d'évaluation personnalisées. Chaque thème, chaque critère, chaque règle de conformité — noté en secondes.",
  },
  {
    num: "03",
    icon: LineChart,
    title: "Action",
    description:
      "Consultez les scores, identifiez les opportunités de coaching et exportez des rapports de conformité prêts pour l'audit. Votre équipe se concentre sur l'amélioration — pas sur l'écoute.",
  },
];

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
          Comment ça marche
        </motion.p>
        <motion.h2
          variants={clipReveal}
          className="mb-20 max-w-2xl text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl"
          style={{ lineHeight: 1.2 }}
        >
          De l'audio brut à l'insight actionnable
          <br />
          <span className="text-gray-400">en trois étapes</span>
        </motion.h2>

        <div className="relative grid gap-12 md:grid-cols-3" style={{ perspective: 800 }}>
          {/* Connecting line with trailing glow */}
          <div className="pointer-events-none absolute top-16 left-[16.5%] right-[16.5%] hidden md:block">
            <motion.div
              className="h-px w-full bg-gradient-to-r from-violet-200 via-violet-300 to-violet-200"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Trailing glow dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-2 w-2 keep-round bg-violet-400 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
              initial={{ left: "0%", opacity: 0 }}
              whileInView={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              viewport={{ once: true }}
              transition={{
                delay: 0.5,
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={tiltIn}
              className="group relative text-center"
            >
              {/* Number badge — spring bounce */}
              <motion.div
                className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border-2 border-violet-200 bg-white text-lg font-bold text-violet-600 keep-round shadow-sm relative z-10"
                variants={springNumber}
              >
                {step.num}
              </motion.div>

              {/* Icon */}
              <motion.div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center bg-violet-50 transition-colors duration-300 group-hover:bg-violet-100"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.4 }}
              >
                <step.icon size={22} className="text-violet-600" strokeWidth={1.5} />
              </motion.div>

              <h3 className="mb-3 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
