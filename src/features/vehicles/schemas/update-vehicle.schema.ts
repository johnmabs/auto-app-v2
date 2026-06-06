import { z } from "zod";
import { vehicleFormSchema } from "./vehicle-form.schema";

export const updateVehicleSchema = vehicleFormSchema.extend({
  id: z.string().cuid(),
});
