import { env } from "@/config/env";
import { v2 as cloudinary } from "cloudinary";

/* ── Configuration ───────────────────────────────────────── */
export const UPLOAD_TIMEOUT_MS = 120_000;
export const DELETE_TIMEOUT_MS = 30_000;

let configured = false;
function getCloudinary() {
  if (!configured) {
    cloudinary.config({
      cloud_name: env.CLOUDINARY_CLOUD_NAME,
      api_key: env.CLOUDINARY_API_KEY,
      api_secret: env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    configured = true;
  }

  return cloudinary;
}

export default getCloudinary();
