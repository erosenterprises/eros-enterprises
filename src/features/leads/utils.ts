import type { Prisma } from "@prisma/client";

const leadNumberPrefix = "ERL";

export function createLeadNumberSeed() {
  const now = new Date();
  const date = [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    String(now.getUTCDate()).padStart(2, "0"),
  ].join("");

  const random = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `${leadNumberPrefix}-${date}-${random}`;
}

export function isUniqueConstraintError(
  error: unknown,
  target?: string,
): error is Prisma.PrismaClientKnownRequestError {
  if (
    typeof error !== "object" ||
    error === null ||
    !("code" in error) ||
    error.code !== "P2002"
  ) {
    return false;
  }

  if (!target || !("meta" in error)) {
    return true;
  }

  const meta = error.meta as { target?: string | string[] } | undefined;
  const metaTarget = Array.isArray(meta?.target) ? meta.target : [meta?.target];

  return metaTarget.includes(target);
}

export function formatLeadAssigneeName(assignedTo: {
  firstName: string;
  lastName: string | null;
} | null) {
  if (!assignedTo) {
    return "Unassigned";
  }

  return [assignedTo.firstName, assignedTo.lastName].filter(Boolean).join(" ");
}
