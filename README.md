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

*General explanation of our integration with `next-i18next` and possibly localize?*

Mention the ability of passing namespaces to be loaded to `defaultGetServerSideProps` and `getPageProps`

## Private localisation files

*Explain when you might want to use private localisation  and how it works.*

## Static pages

*Mention using `buildStaticPaths` and `getPageProps` as `getStaticPaths` and `getStaticProps` exports.*

# Authentication

*Describe how authentication with our backends typically works.*

*Mention the interceptors in `_app.page.tsx` and briefly describe what they do.*

## Authorization

### Authorization with `getServerSideProps`

*Describe how to use the `authDescription`*

### Client-side authorization

*Describe how to render components with the `useAuthenticate` hook and mention layout shifts.*

# Multi-tenancy

*A general explanation of what multi-tenancy is and why we use it.*

## Tenant configuration

*Describe what the tenant config file is and how it’s typically updated (lpc sync).*

## Tenant pages

*Descibe that tenant pages live in `_tenants/[tenant]` and that they require a `getServerSideProps` export with `getPageProps` to work.*

*Describe how tenant information is made available in pages.*

*Give notice that the tenant information is used for creating the api instance in `_app.page.tsx`*

### Static pages

*Mention using `buildStaticPaths` and `getPageProps` as `getStaticPaths` and `getStaticProps` exports.*

### Invalid tenant error page

*Give notice that the UI for the invalid tenant error page can be updated in `412.page.tsx`*

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

*Describe Compas and code generation in Scaffold.*

# SVG generation

*Describe how `yarn generate:svg` uses SVGO under the hood and that optimizations are applied automatically.*

*Explain that svg’s are to be placed in `assets/svg` (is this `/assets` directory really needed?) and that the generated output is placed in `src/assets/svg`.*

*Explain that, by default, existing files are not overwritten to allow for modification and that it’s easiest to delete a generated SVG component if they wish to regenerate it.*

# Included libraries

*List every important library as its own heading with some details about what we use it for and why it’s better for us than other alternatives  (max. 2 short paragraphs).*

*For react-query, describe the configured defaults*

*Note: make sure Formik is replaced with react-hook-form in this section*

# Default headers

These headers are configured by default, because they're considered good
security practice. You can overwrite these headers by
[setting the header yourself in `next.config.js`](https://nextjs.org/docs/api-reference/next.config.js/headers).

| Header                                                                                                             | Value                  |
|--------------------------------------------------------------------------------------------------------------------|------------------------|
| [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)                     | `deny`                 |
| [`X-Content-Type-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)       | `nosniff`              |
| [`Referrer-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)                     | `same-origin`          |                                                                                      |
| [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) | `max-age=31536000`     |                                                                                      |
| [`Permissions-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy)                   | `interest-cohort=()`   |                                                                                      |

# Content Security Policy

*Give a very brief description of what Content Security Policy is, refer to MDN for a more detailed explanation.*

*Explain that the policy is currently defined in `middleware.api.ts`.*

*Show a list of the different policies set with a short description.*

*Highlight the fact that in development, some policies are less strict because Next.js needs them to provide tooling.*

# Browser compatibility


When next-preset is used, a check is run on `next build` to make sure that the
output does not contain any non-ES5 JavaScript code. This is done so your app
does not unexpectedly break in certain browsers.

When offending output is found, the build fails and you're notified.

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

We have a simple `/api/_health` so in production the load balancer knows when the Next.js server is running or not.
