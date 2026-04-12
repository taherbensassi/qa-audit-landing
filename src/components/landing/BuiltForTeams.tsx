"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { CheckCircle, Users, Shield } from "lucide-react";

const qaManagerPoints = [
  "Surveillez 100% des appels — pas seulement 2%",
  "Identifiez automatiquement les opportunités de coaching",
  "Suivez la progression des agents avec des données concrètes",
  "Exportez des rapports d'audit en un clic",
];

const compliancePoints = [
  "Vérifiez l'adhérence au script sur chaque appel",
  "Signalez les violations réglementaires en temps réel",
  "Générez des pistes d'audit conformité automatiquement",
  "Traçabilité complète conforme au RGPD",
];

export function BuiltForTeams() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-[#09090b] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          variants={fadeInUp}
          className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-400"
        >
          Conçu pour votre équipe
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="mb-4 max-w-3xl text-3xl font-bold tracking-tight text-white lg:text-4xl"
          style={{ lineHeight: 1.2 }}
        >
          L'IA gère le volume.
          <br />
          <span className="text-violet-400">Votre expertise pilote la qualité.</span>
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="mb-16 max-w-2xl text-base text-zinc-400"
        >
          Nous ne remplaçons pas votre équipe QA — nous lui donnons des super-pouvoirs. Vos auditeurs définissent les standards, calibrent l'IA et ont le dernier mot. La plateforme s'assure que rien ne passe entre les mailles.
        </motion.p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* QA Managers */}
          <motion.div
            variants={fadeInLeft}
            className="border border-white/[0.06] bg-white/[0.02] p-8 lg:p-10"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-violet-500/10">
                <Users size={20} className="text-violet-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-white">Pour les Responsables QA</h3>
            </div>
            <ul className="space-y-4">
              {qaManagerPoints.map((point, i) => (
                <motion.li
                  key={point}
                  className="flex items-start gap-3 text-sm text-zinc-300"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-violet-400" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Compliance Officers */}
          <motion.div
            variants={fadeInRight}
            className="border border-white/[0.06] bg-white/[0.02] p-8 lg:p-10"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-indigo-500/10">
                <Shield size={20} className="text-indigo-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-white">Pour les Compliance Officers</h3>
            </div>
            <ul className="space-y-4">
              {compliancePoints.map((point, i) => (
                <motion.li
                  key={point}
                  className="flex items-start gap-3 text-sm text-zinc-300"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0 text-indigo-400" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
