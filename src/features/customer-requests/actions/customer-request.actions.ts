"use server";

import { requireEditor, requireAuth } from "@/shared/guards/session.guard";
import { assertMinRole } from "@/shared/guards/permission.guard";
import { UserRole } from "@/shared/types/roles";
import { customerRequestService } from "../services/customer-request.service";
import {
  createCustomerRequestSchema,
  updateRequestStatusSchema,
  assignRequestSchema,
  addAdminNoteSchema,
  requestFilterSchema,
} from "../schemas/customer-request.schema";
import { paginationSchema } from "@/shared/types/pagination";
import { actionSuccess } from "@/shared/types/action-response";
import { handleActionError } from "@/shared/utils/handle-action-error";
import { formDataToObject } from "@/shared/utils/form-data";

// Public action — no auth required
export async function createCustomerRequestAction(
  _prevState: unknown,
  formData: FormData,
) {
  try {
    const parsed = createCustomerRequestSchema.parse(
      formDataToObject(formData),
    );
    const request = await customerRequestService.create(parsed);

    return actionSuccess(request, "Request submitted successfully");
  } catch (error) {
    return handleActionError(error);
  }
}

export async function updateRequestStatusAction(
  id: string,
  _prevState: unknown,
  formData: FormData,
) {
  try {
    await requireEditor();
    const parsed = updateRequestStatusSchema.parse(formDataToObject(formData));
    const request = await customerRequestService.updateStatus(id, parsed);

    return actionSuccess(request, "Status updated");
  } catch (error) {
    return handleActionError(error);
  }
}

export async function assignRequestAction(
  id: string,
  _prevState: unknown,
  formData: FormData,
) {
  try {
    await requireEditor();
    const parsed = assignRequestSchema.parse(formDataToObject(formData));
    const request = await customerRequestService.assign(id, parsed);

    return actionSuccess(request, "Request assigned");
  } catch (error) {
    return handleActionError(error);
  }
}

export async function addAdminNoteAction(
  id: string,
  _prevState: unknown,
  formData: FormData,
) {
  try {
    await requireEditor();
    const parsed = addAdminNoteSchema.parse(formDataToObject(formData));
    const request = await customerRequestService.addAdminNote(id, parsed);

    return actionSuccess(request, "Note added");
  } catch (error) {
    return handleActionError(error);
  }
}

export async function archiveRequestAction(id: string) {
  try {
    await requireEditor();
    const request = await customerRequestService.archive(id);

    return actionSuccess(request, "Request archived");
  } catch (error) {
    return handleActionError(error);
  }
}

export async function listCustomerRequestsAction(
  filters: unknown,
  pagination: unknown,
) {
  try {
    await requireEditor();
    const parsedFilters = requestFilterSchema.parse(filters ?? {});
    const parsedPagination = paginationSchema.parse(pagination ?? {});
    const result = await customerRequestService.list(
      parsedFilters,
      parsedPagination,
    );
    return actionSuccess(result);
  } catch (error) {
    return handleActionError(error);
  }
}

export async function listPendingRequestsAction(pagination: unknown) {
  try {
    await requireEditor();
    const parsedPagination = paginationSchema.parse(pagination ?? {});
    const result = await customerRequestService.listPending(parsedPagination);
    return actionSuccess(result);
  } catch (error) {
    return handleActionError(error);
  }
}

export async function listAssignedRequestsAction(
  assignedTo: string,
  pagination: unknown,
) {
  try {
    await requireEditor();
    const user = await requireAuth();
    if (user.id !== assignedTo) {
      assertMinRole(user, UserRole.ADMIN);
    }

    const parsedPagination = paginationSchema.parse(pagination ?? {});
    const result = await customerRequestService.listAssigned(
      assignedTo,
      parsedPagination,
    );
    return actionSuccess(result);
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getCustomerRequestDetailsAction(id: string) {
  try {
    await requireEditor();
    const request = await customerRequestService.getById(id);
    return actionSuccess(request);
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getRequestStatusStatsAction() {
  try {
    await requireEditor();
    const stats = await customerRequestService.getStatusStats();
    return actionSuccess(stats);
  } catch (error) {
    return handleActionError(error);
  }
}
