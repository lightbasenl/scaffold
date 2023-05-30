import type { AuthPermissionIdentifier, AuthSession } from "../generated/common/types";
import type { AuthMeResponse } from "../generated/common/types";
import { authRemoveCookies } from "./cookies";

export interface AuthDescription {
  enforceLoginType?: AuthSession["loginType"];
  enforceSessionType?: AuthSession["type"];
  requireAllPermissions?: AuthPermissionIdentifier[];
  requireSinglePermission?: AuthPermissionIdentifier[];
}

/**
 * Executes authentication and authorization checks.
 */
export function authDescriptionCheck(
  description: AuthDescription,
  data: AuthMeResponse,
): { redirect?: string } {
  if (description.enforceSessionType && data.session.type !== description.enforceSessionType) {
    authRemoveCookies();
    return {
      // Redirect user if accessing a guest-only route to private area.
      redirect: "/_lightbase/login",
    };
  }

  if (description.enforceLoginType && data.session.loginType !== description.enforceLoginType) {
    authRemoveCookies();
    return {
      redirect: "/_lightbase/login",
    };
  }

  if (description.requireAllPermissions) {
    for (const permission of description.requireAllPermissions) {
      if (!(data.user?.permissions ?? []).includes(permission)) {
        authRemoveCookies();
        return {
          redirect: "/_lightbase/login",
        };
      }
    }
  }

  if (description.requireSinglePermission) {
    for (const permission of description.requireSinglePermission) {
      if ((data.user?.permissions ?? []).includes(permission)) {
        return {};
      }
    }

    authRemoveCookies();

    return {
      redirect: "/_lightbase/login",
    };
  }

  return {};
}
