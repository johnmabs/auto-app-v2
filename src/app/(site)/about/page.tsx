import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COUNTRIES } from "@/shared/constants/countries";
import { COMPANY_INFO } from "@/shared/constants/company";
import { StatCard } from "@/features/about/components/stat-card";
import { ValueCard } from "@/features/about/components/value-card";
import { TimelineItem } from "@/features/about/components/timeline-item";
import { TeamCard } from "@/features/about/components/team-card";
import {
  ABOUT_STATS,
  ABOUT_TEAM,
  ABOUT_TIMELINE,
  ABOUT_VALUES,
} from "@/features/about/constants/about.constants";

export const metadata: Metadata = {
  title: `À propos — ${COMPANY_INFO.name}`,
  description: `Découvrez ${COMPANY_INFO.name}, notre mission, nos valeurs et notre accompagnement pour l'importation de véhicules au Congo.`,
};

export default function AboutPage() {
  return (
    <div className="pt-(--nav-h)">
      {/* ── Hero ─────────────────────────────────────── */}
      <div className="relative bg-(--bg-2) border-b border-(--border) px-6 lg:px-10 py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(201,168,76,0.05)_0%,transparent_60%)] pointer-events-none"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto relative">
          <p className="section-tag mb-4" aria-hidden="true">
            Notre histoire
          </p>
          <h1 className="font-display text-[clamp(2.8rem,7vw,4.5rem)] tracking-[0.04em] leading-[0.95] mb-6">
            À PROPOS
            <br />
            DE{" "}
            <span className="text-(--gold)">
              {COMPANY_INFO.name.toUpperCase()}
            </span>
          </h1>
          <p className="text-[1rem] text-(--muted) max-w-2xl leading-[1.85] font-light">
            Fondée en {COMPANY_INFO.founded} à Pointe-Noire, {COMPANY_INFO.name}
            accompagne les particuliers et professionnels dans la recherche,
            l&apos;importation, le dédouanement et la livraison de véhicules
            adaptés aux besoins du Congo.
          </p>
        </div>
      </div>

      {/* ── Stats ────────────────────────────────────── */}
      <section
        className="py-16 px-6 lg:px-10 border-b border-(--border)"
        aria-label="Chiffres clés"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ABOUT_STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────── */}
      <section
        className="py-20 px-6 lg:px-10"
        aria-labelledby="mission-heading"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="section-tag mb-4" aria-hidden="true">
              Ce qui nous anime
            </p>
            <h2
              id="mission-heading"
              className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[0.04em] mb-6"
            >
              NOTRE MISSION
            </h2>
            <div className="space-y-5 text-[0.9rem] text-(--muted) leading-[1.85]">
              <p>
                Notre mission est de rendre l&apos;import automobile plus clair
                et plus accessible : comprendre le besoin, identifier les bonnes
                opportunités, expliquer les coûts et suivre chaque étape avec le
                client.
              </p>
              <p>
                Grâce à un réseau de sourcing dans{" "}
                {COMPANY_INFO.stats.countries} pays, nous aidons à comparer les
                marchés, les configurations et les budgets pour trouver un
                véhicule cohérent avec les routes, les usages et les attentes
                locales.
              </p>
              <p>
                Notre vision est de bâtir une référence congolaise de
                l&apos;importation automobile, fondée sur la transparence, la
                fiabilité et un accompagnement humain.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-(--r) bg-(--gold) text-(--bg) text-[0.85rem] font-semibold uppercase tracking-wider hover:bg-(--gold-2) transition-colors"
              >
                Travailler avec nous <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Values */}
          <div className="space-y-6" role="list" aria-label="Nos valeurs">
            {ABOUT_VALUES.map((value) => (
              <div key={value.title} role="listitem">
                <ValueCard {...value} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Histoire / Timeline ───────────────────────── */}
      <section
        className="py-20 px-6 lg:px-10 bg-(--bg-2) border-y border-(--border)"
        aria-labelledby="histoire-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="section-tag mb-4" aria-hidden="true">
                Notre parcours
              </p>
              <h2
                id="histoire-heading"
                className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[0.04em] mb-4"
              >
                L&apos;HISTOIRE
                <br />
                D&apos;AUTOSTORE
              </h2>
              <p className="text-[0.9rem] text-(--muted) leading-[1.85]">
                Un développement progressif, construit autour du sourcing, de la
                confiance et du suivi client.
              </p>
            </div>

            <ol aria-label={`Chronologie ${COMPANY_INFO.name}`}>
              {ABOUT_TIMELINE.map((item) => (
                <li key={item.year}>
                  <TimelineItem {...item} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Équipe ───────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-10" aria-labelledby="equipe-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-tag justify-center mb-3" aria-hidden="true">
              Derrière {COMPANY_INFO.name}
            </p>
            <h2
              id="equipe-heading"
              className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[0.04em]"
            >
              NOTRE ÉQUIPE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ABOUT_TEAM.map((member) => (
              <TeamCard key={member.role} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Pays partenaires ──────────────────────────── */}
      <section
        className="py-20 px-6 lg:px-10 bg-(--bg-2) border-t border-(--border)"
        aria-labelledby="partenaires-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-tag justify-center mb-3" aria-hidden="true">
              Notre réseau
            </p>
            <h2
              id="partenaires-heading"
              className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[0.04em]"
            >
              NOS PAYS
              <br />
              PARTENAIRES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COUNTRIES.filter((c) => c.active).map((country) => (
              <div
                key={country.code}
                className="bg-(--bg-3) border border-(--border) rounded-(--r-lg) p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl" aria-hidden="true">
                    {country.flag}
                  </span>
                  <div>
                    <p className="font-semibold text-[0.9rem]">
                      {country.name}
                    </p>
                    <p className="text-[0.7rem] text-(--dim) uppercase tracking-[0.06em]">
                      {country.continent}
                    </p>
                  </div>
                </div>
                <p className="text-[0.78rem] text-(--muted) leading-[1.65] mb-3">
                  {country.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {country.highlights.slice(0, 3).map((h) => (
                    <span
                      key={h}
                      className="text-[0.65rem] px-2 py-0.5 bg-(--bg-4) border border-(--border) rounded-full text-(--dim)"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section
        className="py-20 px-6 lg:px-10 text-center"
        aria-label="Appel à l'action"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] tracking-[0.04em] mb-5">
            PRÊT À FAIRE
            <br />
            <span className="text-(--gold)">
              CONFIANCE À {COMPANY_INFO.name.toUpperCase()} ?
            </span>
          </h2>
          <p className="text-[0.95rem] text-(--muted) mb-10 leading-relaxed">
            Parlons de votre prochain véhicule et des options d&apos;importation
            adaptées à votre budget.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-(--r) bg-(--gold) text-(--bg) text-[0.85rem] font-semibold uppercase tracking-wider hover:bg-(--gold-2) transition-colors"
            >
              Voir le catalogue <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-(--r) border border-(--border-2) text-(--text) text-[0.85rem] font-medium uppercase tracking-wider hover:border-(--gold) hover:text-(--gold) transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
