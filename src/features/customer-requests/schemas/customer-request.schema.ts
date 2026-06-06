// src/features/customer-requests/schemas/customer-request.schema.ts
import { z } from "zod";
import { Country, RequestStatus } from "@generated/prisma/enums";

export const requestStatusEnum = z.enum(RequestStatus);
export const countryEnum = z.enum(Country);

export const createCustomerRequestSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100).trim(),
  lastName: z.string().min(1, "Last name is required").max(100).trim(),
  email: z.email("Invalid email").toLowerCase().trim(),
  phone: z
    .string()
    .min(6, "Phone number too short")
    .max(30)
    .regex(/^[+\d\s\-()]+$/, "Invalid phone number format")
    .trim(),
  country: z.string().max(100).trim().optional(),
  city: z.string().max(100).trim().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000).trim(),
  vehicleId: z.cuid2().optional(),
  desiredMake: z.string().max(100).trim().optional(),
  desiredModel: z.string().max(100).trim().optional(),
  budget: z.coerce.number().int().min(0).max(100_000_000).optional(),
  preferredCountry: countryEnum.optional(),
  source: z.string().max(50).trim().optional(),
  referrer: z.url().max(500).optional(),
});

export type CreateCustomerRequestInput = z.infer<typeof createCustomerRequestSchema>;

export const updateRequestStatusSchema = z.object({
  status: requestStatusEnum,
  adminNotes: z.string().max(5000).trim().optional(),
});

export type UpdateRequestStatusInput = z.infer<typeof updateRequestStatusSchema>;

export const assignRequestSchema = z.object({
  assignedTo: z.string().cuid("Invalid user ID"),
});

export type AssignRequestInput = z.infer<typeof assignRequestSchema>;

export const addAdminNoteSchema = z.object({
  adminNotes: z.string().min(1, "Note cannot be empty").max(5000).trim(),
});

export type AddAdminNoteInput = z.infer<typeof addAdminNoteSchema>;

export const requestFilterSchema = z.object({
  status: z.array(requestStatusEnum).optional(),
  assignedTo: z.cuid2().optional(),
  vehicleId: z.cuid2().optional(),
  email: z.email().optional(),
  search: z.string().trim().optional(),
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional(),
});

export type RequestFilterInput = z.infer<typeof requestFilterSchema>;

// Valid status transitions
export const REQUEST_STATUS_TRANSITIONS: Record<RequestStatus, RequestStatus[]> = {
  NEW: ["CONTACTED", "CANCELLED"],
  CONTACTED: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["QUOTE_SENT", "CANCELLED"],
  QUOTE_SENT: ["CONFIRMED", "IN_PROGRESS", "CANCELLED"],
  CONFIRMED: ["DELIVERED", "CANCELLED"],
  DELIVERED: [],
  CANCELLED: [],
};
