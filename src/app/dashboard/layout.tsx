import type { ReactNode } from "react";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headersList = await headers();
  const authHeader = headersList.get("authorization");

  let authorized = false;
  if (authHeader?.startsWith("Basic ")) {
    const base64 = authHeader.slice(6);
    const decoded = atob(base64);
    const colonIndex = decoded.indexOf(":");
    if (colonIndex !== -1) {
      const user = decoded.slice(0, colonIndex);
      const pass = decoded.slice(colonIndex + 1);
      const expectedUser = process.env.DASHBOARD_USER ?? "";
      const expectedPass = process.env.DASHBOARD_PASSWORD ?? "";
      if (
        expectedUser.length > 0 &&
        expectedPass.length > 0 &&
        timingSafeEqual(user, expectedUser) &&
        timingSafeEqual(pass, expectedPass)
      ) {
        authorized = true;
      }
    }
  }

  if (!authorized) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Eros Enterprises CRM"',
      },
    }) as unknown as never;
  }

  return (
    <div style={{ background: "#050A14", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
