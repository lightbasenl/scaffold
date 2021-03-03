# Scaffold

A Next.js setup with:

- Typescript
- Storybook
- Jest
- Prettier
- Eslint
- TailwindCSS
- All Next.js features

## Commands

- `yarn dev` run the development server
- `yarn build` build the production app
- `yarn start` run the latest build
- `yarn storybook` start up storybook
- `yarn test` run unit tests
- `yarn pretty` run prettier
- `yarn lint` run eslint
- `yarn cy:run` run cypress test
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

## End-to-End testing

End-to-end testing is performed using Cypress

### Running tests

1. Make sure your dev server and Storybook are running
2. Run `yarn cy:run`.

### Creating tests

Tests targeting the app should be placed within `cypress/integration/app`.

Tests targeting a story in Storybook should be placed within `cypress/integration/storybook`.

Navigating to a story can be done using the `getStoryAddress` helper function.

E.g. if you need Cypress to visit the `default` story of the `button` module:

```js
import { getStoryAddress } from "../../support/utils";

describe("Storybook", () => {
  it("has button", () => {
    cy.visit(getStoryAddress("button", "default"));
    cy.findByText("I'm a button!").should("exist");
  });
});
```

Cypress's `cy` commands are extended by
[Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro)

## State management

For managing state coming from a non-graphql API we recommend using
[react-query](https://github.com/tannerlinsley/react-query).

For GraphQL APIs we recommend using [react-apollo](https://github.com/apollographql/react-apollo).

## Accessibility

This setup includes eslint rules for accessibility.

Included in the `package.json` are a few libraries that provide accessible primitives for components many projects require.

### react-focus-on
For creating accessible modals and more.

## Animations

Our animation library of choice is [Framer Motion](https://www.framer.com/api/motion/).

## License

Scaffold is [MIT licensed](./LICENSE.md).
