import type { GetServerSidePropsContext } from "next";

import jwtDecode from "jwt-decode";
import { destroyCookie, setCookie } from "nookies";

import type { AuthTokenPairApi } from "generated/common/types";

/**
 * Use nookies to create cookies from the provided token pair.
 * The `context` can be `undefined` when this runs in the browser.
 * It decodes the tokens, so the cookies expire when the tokens expire.
 */
export function authCreateCookiesFromTokenPair(
  tokenPair: AuthTokenPairApi,
  context?: GetServerSidePropsContext,
) {
  const accessToken = jwtDecode(tokenPair.accessToken) as unknown as { exp: number };
  const refreshToken = jwtDecode(tokenPair.refreshToken) as unknown as { exp: number };

  // Deviates from the scaffold, since cfp.blox runs in an insecure context
  const secure = process.env.NODE_ENV === "production";

  setCookie(context, "accessToken", tokenPair.accessToken, {
    expires: new Date(accessToken.exp * 1000),
    secure,
    path: "/",
  });
  setCookie(context, "refreshToken", tokenPair.refreshToken, {
    expires: new Date(refreshToken.exp * 1000),
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
