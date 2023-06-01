// Generated by @compas/code-gen

import type { QueryClient, QueryKey, UseQueryOptions } from "@tanstack/react-query";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

import { useQuery } from "@tanstack/react-query";

import type { AppErrorResponse } from "generated/common/api-client";
import type { Pretty } from "generated/common/api-client-wrapper";
import { useApi } from "generated/common/api-client-wrapper";
import type { FeatureFlagCurrentResponse } from "generated/common/types";

import { apiFeatureFlagCurrent } from "./apiClient";
/**
 * Get the current available feature flags. This may use the current tenant and user to calculate the values.
 *
 */
export function useFeatureFlagCurrent<TData = FeatureFlagCurrentResponse>(
  opts: Pretty<
    { requestConfig?: AxiosRequestConfig } & {
      queryOptions?: UseQueryOptions<FeatureFlagCurrentResponse, AppErrorResponse, TData>;
    }
  > = {},
) {
  const axiosInstance = useApi();
  const options = opts?.queryOptions ?? {};
  return useQuery(
    useFeatureFlagCurrent.queryKey(),
    ({ signal }) => {
      opts.requestConfig ??= {};
      opts.requestConfig.signal = signal;

      return apiFeatureFlagCurrent(axiosInstance, opts?.requestConfig);
    },
    options,
  );
}
/**
 * Base key used by useFeatureFlagCurrent.queryKey()
 */
useFeatureFlagCurrent.baseKey = (): QueryKey => ["featureFlag", "current"];

/**
 * Query key used by useFeatureFlagCurrent
 */
useFeatureFlagCurrent.queryKey = (): QueryKey => [...useFeatureFlagCurrent.baseKey()];

/**
 * Fetch useFeatureFlagCurrent via the queryClient and return the result
 */
useFeatureFlagCurrent.fetch = (
  queryClient: QueryClient,
  axiosInstance: AxiosInstance,
  opts?: Pretty<{ requestConfig?: AxiosRequestConfig }>,
) => {
  return queryClient.fetchQuery(useFeatureFlagCurrent.queryKey(), () => {
    return apiFeatureFlagCurrent(axiosInstance, opts?.requestConfig);
  });
};

/**
 * Prefetch useFeatureFlagCurrent via the queryClient
 */
useFeatureFlagCurrent.prefetch = (
  queryClient: QueryClient,
  axiosInstance: AxiosInstance,
  opts?: Pretty<{ requestConfig?: AxiosRequestConfig }>,
) => {
  return queryClient.prefetchQuery(useFeatureFlagCurrent.queryKey(), () => {
    return apiFeatureFlagCurrent(axiosInstance, opts?.requestConfig);
  });
};

/**
 * Invalidate useFeatureFlagCurrent via the queryClient
 */
useFeatureFlagCurrent.invalidate = (queryClient: QueryClient) =>
  queryClient.invalidateQueries(useFeatureFlagCurrent.queryKey());

/**
 * Set query data for useFeatureFlagCurrent via the queryClient
 */
useFeatureFlagCurrent.setQueryData = (
  queryClient: QueryClient,

  data: FeatureFlagCurrentResponse,
) => {
  return queryClient.setQueryData(useFeatureFlagCurrent.queryKey(), data);
};
