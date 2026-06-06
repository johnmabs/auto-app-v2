import { Star } from "lucide-react";

import Section from "./section";

const TESTIMONIALS = [
  {
    id: "marc-kouassi",
    name: "Marc Kouassi",
    location: "Pointe-Noire, Congo",
    initials: "MK",
    color: "rgba(201,168,76,0.15)",
    textColor: "var(--gold)",
    rating: 4,
    vehicle: "Hyundai Palisade 2024",
    text: "J'ai été accompagné à chaque étape, du choix du véhicule jusqu'à son arrivée à Pointe-Noire. Le devis était clair et le suivi très professionnel.",
  },
  {
    id: "fatou-diallo",
    name: "Fatou Diallo",
    location: "Dolisie, Congo",
    initials: "FD",
    color: "rgba(52,152,219,0.15)",
    textColor: "var(--blue)",
    rating: 5,
    vehicle: "Toyota RAV4",
    text: "Je cherchais un SUV fiable avec un budget précis. L'équipe m'a proposé plusieurs options et a géré les démarches d'importation avec beaucoup de sérieux.",
  },
  {
    id: "balou-vivien",
    name: "Balou Vivien",
    location: "Brazzaville, Congo",
    initials: "BV",
    color: "rgba(46,204,113,0.15)",
    textColor: "var(--green)",
    rating: 5,
    vehicle: "Jetour Dashing",
    text: "Le véhicule reçu correspondait aux photos et aux informations communiquées. J'ai particulièrement apprécié la transparence sur les coûts.",
  },
];

export default function TestimonialsSection() {
  return (
    <Section tag="Avis clients" title={"ILS NOUS FONT\nCONFIANCE"} dark>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.id}
            className="group bg-(--bg-3) border border-(--border) rounded-(--r-lg) p-7 transition-all duration-300 hover:-translate-y-1 hover:border-(--gold) hover:shadow-xl"
          >
            <div
              className="flex gap-1 mb-5"
              role="img"
              aria-label={`${testimonial.rating} étoiles sur 5`}
            >
              {Array.from({ length: testimonial.rating }).map((_, index) => (
                <Star
                  key={index}
                  aria-hidden="true"
                  className="size-4 fill-(--gold) text-(--gold)"
                />
              ))}
            </div>

            <blockquote>
              <p className="text-(--muted) leading-7 italic mb-6">
                “{testimonial.text}”
              </p>
            </blockquote>

            <figcaption className="flex items-center gap-3">
              <div
                aria-hidden="true"
                style={{
                  background: testimonial.color,
                  color: testimonial.textColor,
                }}
                className="size-11 rounded-full flex items-center justify-center font-semibold shrink-0"
              >
                {testimonial.initials}
              </div>

              <div className="min-w-0">
                <p className="font-medium text-sm">{testimonial.name}</p>

                <p className="text-xs text-(--dim)">{testimonial.location}</p>

                <span className="inline-flex mt-1 rounded-full bg-(--bg-2) border border-(--border) px-2 py-1 text-[11px] font-medium">
                  {testimonial.vehicle}
                </span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
