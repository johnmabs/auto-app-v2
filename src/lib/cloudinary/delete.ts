import { DELETE_TIMEOUT_MS } from "./client";
import getCloudinary from "./client";

export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const options = {
      invalidate: true,
      timeout: DELETE_TIMEOUT_MS,
    };
    const result = await getCloudinary.uploader.destroy(publicId, options);

    return ["ok", "not found"].includes(result.result);
  } catch (error) {
    console.error("[deleteImage]", error);
    return false;
  }
}
