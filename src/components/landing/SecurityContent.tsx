"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import {
  Shield,
  Lock,
  Eye,
  Server,
  FileCheck,
  Users,
  KeyRound,
  Database,
  Globe,
} from "lucide-react";

const principles = [
  {
    icon: Lock,
    title: "Chiffrement au repos & en transit",
    description:
      "Toutes les données sont chiffrées en AES-256 au repos et TLS 1.3 en transit. Fichiers audio, transcriptions et résultats d'évaluation sont protégés à chaque étape.",
  },
  {
    icon: KeyRound,
    title: "Contrôle d'accès par rôle",
    description:
      "Des permissions granulaires garantissent que chaque utilisateur n'accède qu'aux opérations, clients et données pertinents pour son rôle. Niveaux Super Admin, Manager et Agent.",
  },
  {
    icon: Eye,
    title: "Journalisation d'audit",
    description:
      "Chaque action est enregistrée avec horodatage, identité utilisateur et adresse IP. Piste d'audit complète pour la conformité réglementaire et les investigations internes.",
  },
  {
    icon: Server,
    title: "Isolation d'infrastructure",
    description:
      "Chaque déploiement tourne sur une infrastructure isolée. Pas de base de données partagée, pas de calcul partagé. Vos données ne touchent jamais l'environnement d'un autre client.",
  },
  {
    icon: Database,
    title: "Résidence des données",
    description:
      "Choisissez où vivent vos données. Hébergement UE par défaut avec traitement conforme au RGPD. Options de résidence personnalisées pour les entreprises.",
  },
  {
    icon: FileCheck,
    title: "Conforme au RGPD",
    description:
      "Conçu pour les réglementations européennes de protection des données. Minimisation des données, droit à l'effacement, accords de traitement et support DPO inclus.",
  },
  {
    icon: Users,
    title: "Authentification JWT",
    description:
      "Authentification stateless sécurisée avec tokens d'accès à durée de vie courte et rotation des refresh tokens. Aucune donnée de session stockée côté serveur.",
  },
  {
    icon: Globe,
    title: "Sécurité API",
    description:
      "Rate limiting, validation des requêtes et politiques CORS sur tous les endpoints API. Documentation Swagger/OpenAPI avec schémas de sécurité.",
  },
  {
    icon: Shield,
    title: "IA Responsable",
    description:
      "Les évaluations IA sont explicables — chaque score inclut une justification. La validation humaine garantit que les décisions IA sont revues et calibrées.",
  },
];

export function SecurityContent() {
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
          className="mb-3 text-center font-mono text-xs tracking-widest uppercase text-red-600"
        >
          Sécurité
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl"
        >
          La sécurité n'est pas une fonctionnalité.
          <br />
          <span className="text-gray-400">C'est le fondement.</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mx-auto mb-20 max-w-2xl text-center text-lg text-gray-500"
        >
          Nous traitons des enregistrements d'appels sensibles et des données de conformité. Notre architecture de sécurité reflète cette responsabilité à chaque niveau.
        </motion.p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeInUp}
              className="group border border-gray-100 p-6 transition-all duration-300 hover:border-red-200 hover:bg-red-50/30 hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center bg-red-50 transition-colors group-hover:bg-red-100">
                <p.icon size={18} className="text-red-600" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-gray-900">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
