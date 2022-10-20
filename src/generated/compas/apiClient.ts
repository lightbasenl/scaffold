// Generated by @compas/code-gen
/* eslint-disable no-unused-vars, @typescript-eslint/no-explicit-any, unused-imports/no-unused-imports, @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface, @typescript-eslint/ban-types */

import type { AxiosInstance } from "axios";

import type * as T from "generated/common/types";

/**
 * Return the full generated structure as a json object.
 *
 * Tags: _compas
 *
 */
export async function apiCompasStructure(
  instance: AxiosInstance,
  requestConfig: { signal?: AbortSignal | undefined } = {},
): Promise<T.CompasStructureResponseApi> {
  const response = await instance.request({
    url: `_compas/structure.json`,
    method: "get",
    ...requestConfig,
  });
  return response.data;
}
