import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { CtaSection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cv-bg text-cv-text font-mono">
      <Nav />
      <Hero />
      <FeaturesGrid />
      <CtaSection />
    </div>
  );
}
