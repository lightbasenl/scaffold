# Lightbase frontend Scaffold

Use via `yarn create next-app --example=https://github.com/lightbasenl/scaffold`

## Scaffold features

This is our generic frontend scaffold to use with our Compas and LPC powered backends. It is compatible with multitenant
backends, contains utilities for authentication and provides a bunch of defaults like a standalone Next.js builds,
localization and error tracking.

### The main drivers

The scaffold is powered by [Next.js](https://nextjs.org/). Combined with
the [@lightbasenl/next-preset](https://github.com/lightbasenl/next-preset) we got the low-level details like default
headers covered. This is then extended with Typescript and (in progress) strict lint rules to prevent various common
pitfalls.

### Common utilities

The scaffold is also packed with [TailwindCSS](https://tailwindcss.com/) a utility first CSS framework. [
Sentry](https://docs.sentry.io/platforms/javascript/guides/nextjs/) does error tracking, for both server errors
and client side errors. It is already setup to be called from the error boundary located in `_app.page.tsx`. The
included library contains `translateErrorKeyOrReport` to report missing error key translations.

Another necessary item on our list is localization. We experienced that the setup of a `private`
and `public` namespace suites us best. The files are located in `src/locales` and translations need to be provided
via `serverSideTranslations` in `getStaticProps`. The included `getStaticPageProps` and `buildStaticPaths` functions
will
automatically handle the enabled locales and namespaces for you.

### Backend powered

A platform scaffold isn't complete without easy api usage, multitenant support, authentication and feature flags. This
is all done via our backends. The scaffold is able to generate a typed API client with corresponding react-query hooks
for valid Compas and OpenApi specifications
via [Compas](https://compasjs.com/).

Multitenant support is easier to use from the start than to add later, so why not include it. The tenant is determined
by their host header, which in turn is validated via `src/middleware.api.ts` that uses the configuration
in `config/tenants.json`. It rewrites the requests with a `_tenants/[tenant]` prefix, which is also the reason for the
structure in the `src/pages` directory. Error pages are all tenant specific, except for the `/412` error, which is
served when an unknown tenant is encountered. `getStaticPageProps` requires the tenant parameter, which it uses to look
up the required api url, so the api client can be injected in `_app.page.tsx`.

The scaffold also includes various utilities for authentication and authorization. It comes with Axios interceptors for
injecting the JWT token into the request headers and for refreshing the tokens if necessary. `useAuthenticate` can be
used
for executing session and permission checks.

## Others

And the final set;

- E2E tests are set up with Playwright. And on CI will spin up a clean backend locally to ensure that the environment is
  the same as always.
- The `public` folder is served as is, and is also our source for assets that we use when sending emails.
- We have a simple `/api/_health` so in production the load balancer knows when the Next.js server is running or not.
- A dynamic `/robots.txt` is powered via `/api/robots` which defaults to disallowing all agents
- Next.js builds in standalone mode, ensuring an as minimal as possible Docker build

## Scaffold usage

Using the scaffold requires three steps;

- Execute `yarn create next-app --example=https://github.com/lightbasenl/scaffold`
- Run through each occurrence of `TODO(platform)` and set your values
- Replace this README with the below contents

---

### My project

This project is initialized via the [lightbasenl/scaffold](https://github.com/lightbasenl/scaffold).

## Local development

**Local api**

Use the below configuration if you are also running the API locally (on its default port `3001`).

```dotenv
# .env.local
TENANT_ORIGIN=scaffold.dev.lightbase.nl
TENANT_API_URL=http://localhost:3001
```

**Remote api**

Use this configuration if you want to use the API from the hosted development environment.

```dotenv
# .env.local
TENANT_ORIGIN=scaffold.dev.lightbase.nl
```

## Production

There are a few required environment variables in production;

- **SENTRY_AUTH_TOKEN**: This is used to push the source-maps to Sentry, and create a new release
- **SENTRY_RELEASE**: Should be set to the commit sha, so we can track which deploy introduced regressions
- **SENTRY_ENV**: Tell Sentry which environment is (acceptance, staging, production)

---

## Scaffold development

Developing the Scaffold requires use of the private `lightbasenl/scaffold-backend`. This is needed for all major
supported features like multitenant, auth and feature flags. 
