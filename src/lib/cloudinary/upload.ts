import { UploadApiOptions, UploadApiResponse } from "cloudinary";
import { UPLOAD_TIMEOUT_MS } from "./client";
import getCloudinary from "./client";
import { env } from "@/config/env";

/* ── Upload image ────────────────────────────────────────── */
export async function uploadImage(
  file: string | Buffer,
  folder: string = env.VEHICLE_UPLOAD_FOLDER || "autostore/vehicles",
): Promise<{
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}> {
  const options: UploadApiOptions = {
    folder,
    tags: ["vehicle"],
    resource_type: "image",
    timeout: UPLOAD_TIMEOUT_MS,
    transformation: [
      { width: 1200, height: 800, crop: "limit" },
      { quality: "auto:good" },
      { fetch_format: "auto" },
    ],
  };

  const result =
    typeof file === "string"
      ? await getCloudinary.uploader.upload(file, options)
      : await new Promise<UploadApiResponse>((resolve, reject) => {
          const stream = getCloudinary.uploader.upload_stream(
            options,
            (error, uploadResult) => {
              if (error) {
                reject(error);
                return;
              }

              if (!uploadResult) {
                reject(new Error("Cloudinary upload returned no result"));
                return;
              }

              resolve(uploadResult);
            },
          );

          stream.end(file);
        });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
  };
}
