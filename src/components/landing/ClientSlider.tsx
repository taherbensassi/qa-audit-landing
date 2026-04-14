"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { Building2, Zap, Shield, Globe, BarChart3, BrainCircuit } from "lucide-react";

const industries = [
  { icon: Zap, label: "Énergie", delay: 0 },
  { icon: Globe, label: "Télécom", delay: 0.8 },
  { icon: Shield, label: "Assurance", delay: 1.6 },
  { icon: Building2, label: "Banque", delay: 2.4 },
  { icon: BarChart3, label: "Commerce", delay: 3.2 },
  { icon: BrainCircuit, label: "BPO", delay: 4.0 },
];

export function ClientSlider() {
  return (
    <section className="relative border-y border-gray-100 bg-white py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-50/20 via-transparent to-violet-50/20" />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400">
          Adopté par les leaders de l&apos;industrie
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Plus de 500 000 appels analysés dans 6+ secteurs
        </p>
      </motion.div>

      {/* 3D orbital ring of industry icons */}
      <div className="relative mx-auto h-48 w-full max-w-3xl overflow-hidden" style={{ perspective: 800 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Center badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", damping: 12 }}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            <div className="flex h-16 w-16 items-center justify-center border-2 border-violet-200 bg-violet-50">
              <Shield size={24} className="text-violet-600" strokeWidth={1.5} />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-violet-500">
              Multi-Industrie
            </span>
          </motion.div>
        </div>

        {/* Orbiting industry tags */}
        {industries.map((item, i) => {
          const angle = (i / industries.length) * 360;
          const radiusX = typeof window !== "undefined" && window.innerWidth < 640 ? 130 : 280;
          const radiusY = typeof window !== "undefined" && window.innerWidth < 640 ? 50 : 70;
          return (
            <motion.div
              key={item.label}
              className="absolute left-1/2 top-1/2"
              animate={{
                x: [
                  Math.cos(((angle) * Math.PI) / 180) * radiusX - 40,
                  Math.cos(((angle + 120) * Math.PI) / 180) * radiusX - 40,
                  Math.cos(((angle + 240) * Math.PI) / 180) * radiusX - 40,
                  Math.cos(((angle + 360) * Math.PI) / 180) * radiusX - 40,
                ],
                y: [
                  Math.sin(((angle) * Math.PI) / 180) * radiusY - 16,
                  Math.sin(((angle + 120) * Math.PI) / 180) * radiusY - 16,
                  Math.sin(((angle + 240) * Math.PI) / 180) * radiusY - 16,
                  Math.sin(((angle + 360) * Math.PI) / 180) * radiusY - 16,
                ],
                scale: [
                  1 + Math.sin(((angle) * Math.PI) / 180) * 0.15,
                  1 + Math.sin(((angle + 120) * Math.PI) / 180) * 0.15,
                  1 + Math.sin(((angle + 240) * Math.PI) / 180) * 0.15,
                  1 + Math.sin(((angle + 360) * Math.PI) / 180) * 0.15,
                ],
                opacity: [
                  0.5 + (1 + Math.sin(((angle) * Math.PI) / 180)) * 0.25,
                  0.5 + (1 + Math.sin(((angle + 120) * Math.PI) / 180)) * 0.25,
                  0.5 + (1 + Math.sin(((angle + 240) * Math.PI) / 180)) * 0.25,
                  0.5 + (1 + Math.sin(((angle + 360) * Math.PI) / 180)) * 0.25,
                ],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="flex items-center gap-2 border border-gray-100 bg-white px-3 py-2 shadow-sm transition-all duration-300 hover:border-violet-200 hover:shadow-md">
                <item.icon size={14} className="text-violet-500" strokeWidth={1.5} />
                <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
