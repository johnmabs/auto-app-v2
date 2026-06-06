import type { Metadata } from "next";

import { COMPANY_INFO } from "@/shared/constants/company";
import HeroSection from "@/features/home/components/hero-section";
import Section from "@/features/home/components/section";
import { VehicleGridSkeleton } from "@/shared/ui/skeleton";
import { Suspense } from "react";
import RecentVehicles from "@/features/home/components/recent-vehicles";
import TrustSection from "@/features/home/components/trust-section";
import FeaturedVehicles from "@/features/home/components/featured-vehicle";
import CountriesSection from "@/features/home/components/countries-section";
import ProcessSection from "@/features/home/components/process-section";
import TestimonialsSection from "@/features/home/components/testimonials-section";
import CTASection from "@/features/home/components/cta-section";

export const metadata: Metadata = {
  title: `${COMPANY_INFO.name} — Importation de véhicules au Congo`,
  description:
    "Autostore Congo accompagne les particuliers et professionnels dans l'achat, l'importation, le dédouanement et la livraison de véhicules au Congo-Brazzaville.",
};

export default function Home() {
  return (
    <>
      <HeroSection />

      <Section
        tag="Catalogue"
        title={"DERNIÈRES\nDISPONIBILITÉS"}
        subtitle="Découvrez les véhicules récemment ajoutés, disponibles à l'achat ou à l'importation sur demande."
        viewAllHref="/catalog"
        className="pt-28"
      >
        <Suspense fallback={<VehicleGridSkeleton count={6} />}>
          <RecentVehicles />
        </Suspense>
      </Section>

      <TrustSection />

      {/* Véhicules coup de cœur */}
      <Section
        tag="Sélection"
        title={"SÉLECTION\nRECOMMANDÉE"}
        subtitle="Une sélection de modèles fiables, recherchés et adaptés aux routes du Congo."
        viewAllHref="/catalog?featured=true"
        dark
      >
        <Suspense fallback={<VehicleGridSkeleton count={3} />}>
          <FeaturedVehicles />
        </Suspense>
      </Section>

      <CountriesSection />
      <ProcessSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
