import hash from "@emotion/hash";
import { Global, css } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import React, { useState } from "react";
import { setup, tw } from "twind";
import { authAxiosRequestInterceptor, authAxiosResponseErrorInterceptor } from "./auth/interceptors";
import { Router } from "./components/Router";
import { ApiProvider } from "./generated/common/api-client-wrapper";

setup({
  hash: string => "lbmgt-" + hash(string),
});

/**
 * Entry point for the internal management pages.
 * Sets a few expectations:
 * - Runs completely client-side
 * - Has complete control of `/_lightbase/...` routes
 *
 * Includes its own QueryClient and Axios instance, and is not dependant on the auth setup of
 * the host.
 */
export function InternalManagement({ apiUrl, tenantOrigin }: { apiUrl: string; tenantOrigin?: string }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 15 * 1000, // 60 seconds
            retry: (failureCount: number, error: unknown) => {
              if (process.env.NODE_ENV !== "production") {
                return false;
              }

              // Retry (max. 3 times) only if network error detected
              return (
                error instanceof AxiosError && error.message === "Network request failed" && failureCount <= 3
              );
            },
          },
        },
      }),
  );

  const [axiosInstance] = useState(() => {
    const instance = axios.create({
      baseURL: apiUrl,
      headers: {
        ...(tenantOrigin ? { "x-lpc-tenant-origin": tenantOrigin } : {}),
      },
    });

    instance.interceptors.request.use(authAxiosRequestInterceptor());
    instance.interceptors.response.use(undefined, authAxiosResponseErrorInterceptor());

    return instance;
  });

  return (
    <React.StrictMode>
      <div className={tw(`h-full`)}>
        <div className={tw`relative h-full overflow-y-auto bg-gray-50 font-sans`}>
          <Head>
            <title>Platform Management</title>
          </Head>

          <Global
            styles={css`
              * {
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                -webkit-tap-highlight-color: transparent;
              }

              html,
              body,
              #__next {
                min-height: 100%;
              }
            `}
          />

          <QueryClientProvider client={queryClient}>
            <ApiProvider instance={axiosInstance}>
              <Router />
            </ApiProvider>
          </QueryClientProvider>
        </div>
      </div>
    </React.StrictMode>
  );
}
