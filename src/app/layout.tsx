import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9VH3L0YLTW"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9VH3L0YLTW');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
