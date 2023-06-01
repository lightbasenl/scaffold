// Generated by @compas/code-gen

import type {
  QueryClient,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { AppErrorResponse } from "generated/common/api-client";
import type { Pretty } from "generated/common/api-client-wrapper";
import { useApi } from "generated/common/api-client-wrapper";
import type {
  AuthTotpProviderInfoResponse,
  AuthTotpProviderRemoveForUserParams,
  AuthTotpProviderRemoveForUserResponse,
  AuthTotpProviderRemoveResponse,
  AuthTotpProviderSetupBody,
  AuthTotpProviderSetupResponse,
  AuthTotpProviderSetupVerifyBody,
  AuthTotpProviderSetupVerifyResponse,
  AuthTotpProviderVerifyBody,
  AuthTotpProviderVerifyResponse,
} from "generated/common/types";

import {
  apiAuthTotpProviderInfo,
  apiAuthTotpProviderRemove,
  apiAuthTotpProviderRemoveForUser,
  apiAuthTotpProviderSetup,
  apiAuthTotpProviderSetupVerify,
  apiAuthTotpProviderVerify,
} from "./apiClient";
/**
 * Check if TOTP is set up and if the setup is verified.
 *
 */
export function useAuthTotpProviderInfo<TData = AuthTotpProviderInfoResponse>(
  opts: Pretty<
    { requestConfig?: AxiosRequestConfig } & {
      queryOptions?: UseQueryOptions<AuthTotpProviderInfoResponse, AppErrorResponse, TData>;
    }
  > = {},
) {
  const axiosInstance = useApi();
  const options = opts?.queryOptions ?? {};
  return useQuery(
    useAuthTotpProviderInfo.queryKey(),
    ({ signal }) => {
      opts.requestConfig ??= {};
      opts.requestConfig.signal = signal;

      return apiAuthTotpProviderInfo(axiosInstance, opts?.requestConfig);
    },
    options,
  );
}
/**
 * Base key used by useAuthTotpProviderInfo.queryKey()
 */
useAuthTotpProviderInfo.baseKey = (): QueryKey => ["authTotpProvider", "info"];

/**
 * Query key used by useAuthTotpProviderInfo
 */
useAuthTotpProviderInfo.queryKey = (): QueryKey => [...useAuthTotpProviderInfo.baseKey()];

/**
 * Fetch useAuthTotpProviderInfo via the queryClient and return the result
 */
useAuthTotpProviderInfo.fetch = (
  queryClient: QueryClient,
  axiosInstance: AxiosInstance,
  opts?: Pretty<{ requestConfig?: AxiosRequestConfig }>,
) => {
  return queryClient.fetchQuery(useAuthTotpProviderInfo.queryKey(), () => {
    return apiAuthTotpProviderInfo(axiosInstance, opts?.requestConfig);
  });
};

/**
 * Prefetch useAuthTotpProviderInfo via the queryClient
 */
useAuthTotpProviderInfo.prefetch = (
  queryClient: QueryClient,
  axiosInstance: AxiosInstance,
  opts?: Pretty<{ requestConfig?: AxiosRequestConfig }>,
) => {
  return queryClient.prefetchQuery(useAuthTotpProviderInfo.queryKey(), () => {
    return apiAuthTotpProviderInfo(axiosInstance, opts?.requestConfig);
  });
};

/**
 * Invalidate useAuthTotpProviderInfo via the queryClient
 */
useAuthTotpProviderInfo.invalidate = (queryClient: QueryClient) =>
  queryClient.invalidateQueries(useAuthTotpProviderInfo.queryKey());

/**
 * Set query data for useAuthTotpProviderInfo via the queryClient
 */
useAuthTotpProviderInfo.setQueryData = (
  queryClient: QueryClient,

  data: AuthTotpProviderInfoResponse,
) => {
  return queryClient.setQueryData(useAuthTotpProviderInfo.queryKey(), data);
};

/**
 * Remove the totp setup, we expect that users have short-lived sessions. So no
 * extra verification is required to remove the totp setup.
 *
 * Errors:
 * - `authTotpProvider.remove.totpNotConfigured` -> remove is called, while no totp
 *   is configured for this user.
 *
 */
type UseAuthTotpProviderRemoveProps = Pretty<{ requestConfig?: AxiosRequestConfig }>;
export function useAuthTotpProviderRemove(
  options: UseMutationOptions<
    AuthTotpProviderRemoveResponse,
    AppErrorResponse,
    UseAuthTotpProviderRemoveProps
  > = {},
): UseMutationResult<
  AuthTotpProviderRemoveResponse,
  AppErrorResponse,
  UseAuthTotpProviderRemoveProps,
  unknown
> {
  const axiosInstance = useApi();
  const queryClient = useQueryClient();
  return useMutation(
    variables => apiAuthTotpProviderRemove(axiosInstance, variables?.requestConfig),
    options,
  );
}

/**
 * Remove the totp setup for the provided user.
 *
 * Errors:
 * - Inherits `authRequireUser` errors with the `authTotpProvider.removeForUser`
 *   eventKey.
 * - `authTotpProvider.removeForUser` -> remove is called for a user that doesn't
 *   have totp configured.
 *
 * Tags: ["auth:totp:manage"]
 *
 */
type UseAuthTotpProviderRemoveForUserProps = Pretty<
  AuthTotpProviderRemoveForUserParams & { requestConfig?: AxiosRequestConfig }
>;
export function useAuthTotpProviderRemoveForUser(
  options: UseMutationOptions<
    AuthTotpProviderRemoveForUserResponse,
    AppErrorResponse,
    UseAuthTotpProviderRemoveForUserProps
  > = {},
): UseMutationResult<
  AuthTotpProviderRemoveForUserResponse,
  AppErrorResponse,
  UseAuthTotpProviderRemoveForUserProps,
  unknown
> {
  const axiosInstance = useApi();
  const queryClient = useQueryClient();
  return useMutation(
    variables =>
      apiAuthTotpProviderRemoveForUser(axiosInstance, { user: variables["user"] }, variables?.requestConfig),
    options,
  );
}

/**
 * Initiate the totp provider setup. The setup needs to be verified via
 * `apiAuthTotpProviderSetupVerify`. If an existing totp setup is not yet verified,
 * the original one is removed, and a new setup is initiated.
 *
 * Errors:
 * - `authTotpProvider.setup.alreadySetUp` -> an existing totp setup exists, and is
 *   already verified.
 *
 */
type UseAuthTotpProviderSetupProps = Pretty<
  AuthTotpProviderSetupBody & { requestConfig?: AxiosRequestConfig }
>;
export function useAuthTotpProviderSetup(
  options: UseMutationOptions<
    AuthTotpProviderSetupResponse,
    AppErrorResponse,
    UseAuthTotpProviderSetupProps
  > = {},
): UseMutationResult<
  AuthTotpProviderSetupResponse,
  AppErrorResponse,
  UseAuthTotpProviderSetupProps,
  unknown
> {
  const axiosInstance = useApi();
  const queryClient = useQueryClient();
  return useMutation(
    variables => apiAuthTotpProviderSetup(axiosInstance, {}, variables?.requestConfig),
    options,
  );
}

/**
 * Verify the initiated setup via `apiAuthTotpProviderSetup`.
 *
 * Errors:
 * - `authTotpProvider.setupVerify.totpNotConfigured` -> `setupVerify` is called,
 *   but `setup` isn't. So nothing to verify.
 * - `authTotpProvider.setupVerify.totpAlreadyVerified` -> setup is already
 *   verified.
 * - `authTotpProvider.setupVerify.invalidTotp` -> invalid `totp` to verify the
 *   setup.
 *
 */
type UseAuthTotpProviderSetupVerifyProps = Pretty<
  AuthTotpProviderSetupVerifyBody & { requestConfig?: AxiosRequestConfig }
>;
export function useAuthTotpProviderSetupVerify(
  options: UseMutationOptions<
    AuthTotpProviderSetupVerifyResponse,
    AppErrorResponse,
    UseAuthTotpProviderSetupVerifyProps
  > = {},
): UseMutationResult<
  AuthTotpProviderSetupVerifyResponse,
  AppErrorResponse,
  UseAuthTotpProviderSetupVerifyProps,
  unknown
> {
  const axiosInstance = useApi();
  const queryClient = useQueryClient();
  return useMutation(
    variables =>
      apiAuthTotpProviderSetupVerify(axiosInstance, { totp: variables["totp"] }, variables?.requestConfig),
    options,
  );
}

/**
 * Call this when `ctx.session.type === "checkTwoStep"`. Advances the session to
 * `type: user` on a successful verification.
 *
 * Errors:
 * - `authTotpProvider.verify.totpNotConfigured` -> verify is called, while no totp
 *   is configured for this user.
 * - `authTotpProvider.verify.totpNotVerified` -> totp is not verified, can only
 *   happen if multiple two-step providers are configured, and the wrong one is
 *   selected.
 * - `authTotpProvider.verify.invalidTotp` -> invalid `totp`, prompt user for a new
 *   totp.
 *
 */
type UseAuthTotpProviderVerifyProps = Pretty<
  AuthTotpProviderVerifyBody & { requestConfig?: AxiosRequestConfig }
>;
export function useAuthTotpProviderVerify(
  options: UseMutationOptions<
    AuthTotpProviderVerifyResponse,
    AppErrorResponse,
    UseAuthTotpProviderVerifyProps
  > = {},
): UseMutationResult<
  AuthTotpProviderVerifyResponse,
  AppErrorResponse,
  UseAuthTotpProviderVerifyProps,
  unknown
> {
  const axiosInstance = useApi();
  const queryClient = useQueryClient();
  return useMutation(
    variables =>
      apiAuthTotpProviderVerify(axiosInstance, { totp: variables["totp"] }, variables?.requestConfig),
    options,
  );
}
