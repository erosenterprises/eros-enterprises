import { spawn } from "node:child_process";
import path from "node:path";

const env = { ...process.env };
const memoryFlag = "--max-old-space-size=4096";

env.NODE_OPTIONS = env.NODE_OPTIONS
  ? `${env.NODE_OPTIONS} ${memoryFlag}`.trim()
  : memoryFlag;

const nextBin =
  process.platform === "win32"
    ? path.resolve(process.cwd(), "node_modules", ".bin", "next.cmd")
    : path.resolve(process.cwd(), "node_modules", ".bin", "next");

const child =
  process.platform === "win32"
    ? spawn(
        process.env.ComSpec ?? "cmd.exe",
        ["/d", "/c", nextBin, "build", "--webpack"],
        {
          cwd: process.cwd(),
          env,
          stdio: "inherit",
        },
      )
    : spawn(nextBin, ["build", "--webpack"], {
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
