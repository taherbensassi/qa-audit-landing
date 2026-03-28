import { Navbar } from "@/components/landing/Navbar";
import { PricingContent } from "@/components/landing/PricingContent";
import { DemoCTA } from "@/components/landing/DemoCTA";
import { Footer } from "@/components/landing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — nouraisolutionqaaudit",
  description: "Simple, transparent pricing for AI-powered QA auditing.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <PricingContent />
      <DemoCTA />
      <Footer />
    </>
  );
}
