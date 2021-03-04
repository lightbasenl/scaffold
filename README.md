# Scaffold

A Next.js setup with:

- Typescript
- Storybook
- Jest
- Prettier
- Eslint
- TailwindCSS
- All Next.js features

## Setting up a new Scaffold project
You can use [create-next-app](https://nextjs.org/docs/api-reference/create-next-app) to quickly scaffold your next project.

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
- `yarn es-check` check whether any dependencies have broken support for older browsers

## Styling

For styling we're using [TailwindCSS](https://tailwindcss.com/).

```tsx
// Button.tsx
const Button = () => (
  <button className="bg-blue-500 hover:bg-blue-700 text-xl text-white font-medium py-3 px-6 rounded">
    I'm a button!
  </button>
);
```

Any unused Tailwind utilities are stripped out in production builds.

## Storybook

Storybook allows us to write documentation as well as quickly prototype and develop base components (components typically living inside the
`src/components` directory).

To view storybook run `yarn storybook`

To add a story to storybook you can create a `*.story.tsx` file with the name of your component, this file
should be put in the `/stories` directory.

For example:

- components
  - `Button.tsx`
- stories
  - `Button.story.tsx`

For more documentation see
[https://storybook.js.org/docs/guides/guide-react/](https://storybook.js.org/docs/guides/guide-react/)

## Directory structure

### Components

Base components like `<Button>`, `<Checkbox>`, `<Input>`, etc. that are used throughout the entire app should
live in the `src/components` directory. This way they are easily referenced and found. It is recommended that
base components always have a story (see storybook) that shows most intended usages.

### Pages

Pages live in the `src/pages` directory. This is a Next.js convention. As this is related to routing. See
[https://nextjs.org/](https://nextjs.org/) for more.

#### Page components

Page components are parts of a page that you don't want to keep in the page's file.
Components that are specific to a certain page should be put in the closest directory.

For example:

- `src/pages`
  - `about-us`
    - `components`
        - `Employee.tsx` // The component
    - `index.page.tsx` // The page component

This convention is not optimal, but it is required in order to safely use Next.js' file-based routing and have
a clear directory structure.

## Unit tests

Sometimes you'd want to use some logic written for one component for another. These pieces of logic can easily
be extracted into a function in the `src/lib` directory. It is recommended that all functions have a unit test `*.test.ts` associated with them.

## State management

For managing state coming from a non-graphql API we recommend using
[react-query](https://github.com/tannerlinsley/react-query).

For GraphQL APIs we recommend using [react-apollo](https://github.com/apollographql/react-apollo).

## Accessibility

It's always important to keep accessibility in mind when developing. See https://developer.mozilla.org/en-US/docs/Web/Accessibility for guides and information.

Concrete examples for more accessible applications:
- Skip to main content link
- Proper focus styles
- Accessible color usage
- Not using `<div />` as a `<button />`
- Not using `<button />` as an `<a />`
- Marking `<svg />`'s and other visual-only elements as `aria-hidden="true"` to prevent them from being announced to screen readers.
- Properly using landmarks: `<header />`, `<nav />`, `<main />`, `<footer />`, `<aside />`, `<article />`, `<section />`
- Properly using headings, see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
- Add screen reader hints for buttons that only consist of icons: `<button><svg ... aria-hidden="true" /><span className="sr-only">This is a button!</span></button>`. More examples: https://tailwindcss.com/docs/screen-readers

### react-focus-on
react-focus-on is a nice library for creating modals and other interactive "dialog"-like interfaces. It manages focus states for you and provides accessible defaults.

## Animations

Our animation library of choice is [Framer Motion](https://www.framer.com/api/motion/).

## License

Scaffold is [MIT licensed](./LICENSE.md).
