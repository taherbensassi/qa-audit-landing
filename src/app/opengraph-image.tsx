import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "nouraisolutionqaaudit — AI-Powered QA Auditing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#ffffff",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 14,
            color: "#7c3aed",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 24,
            fontWeight: 600,
          }}
        >
          AI-Powered QA Auditing
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#0f0f14",
            marginBottom: 16,
          }}
        >
          Every call evaluated.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#0f0f14",
            marginBottom: 24,
          }}
        >
          Every insight delivered.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#6b7280",
            maxWidth: 600,
            textAlign: "center",
          }}
        >
          Quality intelligence for call centers
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 40,
            fontSize: 14,
            color: "#9ca3af",
          }}
        >
          nouraisolutionqaaudit
        </div>
      </div>
    ),
    { ...size }
  );
}
