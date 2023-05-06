import type { AxiosRequestConfig } from "axios";
import type { GetServerSidePropsContext } from "next";

import axios from "axios";
import { parseCookies } from "nookies";

import { apiAuthRefreshTokens } from "generated/auth/apiClient";
import type { AppErrorResponse } from "generated/common/api-client";
import type { AuthTokenPair } from "generated/common/types";

import { authCreateCookiesFromTokenPair, authRemoveCookies } from "auth/cookies";

/**
 * Interceptor that adds access tokens to api calls.
 * If no access token is found, but a refresh token is available, it goes in to the refresh
 * state;
 * - Temporarily adds all new requests to a queue
 * - Calls the refresh tokens endpoint
 *    - If fails, removes the refresh token and just lets all other requests go through
 *    - If successfully, runs all requests in the queue and resolves the current request
 */
export function authAxiosRequestInterceptor(
  context?: GetServerSidePropsContext,
): (config: AxiosRequestConfig) => Promise<AxiosRequestConfig> {
  let isRefreshing = false;
  const queueWhileRefreshing: (() => void)[] = [];

  // Only used in SSR context, keeping a local copy of the tokens before setting them as
  // cookies. This is necessary since 'parseCookies' does not read the cookies that are
  // already set on the response.
  let tokenCache: AuthTokenPair | undefined = undefined;

  const interceptor = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    let cookies = tokenCache ?? (parseCookies(context) as AuthTokenPair);

    if (isRefreshing) {
      return new Promise<void>(r => {
        queueWhileRefreshing.push(r);
      }).then(() => interceptor(config));
    }

    if (!cookies.accessToken && cookies.refreshToken) {
      isRefreshing = true;

      try {
        cookies = await apiAuthRefreshTokens(axios.create({ baseURL: config.baseURL }), {
          refreshToken: cookies.refreshToken,
        });

        if (context) {
          tokenCache = cookies;
        }

        authCreateCookiesFromTokenPair(cookies, context);
      } catch {
        // If we can't refresh, we can safely remove the refresh token
        // This way this refresh logic isn't triggered for any subsequent requests
        authRemoveCookies(context);
      }

      isRefreshing = false;
      while (queueWhileRefreshing.length) {
        queueWhileRefreshing.pop()?.();
      }
    }

    if (cookies.accessToken) {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = `Bearer ${cookies.accessToken}`;
    }

    return config;
  };

  return interceptor;
}

/**
 * Interceptor that removes tokens on unauthorized api calls
 */
export function authAxiosResponseErrorInterceptor(
  context?: GetServerSidePropsContext,
): (error: unknown) => Promise<unknown> {
  const interceptor = async (error: unknown): Promise<unknown> => {
    if (isAppErrorResponse(error) && error.response?.data?.key === "sessionStore.get.invalidSession") {
      authRemoveCookies(context);
    }

    return Promise.reject(error);
  };

  return interceptor;
}

function isAppErrorResponse(error: unknown): error is AppErrorResponse {
  return !!error && axios.isAxiosError(error);
}
