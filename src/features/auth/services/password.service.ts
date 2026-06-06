//import * as argon2 from "argon2";
import bcrypt from "bcryptjs";

/* const ARGON2_OPTIONS: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 65536,
  timeCost: 3,
  parallelism: 4,
}; */

export async function hashPassword(password: string): Promise<string> {
  // return argon2.hash(password, ARGON2_OPTIONS);
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  try {
    // return await argon2.verify(hash, password);
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

export function validatePasswordStrength(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8)
    errors.push("Password must be at least 8 characters");
  if (!/[A-Z]/.test(password))
    errors.push("Password must contain at least one uppercase letter");
  if (!/[a-z]/.test(password))
    errors.push("Password must contain at least one lowercase letter");
  if (!/[0-9]/.test(password))
    errors.push("Password must contain at least one number");

  return { valid: errors.length === 0, errors };
}
