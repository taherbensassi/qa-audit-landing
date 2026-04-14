import { Navbar } from "@/components/landing/Navbar";
import { HowItWorksContent } from "@/components/landing/HowItWorksContent";
import { DemoCTA } from "@/components/landing/DemoCTA";
import { Footer } from "@/components/landing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — evaVoc",
  description: "Discover how AI-powered QA auditing transforms your call center in 4 steps.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <HowItWorksContent />
      <DemoCTA />
      <Footer />
    </>
  );
}
