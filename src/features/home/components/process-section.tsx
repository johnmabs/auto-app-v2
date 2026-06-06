import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/Button";
import Section from "./section";

type ProcessStep = {
  step: number;
  title: string;
  desc: string;
};

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Besoin",
    desc: "Vous nous indiquez le modèle, le budget, l'usage et vos préférences.",
  },
  {
    step: 2,
    title: "Recherche",
    desc: "Nous identifions les meilleures options disponibles auprès de nos sources.",
  },
  {
    step: 3,
    title: "Devis",
    desc: "Vous recevez une estimation claire incluant achat, transport, taxes et frais locaux.",
  },
  {
    step: 4,
    title: "Importation",
    desc: "Nous suivons l'expédition, les documents et les formalités jusqu'à l'arrivée.",
  },
  {
    step: 5,
    title: "Livraison",
    desc: "Le véhicule est remis au Congo après contrôle et finalisation des démarches.",
  },
];

function ProcessItem({ step, title, desc }: ProcessStep) {
  return (
    <li className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
      <div className="relative mb-5">
        <div
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-(--border-2) bg-(--bg) font-display text-xl tracking-[0.04em] transition-colors group-hover:border-[rgba(201,168,76,0.35)]"
          aria-hidden="true"
        >
          {String(step).padStart(2, "0")}
        </div>

        <div
          className="absolute -inset-1 rounded-full border border-[rgba(201,168,76,0.15)] transition-colors group-hover:border-[rgba(201,168,76,0.3)]"
          aria-hidden="true"
        />
      </div>

      <span className="sr-only">Étape {step}</span>

      <h3 className="mb-2 text-sm font-semibold tracking-[0.02em]">{title}</h3>

      <p className="max-w-60 text-sm leading-relaxed text-(--dim)">{desc}</p>
    </li>
  );
}

export default function ProcessSection() {
  return (
    <Section
      tag="Comment ça marche"
      title={"PROCESSUS\nD'IMPORTATION"}
      subtitle="Un accompagnement clair, de la recherche du véhicule jusqu'à sa remise au Congo."
    >
      <div className="relative">
        {/* Ligne de progression desktop */}
        <div
          className="absolute top-7 left-0 right-0 hidden h-px lg:block bg-linear-to-r from-transparent via-(--border-2) to-transparent"
          aria-hidden="true"
        />

        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((step) => (
            <ProcessItem key={step.step} {...step} />
          ))}
        </ol>
      </div>

      <div className="mt-14 text-center">
        <Button
          asChild
          variant="ghost"
          iconRight={<ArrowRight className="h-4 w-4" />}
        >
          <Link href="/services">En savoir plus sur nos services</Link>
        </Button>
      </div>
    </Section>
  );
}
