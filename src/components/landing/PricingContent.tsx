"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

const plans = [
  {
    name: "Starter",
    description: "For teams starting with AI quality monitoring",
    price: "Contact us",
    period: "",
    features: [
      "Up to 500 evaluations / month",
      "1 operation",
      "1 evaluation grille",
      "AI transcription & scoring",
      "PDF report export",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    description: "For growing QA teams with multiple operations",
    price: "Contact us",
    period: "",
    features: [
      "Up to 5,000 evaluations / month",
      "Unlimited operations",
      "Unlimited grilles & scripts",
      "Compliance criteria engine",
      "Statistics & analytics dashboard",
      "API access",
      "Calibration & few-shot learning",
      "Priority support",
    ],
    cta: "Request a Demo",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For large call centers with compliance requirements",
    price: "Custom",
    period: "",
    features: [
      "Unlimited evaluations",
      "Multi-tenant workspace",
      "Custom AI model fine-tuning",
      "SSO / SAML authentication",
      "Dedicated infrastructure",
      "SLA guarantees",
      "On-premise deployment option",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
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
          className="mb-3 text-center font-mono text-xs tracking-widest uppercase text-violet-600"
        >
          Pricing
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl"
        >
          Plans that scale with your team
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mx-auto mb-20 max-w-2xl text-center text-lg text-gray-500"
        >
          Start with a free pilot. No credit card required. We adapt to your evaluation methodology — not the other way around.
        </motion.p>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeInUp}
              className={`relative flex flex-col border p-8 ${
                plan.highlighted
                  ? "border-violet-300 bg-violet-50/30 shadow-lg shadow-violet-100/50"
                  : "border-gray-200 bg-white"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-6 bg-violet-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  Most Popular
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
                    <Check size={14} className="mt-0.5 shrink-0 text-violet-500" />
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
