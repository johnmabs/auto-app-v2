"use server";

import { deleteImage } from "@/lib/cloudinary";
import { requireAdmin } from "@/shared/guards";
import type { ActionResponse } from "@/shared/types";

function isCloudinaryTimeout(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    ("http_code" in error || "name" in error) &&
    ((error as { http_code?: unknown }).http_code === 499 ||
      (error as { name?: unknown }).name === "TimeoutError")
  );
}

export async function deleteVehicleImage(
  publicId: string,
): Promise<ActionResponse> {
  try {
    await requireAdmin();

    if (!publicId.trim()) {
      return { success: false, error: "Image invalide" };
    }

    const deleted = await deleteImage(publicId);

    if (!deleted) {
      return {
        success: false,
        error: "Impossible de supprimer l'image",
      };
    }

    return { success: true, data: undefined };
  } catch (error) {
    console.error("[deleteVehicleImage]", error);
    if (isCloudinaryTimeout(error)) {
      return {
        success: false,
        error:
          "Cloudinary a mis trop de temps à répondre. Réessayez avec une image plus légère.",
      };
    }
    return { success: false, error: "Erreur lors de la suppression" };
  }
}
