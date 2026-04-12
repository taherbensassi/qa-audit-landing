"use client";

import { motion } from "framer-motion";
import { DemoPlaceholder } from "@/components/ui/DemoPlaceholder";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { Upload, BrainCircuit, ClipboardCheck, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Upload,
    title: "Importez vos appels",
    description:
      "Import en lot de fichiers audio ou connexion à votre système de téléphonie via notre API REST. Nous acceptons tous les formats — MP3, WAV, FLAC, OGG — dans toutes les langues. Temps réel ou batch, à vous de choisir.",
    image: "/images/product/dashboard.png",
    details: ["Support audio multi-format", "Import API & manuel", "Détection automatique des locuteurs"],
  },
  {
    num: "02",
    icon: BrainCircuit,
    title: "L'IA transcrit & analyse",
    description:
      "Notre pipeline LLM transcrit chaque appel avec diarisation des locuteurs, puis évalue la conversation selon votre grille d'évaluation — chaque thème, chaque critère, chaque règle de conformité.",
    image: "/images/product/workflow.png",
    details: ["Transcription multi-langue", "Diarisation des locuteurs", "Pipeline automatisé en 10 étapes"],
  },
  {
    num: "03",
    icon: ClipboardCheck,
    title: "Revoyez & validez",
    description:
      "Assurance qualité avec l'humain au centre. Vos responsables QA revoient les évaluations IA, calibrent le scoring et valident les résultats. L'IA apprend de vos corrections au fil du temps.",
    image: "/images/product/evaltion.png",
    details: ["Comparaison côte à côte", "Système de calibration", "Piste d'audit"],
  },
  {
    num: "04",
    icon: BarChart3,
    title: "Agissez sur les insights",
    description:
      "Identifiez les opportunités de coaching, suivez les tendances de performance des agents et exportez des rapports de conformité prêts pour l'audit. Votre équipe se concentre sur l'amélioration — pas sur l'écoute.",
    image: "/images/product/dashboard.png",
    details: ["Analytics de distribution de scores", "Tendances performance agents", "Exports PDF & Excel"],
  },
];

export function HowItWorksContent() {
  return (
    <section className="bg-white pt-40 pb-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-6"
      >
        <motion.p
          variants={fadeInUp}
          className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-600"
        >
          Comment ça marche
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="mb-6 max-w-3xl text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl"
          style={{ lineHeight: 1.1 }}
        >
          De l'audio brut à l'insight actionnable
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mb-24 max-w-2xl text-lg text-gray-500"
        >
          Quatre étapes automatisées. Zéro écoute manuelle. Chaque appel évalué selon vos standards en moins de deux minutes.
        </motion.p>

        <div className="space-y-32">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
            >
              {/* Text side */}
              <motion.div
                variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
                className={i % 2 === 1 ? "lg:order-2" : ""}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center border-2 border-violet-200 bg-violet-50 font-mono text-sm font-bold text-violet-600">
                    {step.num}
                  </span>
                  <step.icon size={20} className="text-violet-500" strokeWidth={1.5} />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">
                  {step.title}
                </h2>
                <p className="mb-6 text-base leading-relaxed text-gray-500">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-gray-600">
                      <ArrowRight size={12} className="text-violet-400" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Image side */}
              <motion.div
                variants={i % 2 === 0 ? fadeInRight : fadeInLeft}
                className={i % 2 === 1 ? "lg:order-1" : ""}
              >
                <div className="overflow-hidden border border-gray-200 shadow-lg shadow-gray-200/50">
                  <DemoPlaceholder label={step.title} aspectRatio="16/10" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
