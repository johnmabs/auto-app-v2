import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/Button";

/* ── Content ────────────────────────────────────────────── */
const CTA_CONTENT = {
  tag: "Démarrez maintenant",
  title: ["IMPORTER VOTRE VÉHICULE", "N'A JAMAIS ÉTÉ", "AUSSI SIMPLE"],
  description:
    "Décrivez le véhicule que vous recherchez. Notre équipe vous prépare une sélection adaptée à votre budget, avec une estimation claire des coûts jusqu'à la livraison au Congo.",
  primaryCta: {
    label: "Demander un devis",
    href: "/contact",
  },
  secondaryCta: {
    label: "Explorer le catalogue",
    href: "/catalog",
  },
  stats: ["35+ véhicules importés", "8 pays sources", "Accompagnement au Congo"],
};

/* ── Final CTA ──────────────────────────────────────────── */
export default function CTASection() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.08)_0%,transparent_65%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--gold) to-transparent opacity-40"
      />

      <div className="container relative mx-auto px-6 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Tag */}
          <div className="flex justify-center mb-6">
            <span className="section-tag">{CTA_CONTENT.tag}</span>
          </div>

          {/* Title */}
          <h2
            id="cta-title"
            className="font-display text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] tracking-[0.08em] mb-6"
          >
            {CTA_CONTENT.title[0]}
            <br />
            {CTA_CONTENT.title[1]}
            <br />
            <span className="text-(--gold)">{CTA_CONTENT.title[2]}</span>
          </h2>

          {/* Description */}
          <p className="mx-auto max-w-2xl text-(--muted) text-[0.95rem] sm:text-base leading-relaxed mb-10">
            {CTA_CONTENT.description}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto"
              iconRight={<ArrowRight className="size-4" />}
            >
              <Link href={CTA_CONTENT.primaryCta.href}>
                {CTA_CONTENT.primaryCta.label}
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto"
            >
              <Link href={CTA_CONTENT.secondaryCta.href}>
                {CTA_CONTENT.secondaryCta.label}
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex  flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs text-(--dim)">
            {CTA_CONTENT.stats.map((item, index) => (
              <div key={item} className="flex items-center gap-4">
                <span>{item}</span>

                {index < CTA_CONTENT.stats.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden sm:block text-(--border)"
                  >
                    •
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
