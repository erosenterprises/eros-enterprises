import path from "node:path";
import { spawn } from "node:child_process";

const schemaEngines = {
  win32: "schema-engine-windows.exe",
  linux: "schema-engine-linux-musl-openssl-3.0.x",
  darwin: "schema-engine-darwin-arm64",
};

const engineName = schemaEngines[process.platform];
const args = process.argv.slice(2);
const env = { ...process.env };

if (engineName) {
  env.PRISMA_SCHEMA_ENGINE_BINARY = path.resolve(
    process.cwd(),
    "node_modules",
    "@prisma",
    "engines",
    engineName,
  );
}

const prismaBin =
  process.platform === "win32"
    ? path.resolve(process.cwd(), "node_modules", ".bin", "prisma.cmd")
    : path.resolve(process.cwd(), "node_modules", ".bin", "prisma");

const child =
  process.platform === "win32"
    ? spawn(
        process.env.ComSpec ?? "cmd.exe",
        ["/d", "/c", prismaBin, ...args],
        {
          cwd: process.cwd(),
          env,
          stdio: "inherit",
        },
      )
    : spawn(prismaBin, args, {
        cwd: process.cwd(),
        env,
        stdio: "inherit",
      });

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
