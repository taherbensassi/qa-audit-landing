import { Navbar } from "@/components/landing/Navbar";
import { ComingSoon } from "@/components/landing/ComingSoon";
import { Footer } from "@/components/landing/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security — nouraisolutionqaaudit",
  description: "Learn about our security practices and data protection.",
};

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <ComingSoon title="Security" />
      <Footer />
    </>
  );
}
