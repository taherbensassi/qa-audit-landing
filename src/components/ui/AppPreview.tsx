"use client";

import { motion } from "framer-motion";
import { Check, X, AlertCircle, ChevronRight, Search, Cpu } from "lucide-react";

export type AppPreviewVariant =
  | "dashboard"
  | "evaluations"
  | "grille"
  | "pipeline"
  | "compliance";

interface AppPreviewProps {
  variant: AppPreviewVariant;
  className?: string;
  aspectRatio?: string;
}

const variantTitles: Record<AppPreviewVariant, string> = {
  dashboard: "Tableau de bord",
  evaluations: "Évaluations",
  grille: "Grilles d'évaluation",
  pipeline: "Pipeline IA",
  compliance: "Conformité",
};

const evalRows = [
  { id: "#1028", agent: "M. Martin", score: 94, compliant: true },
  { id: "#1027", agent: "S. Dupont", score: 88, compliant: true },
  { id: "#1026", agent: "D. Bernard", score: 62, compliant: false },
  { id: "#1025", agent: "A. Moreau", score: 91, compliant: true },
  { id: "#1024", agent: "L. Petit", score: 78, compliant: null },
];

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80 ? "#10b981" : score >= 65 ? "#f97316" : "#ef4444";
  return (
    <div className="flex items-center gap-1.5 w-full">
      <div className="flex-1 h-[3px] bg-white/[0.06]">
        <motion.div
          className="h-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span className="font-mono text-[8px] text-white/40 w-6 text-right shrink-0">
        {score}%
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DASHBOARD                                                          */
/* ------------------------------------------------------------------ */

function DashboardContent() {
  const kpis = [
    { value: "98.2%", label: "Précision", up: true, delta: "+0.4%" },
    { value: "1 248", label: "Évaluations", up: true, delta: "+124" },
    { value: "87%", label: "Conformité", up: true, delta: "+3%" },
    { value: "01:52", label: "Durée moy.", up: false, delta: "-0:08" },
  ];
  const bars = [72, 78, 82, 79, 85, 88, 94];
  const days = ["L", "M", "M", "J", "V", "S", "D"];

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* KPI strip */}
      <div className="grid grid-cols-4 border-b border-white/[0.05] shrink-0">
        {kpis.map((k, i) => (
          <div
            key={k.label}
            className={`px-3 py-2 ${i < 3 ? "border-r border-white/[0.05]" : ""}`}
          >
            <div className="font-mono text-[13px] font-bold text-white leading-none">
              {k.value}
            </div>
            <div className="text-[7px] text-white/50 mt-1">{k.label}</div>
            <div
              className={`text-[7px] mt-0.5 font-mono ${k.up ? "text-emerald-400/70" : "text-emerald-400/70"}`}
            >
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Main two-col */}
      <div className="grid grid-cols-5 flex-1 min-h-0">
        {/* Chart */}
        <div className="col-span-2 p-3 border-r border-white/[0.05] flex flex-col">
          <div className="text-[7px] text-white/45 uppercase tracking-widest mb-2 font-mono">
            Score / semaine
          </div>
          <div className="flex items-end gap-[3px] flex-1">
            {bars.map((b, i) => (
              <motion.div
                key={i}
                className="flex-1 min-w-0"
                style={{
                  background:
                    i === bars.length - 1
                      ? "#7c3aed"
                      : "rgba(124,58,237,0.22)",
                }}
                initial={{ height: 0 }}
                animate={{ height: `${(b / 100) * 100}%` }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>
          <div className="flex gap-[3px] mt-1">
            {days.map((d, i) => (
              <span
                key={i}
                className="flex-1 text-center text-[9px] text-white/40"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Evals list */}
        <div className="col-span-3 p-3 flex flex-col overflow-hidden">
          <div className="text-[7px] text-white/45 uppercase tracking-widest mb-2 font-mono">
            Dernières évaluations
          </div>
          <div className="space-y-2 flex-1">
            {evalRows.slice(0, 4).map((row) => (
              <div key={row.id} className="flex items-center gap-2">
                <span className="font-mono text-[7px] text-white/45 w-9 shrink-0">
                  {row.id}
                </span>
                <span className="text-[8px] text-white/45 w-16 shrink-0 truncate">
                  {row.agent}
                </span>
                <ScoreBar score={row.score} />
                <span className="shrink-0">
                  {row.compliant === true && (
                    <Check
                      size={8}
                      className="text-emerald-400"
                      strokeWidth={2.5}
                    />
                  )}
                  {row.compliant === false && (
                    <X
                      size={8}
                      className="text-orange-400"
                      strokeWidth={2.5}
                    />
                  )}
                  {row.compliant === null && (
                    <AlertCircle size={8} className="text-yellow-400/60" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  EVALUATIONS                                                        */
/* ------------------------------------------------------------------ */

function EvaluationsContent() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Filter bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.05] shrink-0">
        <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] px-2 py-1 flex-1">
          <Search size={7} className="text-white/45" />
          <span className="text-[7px] text-white/45">Rechercher...</span>
        </div>
        {["Client ▾", "Statut ▾", "Période ▾"].map((f) => (
          <div
            key={f}
            className="text-[7px] text-white/50 px-2 py-1 border border-white/[0.06] whitespace-nowrap"
          >
            {f}
          </div>
        ))}
      </div>

      {/* Table header */}
      <div className="grid grid-cols-12 px-3 py-1.5 border-b border-white/[0.05] shrink-0">
        {[
          { label: "Appel", span: "col-span-2" },
          { label: "Agent", span: "col-span-3" },
          { label: "Score", span: "col-span-5" },
          { label: "Statut", span: "col-span-2" },
        ].map((h) => (
          <span
            key={h.label}
            className={`font-mono text-[9px] text-white/40 uppercase tracking-widest ${h.span}`}
          >
            {h.label}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-hidden">
        {evalRows.map((row, i) => (
          <motion.div
            key={row.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            className={`grid grid-cols-12 px-3 py-2 border-b border-white/[0.03] items-center ${
              row.compliant === false ? "bg-orange-500/[0.04]" : ""
            }`}
          >
            <span className="col-span-2 font-mono text-[7px] text-white/35">
              {row.id}
            </span>
            <span className="col-span-3 text-[8px] text-white/55 truncate">
              {row.agent}
            </span>
            <div className="col-span-5">
              <ScoreBar score={row.score} />
            </div>
            <div className="col-span-2 flex justify-end">
              {row.compliant === true && (
                <span className="font-mono text-[7px] text-emerald-400">
                  ✓ OK
                </span>
              )}
              {row.compliant === false && (
                <span className="font-mono text-[7px] text-orange-400">
                  ✗ NC
                </span>
              )}
              {row.compliant === null && (
                <span className="font-mono text-[7px] text-yellow-400/60">
                  ~ Rév.
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  GRILLE EDITOR                                                      */
/* ------------------------------------------------------------------ */

function GrilleContent() {
  const sections = [
    {
      name: "Accueil",
      weight: "15%",
      active: true,
      items: ["Salutation", "Identification"],
    },
    { name: "Découverte", weight: "25%", active: false, items: [] },
    { name: "Solution", weight: "35%", active: false, items: [] },
    { name: "Conformité", weight: "20%", active: false, items: [] },
    { name: "Clôture", weight: "5%", active: false, items: [] },
  ];

  return (
    <div className="grid grid-cols-5 flex-1 min-h-0">
      {/* Tree */}
      <div className="col-span-2 border-r border-white/[0.05] p-3 overflow-hidden">
        <div className="font-mono text-[9px] text-white/45 uppercase tracking-widest mb-2">
          Sections
        </div>
        <div className="space-y-0.5">
          {sections.map((s) => (
            <div key={s.name}>
              <div
                className={`flex items-center justify-between px-2 py-1.5 ${
                  s.active
                    ? "bg-violet-600/10 border-l border-violet-500"
                    : ""
                }`}
              >
                <span
                  className={`text-[8px] font-medium ${
                    s.active ? "text-white/80" : "text-white/30"
                  }`}
                >
                  {s.name}
                </span>
                <span className="font-mono text-[7px] text-white/45">
                  {s.weight}
                </span>
              </div>
              {s.active &&
                s.items.map((item) => (
                  <div
                    key={item}
                    className={`flex items-center gap-1 pl-4 py-1 ${
                      item === "Salutation" ? "bg-violet-500/10" : ""
                    }`}
                  >
                    <ChevronRight size={6} className="text-white/40 shrink-0" />
                    <span
                      className={`text-[7px] ${
                        item === "Salutation"
                          ? "text-violet-300/80"
                          : "text-white/50"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div className="col-span-3 p-3 flex flex-col gap-3">
        <div>
          <div className="font-mono text-[9px] text-white/45 uppercase tracking-widest mb-1.5">
            Item sélectionné
          </div>
          <div className="text-[9px] font-semibold text-white/75 mb-2">
            Salutation initiale
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div>
              <div className="text-[9px] text-white/45 mb-0.5">Poids</div>
              <div className="font-mono text-[8px] text-violet-400">5%</div>
            </div>
            <div>
              <div className="text-[9px] text-white/45 mb-0.5">Sévérité</div>
              <div className="font-mono text-[8px] text-white/40">Standard</div>
            </div>
          </div>
        </div>

        <div>
          <div className="font-mono text-[9px] text-white/45 uppercase tracking-widest mb-2">
            Niveaux
          </div>
          <div className="space-y-1.5">
            {[
              { label: "5 — Excellent", w: "100%", color: "#10b981" },
              { label: "4 — Très bien", w: "80%", color: "#10b981" },
              { label: "3 — Passable", w: "60%", color: "#f97316" },
              { label: "0 — Non réalisé", w: "0%", color: "#ef4444" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2">
                <div className="w-14 h-[3px] bg-white/[0.06] shrink-0">
                  <div
                    className="h-full"
                    style={{ width: l.w, background: l.color, opacity: 0.7 }}
                  />
                </div>
                <span className="text-[7px] text-white/30">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  PIPELINE                                                           */
/* ------------------------------------------------------------------ */

function PipelineContent() {
  const steps = [
    { num: "01", label: "Audio reçu", status: "done", detail: "MP3 · 04:32" },
    {
      num: "02",
      label: "Transcription",
      status: "done",
      detail: "Whisper · 97%",
    },
    {
      num: "03",
      label: "Évaluation IA",
      status: "active",
      detail: "MCP v2 · 78%",
    },
    {
      num: "04",
      label: "Rapport PDF",
      status: "pending",
      detail: "En attente",
    },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-0 p-3 gap-3">
      {/* Call meta */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="font-mono text-[7px] text-white/50 uppercase">
          Appel
        </span>
        <span className="font-mono text-[9px] text-violet-400">#1028</span>
        <span className="text-white/30">·</span>
        <span className="font-mono text-[8px] text-white/30">M. Martin</span>
        <span className="text-white/30">·</span>
        <span className="font-mono text-[8px] text-white/30">04:32</span>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-4 gap-1.5 shrink-0">
        {steps.map((step, i) => (
          <div key={step.num} className="relative">
            <div
              className={`p-2 border ${
                step.status === "done"
                  ? "border-emerald-400/20 bg-emerald-400/[0.04]"
                  : step.status === "active"
                    ? "border-violet-400/30 bg-violet-400/[0.06]"
                    : "border-white/[0.05]"
              }`}
            >
              <div className="font-mono text-[9px] text-white/45 mb-1">
                {step.num}
              </div>
              <div
                className={`text-[8px] font-medium mb-0.5 leading-tight ${
                  step.status === "done"
                    ? "text-emerald-400"
                    : step.status === "active"
                      ? "text-white/80"
                      : "text-white/45"
                }`}
              >
                {step.label}
              </div>
              <div className="text-[9px] text-white/45 truncate">
                {step.detail}
              </div>
            </div>
            <div
              className={`absolute -top-0.5 -right-0.5 h-2 w-2 keep-round border-2 border-[#080810] ${
                step.status === "done"
                  ? "bg-emerald-400"
                  : step.status === "active"
                    ? "bg-violet-400"
                    : "bg-white/10"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="mt-auto shrink-0">
        <div className="flex items-center justify-between mb-1">
          <span className="font-mono text-[7px] text-white/45 uppercase tracking-widest">
            Progression
          </span>
          <span className="font-mono text-[8px] text-violet-400">78%</span>
        </div>
        <div className="h-[3px] bg-white/[0.06]">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-600 to-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          >
            <Cpu size={7} className="text-violet-400/40" />
          </motion.div>
          <span className="font-mono text-[7px] text-white/45">
            Vérification conformité RGPD...
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  COMPLIANCE                                                         */
/* ------------------------------------------------------------------ */

function ComplianceContent() {
  const criteria = [
    { text: "Protocole d'accueil", weight: "0.15", pass: true },
    { text: "Vérification identité", weight: "0.25", pass: true },
    { text: "Solution proposée", weight: "0.20", pass: true },
    { text: "Mention RGPD obligatoire", weight: "0.30", pass: false },
    { text: "Clôture formelle", weight: "0.10", pass: true },
  ];

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Sub-header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.05] shrink-0">
        <span className="font-mono text-[7px] text-white/45 uppercase tracking-widest">
          Critères de conformité
        </span>
        <div className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 keep-round bg-orange-400" />
          <span className="font-mono text-[7px] text-orange-400">
            1 violation
          </span>
        </div>
      </div>

      {/* Criteria */}
      <div className="flex-1 overflow-hidden p-2 space-y-1">
        {criteria.map((c, i) => (
          <motion.div
            key={c.text}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.09 }}
            className={`flex items-center gap-2 px-2 py-2 ${
              !c.pass
                ? "bg-orange-500/[0.08] border border-orange-500/20"
                : ""
            }`}
          >
            {c.pass ? (
              <Check
                size={8}
                className="text-emerald-400 shrink-0"
                strokeWidth={2.5}
              />
            ) : (
              <X
                size={8}
                className="text-orange-400 shrink-0"
                strokeWidth={2.5}
              />
            )}
            <span
              className={`text-[8px] flex-1 ${
                c.pass ? "text-white/45" : "text-orange-300/90"
              }`}
            >
              {c.text}
            </span>
            <span className="font-mono text-[7px] text-white/40">
              {c.weight}
            </span>
            <span
              className={`font-mono text-[7px] uppercase shrink-0 ${
                c.pass ? "text-emerald-400/50" : "text-orange-400"
              }`}
            >
              {c.pass ? "✓" : "✗ ALERTE"}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Verdict */}
      <div className="px-3 py-2 border-t border-white/[0.05] bg-white/[0.01] shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <X size={9} className="text-orange-400" />
            <span className="text-[8px] font-semibold text-orange-400">
              NON-CONFORME
            </span>
          </div>
          <span className="font-mono text-[8px] text-white/30">
            Score :{" "}
            <span className="text-white/55">76.5%</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ROOT COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export function AppPreview({
  variant,
  className = "",
  aspectRatio = "16/9",
}: AppPreviewProps) {
  return (
    <div
      className={`relative bg-[#080810] border border-white/[0.08] overflow-hidden flex flex-col ${className}`}
      style={{ aspectRatio }}
    >
      {/* App chrome */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#0a0a14] border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-2">
          {/* Waveform logomark */}
          <div className="flex items-end gap-[2px] h-[12px]">
            <div className="w-[2.5px] h-[6px] bg-violet-500" />
            <div className="w-[2.5px] h-[11px] bg-violet-400" />
            <div className="w-[2.5px] h-[8px] bg-violet-500" />
          </div>
          <span className="font-bold text-[9px] text-white/50 tracking-tight leading-none">
            eva-voc
          </span>
          <span className="w-px h-3 bg-white/10 shrink-0" />
          <span className="text-[8px] text-white/50">
            {variantTitles[variant]}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-[5px] w-[5px] keep-round bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
            Live
          </span>
        </div>
      </div>

      {/* Variant content */}
      {variant === "dashboard" && <DashboardContent />}
      {variant === "evaluations" && <EvaluationsContent />}
      {variant === "grille" && <GrilleContent />}
      {variant === "pipeline" && <PipelineContent />}
      {variant === "compliance" && <ComplianceContent />}
    </div>
  );
}
