import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ClientSlider } from "@/components/landing/ClientSlider";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { UseCases } from "@/components/landing/UseCases";
import { Platform } from "@/components/landing/Platform";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { BuiltForTeams } from "@/components/landing/BuiltForTeams";
import { Metrics } from "@/components/landing/Metrics";
import { Showcase } from "@/components/landing/Showcase";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ClientSlider />
        <HowItWorks />
        <UseCases />
        <Platform />
        <FeatureGrid />
        <BuiltForTeams />
        <Metrics />
        <Showcase />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
