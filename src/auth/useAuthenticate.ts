import type { AuthDescription } from "auth/checks";

import { useCallback, useEffect } from "react";

import { useRouter } from "next/router";

import { useAuthMe } from "generated/auth/reactQueries";

import { authDescriptionCheck } from "auth/checks";

/**
 * Expect a response on {@see useAuthMe}. Else redirects to `/`.
 *
 * This hook is also able to execute a some checks regarding the return user and session.
 * It is preferable to keep a constant in your file `const authDescription: AuthDescription =
 * {}` so this can be reused for `defaultServerSideProps`.
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
export default function useAuthenticate(authDescription: AuthDescription = {}) {
  const { data, isLoading, isLoadingError } = useAuthMe();
  const router = useRouter();

  const routerPush = router.push;
  const asPath = router.asPath;

  const redirectCallback = useCallback(
    (path: string) => {
      routerPush({
        pathname: path,
        query: {
          from: asPath,
        },
      });
    },
    [asPath, routerPush],
  );

  useEffect(() => {
    if (!isLoadingError) {
      return;
    }

    if (isLoading) {
      return;
    }

    // TODO(platform): update redirect
    redirectCallback("/401");
  }, [redirectCallback, isLoading, isLoadingError]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const authResult = authDescriptionCheck(authDescription, data);

    if (authResult.redirect) {
      redirectCallback(authResult.redirect);
    }
  }, [data, authDescription, redirectCallback]);
}
