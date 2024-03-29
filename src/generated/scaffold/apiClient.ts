// Generated by @compas/code-gen

import type { AxiosInstance, AxiosRequestConfig } from "axios";

import type { ScaffoldCreateUserResponse } from "generated/common/types";

/**
 * Tags: []
 *
 */
export async function apiScaffoldCreateUser(
  axiosInstance: AxiosInstance,
  requestConfig?: AxiosRequestConfig,
): Promise<ScaffoldCreateUserResponse> {
  const response = await axiosInstance.request({
    url: `scaffold/create-user`,
    method: "POST",
    ...requestConfig,
  });
  return response.data;
}
