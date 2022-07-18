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
apiAuthTotpProviderInfo,



apiAuthTotpProviderRemove,



apiAuthTotpProviderRemoveForUser,



apiAuthTotpProviderSetup,



apiAuthTotpProviderSetupVerify,



apiAuthTotpProviderVerify,



} from "./apiClient";



/**
 * Check if TOTP is set up and if the setup is verified.
*/
export function useAuthTotpProviderInfo<TData = T.AuthTotpProviderInfoResponseApi>(opts?: {
options?: UseQueryOptions<T.AuthTotpProviderInfoResponseApi, AppErrorResponse, TData> | undefined,
}|undefined) {
const axiosInstance = useApi();
const options = opts?.options ?? {};
return useQuery(useAuthTotpProviderInfo.queryKey(
),
({ signal }) => {
return apiAuthTotpProviderInfo(
axiosInstance,
{ signal },
);
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
useAuthTotpProviderInfo.queryKey = (
): QueryKey => [
...useAuthTotpProviderInfo.baseKey(),
];
/**
 * Fetch useAuthTotpProviderInfo via the queryClient and return the result
*/
useAuthTotpProviderInfo.fetch = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.fetchQuery(useAuthTotpProviderInfo.queryKey(
), () => apiAuthTotpProviderInfo(
axiosInstance,
));
/**
 * Prefetch useAuthTotpProviderInfo via the queryClient
*/
useAuthTotpProviderInfo.prefetch = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.prefetchQuery(useAuthTotpProviderInfo.queryKey(
), () => apiAuthTotpProviderInfo(
axiosInstance,
));
/**
 * Invalidate useAuthTotpProviderInfo via the queryClient
*/
useAuthTotpProviderInfo.invalidate = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.invalidateQueries(useAuthTotpProviderInfo.queryKey(
));
/**
 * Set data for useAuthTotpProviderInfo on the queryClient
*/
useAuthTotpProviderInfo.setQueryData = (
queryClient: QueryClient,
data: T.AuthTotpProviderInfoResponseApi,
) => queryClient.setQueryData(useAuthTotpProviderInfo.queryKey(
), data);



interface UseAuthTotpProviderRemoveProps {
}
/**
 * Remove the totp setup, we expect that users have short-lived sessions. So no
 * extra verification is required to remove the totp setup.
 *  
 * Errors:
 * - `authTotpProvider.remove.totpNotConfigured` -> remove is called, while no totp
 * is configured for this user.
*/
export function useAuthTotpProviderRemove(
options: UseMutationOptions<T.AuthTotpProviderRemoveResponseApi, AppErrorResponse, UseAuthTotpProviderRemoveProps> = {},
): UseMutationResult<T.AuthTotpProviderRemoveResponseApi, AppErrorResponse, UseAuthTotpProviderRemoveProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthTotpProviderRemove(
axiosInstance,
),
options,
);
}



interface UseAuthTotpProviderRemoveForUserProps {
params: T.AuthTotpProviderRemoveForUserParamsInput,
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
*/
export function useAuthTotpProviderRemoveForUser(
options: UseMutationOptions<T.AuthTotpProviderRemoveForUserResponseApi, AppErrorResponse, UseAuthTotpProviderRemoveForUserProps> = {},
): UseMutationResult<T.AuthTotpProviderRemoveForUserResponseApi, AppErrorResponse, UseAuthTotpProviderRemoveForUserProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthTotpProviderRemoveForUser(
axiosInstance,
variables.params, 
),
options,
);
}



interface UseAuthTotpProviderSetupProps {
body: T.AuthTotpProviderSetupBodyInput,
}
/**
 * Initiate the totp provider setup. The setup needs to be verified via
 * `apiAuthTotpProviderSetupVerify`. If an existing totp setup is not yet verified,
 * the original one is removed, and a new setup is initiated.
 *  
 * Errors:
 * - `authTotpProvider.setup.alreadySetUp` -> an existing totp setup exists, and is
 * already verified.
*/
export function useAuthTotpProviderSetup(
options: UseMutationOptions<T.AuthTotpProviderSetupResponseApi, AppErrorResponse, UseAuthTotpProviderSetupProps> = {},
): UseMutationResult<T.AuthTotpProviderSetupResponseApi, AppErrorResponse, UseAuthTotpProviderSetupProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthTotpProviderSetup(
axiosInstance,
variables.body, 
),
options,
);
}



interface UseAuthTotpProviderSetupVerifyProps {
body: T.AuthTotpProviderSetupVerifyBodyInput,
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
*/
export function useAuthTotpProviderSetupVerify(
options: UseMutationOptions<T.AuthTotpProviderSetupVerifyResponseApi, AppErrorResponse, UseAuthTotpProviderSetupVerifyProps> = {},
): UseMutationResult<T.AuthTotpProviderSetupVerifyResponseApi, AppErrorResponse, UseAuthTotpProviderSetupVerifyProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthTotpProviderSetupVerify(
axiosInstance,
variables.body, 
),
options,
);
}



interface UseAuthTotpProviderVerifyProps {
body: T.AuthTotpProviderVerifyBodyInput,
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
*/
export function useAuthTotpProviderVerify(
options: UseMutationOptions<T.AuthTotpProviderVerifyResponseApi, AppErrorResponse, UseAuthTotpProviderVerifyProps> = {},
): UseMutationResult<T.AuthTotpProviderVerifyResponseApi, AppErrorResponse, UseAuthTotpProviderVerifyProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthTotpProviderVerify(
axiosInstance,
variables.body, 
),
options,
);
}
