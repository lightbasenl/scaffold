import type { AuthPermissionIdentifierApi, AuthSessionApi } from "generated/common/types";
import type { AuthMeResponseApi } from "generated/common/types";

export interface AuthDescription {
  enforceLoginType?: AuthSessionApi["loginType"];
  enforceSessionType?: AuthSessionApi["type"] | "guest";
  requireAllPermissions?: AuthPermissionIdentifierApi[];
  requireSinglePermission?: AuthPermissionIdentifierApi[];
}

/**
 * Executes authentication and authorization checks.
 */
export function authDescriptionCheck(
  description: AuthDescription,
  data: AuthMeResponseApi,
): { redirect?: string } {
  if (description.enforceSessionType && data.session.type !== description.enforceSessionType) {
    return {
      // TODO(platform): update destination
      // Redirect user if accessing a guest-only route to private area.
      redirect: description.enforceSessionType === "guest" ? "/private" : "/",
    };
  }

  if (description.enforceLoginType && data.session.loginType !== description.enforceLoginType) {
    return {
      // TODO(platform): update destination
      redirect: "/",
    };
  }

  if (description.requireAllPermissions) {
    for (const permission of description.requireAllPermissions) {
      if (!(data.user?.permissions ?? []).includes(permission)) {
        return {
          // TODO(platform): update destination
          redirect: "/",
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

    return {
      // TODO(platform): update destination
      redirect: "/",
    };
  }

  return {};
}
