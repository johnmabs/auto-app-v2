"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn, signOut as nextAuthSignOut } from "@/auth";
import { actionError, type ActionError } from "@/shared/types/action-response";
import { formDataToObject } from "@/shared/utils/form-data";
import { handleActionError } from "@/shared/utils/handle-action-error";
import { signInSchema } from "../schemas/sign-in.schema";
import { requireAuth } from "@/shared/guards";

export type AuthenticateActionResponse = ActionError;

function normalizeCallbackUrl(callbackUrl: unknown) {
  return typeof callbackUrl === "string" && callbackUrl.startsWith("/")
    ? callbackUrl
    : "/admin";
}

function parseSignInFormData(formData: FormData) {
  const rawInput = formDataToObject(formData);
  const credentials = signInSchema.parse(rawInput);

  return {
    credentials,
    callbackUrl: normalizeCallbackUrl(rawInput.callbackUrl),
  };
}

export async function authenticate(
  _previousState: AuthenticateActionResponse | null,
  formData: FormData,
): Promise<AuthenticateActionResponse> {
  const { credentials, callbackUrl } = parseSignInFormData(formData);

  try {
    await signIn("credentials", {
      ...credentials,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return actionError("Identifiants invalides", "INVALID_CREDENTIALS");

        default:
          return actionError("Authentication failed", "AUTH_ERROR");
      }
    }

    return handleActionError(error);
  }

  redirect(callbackUrl);
}

export async function signOutAction() {
  await requireAuth().catch(() => null);

  await nextAuthSignOut({ redirectTo: "/login" });
}
