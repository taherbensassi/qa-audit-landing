import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nouraisolutionqaaudit — AI-Powered QA Auditing for Call Centers",
  description:
    "Evaluate every conversation against your compliance grilles. Automatically, accurately, at scale.",
  openGraph: {
    title: "nouraisolutionqaaudit — AI-Powered QA Auditing for Call Centers",
    description:
      "Evaluate every conversation against your compliance grilles. Automatically, accurately, at scale.",
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
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
