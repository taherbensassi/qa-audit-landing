import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { ClientSlider } from "@/components/landing/ClientSlider";
import { UseCases } from "@/components/landing/UseCases";
import { Platform } from "@/components/landing/Platform";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Metrics } from "@/components/landing/Metrics";
import { Showcase } from "@/components/landing/Showcase";
import { DemoCTA } from "@/components/landing/DemoCTA";
import { Footer } from "@/components/landing/Footer";
import { SmoothScroll } from "@/components/landing/SmoothScroll";
import { CustomCursor } from "@/components/landing/CustomCursor";
import { PageLoader } from "@/components/landing/PageLoader";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <SmoothScroll>
      <PageLoader />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <ClientSlider />
        <SectionDivider variant="mesh" />
        <UseCases />
        <SectionDivider variant="line" />
        <Platform />
        <SectionDivider variant="wave" />
        <FeatureGrid />
        <Metrics />
        <Showcase />
        <SectionDivider variant="mesh" flip />
        <DemoCTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
