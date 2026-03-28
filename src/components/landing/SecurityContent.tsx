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
    title: "Encryption at rest & in transit",
    description:
      "All data is encrypted using AES-256 at rest and TLS 1.3 in transit. Audio files, transcripts, and evaluation results are protected at every stage.",
  },
  {
    icon: KeyRound,
    title: "Role-based access control",
    description:
      "Fine-grained permissions ensure that each user only accesses the operations, clients, and data relevant to their role. Super Admin, Manager, and Agent tiers.",
  },
  {
    icon: Eye,
    title: "Audit logging",
    description:
      "Every action is logged with timestamps, user identity, and IP address. Full audit trail for regulatory compliance and internal investigations.",
  },
  {
    icon: Server,
    title: "Infrastructure isolation",
    description:
      "Each deployment runs in isolated infrastructure. No shared databases, no shared compute. Your data never touches another client's environment.",
  },
  {
    icon: Database,
    title: "Data residency",
    description:
      "Choose where your data lives. EU-hosted by default with GDPR-compliant data handling. Custom residency options available for enterprise.",
  },
  {
    icon: FileCheck,
    title: "GDPR compliant",
    description:
      "Built for European data protection regulations. Data minimization, right to erasure, processing agreements, and DPO support included.",
  },
  {
    icon: Users,
    title: "JWT authentication",
    description:
      "Secure stateless authentication with short-lived access tokens and refresh token rotation. No session data stored server-side.",
  },
  {
    icon: Globe,
    title: "API security",
    description:
      "Rate limiting, request validation, and CORS policies on all API endpoints. Swagger/OpenAPI documentation with security schemes.",
  },
  {
    icon: Shield,
    title: "Responsible AI",
    description:
      "AI evaluations are explainable — every score includes a justification. Human-in-the-loop validation ensures AI decisions are reviewed and calibrated.",
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
          className="mb-3 text-center font-mono text-xs tracking-widest uppercase text-violet-600"
        >
          Security
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl"
        >
          Security is not a feature.
          <br />
          <span className="text-gray-400">It is the foundation.</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mx-auto mb-20 max-w-2xl text-center text-lg text-gray-500"
        >
          We handle sensitive call recordings and compliance data. Our security architecture reflects that responsibility at every layer.
        </motion.p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeInUp}
              className="group border border-gray-100 p-6 transition-all duration-300 hover:border-violet-200 hover:bg-violet-50/30 hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center bg-violet-50 transition-colors group-hover:bg-violet-100">
                <p.icon size={18} className="text-violet-600" strokeWidth={1.5} />
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
