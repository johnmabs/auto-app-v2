// src/features/users/actions/user.actions.ts
"use server";

import {
  requireAdmin,
  requireAuth,
  requireSuperAdmin,
} from "@/shared/guards/session.guard";
import { UserPermissions } from "../permissions/user.permissions";
import { userService } from "../services/user.service";
import {
  createUserSchema,
  updateUserSchema,
  updateUserRoleSchema,
  userFilterSchema,
} from "../schemas/user.schema";
import { paginationSchema } from "@/shared/types/pagination";
import { actionSuccess } from "@/shared/types/action-response";
import { handleActionError } from "@/shared/utils/handle-action-error";
import { formDataToObject } from "@/shared/utils/form-data";

export async function createUserAction(
  _prevState: unknown,
  formData: FormData,
) {
  try {
    const actor = await requireAdmin();
    UserPermissions.canCreate(actor);

    const parsed = createUserSchema.parse(formDataToObject(formData));
    const user = await userService.create(parsed);

    return actionSuccess(user, "User created successfully");
  } catch (error) {
    return handleActionError(error);
  }
}

export async function updateUserAction(
  id: string,
  _prevState: unknown,
  formData: FormData,
) {
  try {
    const actor = await requireAuth();

    // Users can update themselves, admins can update anyone
    if (actor.id !== id) {
      UserPermissions.canCreate(actor); // reuse admin check
    }

    const parsed = updateUserSchema.parse(formDataToObject(formData));
    const user = await userService.update(id, parsed);

    return actionSuccess(user, "User updated successfully");
  } catch (error) {
    return handleActionError(error);
  }
}

export async function updateUserRoleAction(
  id: string,
  _prevState: unknown,
  formData: FormData,
) {
  try {
    const actor = await requireSuperAdmin();
    UserPermissions.canUpdateRole(actor);

    const parsed = updateUserRoleSchema.parse(formDataToObject(formData));
    const user = await userService.updateRole(id, parsed, actor);

    return actionSuccess(user, "User role updated");
  } catch (error) {
    return handleActionError(error);
  }
}

export async function deactivateUserAction(id: string) {
  try {
    const actor = await requireSuperAdmin();
    UserPermissions.canDeactivate(actor);

    const user = await userService.deactivate(id, actor.id);

    return actionSuccess(user, "User deactivated");
  } catch (error) {
    return handleActionError(error);
  }
}

export async function reactivateUserAction(id: string) {
  try {
    await requireSuperAdmin();

    const user = await userService.reactivate(id);

    return actionSuccess(user, "User reactivated");
  } catch (error) {
    return handleActionError(error);
  }
}

export async function listUsersAction(filters: unknown, pagination: unknown) {
  try {
    const actor = await requireSuperAdmin();
    UserPermissions.canListAll(actor);

    const parsedFilters = userFilterSchema.parse(filters ?? {});
    const parsedPagination = paginationSchema.parse(pagination ?? {});
    const result = await userService.list(parsedFilters, parsedPagination);

    return actionSuccess(result);
  } catch (error) {
    return handleActionError(error);
  }
}

export async function getUserByIdAction(id: string) {
  try {
    const actor = await requireAuth();

    if (actor.id !== id) {
      UserPermissions.canListAll(actor);
    }

    const user = await userService.getById(id);
    return actionSuccess(user);
  } catch (error) {
    return handleActionError(error);
  }
}
