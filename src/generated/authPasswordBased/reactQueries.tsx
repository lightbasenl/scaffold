// Generated by @compas/code-gen
/* eslint-disable no-unused-vars */

import { useApi, AppErrorResponse } from "../common/reactQuery";
import { AxiosInstance } from "axios";
import {
QueryKey,
UseMutationOptions,
UseMutationResult,
UseQueryOptions,
UseQueryResult,
useMutation,
useQuery,
useQueryClient,
QueryClient,
} from "react-query";
import * as T from "../common/types";
import {
apiAuthPasswordBasedForgotPassword,



apiAuthPasswordBasedListEmails,



apiAuthPasswordBasedLogin,



apiAuthPasswordBasedResetPassword,



apiAuthPasswordBasedUpdateEmail,



apiAuthPasswordBasedUpdatePassword,



apiAuthPasswordBasedVerifyEmail,



} from "./apiClient";



interface UseAuthPasswordBasedForgotPasswordProps {
body: T.AuthPasswordBasedForgotPasswordBodyInput,
}
/**
 * Generate a reset token for the provided email. Can be called many times. The
 * tokens expire in 2 days.
 *  
 * Errors:
 * - `authPasswordBased.forgotPassword.unknownEmail` -> email is unknown in the
 * platform
*/
export function useAuthPasswordBasedForgotPassword(
options: UseMutationOptions<T.AuthPasswordBasedForgotPasswordResponseApi, AppErrorResponse, UseAuthPasswordBasedForgotPasswordProps> = {},
): UseMutationResult<T.AuthPasswordBasedForgotPasswordResponseApi, AppErrorResponse, UseAuthPasswordBasedForgotPasswordProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthPasswordBasedForgotPassword(
axiosInstance,
variables.body, 
),
options,
);
}



/**
 *  
*/
export function useAuthPasswordBasedListEmails<TData = T.AuthPasswordBasedListEmailsResponseApi>(opts?: {
options?: UseQueryOptions<T.AuthPasswordBasedListEmailsResponseApi, AppErrorResponse, TData> | undefined,
}|undefined) {
const axiosInstance = useApi();
const options = opts?.options ?? {};
return useQuery(useAuthPasswordBasedListEmails.queryKey(
),
({ signal }) => {
return apiAuthPasswordBasedListEmails(
axiosInstance,
{ signal },
);
},
options,
);
}
/**
 * Base key used by useAuthPasswordBasedListEmails.queryKey()
*/
useAuthPasswordBasedListEmails.baseKey = (): QueryKey => ["authPasswordBased", "listEmails"];
/**
 * Query key used by useAuthPasswordBasedListEmails
*/
useAuthPasswordBasedListEmails.queryKey = (
): QueryKey => [
...useAuthPasswordBasedListEmails.baseKey(),
];
/**
 * Fetch useAuthPasswordBasedListEmails via the queryClient and return the result
*/
useAuthPasswordBasedListEmails.fetch = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.fetchQuery(useAuthPasswordBasedListEmails.queryKey(
), () => apiAuthPasswordBasedListEmails(
axiosInstance,
));
/**
 * Prefetch useAuthPasswordBasedListEmails via the queryClient
*/
useAuthPasswordBasedListEmails.prefetch = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.prefetchQuery(useAuthPasswordBasedListEmails.queryKey(
), () => apiAuthPasswordBasedListEmails(
axiosInstance,
));
/**
 * Invalidate useAuthPasswordBasedListEmails via the queryClient
*/
useAuthPasswordBasedListEmails.invalidate = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.invalidateQueries(useAuthPasswordBasedListEmails.queryKey(
));
/**
 * Set data for useAuthPasswordBasedListEmails on the queryClient
*/
useAuthPasswordBasedListEmails.setQueryData = (
queryClient: QueryClient,
data: T.AuthPasswordBasedListEmailsResponseApi,
) => queryClient.setQueryData(useAuthPasswordBasedListEmails.queryKey(
), data);



interface UseAuthPasswordBasedLoginProps {
body: T.AuthPasswordBasedLoginBodyInput,
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
*/
export function useAuthPasswordBasedLogin(
options: UseMutationOptions<T.AuthPasswordBasedTokenPairApi, AppErrorResponse, UseAuthPasswordBasedLoginProps> = {},
): UseMutationResult<T.AuthPasswordBasedTokenPairApi, AppErrorResponse, UseAuthPasswordBasedLoginProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthPasswordBasedLogin(
axiosInstance,
variables.body, 
),
options,
);
}



interface UseAuthPasswordBasedResetPasswordProps {
body: T.AuthPasswordBasedResetPasswordBodyInput,
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
*/
export function useAuthPasswordBasedResetPassword(
options: UseMutationOptions<T.AuthPasswordBasedResetPasswordResponseApi, AppErrorResponse, UseAuthPasswordBasedResetPasswordProps> = {},
): UseMutationResult<T.AuthPasswordBasedResetPasswordResponseApi, AppErrorResponse, UseAuthPasswordBasedResetPasswordProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthPasswordBasedResetPassword(
axiosInstance,
variables.body, 
),
options,
);
}



interface UseAuthPasswordBasedUpdateEmailProps {
body: T.AuthPasswordBasedUpdateEmailBodyInput,
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
*/
export function useAuthPasswordBasedUpdateEmail(
options: UseMutationOptions<T.AuthPasswordBasedUpdateEmailResponseApi, AppErrorResponse, UseAuthPasswordBasedUpdateEmailProps> = {},
): UseMutationResult<T.AuthPasswordBasedUpdateEmailResponseApi, AppErrorResponse, UseAuthPasswordBasedUpdateEmailProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthPasswordBasedUpdateEmail(
axiosInstance,
variables.body, 
),
options,
);
}



interface UseAuthPasswordBasedUpdatePasswordProps {
body: T.AuthPasswordBasedUpdatePasswordBodyInput,
}
/**
 * Set a new password fort the logged-in user. Destroys all active sessions
 * afterwards.
 *  
 * Errors:
 * - `authPasswordBased.updateEmail.userWithoutPasswordLogin` -> user doesn't have
 * a password based login, so can't use this functionality
*/
export function useAuthPasswordBasedUpdatePassword(
options: UseMutationOptions<T.AuthPasswordBasedUpdatePasswordResponseApi, AppErrorResponse, UseAuthPasswordBasedUpdatePasswordProps> = {},
): UseMutationResult<T.AuthPasswordBasedUpdatePasswordResponseApi, AppErrorResponse, UseAuthPasswordBasedUpdatePasswordProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthPasswordBasedUpdatePassword(
axiosInstance,
variables.body, 
),
options,
);
}



interface UseAuthPasswordBasedVerifyEmailProps {
body: T.AuthPasswordBasedVerifyEmailBodyInput,
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
*/
export function useAuthPasswordBasedVerifyEmail(
options: UseMutationOptions<T.AuthPasswordBasedVerifyEmailResponseApi, AppErrorResponse, UseAuthPasswordBasedVerifyEmailProps> = {},
): UseMutationResult<T.AuthPasswordBasedVerifyEmailResponseApi, AppErrorResponse, UseAuthPasswordBasedVerifyEmailProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthPasswordBasedVerifyEmail(
axiosInstance,
variables.body, 
),
options,
);
}
