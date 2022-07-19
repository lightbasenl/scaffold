export type URLConfig = {
  [key: string]: {
    environment: string;
    apiUrl: string;
  };
};

export type SSRConfig = {
  _lpcTenant: {
    tenant: string;
    apiUrl: string;
    tenantOriginHeader: string | null;
  };
};

export type Tenant = {
  data: unknown;
  urlConfig: URLConfig;
};
