import { jwtDecode } from "jwt-decode";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import type { AuthTokenPair } from "../generated/common/types";

/**
 * Use nookies to create cookies from the provided token pair.
 * The `context` can be `undefined` when this runs in the browser.
 * It decodes the tokens, so the cookies expire when the tokens expire.
 */
export function authCreateCookiesFromTokenPair(tokenPair: AuthTokenPair) {
  const accessToken = jwtDecode(tokenPair.accessToken) as unknown as { exp: number };
  const refreshToken = jwtDecode(tokenPair.refreshToken) as unknown as { exp: number };

  const secure = process.env.NODE_ENV === "production";

  setCookie(null, "_lightbase.accessToken", tokenPair.accessToken, {
    expires: new Date(accessToken.exp * 1000),
    secure,
    path: "/_lightbase",
  });
  setCookie(null, "_lightbase.refreshToken", tokenPair.refreshToken, {
    expires: new Date(refreshToken.exp * 1000),
    secure,
    path: "/_lightbase",
  });
}

/**
 * Remove the access and refresh token cookies
 */
export function authRemoveCookies() {
  destroyCookie(null, "_lightbase.accessToken");
  destroyCookie(null, "_lightbase.refreshToken");
}

/**
 * Get the cookie values
 */
export function authParseCookies(): AuthTokenPair {
  const cookies = parseCookies();

  return {
    accessToken: cookies["_lightbase.accessToken"],
    refreshToken: cookies["_lightbase.refreshToken"],
  };
}
