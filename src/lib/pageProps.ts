import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { resolveTenantConfig } from "tenants/resolveTenantConfig";

import tenantsConfig from "../../config/tenants.json";
import i18nextConfig from "../../next-i18next.config.js";

export async function getStaticPageProps({
  tenant,
  locale,
  namespaces,
}: {
  tenant: string;
  locale?: string;
  namespaces?: string[];
}) {
  return {
    ...(await serverSideTranslations(locale ?? i18nextConfig.i18n.defaultLocale, namespaces ?? ["public"])),
    ...resolveTenantConfig(tenant),
  };
}

/**
 * Returns all possible static paths for tenants and localization combined with the provided
 * mixins.
 */
export function buildStaticPaths<T extends Record<string, unknown>>(mixins: T[]) {
  const paths: {
    locale: string;
    params: { tenant: string } & T;
  }[] = [];

  for (const locale of i18nextConfig.i18n.locales) {
    for (const tenant of Object.values(tenantsConfig.tenants)) {
      for (const tenantPublicUrl of Object.keys(tenant.urlConfig)) {
        for (const mixin of mixins) {
          paths.push({
            locale,
            params: {
              ...mixin,
              tenant: tenantPublicUrl,
            },
          });
        }
      }
    }
  }

  return paths;
}
