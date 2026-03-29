import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nouraisolutionqaaudit — Audit Qualité IA pour Centres d'Appels",
  description:
    "Évaluez chaque conversation selon vos grilles de conformité. Automatiquement, avec précision, à grande échelle.",
  openGraph: {
    title: "nouraisolutionqaaudit — Audit Qualité IA pour Centres d'Appels",
    description:
      "Évaluez chaque conversation selon vos grilles de conformité. Automatiquement, avec précision, à grande échelle.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
