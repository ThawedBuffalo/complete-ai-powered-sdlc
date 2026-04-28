import type { User } from "./types";

export const MAX_USER_NAME_LENGTH = 40;

export function normalizeUserName(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function validateUniqueUserName(
  value: string,
  users: User[],
): string | null {
  const normalized = normalizeUserName(value);

  if (!normalized) {
    return "Name is required.";
  }

  if (normalized.length > MAX_USER_NAME_LENGTH) {
    return `Name must be ${MAX_USER_NAME_LENGTH} characters or fewer.`;
  }

  const duplicate = users.some(
    (user) => user.name.toLowerCase() === normalized.toLowerCase(),
  );

  if (duplicate) {
    return "This name already exists. Please choose a unique name.";
  }

  return null;
}
