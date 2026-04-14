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
  title: "evaVoc — Audit Qualité IA pour Centres d'Appels",
  description:
    "Évaluez 100% de vos conversations avec la précision de vos meilleurs auditeurs. 40x plus rapide que l'audit manuel. Conforme RGPD. Propulsé par Claude d'Anthropic.",
  openGraph: {
    title: "evaVoc — Audit Qualité IA pour Centres d'Appels",
    description:
      "Évaluez 100% de vos conversations avec la précision de vos meilleurs auditeurs. 40x plus rapide que l'audit manuel. Conforme RGPD.",
    type: "website",
    siteName: "evaVoc",
  },
  twitter: {
    card: "summary_large_image",
    title: "evaVoc — Audit Qualité IA pour Centres d'Appels",
    description:
      "Évaluez 100% de vos conversations. 40x plus rapide que l'audit manuel.",
  },
  keywords: [
    "audit qualité",
    "centre d'appels",
    "IA",
    "quality assurance",
    "call center",
    "conformité",
    "RGPD",
    "évaluation appels",
    "monitoring qualité",
  ],
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
