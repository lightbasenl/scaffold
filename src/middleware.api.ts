import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import tenantsConfig from "../config/tenants.json";

const PUBLIC_FILE = /\.(.*)$/;

let ContentSecurityPolicy = `
  default-src 'self';
  frame-ancestors 'none';
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  font-src 'self' fonts.gstatic.com;
  script-src 'self'
`;

if (process.env.NODE_ENV !== "production") {
  // In development Next.js needs certain sources to be allowed for DX.
  ContentSecurityPolicy = `
    default-src 'self';
    frame-ancestors 'none';
    style-src 'self' 'unsafe-inline' fonts.googleapis.com;
    font-src 'self' fonts.gstatic.com;
    script-src 'self' 'unsafe-eval';
  `;
}

export default function middleware(req: NextRequest) {
  const response = NextResponse.next();

  const url = req.nextUrl;

  // Get hostname of request
  let hostname = req.headers.get("host") ?? "";

  // For development purposes, it is possible to force a specific origin. This
  // will always overwrite the hostname. This is allso used in resolveTenantConfig.
  if (!!process.env.TENANT_ORIGIN) {
    hostname = process.env.TENANT_ORIGIN;
  }

  const tenant = Object.values(tenantsConfig.tenants).find(it => {
    return Object.keys(it.urlConfig).includes(hostname);
  });

  if (tenant) {
    ContentSecurityPolicy = ContentSecurityPolicy.replace(
      `default-src 'self';`,
      `default-src 'self' ${
        process.env.TENANT_API_URL ?? tenant.urlConfig[hostname as keyof typeof tenant.urlConfig].apiUrl
      };`,
    );
  }

  response.headers.append("Content-Security-Policy", ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim());

  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.includes("/api/") ||
    PUBLIC_FILE.test(url.pathname) ||
    url.pathname === "/412"
  ) {
    return response;
  }

  if (!tenant) {
    return NextResponse.redirect(new URL("/412", req.url));
  }

  // rewrite everything else to `/_tenants/[tenant]` dynamic route
  url.pathname = `/_tenants/${hostname}${url.pathname}`;

  return NextResponse.rewrite(url, response);
}
