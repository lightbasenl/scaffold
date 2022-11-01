import type { GetStaticPropsContext } from "next";

import { InternalManagement } from "@lightbase/internal-management";

import { buildStaticPaths, getPageProps } from "lib/pageProps";

import type { SSRConfig } from "tenants/types";

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  if (typeof ctx.params?.tenant !== "string") {
    throw new Error("Tenant is required!");
  }

  return {
    props: {
      ...(await getPageProps({
        tenant: ctx.params?.tenant,
        locale: ctx.locale,
      })),
    },
  };
};

export function getStaticPaths() {
  const pageTree = buildStaticPaths([
    {
      // We don't need to worry about any nested management page, since that uses client-side
      // routing only.
      management: false,
    },
  ]);

  return {
    paths: pageTree,
    fallback: "blocking",
  };
}

export default function LightbaseInternalManagement({ _lpcTenant }: SSRConfig) {
  return (
    <InternalManagement
      apiUrl={_lpcTenant.apiUrl}
      tenantOrigin={_lpcTenant?.tenantOriginHeader ?? undefined}
    />
  );
}
