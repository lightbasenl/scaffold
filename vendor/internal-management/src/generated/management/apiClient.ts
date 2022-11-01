// Generated by @compas/code-gen
/* eslint-disable no-unused-vars, @typescript-eslint/no-explicit-any, unused-imports/no-unused-imports, @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface */

import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type * as T from "../common/types";

/**
 *
 *
 */
export async function apiManagementRequestMagicLink(
  instance: AxiosInstance,
  body: T.ManagementRequestMagicLinkBodyInput,
  requestConfig: AxiosRequestConfig = {},
): Promise<T.ManagementRequestMagicLinkResponseApi> {
  const data = body;
  const response = await instance.request({
    url: `_lightbase/management/request-magic-link`,
    method: "post",
    data,
    ...requestConfig,
  });
  return response.data;
}
