// Generated by @compas/code-gen
/* eslint-disable no-unused-vars, @typescript-eslint/no-explicit-any, unused-imports/no-unused-imports, @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-interface */

// An export soo all things work correctly with linters, ts, ...
export const __generated__ = true;
export type AuthGetUserParamsInput = { user: string };
export type AuthGetUserResponseApi = { user: AuthUserSummaryApi };
export type AuthUserSummaryApi = {
  id: string;
  name?: undefined | string;
  lastLogin: string;
  anonymousLogin?: undefined | { isAllowedToLogin: boolean; createdAt: string };
  digidLogin?: undefined | { createdAt: string };
  keycloakLogin?: undefined | { email: string; createdAt: string };
  passwordLogin?:
    | undefined
    | {
        email: BackendEmailApi;
        createdAt: string;
        verifiedAt?: undefined | string;
        otpEnabledAt?: undefined | string;
      };
  totpProvider?: undefined | { enabledAt: string };
  roles: { id: string; identifier: string }[];
  permissions: AuthPermissionIdentifierApi[];
  createdAt: string;
  deletedAt?: undefined | string;
};
export type BackendEmailApi = string;
export type AuthPermissionIdentifierApi =
  | "test:permission"
  | "auth:user:list"
  | "auth:user:manage"
  | "auth:permission:manage"
  | "auth:keycloak:user:create"
  | "auth:totp:manage"
  | "lightbase:internal";
export type AuthLogoutResponseApi = { success: true };
export type AuthMeResponseApi = { session: AuthSessionApi; user?: undefined | AuthUserSummaryApi };
export type AuthSessionApi = {
  type: AuthSessionTypeApi;
  loginType: AuthLoginTypeApi;
  twoStepType?: undefined | AuthTwoStepTypeApi;
  userId: string;
};
export type AuthSessionTypeApi = "checkTwoStep" | "user";
export type AuthLoginTypeApi = "anonymousBased" | "digidBased" | "keycloakBased" | "passwordBased";
export type AuthTwoStepTypeApi = "totpProvider" | "passwordBasedOtp";
export type AuthRefreshTokensBodyInput = { refreshToken: string };
export type AuthTokenPairApi = { accessToken: string; refreshToken: string };
export type AuthSetUserActiveParamsInput = AuthGetUserParamsInput;
export type AuthSetUserActiveBodyInput = { active: boolean };
export type AuthSetUserActiveResponseApi = AuthLogoutResponseApi;
export type AuthUpdateUserParamsInput = AuthGetUserParamsInput;
export type AuthUpdateUserBodyInput = { name?: undefined | null | string };
export type AuthUpdateUserResponseApi = AuthLogoutResponseApi;
export type AuthUserListBodyInput = {
  search?: undefined | { name?: undefined | string };
  filters?:
    | undefined
    | {
        anonymousLoginExists?: undefined | boolean;
        digidLoginExists?: undefined | boolean;
        keycloakLoginExists?: undefined | boolean;
        passwordLoginExists?: undefined | boolean;
        includeAnonymousTemporarySessions?: undefined | boolean;
        includeSoftDeletedUsers?: undefined | boolean;
      };
};
export type AuthUserListResponseApi = { users: AuthUserSummaryApi[] };
export type AuthAnonymousBasedLoginBodyInput = { token: string };
export type AuthAnonymousBasedTokenPairApi = AuthTokenPairApi;
export type ManagementRequestMagicLinkBodyInput = { slackUserId: string };
export type ManagementRequestMagicLinkResponseApi = AuthLogoutResponseApi;
export type ManagementFeatureFlagListQueryInput = {
  offset?: undefined | number | string;
  limit?: undefined | number | string;
};
export type ManagementFeatureFlagListBodyInput = {
  where?:
    | undefined
    | {
        id?: undefined | string;
        idNotEqual?: undefined | string;
        idIn?: undefined | string[];
        idNotIn?: undefined | string[];
        name?: undefined | string;
        nameNotEqual?: undefined | string;
        nameIn?: undefined | string[];
        nameNotIn?: undefined | string[];
        nameLike?: undefined | string;
        nameILike?: undefined | string;
        nameNotLike?: undefined | string;
        createdAt?: undefined | string;
        createdAtNotEqual?: undefined | string;
        createdAtIn?: undefined | string[];
        createdAtNotIn?: undefined | string[];
        createdAtGreaterThan?: undefined | string;
        createdAtLowerThan?: undefined | string;
        createdAtIsNull?: undefined | boolean;
        createdAtIsNotNull?: undefined | boolean;
        updatedAt?: undefined | string;
        updatedAtNotEqual?: undefined | string;
        updatedAtIn?: undefined | string[];
        updatedAtNotIn?: undefined | string[];
        updatedAtGreaterThan?: undefined | string;
        updatedAtLowerThan?: undefined | string;
        updatedAtIsNull?: undefined | boolean;
        updatedAtIsNotNull?: undefined | boolean;
      };
  orderBy?: undefined | ("id" | "name" | "createdAt" | "updatedAt")[];
  orderBySpec?:
    | undefined
    | {
        id?: undefined | CompasOrderByInput;
        name?: undefined | CompasOrderByInput;
        createdAt?: undefined | CompasOrderByInput;
        updatedAt?: undefined | CompasOrderByInput;
      };
};
export type CompasOrderByInput = "ASC" | "DESC";
export type ManagementFeatureFlagListResponseApi = { list: ManagementFeatureFlagItemApi[]; total: number };
export type ManagementFeatureFlagItemApi = {
  name: string;
  description: string;
  globalValue: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
};
export type ManagementFeatureFlagSingleParamsInput = { featureFlagId: string };
export type ManagementFeatureFlagSingleResponseApi = { item: ManagementFeatureFlagItemApi };
export type ManagementFeatureFlagUpdateParamsInput = ManagementFeatureFlagSingleParamsInput;
export type ManagementFeatureFlagItemWriteInput = {
  description?: undefined | string;
  globalValue?: undefined | boolean;
};
export type ManagementFeatureFlagUpdateResponseApi = AuthLogoutResponseApi;