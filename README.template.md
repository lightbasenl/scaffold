# My project

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

## Page types

The following scenarios are supported:

1. Static page, no auth checks
   - Use `buildStaticPaths` and `getPageProps` to fill in `getStaticPaths` and `getStaticProps` respectively.
2. Optional user
   - See above, this should be a static page and the user should be loaded client side. Make sure to prevent
     layout shifts when a user is async loaded.
3. User with constraints
   - Use `defaultGetServerSideProps` with support for passing an `authDescription` and allows specifying
     custom translation namespaces.
     `export const getServerSideProps = defaultGetServerSideProps({ authDescription })`.

## Production

There are a few required environment variables in production;

- **SENTRY_AUTH_TOKEN**: This is used to push the source-maps to Sentry, and create a new release
- **SENTRY_RELEASE**: Should be set to the commit sha, so we can track which deploy introduced regressions.
  This is automatically done in the provided `.env` file.
