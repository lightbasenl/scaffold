import type { SSRConfig, Tenant } from "tenants/types";

import tenantsConfig from "../../config/tenants.json";

export function resolveTenantConfig(currentOrigin: string): SSRConfig {
  if (!tenantsConfig?.tenants) {
    throw new Error("appWithTenants is called without a valid config/tenants.js");
  }

  for (const [name, tenant] of Object.entries(tenantsConfig.tenants) as unknown as [string, Tenant][]) {
    if (!tenant.urlConfig[currentOrigin]) {
      continue;
    }

    // Make sure to pass the origin to pages as well, so that axios instance can use the same
    // origin
    const tenantOriginHeader = process.env.TENANT_ORIGIN ? process.env.TENANT_ORIGIN : undefined;

    // Force use of the local api url instead of the api url found in the config.
    // This way you can develop against local api's
    if (process.env.TENANT_API_URL) {
      return {
        _lpcTenant: {
          tenant: name,
          apiUrl: process.env.TENANT_API_URL,
          tenantOriginHeader,
        },
      };
    }

    const isKnownInsecureUrl = currentOrigin.includes("localhost:");

    return {
      _lpcTenant: {
        tenant: name,
        apiUrl: `${isKnownInsecureUrl ? "http" : "https"}://${tenant.urlConfig[currentOrigin].apiUrl}`,
        tenantOriginHeader,
      },
    };
  }

  throw new Error(`Could not find the api url for the current origin.`);
}
