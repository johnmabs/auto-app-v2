"use server";

import { customerRequestService } from "@/features/customer-requests/services/customer-request.service";

import { ContactSchema } from "../schemas/contact.schema";
import type { ContactFormState } from "../types";

function getSubmittedValues(formData: FormData): ContactFormState["values"] {
  return {
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
}

export async function submitContactAction(
  _: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = getSubmittedValues(formData);
  const parsed = ContactSchema.safeParse({
    ...values,
    honeypot: formData.get("website"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  const data = parsed.data;

  if (data.honeypot) {
    return {
      success: true,
    };
  }

  try {
    await customerRequestService.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      message: `Sujet : ${data.subject}\n\n${data.message}`,
      source: "contact",
    });
  } catch {
    return {
      success: false,
      message:
        "Impossible d'envoyer votre message pour le moment. Réessayez dans quelques instants.",
      values,
    };
  }

  return {
    success: true,
    message: "Message envoyé avec succès.",
  };
}
