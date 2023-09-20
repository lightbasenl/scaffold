import type { GetServerSidePropsContext } from "next";

import jwtDecode from "jwt-decode";
import { destroyCookie, setCookie } from "nookies";

import type { AuthTokenPair } from "generated/common/types";

/**
 * Use nookies to create cookies from the provided token pair.
 * The `context` can be `undefined` when this runs in the browser.
 * It decodes the tokens, so the cookies expire when the tokens expire.
 */
export function authCreateCookiesFromTokenPair(
  tokenPair: AuthTokenPair,
  context?: GetServerSidePropsContext,
) {
  const accessToken = jwtDecode(tokenPair.accessToken) as unknown as { exp: number };
  const refreshToken = jwtDecode(tokenPair.refreshToken) as unknown as { exp: number };

  // Deviates from the scaffold, since cfp.blox runs in an insecure context
  const secure = process.env.NODE_ENV === "production";

  const accessTokenExpiresAt = new Date(accessToken.exp * 1000);
  const refreshTokenExpiresAt = new Date(refreshToken.exp * 1000);

  // We use absence of a cookie to determine if we should refresh. By subtracting a minute, we
  // make sure that in flight requests always use a still valid cookie instead of the minor
  // chance that it expires while in-flight.
  accessTokenExpiresAt.setMinutes(accessTokenExpiresAt.getMinutes() - 1);
  refreshTokenExpiresAt.setMinutes(refreshTokenExpiresAt.getMinutes() - 1);

  setCookie(context, "accessToken", tokenPair.accessToken, {
    expires: accessTokenExpiresAt,
    secure,
    path: "/",
  });
  setCookie(context, "refreshToken", tokenPair.refreshToken, {
    expires: refreshTokenExpiresAt,
    secure,
    path: "/",
  });
}

/**
 * Remove the access and refresh token cookies
 */
export function authRemoveCookies(context?: GetServerSidePropsContext) {
  destroyCookie(context, "accessToken");
  destroyCookie(context, "refreshToken");
}
