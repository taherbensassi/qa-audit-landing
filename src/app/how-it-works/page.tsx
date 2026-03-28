import { Navbar } from "@/components/landing/Navbar";
import { ComingSoon } from "@/components/landing/ComingSoon";
import { Footer } from "@/components/landing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works — nouraisolutionqaaudit",
  description: "Discover how AI-powered QA auditing transforms your call center.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />
      <ComingSoon title="How It Works" />
      <Footer />
    </>
  );
}
