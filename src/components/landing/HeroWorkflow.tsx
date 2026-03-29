"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  animate,
} from "framer-motion";
import {
  Mic,
  FileText,
  ClipboardCheck,
  BarChart3,
  Check,
  X,
  Cpu,
  Braces,
  Workflow,
  Network,
  BrainCircuit,
  ScanSearch,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const steps = [
  {
    icon: Mic,
    num: "01",
    label: "Capture Vocale",
    desc: "Ingestion audio multi-canal",
    color: "#ef4444",
    tags: ["WebRTC", "PCM 16-bit"],
    depth: 0,
  },
  {
    icon: BrainCircuit,
    num: "02",
    label: "Transcription IA",
    desc: "Pipeline neural parole-texte",
    color: "#dc2626",
    tags: ["Whisper v4", "Diarisation"],
    depth: 12,
  },
  {
    icon: Network,
    num: "03",
    label: "Évaluation MCP",
    desc: "Moteur protocole multi-critères",
    color: "#7c3aed",
    tags: ["MCP v2", "NLP"],
    depth: -8,
  },
  {
    icon: BarChart3,
    num: "04",
    label: "Score Neural",
    desc: "Synthèse verdict conformité",
    color: "#6366f1",
    tags: ["RAG", "Vector DB"],
    depth: 6,
  },
];

/* Floating tech labels that orbit around the workflow */
const floatingTech = [
  { label: "LLM", x: "-4%", y: "15%", delay: 0, red: true },
  { label: "MCP", x: "102%", y: "20%", delay: 0.8, red: false },
  { label: "NLP", x: "8%", y: "90%", delay: 1.6, red: false },
  { label: "RAG", x: "92%", y: "85%", delay: 2.4, red: false },
  { label: "ASR", x: "50%", y: "-8%", delay: 0.4, red: true },
  { label: "OIDC", x: "30%", y: "105%", delay: 1.2, red: false },
  { label: "gRPC", x: "70%", y: "105%", delay: 2.0, red: false },
];

/* ------------------------------------------------------------------ */
/*  Step 1 — Audio Waveform                                            */
/* ------------------------------------------------------------------ */

const BAR_COUNT = 16;
const barKeyframes = [
  [0.3, 0.9, 0.5, 1.0, 0.4],
  [0.5, 1.0, 0.3, 0.8, 0.6],
  [0.4, 0.7, 1.0, 0.5, 0.3],
  [0.8, 0.4, 0.6, 1.0, 0.5],
  [0.3, 1.0, 0.7, 0.4, 0.8],
  [0.6, 0.3, 0.9, 0.5, 1.0],
  [1.0, 0.5, 0.3, 0.7, 0.6],
  [0.4, 0.8, 1.0, 0.3, 0.5],
  [0.7, 0.3, 0.5, 1.0, 0.4],
  [0.5, 1.0, 0.4, 0.6, 0.8],
  [0.3, 0.6, 0.8, 1.0, 0.5],
  [0.9, 0.4, 0.7, 0.3, 1.0],
  [0.5, 0.8, 0.3, 1.0, 0.6],
  [0.4, 1.0, 0.6, 0.5, 0.3],
  [0.7, 0.5, 1.0, 0.3, 0.8],
  [0.3, 0.8, 0.4, 1.0, 0.5],
];
const barDurations = [
  0.45, 0.55, 0.38, 0.62, 0.42, 0.58, 0.35, 0.65, 0.48, 0.52, 0.4, 0.6,
  0.44, 0.56, 0.5, 0.42,
];

function AudioWaveform({ startDelay }: { startDelay: number }) {
  return (
    <div className="flex items-end justify-center gap-[2px] h-10">
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <motion.div
          key={i}
          className="w-[2.5px]"
          style={{
            originY: 1,
            height: 34,
            background: `linear-gradient(to top, ${
              i < BAR_COUNT / 2 ? "#a78bfa" : "#818cf8"
            }, transparent)`,
          }}
          initial={{ scaleY: 0.1, opacity: 0 }}
          animate={{
            scaleY: barKeyframes[i],
            opacity: [0.5, 0.9, 0.6, 1.0, 0.5],
          }}
          transition={{
            delay: startDelay + i * 0.025,
            duration: barDurations[i],
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 2 — LLM Transcription Typewriter                              */
/* ------------------------------------------------------------------ */

const transcriptLines = [
  "▸ speaker_0: Bonjour, je vous appelle...",
  "▸ speaker_1: Oui, votre contrat n°4829...",
  "▸ speaker_0: Merci de patienter...",
  "⚡ confidence: 0.97 | lang: fr-FR",
];

function TranscriptionTypewriter({ startDelay }: { startDelay: number }) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    let charIndex = 0;
    const line = transcriptLines[lineIndex];
    if (!line) {
      timeoutRef.current = setTimeout(() => {
        setLines([]);
        setCurrentLine("");
        setLineIndex(0);
      }, 2000);
      return () => clearTimeout(timeoutRef.current);
    }

    const tick = () => {
      charIndex++;
      setCurrentLine(line.slice(0, charIndex));
      if (charIndex < line.length) {
        timeoutRef.current = setTimeout(tick, 30);
      } else {
        timeoutRef.current = setTimeout(() => {
          setLines((prev) => [...prev, line]);
          setCurrentLine("");
          setLineIndex((prev) => prev + 1);
        }, 300);
      }
    };
    timeoutRef.current = setTimeout(tick, 50);
    return () => clearTimeout(timeoutRef.current);
  }, [started, lineIndex]);

  return (
    <div className="h-[60px] overflow-hidden bg-black/30 px-2 py-1.5 border border-violet-500/10 font-mono">
      <div className="flex items-center gap-1 mb-1 opacity-40">
        <Cpu size={8} className="text-red-400" />
        <span className="text-[7px] text-red-400 uppercase tracking-widest">
          llm.transcrire()
        </span>
      </div>
      {lines.map((l, i) => (
        <p key={i} className="text-[8px] leading-[12px] text-white/35 truncate">
          {l}
        </p>
      ))}
      {currentLine && (
        <p className="text-[8px] leading-[12px] text-white/70">
          {currentLine}
          <motion.span
            className="inline-block ml-px text-violet-400"
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            █
          </motion.span>
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 3 — MCP Evaluation Checklist                                  */
/* ------------------------------------------------------------------ */

const checklistItems = [
  { text: "Protocole d'accueil", pass: true, weight: "0.15" },
  { text: "Vérification identité", pass: true, weight: "0.25" },
  { text: "Solution proposée", pass: true, weight: "0.20" },
  { text: "Conformité RGPD", pass: false, weight: "0.30" },
  { text: "Clôture d'appel", pass: true, weight: "0.10" },
];

function EvaluationChecklist({ startDelay }: { startDelay: number }) {
  return (
    <div className="space-y-[5px]">
      <div className="flex items-center gap-1 mb-1.5 opacity-40">
        <ScanSearch size={8} className="text-violet-400" />
        <span className="font-mono text-[7px] text-violet-400 uppercase tracking-widest">
          mcp.évaluer()
        </span>
      </div>
      {checklistItems.map((item, i) => (
        <motion.div
          key={item.text}
          className="flex items-center gap-1.5"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: startDelay + i * 0.4, duration: 0.4, ease: EASE }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.4, 1] }}
            transition={{
              delay: startDelay + i * 0.4 + 0.15,
              duration: 0.3,
            }}
          >
            {item.pass ? (
              <Check size={9} className="text-emerald-400" strokeWidth={3} />
            ) : (
              <X size={9} className="text-red-400" strokeWidth={3} />
            )}
          </motion.span>
          <span
            className={`text-[8px] leading-none flex-1 ${
              item.pass ? "text-white/50" : "text-red-400/80"
            }`}
          >
            {item.text}
          </span>
          <span className="font-mono text-[7px] text-white/20">
            w:{item.weight}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 4 — Neural Score Ring                                         */
/* ------------------------------------------------------------------ */

const RING_RADIUS = 26;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const TARGET_SCORE = 94.2;

function ScoreRing({ startDelay }: { startDelay: number }) {
  const progress = useMotionValue(0);
  const dashOffset = useTransform(
    progress,
    [0, 1],
    [RING_CIRCUMFERENCE, RING_CIRCUMFERENCE * (1 - TARGET_SCORE / 100)]
  );
  const displayValue = useTransform(progress, [0, 1], [0, TARGET_SCORE]);
  const [display, setDisplay] = useState("0.0");
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (v) => {
      setDisplay(v.toFixed(1));
    });
    return unsubscribe;
  }, [displayValue]);

  useEffect(() => {
    const controls = animate(progress, 1, {
      delay: startDelay,
      duration: 2.2,
      ease: EASE,
      onComplete: () => {
        setTimeout(() => setShowBadge(true), 300);
      },
    });
    return controls.stop;
  }, [startDelay, progress]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[60px] h-[60px]">
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-[-4px] keep-round"
          animate={{
            boxShadow: [
              "0 0 0px rgba(167,139,250,0)",
              "0 0 20px rgba(167,139,250,0.15)",
              "0 0 0px rgba(167,139,250,0)",
            ],
          }}
          transition={{
            delay: startDelay + 1,
            duration: 3,
            repeat: Infinity,
          }}
        />
        <svg viewBox="0 0 60 60" className="w-full h-full">
          <circle
            cx="30"
            cy="30"
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="3"
          />
          <motion.circle
            cx="30"
            cy="30"
            r={RING_RADIUS}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="3"
            strokeLinecap="butt"
            strokeDasharray={RING_CIRCUMFERENCE}
            style={{ strokeDashoffset: dashOffset }}
            transform="rotate(-90 30 30)"
          />
          <defs>
            <linearGradient
              id="scoreGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[13px] font-bold text-white tabular-nums">
            {display}%
          </span>
        </div>
      </div>
      <motion.div
        className="mt-2 flex items-center gap-1"
        initial={{ opacity: 0, y: 5 }}
        animate={showBadge ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <ShieldCheck size={10} className="text-emerald-400" />
        <span className="font-mono text-[8px] uppercase tracking-widest text-emerald-400">
          Conforme
        </span>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Flowing Dots (connector between cards)                             */
/* ------------------------------------------------------------------ */

function FlowingDots({ delay }: { delay: number }) {
  return (
    <div className="hidden lg:flex items-center mx-1 xl:mx-2 relative w-10 xl:w-16 h-8 shrink-0">
      <motion.div
        className="absolute top-1/2 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, rgba(167,139,250,0.3), rgba(99,102,241,0.3))",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay, duration: 0.5, ease: EASE }}
      />
      {[0, 0.7, 1.4].map((offset) => (
        <motion.div
          key={offset}
          className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 keep-round bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]"
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{
            delay: delay + 0.3 + offset,
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "linear",
          }}
        />
      ))}
      <motion.svg
        viewBox="0 0 6 10"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-2.5 text-violet-400/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3 }}
      >
        <path
          d="M0 0 L6 5 L0 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </motion.svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Vertical connector (mobile / tablet)                               */
/* ------------------------------------------------------------------ */

function VerticalConnector({ delay }: { delay: number }) {
  return (
    <div className="flex lg:hidden items-center justify-center relative w-8 h-10">
      <motion.div
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/30 to-indigo-500/30"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay, duration: 0.4, ease: EASE }}
        style={{ originY: 0 }}
      />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 h-1.5 w-1.5 keep-round bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.5)]"
        initial={{ top: "0%", opacity: 0 }}
        animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
        transition={{
          delay: delay + 0.4,
          duration: 1.2,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3D Tilt Card wrapper                                               */
/* ------------------------------------------------------------------ */

function TiltCard({
  children,
  className = "",
  depth = 0,
  enterDelay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  enterDelay?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 16 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 16 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      rotateY.set(((x - centerX) / centerX) * 12);
      rotateX.set(((centerY - y) / centerY) * 12);
    },
    [rotateX, rotateY]
  );

  const handleLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.8, rotateX: -15 }}
      animate={{ opacity: 1, y: depth, scale: 1, rotateX: 0 }}
      transition={{
        delay: enterDelay,
        duration: 0.8,
        type: "spring",
        damping: 14,
        stiffness: 80,
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card interiors by index                                            */
/* ------------------------------------------------------------------ */

const cardContents: ((delay: number) => React.ReactNode)[] = [
  (d) => <AudioWaveform startDelay={d} />,
  (d) => <TranscriptionTypewriter startDelay={d} />,
  (d) => <EvaluationChecklist startDelay={d} />,
  (d) => <ScoreRing startDelay={d} />,
];

const contentDelays = [0.8, 1.6, 2.4, 3.2];
const cardDelays = [0.0, 0.6, 1.2, 1.8];
const connectorDelays = [0.4, 1.0, 1.6];

/* ------------------------------------------------------------------ */
/*  HeroWorkflow — 3D parallax orchestrator                            */
/* ------------------------------------------------------------------ */

export function HeroWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  /* Parallax layer transforms driven by mouse position */
  const layer1X = useSpring(useTransform(mouseX, [-1, 1], [8, -8]), {
    stiffness: 100,
    damping: 20,
  });
  const layer1Y = useSpring(useTransform(mouseY, [-1, 1], [6, -6]), {
    stiffness: 100,
    damping: 20,
  });
  const layer2X = useSpring(useTransform(mouseX, [-1, 1], [-4, 4]), {
    stiffness: 80,
    damping: 25,
  });
  const layer2Y = useSpring(useTransform(mouseY, [-1, 1], [-3, 3]), {
    stiffness: 80,
    damping: 25,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{ perspective: 1200 }}
    >
      {/* Floating tech labels — parallax layer 2 (moves opposite) */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none hidden lg:block"
        style={{ x: layer2X, y: layer2Y }}
      >
        {floatingTech.map((t) => (
          <motion.span
            key={t.label}
            className={`absolute font-mono text-[9px] tracking-[0.2em] uppercase select-none ${t.red ? "text-red-500/25" : "text-violet-500/20"}`}
            style={{ left: t.x, top: t.y }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{
              delay: t.delay + 1,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {t.label}
          </motion.span>
        ))}
      </motion.div>

      {/* Main workflow — parallax layer 1 */}
      <motion.div
        className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-0"
        style={{ x: layer1X, y: layer1Y, transformStyle: "preserve-3d" }}
      >
        {steps.map((step, i) => (
          <div
            key={step.label}
            className="flex flex-col lg:flex-row items-center"
          >
            <TiltCard
              depth={step.depth}
              enterDelay={cardDelays[i]}
              className="relative w-full max-w-[280px] lg:w-[190px] xl:w-[200px] lg:max-w-none"
            >
              {/* Card glow border */}
              <motion.div
                className="absolute inset-0 z-0"
                animate={{
                  boxShadow: [
                    `0 0 0px ${step.color}00`,
                    `0 0 20px ${step.color}15, inset 0 0 20px ${step.color}08`,
                    `0 0 0px ${step.color}00`,
                  ],
                }}
                transition={{
                  delay: cardDelays[i] + 1.5,
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Card body */}
              <div className="relative z-10 border border-white/[0.08] bg-white/[0.025] backdrop-blur-md p-3 overflow-hidden">
                {/* Scan line effect */}
                <motion.div
                  className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent pointer-events-none"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{
                    delay: cardDelays[i] + 2,
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: "linear",
                  }}
                />

                {/* Header */}
                <div className="flex items-center gap-2 mb-2.5">
                  <div
                    className="relative flex h-8 w-8 items-center justify-center border bg-black/30"
                    style={{ borderColor: `${step.color}20` }}
                  >
                    <step.icon
                      size={14}
                      style={{ color: step.color }}
                      strokeWidth={1.5}
                    />
                    {/* Corner accents */}
                    <span
                      className="absolute top-0 left-0 w-1.5 h-px"
                      style={{ background: step.color, opacity: 0.4 }}
                    />
                    <span
                      className="absolute top-0 left-0 h-1.5 w-px"
                      style={{ background: step.color, opacity: 0.4 }}
                    />
                    <span
                      className="absolute bottom-0 right-0 w-1.5 h-px"
                      style={{ background: step.color, opacity: 0.4 }}
                    />
                    <span
                      className="absolute bottom-0 right-0 h-1.5 w-px"
                      style={{ background: step.color, opacity: 0.4 }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[8px] tracking-widest text-white/15 uppercase">
                        {step.num}
                      </span>
                      <span
                        className="h-px flex-1"
                        style={{
                          background: `linear-gradient(90deg, ${step.color}20, transparent)`,
                        }}
                      />
                    </div>
                    <span className="block text-[11px] font-semibold text-white/80 truncate">
                      {step.label}
                    </span>
                  </div>
                </div>

                {/* Desc */}
                <p className="text-[8px] text-white/25 mb-2.5 font-mono">
                  {step.desc}
                </p>

                {/* Animated content */}
                <div className="min-h-[72px] flex items-center justify-center">
                  {cardContents[i](contentDelays[i])}
                </div>

                {/* Tech tags */}
                <div className="flex gap-1.5 mt-2.5 pt-2 border-t border-white/[0.04]">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[7px] uppercase tracking-wider px-1.5 py-0.5 border text-white/25"
                      style={{ borderColor: `${step.color}15` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Active indicator */}
              <motion.div
                className="absolute -top-1 -right-1 h-2.5 w-2.5 keep-round border-2 border-[#09090b]"
                style={{ backgroundColor: step.color }}
                animate={{
                  scale: [1, 1.4, 1],
                  boxShadow: [
                    `0 0 0px ${step.color}`,
                    `0 0 8px ${step.color}`,
                    `0 0 0px ${step.color}`,
                  ],
                }}
                transition={{
                  delay: cardDelays[i] + 0.5,
                  duration: 2.5,
                  repeat: Infinity,
                }}
              />
            </TiltCard>

            {/* Connectors */}
            {i < steps.length - 1 && (
              <>
                <FlowingDots delay={connectorDelays[i]} />
                <VerticalConnector delay={connectorDelays[i]} />
              </>
            )}
          </div>
        ))}
      </motion.div>

      {/* Bottom tech bar */}
      <motion.div
        className="hidden lg:flex items-center justify-center gap-6 mt-6 opacity-0"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8, ease: EASE }}
      >
        {[
          { icon: Braces, text: "API REST v3" },
          { icon: Workflow, text: "Orchestration pipeline" },
          { icon: Cpu, text: "Inférence GPU" },
          { icon: Sparkles, text: "Streaming temps réel" },
        ].map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-1.5 text-white/15"
          >
            <item.icon size={10} />
            <span className="font-mono text-[8px] uppercase tracking-wider">
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
