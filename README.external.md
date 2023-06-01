---
title: Scaffold
---

Scaffold is our boilerplate for Next.js applications, it serves as the starting point for all web projects at
Lightbase.

It provides an opinionated set of defaults to assist developers in creating maintainable applications.

:::note

Some of these features are managed by [next-preset](https://github.com/lightbasenl/next-preset), which is
included in the Scaffold.

:::

## Setting up a new Scaffold project

You can use [create-next-app](https://nextjs.org/docs/api-reference/create-next-app) to quickly scaffold your
next project.

```
create-next-app --example=https://github.com/lightbasenl/scaffold
```

## Commands

- `yarn dev` run the development server
- `yarn build` build the production app
- `yarn start` run the latest build
- `yarn storybook` start up storybook
- `yarn test` run unit tests
- `yarn pretty` run prettier
- `yarn lint` run eslint

## Directory structure

### Components

Base components like `<Button>`, `<Checkbox>`, `<Input>`, etc. that are used throughout the entire app should
live in the `src/components` directory. This way they are easily referenced and found. It is recommended that
base components always have a story (see storybook) that shows most intended usages.

### Pages

Pages live in the `src/pages` directory and use the `.page.tsx` (for pages) or `.api.ts` (for API routes)
extension.

See [Next.js routing documentation](https://nextjs.org/docs/routing/introduction) for more information.

#### Page components

Page components are parts of a page that you don't want to keep in the page's file. Components that are
specific to a certain page should be put in the closest directory.

##### Example

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

This convention is not optimal, but it is required in order to safely use Next.js' file-based routing and have
a clear directory structure.

## Styling

We use [TailwindCSS](https://tailwindcss.com/) for styling in all our projects. It allows us to quickly
prototype and develop new functionality without having to think about naming classes and managing (S)CSS
files.

### Example

```tsx title="Button.tsx"
const Button = () => (
  <button className="rounded bg-blue-500 px-6 py-3 text-xl font-medium text-white hover:bg-blue-700">
    I'm a button!
  </button>
);
```

:::note

Any unused Tailwind utilities are stripped out in production builds.

:::

## Storybook

Storybook allows us to write documentation as well as quickly prototype and develop base components
(components typically living inside the `src/components` directory).

To view storybook run `yarn storybook`

To add a story to storybook you can create a `*.story.tsx` file with the name of your component, this file
should be put in the `/stories` directory.

### Example

```
...
├── ...
├── src
│   ├── components
│   │   └── Button.tsx  👈 The component
├── stories
│   └── Button.story.tsx 👈 The story
├── ...
```

For more documentation see
[https://storybook.js.org/docs/guides/guide-react/](https://storybook.js.org/docs/guides/guide-react/)

## Localisation

We're using [next-i18next](https://github.com/isaachinman/next-i18next) for handling localisation. This allows
us to only ship the required translations to pages, reducing bundle size and network load.

Locale files are stored inside the `/public` directory and are always publicly available.

```
...
├── ...
├── public
│   ├── locales
│   │   └── nl
│   │       └── home.json
├── ...
```

## Included libraries

- **React Query:** Our data-fetching and global cache solution of choice. React Query has proven to completely
  remove our need for state management solutions like Redux and MobX in our applications.
- **Formik:** Our form library of choice. It provides all the primitives you generally need to build a form.
- **Yup:** Validation library mostly used together with Formik.
- **Headless UI:** Accessible components like: slide-overs, modals and notifications.
- **react-focus-on:** Primitives for creating accessible components when Headless UI is too opinionated.
- **Framer Motion:** Framer Motion is our go-to solution for complex animations. E.g. elaborate transitions
  and animations that can't be easily achieved through CSS.
- **date-fns:** Our date library of choice.

### Default headers

These headers are configured by default, because they're considered good security practice. You can overwrite
these headers by
[setting the header yourself in `next.config.js`](https://nextjs.org/docs/api-reference/next.config.js/headers).

| Header                    | Value                  |
| ------------------------- | ---------------------- |
| x-frame-options           | deny                   |
| content-security-policy.  | frame-ancestors 'none' |
| x-content-type-options    | nosniff                |
| Referrer-Policy           | same-origin            |
| Strict-Transport-Security | max-age=31536000       |
| Permissions-Policy        | interest-cohort=()     |

## Browser compatibility

When next-preset is used, a check is run on `next build` to make sure that the output does not contain any
non-ES5 JavaScript code. This is done so your app does not unexpectedly break in certain browsers.

When offending output is found, the build fails and you're notified.

```
[PRESET] Checking browser compatibility...
[PRESET]
You might want to add the following entries to `preset.transpileModules` in `next.config.js`:

- yup

For more information, see: https://github.com/martpie/next-transpile-modules
```

Most modules can be transpiled. Modules that can't be transpiled can be ignored. Be sure to check if the
module can be safely ignored or if you need to take additional steps per the modules' instructions.

### Transpile modules

Modules to be transpiled can be added by setting the `preset.transpileModules` option in `next.config.js`.

```js
const { withPreset } = require("@lightbase/next-preset");

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

### Ignore modules

Some modules produce non-ES5 code and cannot be transpiled, e.g. Mapbox-GL. Usually the module does not
support older browsers, so it does not make sense for them to transpile to ES5 or support it.

Modules to be ignored can be added by setting the `preset.ignoreModules` option in `next.config.js`.

```js
const { withPreset } = require("@lightbase/next-preset");

module.exports = withPreset({
  ...
  preset: {
    ignoreModules: ["mapbox-gl"],
    ...
  },
  ...
});

```

### Source maps

In order for the browser compatibility check to function, source maps are enabled and will be available
alongside your app.

If you're using [@sentry/nextjs](https://github.com/getsentry/sentry-javascript/tree/master/packages/nextjs),
source maps are already enabled.

## Unit tests

Sometimes you'd want to use some logic written for one component for another. These pieces of logic can easily
be extracted into a function in the `src/lib` directory. It is recommended that all functions have a unit test
`*.test.ts` associated with them.

## Changes

Scaffold, like this document, is subject to change. With every project there is something new to learn, these
learnings can be proposed, discussed and implemented via PR's in the
[lightbasenl/scaffold](https://github.com/lightbasenl/scaffold) repository.

We should always try to backport these changes to our entire portfolio of projects as much as possible. That's
why Scaffold is part of the Lightbase Core initiative.
