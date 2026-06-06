import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DATABASE_URL: z.string().min(1).optional(),
  CLOUDINARY_CLOUD_NAME: z.string().min(1).optional(),
  CLOUDINARY_API_KEY: z.string().min(1).optional(),
  CLOUDINARY_API_SECRET: z.string().min(1).optional(),
  VEHICLE_UPLOAD_FOLDER: z.string().min(1).optional(),
  AUTH_SECRET: z.string().min(1).optional(),
  AUTH_FAKE_HASH: z.string().min(1).optional(),
});

export const env = envSchema.parse(process.env);
