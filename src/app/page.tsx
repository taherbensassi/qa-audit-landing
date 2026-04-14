import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Metrics } from "@/components/landing/Metrics";
import { ClientSlider } from "@/components/landing/ClientSlider";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { UseCases } from "@/components/landing/UseCases";
import { BuiltForTeams } from "@/components/landing/BuiltForTeams";
import { Showcase } from "@/components/landing/Showcase";
import { Platform } from "@/components/landing/Platform";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <ClientSlider />
        <HowItWorks />
        <FeatureGrid />
        <UseCases />
        <BuiltForTeams />
        <Showcase />
        <Platform />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
