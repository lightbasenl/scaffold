import { useCallback, useEffect } from "react";

import { useRouter } from "next/router";

import { useAuthMe } from "generated/auth/reactQueries";
import type { AuthPermissionIdentifierApi } from "generated/common/types";

export default function useAuthenticate({
  requireAllPermissions,
  requireSinglePermission,
}: {
  requireAllPermissions?: AuthPermissionIdentifierApi[];
  requireSinglePermission?: AuthPermissionIdentifierApi[];
} = {}) {
  const { data, isLoading, isLoadingError } = useAuthMe();
  const router = useRouter();

  const routerPush = router.push;
  const asPath = router.asPath;

  // TODO(platform): redirect to login url
  const redirectToLogin = useCallback(() => {
    routerPush({
      pathname: "/",
      query: {
        from: asPath,
      },
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
