import { Navbar } from "@/components/landing/Navbar";
import { SecurityContent } from "@/components/landing/SecurityContent";
import { DemoCTA } from "@/components/landing/DemoCTA";
import { Footer } from "@/components/landing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security — evaVoc",
  description: "Learn about our security practices and data protection commitments.",
};

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <SecurityContent />
      <DemoCTA />
      <Footer />
    </>
  );
}
