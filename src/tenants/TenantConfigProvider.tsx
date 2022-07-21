import type { PropsWithChildren } from "react";
import React, { createContext } from "react";

import type { SSRConfig } from "tenants/types";

export const TenantConfigContext = createContext<SSRConfig["_lpcTenant"] | undefined>(undefined);

export function TenantConfigProvider({
  tenant,
  children,
}: PropsWithChildren<{ tenant?: SSRConfig["_lpcTenant"] }>) {
  // Provide tenant settings here, i.e. branding colors as css variables.
  return <TenantConfigContext.Provider value={tenant}>{children}</TenantConfigContext.Provider>;
}
