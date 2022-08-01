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
apiAuthPermissionCreateRole,



apiAuthPermissionPermissionList,



apiAuthPermissionRemoveRole,



apiAuthPermissionRoleAddPermissions,



apiAuthPermissionRoleList,



apiAuthPermissionRoleRemovePermissions,



apiAuthPermissionSummary,



apiAuthPermissionUserAssignRole,



apiAuthPermissionUserRemoveRole,



apiAuthPermissionUserSummary,



} from "./apiClient";



interface UseAuthPermissionCreateRoleProps {
body: T.AuthPermissionCreateRoleBodyInput,
}
/**
 * Create a new role. This role is 'tenant' specific.
 *  
 * Tags: auth:permission:manage
*/
export function useAuthPermissionCreateRole(
options: UseMutationOptions<T.AuthPermissionCreateRoleResponseApi, AppErrorResponse, UseAuthPermissionCreateRoleProps> = {},
): UseMutationResult<T.AuthPermissionCreateRoleResponseApi, AppErrorResponse, UseAuthPermissionCreateRoleProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthPermissionCreateRole(
axiosInstance,
variables.body, 
),
options,
);
}



/**
 * Get the current known backend permissions. Can be used in the Frontend to match
 * known permissions and disable selection of unknowns.
 *  
 * Tags: auth:permission:manage
*/
export function useAuthPermissionPermissionList<TData = T.AuthPermissionPermissionListResponseApi>(opts?: {
options?: UseQueryOptions<T.AuthPermissionPermissionListResponseApi, AppErrorResponse, TData> | undefined,
}|undefined) {
const axiosInstance = useApi();
const options = opts?.options ?? {};
return useQuery(useAuthPermissionPermissionList.queryKey(
),
({ signal }) => {
return apiAuthPermissionPermissionList(
axiosInstance,
{ signal },
);
},
options,
);
}
/**
 * Base key used by useAuthPermissionPermissionList.queryKey()
*/
useAuthPermissionPermissionList.baseKey = (): QueryKey => ["authPermission", "permissionList"];
/**
 * Query key used by useAuthPermissionPermissionList
*/
useAuthPermissionPermissionList.queryKey = (
): QueryKey => [
...useAuthPermissionPermissionList.baseKey(),
];
/**
 * Fetch useAuthPermissionPermissionList via the queryClient and return the result
*/
useAuthPermissionPermissionList.fetch = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.fetchQuery(useAuthPermissionPermissionList.queryKey(
), () => apiAuthPermissionPermissionList(
axiosInstance,
));
/**
 * Prefetch useAuthPermissionPermissionList via the queryClient
*/
useAuthPermissionPermissionList.prefetch = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.prefetchQuery(useAuthPermissionPermissionList.queryKey(
), () => apiAuthPermissionPermissionList(
axiosInstance,
));
/**
 * Invalidate useAuthPermissionPermissionList via the queryClient
*/
useAuthPermissionPermissionList.invalidate = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.invalidateQueries(useAuthPermissionPermissionList.queryKey(
));
/**
 * Set data for useAuthPermissionPermissionList on the queryClient
*/
useAuthPermissionPermissionList.setQueryData = (
queryClient: QueryClient,
data: T.AuthPermissionPermissionListResponseApi,
) => queryClient.setQueryData(useAuthPermissionPermissionList.queryKey(
), data);



interface UseAuthPermissionRemoveRoleProps {
params: T.AuthPermissionRemoveRoleParamsInput,
}
/**
 * Remove a role. Only tenant specific roles can be removed.
 *  
 * Tags: auth:permission:manage
*/
export function useAuthPermissionRemoveRole(
options: UseMutationOptions<T.AuthPermissionRemoveRoleResponseApi, AppErrorResponse, UseAuthPermissionRemoveRoleProps> = {},
): UseMutationResult<T.AuthPermissionRemoveRoleResponseApi, AppErrorResponse, UseAuthPermissionRemoveRoleProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthPermissionRemoveRole(
axiosInstance,
variables.params, 
),
options,
);
}



interface UseAuthPermissionRoleAddPermissionsProps {
params: T.AuthPermissionRoleAddPermissionsParamsInput,
body: T.AuthPermissionRoleAddPermissionsBodyInput,
}
/**
 * Add permissions to a role. Requires that both permissions and role exist.
 * The implementation checks if a permission is already added to the role, so
 * providing existing permissions is not a problem
 *  
 * Errors:
 * - `authPermission.requireRole.unknownRole` -> the provided `role` identifier is
 * unknown.
 * - `authPermission.roleAddPermissions.unknownPermission` -> Empty permission
 * array, duplicate permission in the array or an unknown permission provided.
 *  
 * Tags: auth:permission:manage
*/
export function useAuthPermissionRoleAddPermissions(
options: UseMutationOptions<T.AuthPermissionRoleAddPermissionsResponseApi, AppErrorResponse, UseAuthPermissionRoleAddPermissionsProps> = {},
): UseMutationResult<T.AuthPermissionRoleAddPermissionsResponseApi, AppErrorResponse, UseAuthPermissionRoleAddPermissionsProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthPermissionRoleAddPermissions(
axiosInstance,
variables.params, 
variables.body, 
),
options,
);
}



/**
 * Get the roles with permissions across the system.
 *  
 * Tags: auth:permission:manage
*/
export function useAuthPermissionRoleList<TData = T.AuthPermissionRoleListResponseApi>(opts?: {
options?: UseQueryOptions<T.AuthPermissionRoleListResponseApi, AppErrorResponse, TData> | undefined,
}|undefined) {
const axiosInstance = useApi();
const options = opts?.options ?? {};
return useQuery(useAuthPermissionRoleList.queryKey(
),
({ signal }) => {
return apiAuthPermissionRoleList(
axiosInstance,
{ signal },
);
},
options,
);
}
/**
 * Base key used by useAuthPermissionRoleList.queryKey()
*/
useAuthPermissionRoleList.baseKey = (): QueryKey => ["authPermission", "roleList"];
/**
 * Query key used by useAuthPermissionRoleList
*/
useAuthPermissionRoleList.queryKey = (
): QueryKey => [
...useAuthPermissionRoleList.baseKey(),
];
/**
 * Fetch useAuthPermissionRoleList via the queryClient and return the result
*/
useAuthPermissionRoleList.fetch = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.fetchQuery(useAuthPermissionRoleList.queryKey(
), () => apiAuthPermissionRoleList(
axiosInstance,
));
/**
 * Prefetch useAuthPermissionRoleList via the queryClient
*/
useAuthPermissionRoleList.prefetch = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.prefetchQuery(useAuthPermissionRoleList.queryKey(
), () => apiAuthPermissionRoleList(
axiosInstance,
));
/**
 * Invalidate useAuthPermissionRoleList via the queryClient
*/
useAuthPermissionRoleList.invalidate = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.invalidateQueries(useAuthPermissionRoleList.queryKey(
));
/**
 * Set data for useAuthPermissionRoleList on the queryClient
*/
useAuthPermissionRoleList.setQueryData = (
queryClient: QueryClient,
data: T.AuthPermissionRoleListResponseApi,
) => queryClient.setQueryData(useAuthPermissionRoleList.queryKey(
), data);



interface UseAuthPermissionRoleRemovePermissionsProps {
params: T.AuthPermissionRoleRemovePermissionsParamsInput,
body: T.AuthPermissionRoleRemovePermissionsBodyInput,
}
/**
 * Remove permissions from a role. Requires that the role exists and all provided
 * permissions are assigned.
 *  
 * Errors:
 * - `authPermission.requireRole.unknownRole` -> the provided `role` identifier is
 * unknown.
 * - `authPermission.roleRemovePermissions.permissionNotAssigned` -> The provided
 * permission is not assigned to the provided role.
 *  
 * Tags: auth:permission:manage
*/
export function useAuthPermissionRoleRemovePermissions(
options: UseMutationOptions<T.AuthPermissionRoleRemovePermissionsResponseApi, AppErrorResponse, UseAuthPermissionRoleRemovePermissionsProps> = {},
): UseMutationResult<T.AuthPermissionRoleRemovePermissionsResponseApi, AppErrorResponse, UseAuthPermissionRoleRemovePermissionsProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthPermissionRoleRemovePermissions(
axiosInstance,
variables.params, 
variables.body, 
),
options,
);
}



/**
 * Get the roles and permissions for the current logged-in user.
*/
export function useAuthPermissionSummary<TData = T.AuthPermissionSummaryResponseApi>(opts?: {
options?: UseQueryOptions<T.AuthPermissionSummaryResponseApi, AppErrorResponse, TData> | undefined,
}|undefined) {
const axiosInstance = useApi();
const options = opts?.options ?? {};
return useQuery(useAuthPermissionSummary.queryKey(
),
({ signal }) => {
return apiAuthPermissionSummary(
axiosInstance,
{ signal },
);
},
options,
);
}
/**
 * Base key used by useAuthPermissionSummary.queryKey()
*/
useAuthPermissionSummary.baseKey = (): QueryKey => ["authPermission", "summary"];
/**
 * Query key used by useAuthPermissionSummary
*/
useAuthPermissionSummary.queryKey = (
): QueryKey => [
...useAuthPermissionSummary.baseKey(),
];
/**
 * Fetch useAuthPermissionSummary via the queryClient and return the result
*/
useAuthPermissionSummary.fetch = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.fetchQuery(useAuthPermissionSummary.queryKey(
), () => apiAuthPermissionSummary(
axiosInstance,
));
/**
 * Prefetch useAuthPermissionSummary via the queryClient
*/
useAuthPermissionSummary.prefetch = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.prefetchQuery(useAuthPermissionSummary.queryKey(
), () => apiAuthPermissionSummary(
axiosInstance,
));
/**
 * Invalidate useAuthPermissionSummary via the queryClient
*/
useAuthPermissionSummary.invalidate = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
) => queryClient.invalidateQueries(useAuthPermissionSummary.queryKey(
));
/**
 * Set data for useAuthPermissionSummary on the queryClient
*/
useAuthPermissionSummary.setQueryData = (
queryClient: QueryClient,
data: T.AuthPermissionSummaryResponseApi,
) => queryClient.setQueryData(useAuthPermissionSummary.queryKey(
), data);



interface UseAuthPermissionUserAssignRoleProps {
params: T.AuthPermissionUserAssignRoleParamsInput,
body: T.AuthPermissionUserAssignRoleBodyInput,
}
/**
 * Assign the provided role to the provided user.
 *  
 * Errors:
 * - Inherits `authRequireUser` errors with the `authPermission.requireUser`
 * eventKey.
 * - `authPermission.userAssignRole.userHasRole` -> user already has the provided
 * role assigned to them
 * - `authPermission.userAssignRole.unknownRole` -> Role can not be found by the
 * provided identifier.
 *  
 * Tags: auth:permission:manage
*/
export function useAuthPermissionUserAssignRole(
options: UseMutationOptions<T.AuthPermissionUserAssignRoleResponseApi, AppErrorResponse, UseAuthPermissionUserAssignRoleProps> = {},
): UseMutationResult<T.AuthPermissionUserAssignRoleResponseApi, AppErrorResponse, UseAuthPermissionUserAssignRoleProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthPermissionUserAssignRole(
axiosInstance,
variables.params, 
variables.body, 
),
options,
);
}



interface UseAuthPermissionUserRemoveRoleProps {
params: T.AuthPermissionUserRemoveRoleParamsInput,
body: T.AuthPermissionUserRemoveRoleBodyInput,
}
/**
 * Remove the provided role from the provided user.
 *  
 * Errors:
 * - Inherits `authRequireUser` errors with the `authPermission.requireUser`
 * eventKey.
 * - `authPermission.userRemoveRole.roleNotAssigned` -> role is not assigned to the
 * user at the time of calling.
 *  
 * Tags: auth:permission:manage
*/
export function useAuthPermissionUserRemoveRole(
options: UseMutationOptions<T.AuthPermissionUserRemoveRoleResponseApi, AppErrorResponse, UseAuthPermissionUserRemoveRoleProps> = {},
): UseMutationResult<T.AuthPermissionUserRemoveRoleResponseApi, AppErrorResponse, UseAuthPermissionUserRemoveRoleProps, unknown> {
const axiosInstance = useApi();
return useMutation(
(variables) => apiAuthPermissionUserRemoveRole(
axiosInstance,
variables.params, 
variables.body, 
),
options,
);
}



/**
 * Get the `apiAuthPermissionSummary` for the provided user.
 *  
 * Tags: auth:permission:manage
*/
export function useAuthPermissionUserSummary<TData = T.AuthPermissionUserSummaryResponseApi>(opts: {
params: T.AuthPermissionUserSummaryParamsInput,
options?: UseQueryOptions<T.AuthPermissionUserSummaryResponseApi, AppErrorResponse, TData> | undefined,
}) {
const axiosInstance = useApi();
const options = opts?.options ?? {};
options.enabled = (
options.enabled === true || (options.enabled !== false
&& !!opts.params.user
));
return useQuery(useAuthPermissionUserSummary.queryKey(
opts.params,
),
({ signal }) => {
return apiAuthPermissionUserSummary(
axiosInstance,
opts.params, 
{ signal },
);
},
options,
);
}
/**
 * Base key used by useAuthPermissionUserSummary.queryKey()
*/
useAuthPermissionUserSummary.baseKey = (): QueryKey => ["authPermission", "userSummary"];
/**
 * Query key used by useAuthPermissionUserSummary
*/
useAuthPermissionUserSummary.queryKey = (
params: T.AuthPermissionUserSummaryParamsInput,
): QueryKey => [
...useAuthPermissionUserSummary.baseKey(),
params,
];
/**
 * Fetch useAuthPermissionUserSummary via the queryClient and return the result
*/
useAuthPermissionUserSummary.fetch = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
data: {
params: T.AuthPermissionUserSummaryParamsInput,
}
) => queryClient.fetchQuery(useAuthPermissionUserSummary.queryKey(
data.params, 
), () => apiAuthPermissionUserSummary(
axiosInstance,
data.params, 
));
/**
 * Prefetch useAuthPermissionUserSummary via the queryClient
*/
useAuthPermissionUserSummary.prefetch = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
data: {
params: T.AuthPermissionUserSummaryParamsInput,
}
) => queryClient.prefetchQuery(useAuthPermissionUserSummary.queryKey(
data.params, 
), () => apiAuthPermissionUserSummary(
axiosInstance,
data.params, 
));
/**
 * Invalidate useAuthPermissionUserSummary via the queryClient
*/
useAuthPermissionUserSummary.invalidate = (
queryClient: QueryClient,
axiosInstance: AxiosInstance,
keyInput: {
params: T.AuthPermissionUserSummaryParamsInput,
},
) => queryClient.invalidateQueries(useAuthPermissionUserSummary.queryKey(
keyInput.params, 
));
/**
 * Set data for useAuthPermissionUserSummary on the queryClient
*/
useAuthPermissionUserSummary.setQueryData = (
queryClient: QueryClient,
queryKey: {
params: T.AuthPermissionUserSummaryParamsInput,
},
data: T.AuthPermissionUserSummaryResponseApi,
) => queryClient.setQueryData(useAuthPermissionUserSummary.queryKey(
queryKey.params,
), data);