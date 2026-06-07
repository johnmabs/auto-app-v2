import { ContactHero } from "@/features/contact/components/contact-hero";
import { ContactForm } from "@/features/contact/components/contact-form";
import { ContactFaq } from "@/features/contact/components/contact-faq";
import { ContactInfo } from "@/features/contact/components/contact-info";

export default function ContactPage() {
  return (
    <div className="pt-(--nav-h)">
      <ContactHero />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid lg:grid-cols-[1fr_420px] gap-16">
          <div>
            <h2 className="font-semibold text-[1rem] mb-6 pb-4 border-b border-(--border)">
              Envoyez-nous un message
            </h2>
            <ContactForm />
          </div>

          <div className="space-y-6">
            <ContactInfo />
            <ContactFaq />
          </div>
        </div>
      </div>
    </div>
  );
}
