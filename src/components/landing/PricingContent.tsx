"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    name: "Starter",
    description: "Pour les équipes débutant le monitoring qualité IA",
    price: "Nous contacter",
    period: "",
    features: [
      "Jusqu'à 500 évaluations / mois",
      "1 opération",
      "1 grille d'évaluation",
      "Transcription & scoring IA",
      "Export de rapports PDF",
      "Support email",
    ],
    cta: "Commencer",
    highlighted: false,
  },
  {
    name: "Professionnel",
    description: "Pour les équipes QA en croissance avec plusieurs opérations",
    price: "Nous contacter",
    period: "",
    features: [
      "Jusqu'à 5 000 évaluations / mois",
      "Opérations illimitées",
      "Grilles & scripts illimités",
      "Moteur de critères de conformité",
      "Dashboard statistiques & analytics",
      "Accès API",
      "Calibration & few-shot learning",
      "Support prioritaire",
    ],
    cta: "Demander une démo",
    highlighted: true,
  },
  {
    name: "Entreprise",
    description: "Pour les grands centres d'appels avec exigences de conformité",
    price: "Sur mesure",
    period: "",
    features: [
      "Évaluations illimitées",
      "Espace multi-tenant",
      "Fine-tuning de modèles IA personnalisés",
      "Authentification SSO / SAML",
      "Infrastructure dédiée",
      "Garanties SLA",
      "Option de déploiement on-premise",
      "Account manager dédié",
    ],
    cta: "Contacter les ventes",
    highlighted: false,
  },
];

export function PricingContent() {
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
          Tarifs
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl"
        >
          Des offres qui s'adaptent à votre équipe
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mx-auto mb-20 max-w-2xl text-center text-lg text-gray-500"
        >
          Commencez par un pilote gratuit. Sans carte bancaire. Nous nous adaptons à votre méthodologie d'évaluation — pas l'inverse.
        </motion.p>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeInUp}
              className={`relative flex flex-col border p-8 ${
                plan.highlighted
                  ? "border-red-300 bg-red-50/30 shadow-lg shadow-red-100/50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-6 bg-red-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Le plus populaire
                </span>
              )}

              <div className="mb-8">
                <h3 className="mb-2 text-lg font-bold text-gray-900">{plan.name}</h3>
                <p className="mb-6 text-sm text-gray-500">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-gray-400">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={14} className="mt-0.5 shrink-0 text-red-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                href="#demo"
                variant={plan.highlighted ? "primary" : "secondary"}
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
