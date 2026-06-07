import { Phone, Mail, MapPin, Clock } from "lucide-react";

import { COMPANY_INFO } from "@/shared/constants/company";

import { ContactCard } from "./contact-card";
import { ContactWhatsappCard } from "./contact-whatsap-card";

export function ContactInfo() {
  return (
    <>
      <div className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) p-6 space-y-5">
        <h2 className="font-semibold text-[0.88rem] uppercase tracking-[0.06em] pb-3 border-b border-(--border)">
          Coordonnées
        </h2>

        <ContactCard
          icon={<Phone className="h-5 w-5" />}
          title="Téléphone"
          value={COMPANY_INFO.phone}
          href={`tel:${COMPANY_INFO.phone}`}
          sub="Disponible Lun-Sam 8h-18h"
        />

        <ContactCard
          icon={<Mail className="h-5 w-5" />}
          title="Email"
          value={COMPANY_INFO.email}
          href={`mailto:${COMPANY_INFO.email}`}
          sub="Réponse sous 24h"
        />

        <ContactCard
          icon={<MapPin className="h-5 w-5" />}
          title="Adresse"
          value="Avenue de l'Indépendance"
          sub="Pointe-Noire, République du Congo"
        />

        <ContactCard
          icon={<Clock className="h-5 w-5" />}
          title="Horaires"
          value="Lun - Sam : 8h00 - 18h00"
          sub="Dimanche : fermé"
        />
      </div>

      <ContactWhatsappCard />
    </>
  );
}
