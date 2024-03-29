import type { InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { apiAuthRefreshTokens } from "../generated/auth/apiClient";
import type { AppErrorResponse } from "../generated/common/api-client";
import { authCreateCookiesFromTokenPair, authParseCookies, authRemoveCookies } from "./cookies";

/**
 * Interceptor that adds access tokens to api calls.
 * If no access token is found, but a refresh token is available, it goes in to the refresh
 * state;
 * - Temporarily adds all new requests to a queue
 * - Calls the refresh tokens endpoint
 *    - If fails, removes the refresh token and just lets all other requests go through
 *    - If successfully, runs all requests in the queue and resolves the current request
 */
export function authAxiosRequestInterceptor(): (
  config: InternalAxiosRequestConfig,
) => Promise<InternalAxiosRequestConfig> {
  let isRefreshing = false;
  const queueWhileRefreshing: (() => void)[] = [];

  const interceptor = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    let cookies = authParseCookies();

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

        authCreateCookiesFromTokenPair(cookies);
      } catch {
        // If we can't refresh, we can safely remove the refresh token
        // This way this refresh logic isn't triggered for any subsequent requests
        authRemoveCookies();
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
export function authAxiosResponseErrorInterceptor(): (error: unknown) => Promise<unknown> {
  const interceptor = async (error: unknown): Promise<unknown> => {
    if (isAppErrorResponse(error) && error.response?.data?.key === "sessionStore.get.invalidSession") {
      authRemoveCookies();
    }

    return Promise.reject(error);
  };

  return interceptor;
}

function isAppErrorResponse(error: unknown): error is AppErrorResponse {
  return !!error && axios.isAxiosError(error);
}
