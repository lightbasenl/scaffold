***Note**: For project-specific documentation, please check your project's `README.md`.*

**Table of contents**

* [Getting started](#getting-started)
* [Commands](#commands)
* [Environment variables](#environment-variables)
* [Directory structure](#directory-structure)
* [Pages](#pages)
* [Components](#components)
* [Testing](#testing)
* [Styling](#styling)
* [Localisation](#localisation)
* [Authentication](#authentication)
* [Multi-tenancy](#multi-tenancy)
* [API code generation](#api-code-generation)
* [SVG generation](#svg-generation)
* [Included libraries](#included-libraries)
* [Default headers](#default-headers)
* [Content Security Policy](#content-security-policy)
* [Browser compatibility](#browser-compatibility)
* [Error monitoring](#error-monitoring)
* [Dynamic `robots.txt`](#dynamic-robotstxt)
* [Health check](#health-check)

# Getting started

Run the following command to scaffold a project:
```
npx create next-app --example=https://github.com/lightbasenl/scaffold
```

Next, run through every occurrence of `TODO(platform)` and follow the instructions.

# Commands

The following commands are included:

| Command             | Description                               |
|---------------------|-------------------------------------------|
| `yarn dev`          | Start development server                  |
| `yarn build`        | Make production build                     |
| `yarn start`        | Run production build                      |
| `yarn format`       | Format and lint code w/ Prettier & ESLint |
| `yarn generate`     | Alias for `generate:api`                  |
| `yarn generate:api` | Generate API code                         |
| `yarn generate:svg` | Generate SVG components                   |
| `yarn test:e2e`     | Run end-to-end tests                      |

# Environment variables

| Command                  | Description                                                                                         |
|--------------------------|-----------------------------------------------------------------------------------------------------|
| `SENTRY_AUTH_TOKEN`      | This is used to push the source-maps to Sentry, and create a new release                            |
| `SENTRY_RELEASE`         | This should be set to the commit SHA hash, so it can be tracked which deploy introduced regressions |
| `NEXT_PUBLIC_SENTRY_DSN` | This is the Sentry DSN that should be used to log errors to                                         |

# Directory structure

```
...
├── ...
├── assets           // .svg files for generating SVG components
├── config           // Project configuration files
│   └── tenants.json // Tenant configuration
├── e2e              // End-to-end test files
├── public           // Publicly hosted assets (i.e. mail assets)
├── scripts          // Project scripts
├── src
│   ├── assets
│   ├── auth        // Authentication helpers
│   ├── components
│   ├── css
│   ├── generated   // Generated API code (hooks, api client)
│   ├── hooks       // Project hooks
│   ├── lib         // Helper functions
│   ├── locales     // Localisation files
│   ├── pages       
│   └── tenants     // Multi-tenancy helpers
├── ...
```

## Pages

Pages use the `.page.tsx` extension, API routes and middleware use `.api.ts`.

_**Note**: These page extensions also apply to `_app`, `_document` and `middleware` files._

Using page extensions allows us to keep certain components close to the pages they're used on.

## Components

Components that are used only on a few pages and/or are very specific to those pages, should be placed in a `/component` directory near their page.

For example:

```
...
├── ...
├── src
│   ├── pages
│   │   ├── about-us
│   │   │   ├── components
│   │   │   │   └── Employee.tsx  👈 The component
│   │   │   └── index.page.tsx  👈 The page component
├── ...
```

### Base components

Components that can be used throughout the app are called base components. These live in the `/src/components` directory.

Some examples of base components are: `<Input />`, `<Checkbox />`, `<TextArea />`, `<Button />`, etc.

# Testing

## End-to-end testing

End-to-end tests are set up with [Playwright](https://playwright.dev/) and located in `/e2e`. 

On CI, a clean backend instance is spun up to make sure the environment is always the same.

## Unit testing

Unit tests use [Jest](https://jestjs.io/) and are located with the code they test. For example: if you have a function named `ucfirst` located in `/src/lib/ucfirst.ts`, the unit test should be located in `/src/lib/ucfirst.test.ts`.

# Styling

[TailwindCSS](https://tailwindcss.com/) is used for styling.
It allows for quick prototyping and developing new functionality without having
to think about naming classes and managing (S)CSS files.

# Localisation

[next-i18next](https://github.com/i18next/next-i18next) is set up out of the box. 

Localisation files are located in `src/locales`. Every file within this folder is a namespace, that can be loaded in a page by passing the namespaces parameter to `defaultServerSideProps` or `getPageProps`. By default, the `public` and `private` namespaces are included.

# Authentication

Authentication with Compas-powered backends typically happens with an `Authorization` header.

The `authAxiosRequestInterceptor` and `authAxiosResponseErrorInterceptor` interceptors handle setting the headers and manage authentication cookies.

## Authorization

### Authorization with `getServerSideProps`

For server-side authorization, an `authDescription` can be passed to `defaultServerSideProps`.

```tsx
export const getServerSideProps = defaultServerSideProps({
  authDescription: {
    enforceSessionType: "user",
    enforceLoginType: "anonymousBased",
  },
  namespaces: ["private", "public"],
});
```

### Client-side authorization

Client-side authorization can be done through the use of the `useAuthenticate` hook. Note however, that client-side authorization may cause [Cumulative Layout Shift](https://web.dev/cls/) in your application.

# Multi-tenancy

Multi-tenancy is a feature that allows using the same application instance for multiple clients or oganisations.

## Tenant configuration

The tenant configuration is located in `config/tenants.json`. This file contains possible configurations for hostnames that serve the application.

This file is typically managed by `@lpc/sync` and should not be changed manually.

## Tenant pages

Tenant pages are located in `src/pages/_tenants/[tenants]` and must always have a `getServerSideProps` export with `defaultServerSideProps` or a `getStaticProps` export with `getPageProps`.

Tenant details can be read from the `TenantConfigContext` context with the `useContext` hook or from `pageProps` in `_app.page.tsx`.

By default, the tenant details are used to create an API client in `_app.page.tsx`.

### Static pages

Some extra steps need to be taken in order to generate tenant-aware static pages.

A static page needs to call `getPageProps` inside `getStaticProps` and return paths returned by `buildStaticPaths` in `getStaticPaths`.

E.g.

```tsx
export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  if (typeof ctx.params?.tenant !== "string") {
    throw new Error("Tenant is required!");
  }

  return {
    props: {
      ...(await getPageProps({ tenant: ctx.params?.tenant, locale: ctx.locale })),
    },
  };
};

export async function getStaticPaths() {
  const pageTree = buildStaticPaths([{}]);

  return {
    paths: pageTree,
    fallback: "blocking",
  };
}
```

### Invalid tenant error page

The tenant error page can be customized in `412.page.tsx`.

### Forcing a specific tenant

You can use the `TENANT_ORIGIN` environment variable to make the tenant resolve to any of the tenant’s specified in the tenant configuration.

```
# .env.local
TENANT_ORIGIN=scaffold.dev.lightbase.nl
```

### Local API

You can use the `TENANT_API_URL` environment variable to specify a local API url to use for the tenant.

```
# .env.local
TENANT_ORIGIN=scaffold.dev.lightbase.nl
TENANT_API_URL=http://localhost:3001
```

# API code generation

In [Compas](https://compasjs.com/)-backed projects generation of API code (hooks, api client) is provided out of the box.

The script handling generation is located in `/scripts/generate.mjs`.

Generated code is available in `/src/generated`.

# SVG generation

`.svg` files can be automatically optimized using SVGO and turned into React components by using the `yarn generate:svg` command.

SVG files can be placed in `assets/svg`, the generated output is placed in `src/assets/svg`.

`yarn generate:svg` will not overwrite existing files in the `src/assets/svg` directory to accommodate changes. To re-generate an existing file, simply delete it and run `yarn generate:svg`.

# Included libraries

## @tanstack/react-query   

By default, React Query is configured with a `staleTime` of 5 minutes and will retry a request a maximum of 3 times if the request failed due to a network error.

## react-hook-form
Previous versions of this scaffold shipped with [Formik](https://github.com/jaredpalmer/formik). However, time has learned us that [react-hook-form](https://react-hook-form.com/) is a much better fit for us and our projects.

# Default headers

These headers are configured by default, because they're considered good
security practice. You can overwrite these headers by
[setting the header yourself in `next.config.js`](https://nextjs.org/docs/api-reference/next.config.js/headers).

| Header                                                                                                             | Value                  |
|--------------------------------------------------------------------------------------------------------------------|------------------------|
| [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)                     | `deny`                 |
| [`X-Content-Type-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)       | `nosniff`              |
| [`Referrer-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)                     | `same-origin`          |                                                                                     
| [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) | `max-age=31536000`     |                                                                                     
| [`Permissions-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy)                   | `interest-cohort=()`   |                                                                                      

# Content Security Policy

[CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) allows restricting what sources assets (CSS, JavaScript, Fonts, etc.) can be loaded from.

By default, the following policy is set in `/src/middleware.api.ts`:

| Policy              | Value                                     |
|---------------------|-------------------------------------------|
| `default-src`       | `'self'`                  |
| `frame-ancestors`   | `'none'`                    |
| `style-src`         | `'self' 'unsafe-inline' fonts.googleapis.com`                      |
| `font-src`          | `'self' fonts.gstatic.com` |
| `script-src`        | `'self'`                  |

***Note**: In development, the policy is more lax to allow Next.js to provide developer tooling.*

# Browser compatibility

A check is run on `yarn build` to make sure that the output does 
not contain any non-ES5 JavaScript code. This is done so your app
does not unexpectedly break in older browsers.

When offending output is found the build fails, and you are notified.

```
[PRESET] Checking browser compatibility...
[PRESET]
You might want to add the following entries to `preset.transpileModules` in `next.config.js`:

- yup

For more information, see: https://github.com/martpie/next-transpile-modules
```

Most modules can be transpiled. Modules that can't be transpiled can be ignored.
Be sure to check if the module can be safely ignored or if you need to take
additional steps per the modules' instructions.

## Transpile modules

Modules to be transpiled can be added by setting the `preset.transpileModules`
option in `next.config.js`.

```js
const { withPreset } = require("@lightbase/next-preset");

/** @type {import("next").NextConfig} */
module.exports = withPreset({
  ...
  preset: {
    transpileModules: [
      "yup",
      "dequal",
    ],
    ...
  },
  ...
});

```

## Ignore modules

Some modules produce non-ES5 code and cannot be transpiled, e.g. Mapbox-GL.
Usually the module does not support older browsers, so it does not make sense
for them to transpile to ES5 or support it.

Modules to be ignored can be added by setting the `preset.ignoreModules` option
in `next.config.js`.

```js
const { withPreset } = require("@lightbase/next-preset");

/** @type {import("next").NextConfig} */
module.exports = withPreset({
  ...
  preset: {
    ignoreModules: ["mapbox-gl"],
    ...
  },
  ...
});

```

# Error monitoring

[Sentry](https://docs.sentry.io/platforms/javascript/guides/nextjs/) is set up for error monitoring on both server and client side. It is called from the `<ErrorBoundary>` in `_app.page.tsx`.

You can use `translateErrorKeyOrReport` from `src/lib` to automatically report missing error key translations.

# Dynamic `robots.txt`

A dynamic `/robots.txt` is powered via `/api/robots` which defaults to disallowing all agents

# Health check

There's a simple health check API route: `/api/_health`. In production, this API route can be used by DevOps tools to determine whether the Next.js server is running or not.
