// Generated by @compas/code-gen

import type { AxiosInstance, AxiosRequestConfig } from "axios";

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

/**
 * Check if TOTP is set up and if the setup is verified.
 *
 * Tags: []
 *
 */
export async function apiAuthTotpProviderInfo(
  axiosInstance: AxiosInstance,
  requestConfig?: AxiosRequestConfig,
): Promise<AuthTotpProviderInfoResponse> {
  const response = await axiosInstance.request({
    url: `auth/totp-provider/`,
    method: "GET",
    ...requestConfig,
  });
  return response.data;
}

/**
 * Remove the totp setup, we expect that users have short-lived sessions. So no
 * extra verification is required to remove the totp setup.
 *
 * Errors:
 * - `authTotpProvider.remove.totpNotConfigured` -> remove is called, while no totp
 *   is configured for this user.
 *
 * Tags: []
 *
 */
export async function apiAuthTotpProviderRemove(
  axiosInstance: AxiosInstance,
  requestConfig?: AxiosRequestConfig,
): Promise<AuthTotpProviderRemoveResponse> {
  const response = await axiosInstance.request({
    url: `auth/totp-provider/remove`,
    method: "DELETE",
    ...requestConfig,
  });
  return response.data;
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
export async function apiAuthTotpProviderRemoveForUser(
  axiosInstance: AxiosInstance,
  params: AuthTotpProviderRemoveForUserParams,
  requestConfig?: AxiosRequestConfig,
): Promise<AuthTotpProviderRemoveForUserResponse> {
  const response = await axiosInstance.request({
    url: `auth/totp-provider/user/${params.user}/remove`,
    method: "DELETE",
    ...requestConfig,
  });
  return response.data;
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
 * Tags: []
 *
 */
export async function apiAuthTotpProviderSetup(
  axiosInstance: AxiosInstance,
  body: AuthTotpProviderSetupBody,
  requestConfig?: AxiosRequestConfig,
): Promise<AuthTotpProviderSetupResponse> {
  const response = await axiosInstance.request({
    url: `auth/totp-provider/setup`,
    method: "POST",
    data: body,
    ...requestConfig,
  });
  return response.data;
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
 * Tags: []
 *
 */
export async function apiAuthTotpProviderSetupVerify(
  axiosInstance: AxiosInstance,
  body: AuthTotpProviderSetupVerifyBody,
  requestConfig?: AxiosRequestConfig,
): Promise<AuthTotpProviderSetupVerifyResponse> {
  const response = await axiosInstance.request({
    url: `auth/totp-provider/setup/verify`,
    method: "POST",
    data: body,
    ...requestConfig,
  });
  return response.data;
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
 * Tags: []
 *
 */
export async function apiAuthTotpProviderVerify(
  axiosInstance: AxiosInstance,
  body: AuthTotpProviderVerifyBody,
  requestConfig?: AxiosRequestConfig,
): Promise<AuthTotpProviderVerifyResponse> {
  const response = await axiosInstance.request({
    url: `auth/totp-provider/verify`,
    method: "POST",
    data: body,
    ...requestConfig,
  });
  return response.data;
}
