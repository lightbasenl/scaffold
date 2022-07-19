import { useCallback, useEffect } from "react";

import { useRouter } from "next/router";

import { useAuthMe } from "generated/auth/reactQueries";
import type { AuthPermissionIdentifierApi, AuthSessionApi } from "generated/common/types";

/**
 * Expect a response on {@see useAuthMe}. Else redirects to `/`.
 *
 * This hook is also able to execute a some checks regarding the return user and session.
 *
 * @example
 * It can require a specific session type, enforcing that the user is past the `checkTwoStep`
 *   stage
 * ```ts
 *   useAuthenticate({ enforceSessionType: "user" });
 * ```
 *
 * Or that the session is created via a specific authentication method:
 * ```ts
 *   useAuthenticate({ enforceLoginType: "anonymousBased" });
 * ```
 *
 * It can also check if the user has the required permissions;
 * ```ts
 *   // Require all the provided permissions
 *   useAuthenticate({ requireAllPermissions: ["scaffold:dashboard:manage",
 *   "scaffold:dashboard:use"] })
 *   // Require one of the provided permissions
 *   useAuthenticate({ requireSinglePermission: ["scaffold:dashboard:manage",
 *   "scaffold:dashboard:use"] })
 * ```
 *
 * All above checks can be combined
 */
export default function useAuthenticate({
  enforceSessionType,
  enforceLoginType,
  requireAllPermissions,
  requireSinglePermission
}: {
  enforceLoginType?: AuthSessionApi["loginType"]; enforceSessionType?: AuthSessionApi["type"]; requireAllPermissions?: AuthPermissionIdentifierApi[]; requireSinglePermission?: AuthPermissionIdentifierApi[];
} = {}) {
  const {
    data,
    isLoading,
    isLoadingError
  } = useAuthMe();
  const router = useRouter();

  const routerPush = router.push;
  const asPath = router.asPath;

  // TODO(platform): redirect to login url
  const redirectToLogin = useCallback(() => {
    routerPush({
      pathname: "/",
      query: {
        from: asPath
      }
    });
  }, [asPath, routerPush]);

  useEffect(() => {
    if (isLoading && !isLoadingError) {
      return;
    } else if (!isLoading) {
      return;
    }

    redirectToLogin();
  }, [redirectToLogin, isLoading, isLoadingError]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if (enforceSessionType && enforceSessionType !== data.session.type) {
      redirectToLogin();
      return;
    }

    if (enforceLoginType && enforceLoginType !== data.session.loginType) {
      redirectToLogin();
      return;
    }
  }, [data, enforceLoginType, enforceSessionType, redirectToLogin]);

  useEffect(() => {
    if (!data) {
      return;
    }

    for (const permission of requireAllPermissions ?? []) {
      if (!data.user?.permissions.includes(permission)) {
        redirectToLogin();
        return;
      }
    }
  }, [data, requireAllPermissions, redirectToLogin]);

  useEffect(() => {
    if (!data) {
      return;
    }

    if ((requireSinglePermission ?? []).length === 0) {
      return;
    }

    for (const permission of requireSinglePermission ?? []) {
      if (data.user?.permissions.includes(permission)) {
        return;
      }
    }

    redirectToLogin();
  }, [data, redirectToLogin, requireSinglePermission]);
}
