import { Eye } from "lucide-react";

interface DemoPlaceholderProps {
  label?: string;
  aspectRatio?: string;
  className?: string;
}

export function DemoPlaceholder({
  label = "Aperçu disponible sur demande",
  aspectRatio = "16/9",
  className = "",
}: DemoPlaceholderProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-[#0f0f1a] border border-white/[0.06] overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-violet-500/30 to-transparent" />
      <span className="absolute top-0 left-0 h-12 w-px bg-gradient-to-b from-violet-500/30 to-transparent" />
      <span className="absolute bottom-0 right-0 w-12 h-px bg-gradient-to-l from-indigo-500/30 to-transparent" />
      <span className="absolute bottom-0 right-0 h-12 w-px bg-gradient-to-t from-indigo-500/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
        <div className="flex h-10 w-10 items-center justify-center border border-violet-500/20 bg-violet-500/5">
          <Eye size={18} className="text-violet-400/70" strokeWidth={1.5} />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/25">
          {label}
        </p>
      </div>
    </div>
  );
}
