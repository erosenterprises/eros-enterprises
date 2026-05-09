import { rm } from "node:fs/promises";
import path from "node:path";

const distDir = process.env.NEXT_DIST_DIR ?? ".next";
const target = path.resolve(process.cwd(), distDir);

try {
  await rm(target, {
    force: true,
    recursive: true,
    maxRetries: 5,
    retryDelay: 250,
  });
} catch (error) {
  if (error instanceof Error && "code" in error && error.code === "ENOENT") {
    process.exit(0);
  }

  console.warn(`[build-cleanup] Could not fully remove ${target}.`, error);
}
