"use server";

import { fileTypeFromBuffer } from "file-type";
import type { ActionResponse } from "@/shared/types";
import type { UploadedVehicleImage } from "../types/vehicle-form.types";
import { requireAdmin } from "@/shared/guards";
import { uploadImage } from "@/lib/cloudinary";
import { env } from "@/config/env";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const VEHICLE_UPLOAD_FOLDER = env.VEHICLE_UPLOAD_FOLDER || "autostore/vehicles";

function isCloudinaryTimeout(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    ("http_code" in error || "name" in error) &&
    ((error as { http_code?: unknown }).http_code === 499 ||
      (error as { name?: unknown }).name === "TimeoutError")
  );
}

export async function uploadVehicleImage(
  formData: FormData,
): Promise<ActionResponse<UploadedVehicleImage>> {
  try {
    await requireAdmin();

    const file = formData.get("file");
    if (!(file instanceof File)) {
      return { success: false, error: "Image manquante" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const detected = await fileTypeFromBuffer(buffer);

    if (!detected?.mime.startsWith("image/")) {
      return {
        success: false,
        error: "Fichier image invalide",
      };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        success: false,
        error: "Format non supporté. JPG, PNG ou WebP uniquement.",
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { success: false, error: "Image trop lourde. Maximum 10 Mo." };
    }

    const result = await uploadImage(buffer, VEHICLE_UPLOAD_FOLDER);

    return {
      success: true,
      data: {
        alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
        url: result.url,
        publicId: result.publicId,
        width: result.width,
        height: result.height,
      },
    };
  } catch (error) {
    console.error("[uploadVehicleImage]", error);

    if (isCloudinaryTimeout(error)) {
      return {
        success: false,
        error:
          "Cloudinary a mis trop de temps à répondre. Réessayez avec une image plus légère.",
      };
    }

    return { success: false, error: "Erreur lors de l'upload de l'image" };
  }
}
