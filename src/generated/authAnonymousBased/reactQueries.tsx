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
} from "@tanstack/react-query";
import * as T from "../common/types";
import {
apiAuthAnonymousBasedLogin,



} from "./apiClient";



interface UseAuthAnonymousBasedLoginProps {
body: T.AuthAnonymousBasedLoginBodyInput,
}
/**
 * Let an anonymous based user login with the specified token.
 *  
 * Errors:
 * - `authAnonymousBased.login.unknownToken` -> can't find a user with the provided
 * token
 * - `authAnonymousBased.login.tokenIsNotAllowedToLogin` -> token is not allowed to
 * log in.
*/
export function useAuthAnonymousBasedLogin(
options: UseMutationOptions<T.AuthAnonymousBasedTokenPairApi, AppErrorResponse, UseAuthAnonymousBasedLoginProps> = {},
): UseMutationResult<T.AuthAnonymousBasedTokenPairApi, AppErrorResponse, UseAuthAnonymousBasedLoginProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthAnonymousBasedLogin(
axiosInstance,
variables.body, 
),
options,
);
}