import { MessageCircle } from "lucide-react";

import { COMPANY_INFO } from "@/shared/constants/company";

export function ContactWhatsappCard() {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp.replace(
    /\D/g,
    "",
  )}?text=Bonjour+Autostore+!+Je+souhaite+un+renseignement.`;

  return (
    <div className="bg-[rgba(37,211,102,0.06)] border border-[rgba(37,211,102,0.2)] rounded-(--r-lg) p-6">
      <div className="flex items-start gap-4 mb-4">
        <MessageCircle
          className="h-8 w-8 text-[#25D366] shrink-0"
          aria-hidden="true"
        />

        <div>
          <h3 className="font-semibold text-[0.95rem] mb-1">
            WhatsApp Business
          </h3>

          <p className="text-[0.8rem] text-(--muted) leading-relaxed">
            La méthode la plus rapide pour échanger avec un conseiller.
          </p>
        </div>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-(--r) bg-[#25D366] text-white text-[0.85rem] font-semibold uppercase tracking-wider hover:bg-[#1ebe5c] transition-colors"
      >
        <MessageCircle className="h-4 w-4" />
        Ouvrir WhatsApp
      </a>
    </div>
  );
}
