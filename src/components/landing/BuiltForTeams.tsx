"use client";

import { motion } from "framer-motion";
import { blurIn, fadeInLeft, fadeInRight, staggerContainer } from "@/lib/animations";
import { content } from "@/lib/content";
import { CheckCircle, Users, Shield } from "lucide-react";

const { builtForTeams } = content;

const teams = builtForTeams?.teams ?? [
  {
    title: "Responsables Qualité",
    icon: "Users",
    points: [
      "Surveillez 100% des appels — pas seulement 2%",
      "Identifiez automatiquement les besoins de coaching",
      "Suivez la progression des agents avec des données concrètes",
      "Exportez des rapports d'audit en un clic",
    ],
  },
  {
    title: "Compliance Officers",
    icon: "Shield",
    points: [
      "Vérifiez l'adhérence au script sur chaque appel",
      "Signalez les manquements réglementaires en temps réel",
      "Générez des rapports de conformité prêts pour l'audit",
      "Traçabilité complète, conforme RGPD",
    ],
  },
];

const iconMap: Record<string, typeof Users> = { Users, Shield };

export function BuiltForTeams() {
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="bg-[var(--dark-bg)] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          variants={blurIn}
          className="mb-3 font-mono text-xs tracking-widest uppercase text-violet-400"
        >
          {builtForTeams?.label ?? "Conçu pour votre équipe"}
        </motion.p>
        <motion.h2
          variants={blurIn}
          className="mb-4 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
          style={{ lineHeight: 1.1 }}
        >
          {(builtForTeams?.headline ?? "L'IA gère le volume.\nVotre expertise pilote la qualité.").split("\n").map((line: string, i: number) => (
            <span key={i}>
              {i === 0 ? line : <span className="text-violet-400">{line}</span>}
              {i === 0 && <br />}
            </span>
          ))}
        </motion.h2>
        <motion.p
          variants={blurIn}
          className="mb-16 max-w-2xl text-base text-white/70 lg:text-lg"
        >
          {builtForTeams?.subheadline ?? "Déployé en complément — jamais en remplacement. Vos auditeurs définissent les standards, calibrent l'IA et ont le dernier mot. La plateforme s'assure que rien ne passe entre les mailles."}
        </motion.p>

        <div className="grid gap-8 lg:grid-cols-2">
          {teams.map((team: { title: string; icon: string; points: string[] }, teamIdx: number) => {
            const TeamIcon = iconMap[team.icon] ?? Users;
            const variant = teamIdx === 0 ? fadeInLeft : fadeInRight;
            const accentColor = teamIdx === 0 ? "violet" : "indigo";
            return (
              <motion.div
                key={team.title}
                variants={variant}
                className={`border border-white/[0.06] bg-white/[0.02] p-8 lg:p-10 hover:border-${accentColor}-500/20 transition-colors duration-500`}
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center bg-${accentColor}-500/10`}>
                    <TeamIcon size={20} className={`text-${accentColor}-400`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-white lg:text-xl">{team.title}</h3>
                </div>
                <ul className="space-y-4">
                  {team.points.map((point: string, i: number) => (
                    <motion.li
                      key={point}
                      className="flex items-start gap-3 text-sm text-zinc-300 lg:text-base"
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.12 }}
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: [0, 1.3, 1] }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.12, duration: 0.3 }}
                      >
                        <CheckCircle size={16} className={`mt-0.5 flex-shrink-0 text-${accentColor}-400`} />
                      </motion.span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
