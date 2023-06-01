// Generated by @compas/code-gen

import type { UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosRequestConfig } from "axios";
import type { AppErrorResponse } from "../common/api-client";
import { useApi } from "../common/api-client-wrapper";
import type { AuthAnonymousBasedLoginBody, AuthAnonymousBasedTokenPair } from "../common/types";
import { apiAuthAnonymousBasedLogin } from "./apiClient";
/**
 * Let an anonymous based user login with the specified token.
 *
 * Errors:
 * - `authAnonymousBased.login.unknownToken` -> can't find a user with the provided
 *   token
 * - `authAnonymousBased.login.tokenIsNotAllowedToLogin` -> token is not allowed to
 *   log in.
 *
 */
type UseAuthAnonymousBasedLoginProps = AuthAnonymousBasedLoginBody & { requestConfig?: AxiosRequestConfig };
export function useAuthAnonymousBasedLogin(
  options: UseMutationOptions<
    AuthAnonymousBasedTokenPair,
    AppErrorResponse,
    UseAuthAnonymousBasedLoginProps
  > = {},
): UseMutationResult<
  AuthAnonymousBasedTokenPair,
  AppErrorResponse,
  UseAuthAnonymousBasedLoginProps,
  unknown
> {
  const axiosInstance = useApi();
  const queryClient = useQueryClient();
  return useMutation(
    variables =>
      apiAuthAnonymousBasedLogin(
        axiosInstance,
        { token: variables["token"], device: variables["device"] },
        variables?.requestConfig,
      ),
    options,
  );
}
