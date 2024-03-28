# @lightbase/internal-management

Component to manage Lightbase platform features.

- Authentication with magic links via Slack
- Feature flag management per environment

## Usage

This package exposes a single React component called `InternalManagement`. This is a mostly client-side
component, managing it's own routing, authorization and styling.

Props:

- `apiUrl`: mandatory url on which the api is available
- `tenantOrigin`: optional tenant origin, to send to tenant aware backends.

```tsx
// In pages/_tenants/[tenant]/_lightbase/[[...management]].tsx
// Or in app/%5Flightbase/[[...management]]/page.tsx
//           ^ _ directories are not turned in to routes by default

"use client";

import { InternalManagement } from "@lightbase/internal-management";

export function getServerSideProps() {
  // Platform implementation details
  return {
    props: {
      _lpcTenant: {
        /* ... */
      },
    },
  };
}

export default function LightbaseManagement({ _lpcTenant }: SSRConfig) {
  const api = useApi();

  return <InternalManagement apiUrl={api.defaults.baseURL} tenantOrigin={_lpcTenant.tenantOriginHeader} />;
}
```

## Internal feature proposals

- [Feature flag iteration](https://www.notion.so/Feature-flag-iteration-b4f17002a83647cfaa80cd20ed4fedeb)
