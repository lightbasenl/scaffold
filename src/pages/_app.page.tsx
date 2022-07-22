import "css/tailwind.css";

import { useEffect, useState } from "react";

import type { AppProps } from "next/app";

import { captureException } from "@sentry/hub";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { appWithTranslation } from "next-i18next";
import { ErrorBoundary } from "react-error-boundary";

import { useAuthMe } from "generated/auth/reactQueries";
import { ApiProvider } from "generated/common/reactQuery";

import { TenantConfigProvider } from "tenants/TenantConfigProvider";

import ErrorPage from "pages/_error.page";

import { authAxiosRequestInterceptor, authAxiosResponseErrorInterceptor } from "auth/interceptors";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            retry: false,
          },
        },
      }),
  );

  const [axiosInstance] = useState(() => {
    const client = axios.create({
      baseURL: pageProps._lpcTenant?.apiUrl,
    });

    if (pageProps._lpcTenant?.tenantOriginHeader) {
      client.defaults.headers.common["x-lpc-tenant-origin"] = pageProps._lpcTenant.tenantOriginHeader;
    }

    client.interceptors.request.use(authAxiosRequestInterceptor());
    client.interceptors.response.use(undefined, authAxiosResponseErrorInterceptor());

    return client;
  });

  // We "ping" the authentication endpoint to prevent unwanted logouts when the user is active
  // in the front-end but hasn't performed any API calls in the meantime.
  useEffect(() => {
    if (!queryClient) {
      return;
    }

    const doInvalidate = () =>
      queryClient.invalidateQueries(useAuthMe.queryKey(), {
        // Only invalidate if stale in 2 minutes, otherwise we recently fetched the query anyway,
        // so we won't be logged out yet.
        predicate: query => query.isStaleByTime(2 * 60 * 1000),
      });

    window.addEventListener("mousemove", doInvalidate);
    window.addEventListener("mousedown", doInvalidate);
    window.addEventListener("touchstart", doInvalidate);
    window.addEventListener("keydown", doInvalidate);

    return () => {
      window.removeEventListener("mousemove", doInvalidate);
      window.removeEventListener("mousedown", doInvalidate);
      window.removeEventListener("touchstart", doInvalidate);
      window.removeEventListener("keydown", doInvalidate);
    };
  }, [queryClient]);

  return (
    <ErrorBoundary FallbackComponent={ErrorPage} onError={error => captureException(error)}>
      <div className="flex min-h-screen flex-col">
        <TenantConfigProvider key={pageProps._lpcTenant?.tenant} tenant={pageProps._lpcTenant}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps?.dehydratedState}>
              <ApiProvider instance={axiosInstance}>
                <Component {...pageProps} />
              </ApiProvider>
            </Hydrate>
          </QueryClientProvider>
        </TenantConfigProvider>
      </div>
    </ErrorBoundary>
  );
}

export default appWithTranslation(MyApp);
