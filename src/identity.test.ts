import { describe, expect, it } from "vitest";
import { validateUniqueUserName } from "./identity";
import type { User } from "./types";

const users: User[] = [
  { id: "u1", name: "Alex", createdAt: "2026-01-01T00:00:00.000Z" },
];

describe("validateUniqueUserName", () => {
  it("returns an error for duplicate names (case-insensitive)", () => {
    const error = validateUniqueUserName(" alex ", users);
    expect(error).toMatch(/already exists/i);
  });

  it("returns an error for empty names", () => {
    const error = validateUniqueUserName("   ", users);
    expect(error).toMatch(/required/i);
  });

  it("returns null for valid unique names", () => {
    const error = validateUniqueUserName("Taylor", users);
    expect(error).toBeNull();
  });
});
