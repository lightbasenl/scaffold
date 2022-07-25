import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import tenantsConfig from "../config/tenants.json";

const PUBLIC_FILE = /\.(.*)$/;

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.includes("/api/") ||
    PUBLIC_FILE.test(url.pathname) ||
    url.pathname === "/412"
  ) {
    return NextResponse.next();
  }

  // Get hostname of request
  let hostname = req.headers.get("host") ?? "";

  // For development purposes, it is possible to force a specific origin. This
  // will always overwrite the hostname. This is allso used in resolveTenantConfig.
  if (!!process.env.TENANT_ORIGIN) {
    hostname = process.env.TENANT_ORIGIN;
  }

  const tenantHostnames = Object.values(tenantsConfig.tenants)
    .map(it => Object.keys(it.urlConfig))
    .flat();

  if (!tenantHostnames.includes(hostname)) {
    return NextResponse.redirect(new URL("/412", req.url));
  }

  // rewrite everything else to `/_tenants/[tenant]` dynamic route
  url.pathname = `/_tenants/${hostname}${url.pathname}`;

  return NextResponse.rewrite(url);
}
