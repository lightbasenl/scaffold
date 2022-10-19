// Generated by @compas/code-gen
/* eslint-disable no-unused-vars, @typescript-eslint/no-explicit-any, unused-imports/no-unused-imports, @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface, @typescript-eslint/ban-types */

import type { AxiosInstance } from "axios";

import type * as T from "generated/common/types";

/**
 * Check if TOTP is set up and if the setup is verified.
 *
 */
export async function apiAuthTotpProviderInfo(
  instance: AxiosInstance,
  requestConfig: { signal?: AbortSignal | undefined } = {},
): Promise<T.AuthTotpProviderInfoResponseApi> {
  const response = await instance.request({
    url: `auth/totp-provider/`,
    method: "get",
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
 * is configured for this user.
 *
 */
export async function apiAuthTotpProviderRemove(
  instance: AxiosInstance,
  requestConfig: { signal?: AbortSignal | undefined } = {},
): Promise<T.AuthTotpProviderRemoveResponseApi> {
  const response = await instance.request({
    url: `auth/totp-provider/remove`,
    method: "delete",
    ...requestConfig,
  });
  return response.data;
}

/**
 * Remove the totp setup for the provided user.
 *
 * Errors:
 * - Inherits `authRequireUser` errors with the `authTotpProvider.removeForUser`
 * eventKey.
 * - `authTotpProvider.removeForUser` -> remove is called for a user that doesn't
 * have totp configured.
 *
 * Tags: auth:totp:manage
 *
 */
export async function apiAuthTotpProviderRemoveForUser(
  instance: AxiosInstance,
  params: T.AuthTotpProviderRemoveForUserParamsInput,
  requestConfig: { signal?: AbortSignal | undefined } = {},
): Promise<T.AuthTotpProviderRemoveForUserResponseApi> {
  const response = await instance.request({
    url: `auth/totp-provider/user/${params.user}/remove`,
    method: "delete",
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
 * already verified.
 *
 */
export async function apiAuthTotpProviderSetup(
  instance: AxiosInstance,
  body: T.AuthTotpProviderSetupBodyInput,
  requestConfig: { signal?: AbortSignal | undefined } = {},
): Promise<T.AuthTotpProviderSetupResponseApi> {
  const data = body;
  const response = await instance.request({
    url: `auth/totp-provider/setup`,
    method: "post",
    data,
    ...requestConfig,
  });
  return response.data;
}

/**
 * Verify the initiated setup via `apiAuthTotpProviderSetup`.
 *
 * Errors:
 * - `authTotpProvider.setupVerify.totpNotConfigured` -> `setupVerify` is called,
 * but `setup` isn't. So nothing to verify.
 * - `authTotpProvider.setupVerify.totpAlreadyVerified` -> setup is already
 * verified.
 * - `authTotpProvider.setupVerify.invalidTotp` -> invalid `totp` to verify the
 * setup.
 *
 */
export async function apiAuthTotpProviderSetupVerify(
  instance: AxiosInstance,
  body: T.AuthTotpProviderSetupVerifyBodyInput,
  requestConfig: { signal?: AbortSignal | undefined } = {},
): Promise<T.AuthTotpProviderSetupVerifyResponseApi> {
  const data = body;
  const response = await instance.request({
    url: `auth/totp-provider/setup/verify`,
    method: "post",
    data,
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
 * is configured for this user.
 * - `authTotpProvider.verify.totpNotVerified` -> totp is not verified, can only
 * happen if multiple two-step providers are configured, and the wrong one is
 * selected.
 * - `authTotpProvider.verify.invalidTotp` -> invalid `totp`, prompt user for a new
 * totp.
 *
 */
export async function apiAuthTotpProviderVerify(
  instance: AxiosInstance,
  body: T.AuthTotpProviderVerifyBodyInput,
  requestConfig: { signal?: AbortSignal | undefined } = {},
): Promise<T.AuthTotpProviderVerifyResponseApi> {
  const data = body;
  const response = await instance.request({
    url: `auth/totp-provider/verify`,
    method: "post",
    data,
    ...requestConfig,
  });
  return response.data;
}
