import { CONTACT_FAQ } from "../constants/contact.constants";

export function ContactFaq() {
  return (
    <div className="bg-(--bg-2) border border-(--border) rounded-(--r-lg) p-6">
      <h3 className="font-semibold text-[0.88rem] mb-4 uppercase tracking-[0.06em]">
        Questions fréquentes
      </h3>
      <div className="space-y-4">
        {CONTACT_FAQ.map((item) => (
          <div key={item.q}>
            <p className="text-[0.82rem] font-medium mb-1">{item.q}</p>

            <p className="text-[0.78rem] text-(--muted) leading-[1.6]">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
