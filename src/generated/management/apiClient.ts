// Generated by @compas/code-gen

import type { AxiosInstance, AxiosRequestConfig } from "axios";

import type {
  ManagementRequestMagicLinkBody,
  ManagementRequestMagicLinkResponse,
} from "generated/common/types";

/**
 * Sends a magic link via Slack. Locally it directly returns the url.
 *
 * Tags: []
 *
 */
export async function apiManagementRequestMagicLink(
  axiosInstance: AxiosInstance,
  body: ManagementRequestMagicLinkBody,
  requestConfig?: AxiosRequestConfig,
): Promise<ManagementRequestMagicLinkResponse> {
  const response = await axiosInstance.request({
    url: `_lightbase/management/request-magic-link`,
    method: "POST",
    data: body,
    ...requestConfig,
  });
  return response.data;
}