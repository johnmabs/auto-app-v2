import { z } from "zod";
import { VehicleStatus } from "@generated/prisma/enums";

export const vehicleFiltersSchema = z.object({
  search: z.string().trim().optional(),
  status: z.enum(VehicleStatus).or(z.literal("all")).optional(),
  page: z.coerce.number().int().min(1).default(1),
});
