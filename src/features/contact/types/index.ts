export type ContactFormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  values?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  };
};
