// src/features/shared/types/action-response.ts
export type ActionSuccess<T = void> = {
  success: true;
  data: T;
  message?: string;
};

export type ActionError = {
  success: false;
  error: string;
  code?: string;
  fieldErrors?: Record<string, string[]>;
};

export type ActionResponse<T = void> = ActionSuccess<T> | ActionError;

export function actionSuccess<T>(data: T, message?: string): ActionSuccess<T> {
  return { success: true, data, message };
}

export function actionError(
  error: string,
  code?: string,
  fieldErrors?: Record<string, string[]>,
): ActionError {
  return { success: false, error, code, fieldErrors };
}
