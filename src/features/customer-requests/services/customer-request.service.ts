// src/features/customer-requests/services/customer-request.service.ts
import { customerRequestRepository } from "../repositories/customer-request.repository";
import type {
  CreateCustomerRequestInput,
  UpdateRequestStatusInput,
  AssignRequestInput,
  AddAdminNoteInput,
  RequestFilterInput,
} from "../schemas/customer-request.schema";
import { REQUEST_STATUS_TRANSITIONS } from "../schemas/customer-request.schema";
import type { PaginationInput } from "@/shared/types/pagination";
import {
  NotFoundError,
  BusinessRuleError,
} from "@/shared/errors/domain-errors";
import { mapPrismaError } from "@/shared/errors/prisma-error-mapper";
import type { Prisma, RequestStatus } from "@generated/prisma/client";

export const customerRequestService = {
  async getById(id: string) {
    const request = await customerRequestRepository.findById(id);
    if (!request) throw new NotFoundError("CustomerRequest", id);
    return request;
  },

  async create(data: CreateCustomerRequestInput) {
    try {
      return await customerRequestRepository.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        country: data.country,
        city: data.city,
        message: data.message,
        desiredMake: data.desiredMake,
        desiredModel: data.desiredModel,
        budget: data.budget,
        preferredCountry: data.preferredCountry,
        source: data.source,
        referrer: data.referrer,
        ...(data.vehicleId
          ? { vehicle: { connect: { id: data.vehicleId } } }
          : {}),
      });
    } catch (error) {
      throw mapPrismaError(error);
    }
  },

  async updateStatus(id: string, data: UpdateRequestStatusInput) {
    const request = await customerRequestService.getById(id);
    const allowedTransitions = REQUEST_STATUS_TRANSITIONS[request.status];

    if (!allowedTransitions.includes(data.status as RequestStatus)) {
      throw new BusinessRuleError(
        `Cannot transition from ${request.status} to ${data.status}`,
      );
    }

    const updateData: Prisma.CustomerRequestUpdateInput = {
      status: data.status,
    };

    if (data.adminNotes) updateData.adminNotes = data.adminNotes;

    // Set timestamps based on status
    if (data.status === "CONTACTED") updateData.contactedAt = new Date();
    if (["DELIVERED", "CANCELLED"].includes(data.status)) {
      updateData.resolvedAt = new Date();
    }

    return customerRequestRepository.update(id, updateData);
  },

  async assign(id: string, data: AssignRequestInput) {
    await customerRequestService.getById(id);
    return customerRequestRepository.update(id, {
      assignee: { connect: { id: data.assignedTo } },
    });
  },

  async addAdminNote(id: string, data: AddAdminNoteInput) {
    await customerRequestService.getById(id);
    return customerRequestRepository.update(id, {
      adminNotes: data.adminNotes,
    });
  },

  async archive(id: string) {
    const request = await customerRequestService.getById(id);
    if (request.status === "CANCELLED") {
      throw new BusinessRuleError("Request is already cancelled/archived");
    }
    return customerRequestRepository.update(id, {
      status: "CANCELLED",
      resolvedAt: new Date(),
    });
  },

  async list(filters: RequestFilterInput, pagination: PaginationInput) {
    return customerRequestRepository.findMany(filters, pagination);
  },

  async listPending(pagination: PaginationInput) {
    return customerRequestRepository.findMany({ status: ["NEW"] }, pagination);
  },

  async listAssigned(assignedTo: string, pagination: PaginationInput) {
    return customerRequestRepository.findMany({ assignedTo }, pagination);
  },

  async getStatusStats() {
    return customerRequestRepository.countByStatus();
  },
};
