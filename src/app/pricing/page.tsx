import { Navbar } from "@/components/landing/Navbar";
import { ComingSoon } from "@/components/landing/ComingSoon";
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
      <ComingSoon title="Pricing" />
      <Footer />
    </>
  );
}
