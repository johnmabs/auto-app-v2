import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck,
  FileText,
  Globe,
  Search,
  Shield,
  Ship,
  Smartphone,
  Wrench,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { COMPANY_INFO } from "@/shared/constants/company";
import {
  SERVICE_PROCESS,
  SERVICES,
} from "@/features/services/constants/services.constants";

export const metadata: Metadata = {
  title: `Services — ${COMPANY_INFO.name}`,
  description: `${COMPANY_INFO.name} accompagne votre projet d'importation automobile au Congo: recherche personnalisée, transport, dédouanement, suivi client et conseil administratif.`,
};

const SERVICE_ICONS = {
  globe: Globe,
  ship: Ship,
  fileCheck: FileCheck,
  search: Search,
  shield: Shield,
  fileText: FileText,
  wrench: Wrench,
  smartphone: Smartphone,
} as const;

export default function ServicesPage() {
  return (
    <div className="pt-(--nav-h)">
      <header className="bg-(--bg-2) border-b border-(--border) px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="section-tag mb-4" aria-hidden="true">
            Notre accompagnement
          </p>
          <h1 className="font-display text-[clamp(2.8rem,7vw,4.5rem)] tracking-[0.04em] leading-[0.95] mb-5">
            NOS SERVICES
            <br />
            <span className="text-(--gold)">D&apos;IMPORTATION</span>
          </h1>
          <p className="text-[1rem] text-(--muted) max-w-2xl leading-[1.8] font-light">
            {COMPANY_INFO.name} vous accompagne de la recherche du véhicule
            jusqu&apos;aux démarches d&apos;arrivée au Congo, avec des devis
            lisibles, un suivi humain et des étapes expliquées.
          </p>
        </div>
      </header>

      <section
        className="max-w-7xl mx-auto px-6 lg:px-10 py-20"
        aria-labelledby="services-heading"
      >
        <h2 id="services-heading" className="sr-only">
          Services proposés par {COMPANY_INFO.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.icon];

            return (
              <article
                key={service.title}
                className={cn(
                  "group relative bg-(--bg-2) border border-(--border)",
                  "rounded-(--r-lg) p-7 overflow-hidden",
                  "transition-all duration-250",
                  "hover:border-(--gold) hover:-translate-y-1",
                  "hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]",
                )}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 bg-(--gold) scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  aria-hidden="true"
                />

                <div
                  className="w-14 h-14 rounded-(--r-lg) bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.18)] flex items-center justify-center text-(--gold) mb-5 shrink-0"
                  aria-hidden="true"
                >
                  <Icon className="h-7 w-7" />
                </div>

                {service.badge && (
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[0.65rem] font-semibold border mb-3"
                    style={{
                      background: service.badgeColor,
                      color: service.badgeTextColor,
                      borderColor: service.badgeBorderColor,
                    }}
                  >
                    {service.badge}
                  </span>
                )}

                <h3 className="font-semibold text-[1rem] mb-3 tracking-[0.02em] leading-snug">
                  {service.title}
                </h3>
                <p className="text-[0.82rem] text-(--muted) leading-[1.7] mb-5">
                  {service.desc}
                </p>

                <ul className="space-y-1.5">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-[0.78rem] text-(--dim)"
                    >
                      <CheckCircle2
                        className="h-3.5 w-3.5 text-(--green) shrink-0"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="bg-(--bg-2) border-y border-(--border) py-20 px-6 lg:px-10"
        aria-labelledby="process-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-tag justify-center mb-3" aria-hidden="true">
              Étape par étape
            </p>
            <h2
              id="process-heading"
              className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[0.04em]"
            >
              COMMENT ÇA MARCHE
            </h2>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_PROCESS.map((step) => (
              <li
                key={step.step}
                className="flex gap-4 bg-(--bg-3) border border-(--border) rounded-(--r-lg) p-6"
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-full border border-(--border-2) flex items-center justify-center font-display text-[1.1rem] text-(--gold)"
                  aria-hidden="true"
                >
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-[0.9rem] mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-[0.78rem] text-(--dim) leading-[1.65]">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10 text-center" aria-label="Contact">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[0.04em] mb-5">
            PRÊT À LANCER
            <br />
            <span className="text-(--gold)">VOTRE PROJET D&apos;IMPORT ?</span>
          </h2>
          <p className="text-[0.95rem] text-(--muted) mb-10 leading-relaxed">
            Dites-nous le véhicule recherché, votre budget et vos délais. Nous
            vous aiderons à identifier les options les plus cohérentes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-(--r) bg-(--gold) text-(--bg) text-[0.85rem] font-semibold uppercase tracking-wider hover:bg-(--gold-2) transition-colors"
            >
              Demander un devis <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-(--r) border border-(--border-2) text-(--text) text-[0.85rem] font-medium uppercase tracking-wider hover:border-(--gold) hover:text-(--gold) transition-all"
            >
              Voir le catalogue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
