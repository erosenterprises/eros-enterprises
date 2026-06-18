import { Prisma } from "@prisma/client";

const RECOVERABLE_DATABASE_ERROR_CODES = new Set([
  "P1000",
  "P1001",
  "P1002",
  "P1008",
  "P1009",
  "P1010",
  "P1011",
  "P1017",
  "P2021",
  "P2022",
  "ECONNREFUSED",
  "ECONNRESET",
  "ETIMEDOUT",
  "ENOTFOUND",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "ERR_SSL_WRONG_VERSION_NUMBER",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
]);

function isErrorWithCode(
  error: unknown,
): error is {
  code: string;
  message?: string;
} {
  return typeof error === "object" && error !== null && "code" in error;
}

export function isRecoverableDatabaseError(error: unknown) {
  try {
    if (
      (typeof Prisma?.PrismaClientInitializationError !== "undefined" &&
        error instanceof Prisma.PrismaClientInitializationError) ||
      (typeof Prisma?.PrismaClientRustPanicError !== "undefined" &&
        error instanceof Prisma.PrismaClientRustPanicError)
    ) {
      return true;
    }
  } catch {
    return false;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return RECOVERABLE_DATABASE_ERROR_CODES.has(error.code);
  }

  if (isErrorWithCode(error)) {
    return RECOVERABLE_DATABASE_ERROR_CODES.has(error.code);
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    return (
      message.includes("can't reach database server") ||
      message.includes("does not exist in the current database") ||
      message.includes("table") && message.includes("does not exist") ||
      message.includes("connection refused") ||
      message.includes("failed to connect") ||
      // SSL errors from Railway public proxy
      message.includes("ssl") ||
      message.includes("certificate") ||
      message.includes("self signed") ||
      message.includes("handshake") ||
      message.includes("enotfound") ||
      message.includes("econnrefused") ||
      message.includes("etimedout") ||
      message.includes("connect timeout") ||
      message.includes("getaddrinfo")
    );
  }

  return false;
}

export function getDatabaseErrorMessage(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2021" || error.code === "P2022") {
      return "The database schema is behind the application code. Run Prisma migrations and regenerate the client before continuing.";
    }

    if (error.code === "P1001" || error.code === "P1017" || error.code === "ECONNREFUSED") {
      return "The application could not connect to PostgreSQL. Verify DATABASE_URL, PostgreSQL availability, and local firewall or proxy settings.";
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return "Prisma could not initialize the database connection. Verify DATABASE_URL and Prisma client generation.";
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return "The database is temporarily unavailable or not fully migrated.";
}

export function logRecoverableDatabaseError(scope: string, error: unknown) {
  console.error(`[database:${scope}]`, getDatabaseErrorMessage(error), error);
}

export async function withDatabaseFallback<T>(
  scope: string,
  fallback: T,
  operation: () => Promise<T>,
) {
  try {
    return await operation();
  } catch (error) {
    if (!isRecoverableDatabaseError(error)) {
      // Log unrecognised errors before re-throwing so Vercel logs show them
      console.error(`[database:${scope}] Unrecoverable error:`, error);
      throw error;
    }

    logRecoverableDatabaseError(scope, error);
    return fallback;
  }
}
