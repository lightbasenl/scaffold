// Generated by @compas/code-gen
/* eslint-disable no-unused-vars */

import * as T from "../common/types";
import { AxiosInstance } from "axios";



/**
 * Generate a reset token for the provided email. Can be called many times. The
 * tokens expire in 2 days.
 *  
 * Errors:
 * - `authPasswordBased.forgotPassword.unknownEmail` -> email is unknown in the
 * platform
*
*/
export async function apiAuthPasswordBasedForgotPassword(
instance: AxiosInstance,
body: T.AuthPasswordBasedForgotPasswordBodyInput,
requestConfig: { signal?: AbortSignal|undefined } = {},
): Promise<T.AuthPasswordBasedForgotPasswordResponseApi> {
const data = body;
const response = await instance.request({
url: `auth/password-based/forgot-password`,
method: "post",
data,
...requestConfig,
});
return response.data;
}



/**
 *  
*
*/
export async function apiAuthPasswordBasedListEmails(
instance: AxiosInstance,
requestConfig: { signal?: AbortSignal|undefined } = {},
): Promise<T.AuthPasswordBasedListEmailsResponseApi> {
const response = await instance.request({
url: `auth/password-based/`,
method: "get",
...requestConfig,
});
return response.data;
}



/**
 * Do a password based login, requires a verified email.
 *  
 * Errors:
 * - `authPasswordBased.login.unknownEmail` -> can't find a user with the provider
 * email
 * - `authPasswordBased.login.emailNotVerified` -> the password login is not
 * verified
 * - `authPasswordBased.login.invalidEmailPasswordCombination` -> combination of
 * email and password is invalid
*
*/
export async function apiAuthPasswordBasedLogin(
instance: AxiosInstance,
body: T.AuthPasswordBasedLoginBodyInput,
requestConfig: { signal?: AbortSignal|undefined } = {},
): Promise<T.AuthPasswordBasedTokenPairApi> {
const data = body;
const response = await instance.request({
url: `auth/password-based/login`,
method: "post",
data,
...requestConfig,
});
return response.data;
}



/**
 * Set a new password based on the `resetToken` created via
 * `apiAuthPasswordForgotPassword`. Tokens are removed on usage so this route can't
 * be called multiple times.
 *  
 * Errors:
 * - `authPasswordBased.resetPassword.invalidResetToken` -> unknown token or
 * expired. Let the user request a new token via `forgotPassword`
 * - `authPasswordBased.resetPassword.useVerifyEmail` -> token is a verify token,
 * use `verifyEmail`
*
*/
export async function apiAuthPasswordBasedResetPassword(
instance: AxiosInstance,
body: T.AuthPasswordBasedResetPasswordBodyInput,
requestConfig: { signal?: AbortSignal|undefined } = {},
): Promise<T.AuthPasswordBasedResetPasswordResponseApi> {
const data = body;
const response = await instance.request({
url: `auth/password-based/reset-password`,
method: "post",
data,
...requestConfig,
});
return response.data;
}



/**
 * Let a logged-in user change its email to a different one. Destroys all active
 * sessions afterwards. The user email should be verified again.
 *  
 * Errors:
 * - `authPasswordBased.updateEmail.userWithoutPasswordLogin` -> user doesn't have
 * a password based login, so can't use this functionality
 * - `authPasswordBased.updateEmail.emailAlreadyUsed` -> email is already in use by
 * another user
*
*/
export async function apiAuthPasswordBasedUpdateEmail(
instance: AxiosInstance,
body: T.AuthPasswordBasedUpdateEmailBodyInput,
requestConfig: { signal?: AbortSignal|undefined } = {},
): Promise<T.AuthPasswordBasedUpdateEmailResponseApi> {
const data = body;
const response = await instance.request({
url: `auth/password-based/update-email`,
method: "post",
data,
...requestConfig,
});
return response.data;
}



/**
 * Set a new password fort the logged-in user. Destroys all active sessions
 * afterwards.
 *  
 * Errors:
 * - `authPasswordBased.updateEmail.userWithoutPasswordLogin` -> user doesn't have
 * a password based login, so can't use this functionality
*
*/
export async function apiAuthPasswordBasedUpdatePassword(
instance: AxiosInstance,
body: T.AuthPasswordBasedUpdatePasswordBodyInput,
requestConfig: { signal?: AbortSignal|undefined } = {},
): Promise<T.AuthPasswordBasedUpdatePasswordResponseApi> {
const data = body;
const response = await instance.request({
url: `auth/password-based/update-password`,
method: "post",
data,
...requestConfig,
});
return response.data;
}



/**
 * Verify an email based on the provided 'verifyToken'. The token is not removed
 * until expired (after 2 days). Does not throw on multiple calls with the same
 * token. The first verification also updates the `verifiedAt` property on the
 * `passwordLogin` entity.
 *  
 * Errors:
 * - `authPasswordBased.verifyEmail.invalidVerifyToken` -> unknown token or token
 * expired. Redirect user to do a ' forgotPassword' flow.
 * - `authPasswordBased.verifyEmail.useResetPassword` -> token is for
 * `resetPassword` instead of `verifyEmail`
*
*/
export async function apiAuthPasswordBasedVerifyEmail(
instance: AxiosInstance,
body: T.AuthPasswordBasedVerifyEmailBodyInput,
requestConfig: { signal?: AbortSignal|undefined } = {},
): Promise<T.AuthPasswordBasedVerifyEmailResponseApi> {
const data = body;
const response = await instance.request({
url: `auth/password-based/verify-email`,
method: "post",
data,
...requestConfig,
});
return response.data;
}
