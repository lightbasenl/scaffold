import type { AuthDescription } from "auth/checks";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { dehydrate, QueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useAuthMe } from "generated/auth/reactQueries";
import { useFeatureFlagCurrent } from "generated/featureFlag/reactQueries";

import { getPageProps } from "lib/pageProps";

import type { ResolvedTenant } from "tenants/types";

import { authDescriptionCheck } from "auth/checks";
import { authAxiosRequestInterceptor, authAxiosResponseErrorInterceptor } from "auth/interceptors";

export type PageConfig = {
  authDescription: AuthDescription;
  namespaces?: ("private" | "public")[];
};

export function defaultServerSideProps({ authDescription, namespaces }: PageConfig) {
  return async function (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<unknown>> {
    const queryClient = new QueryClient();

    if (typeof context.query.tenant !== "string") {
      return {
        notFound: true,
      };
    }

    const { _lpcTenant, _nextI18Next } = await getPageProps({
      tenant: context.query.tenant,
      locale: context.locale,
      namespaces: namespaces ?? ["private", "public"],
    });

    const axiosInstance = serverSideApiClient(context, _lpcTenant);

    let authCheckResult: { redirect?: string } = {};
    try {
      const authMe = await useAuthMe.fetch(queryClient, axiosInstance);

      authCheckResult = authDescriptionCheck(authDescription, authMe);
    } catch (e) {
      if (authDescription.enforceSessionType !== "guest") {
        // TODO(platform): what to do when user is guest, but accesses non-guest route
        authCheckResult.redirect = "/";
      }

      // User is a guest, accessing a guest route, continue
    }

    if (authCheckResult.redirect) {
      return {
        redirect: {
          permanent: false,
          destination: authCheckResult.redirect,
        },
      };
    }

    await Promise.all([useFeatureFlagCurrent.prefetch(queryClient, axiosInstance)]);

    return {
      props: {
        _lpcTenant,
        _nextI18Next,
        dehydratedState: dehydrate(queryClient),
      },
    };
  };
}

/**
 * This function is private by design, and shouldn't be necessary anywhere else.
 * You can add common prefetches to `defaultServerSideProps` and otherwise just use client
 * side fetching with loading states.
 */
function serverSideApiClient(context: GetServerSidePropsContext, tenant: ResolvedTenant) {
  const client = axios.create({
    baseURL: tenant.apiUrl,
  });

  if (tenant?.tenantOriginHeader) {
    client.defaults.headers.common["x-lpc-tenant-origin"] = tenant.tenantOriginHeader;
  }

  client.interceptors.request.use(authAxiosRequestInterceptor(context));
  client.interceptors.response.use(undefined, authAxiosResponseErrorInterceptor(context));

  return client;
}
