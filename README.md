# Scaffold

## Commands

- `yarn dev` runs the development server
- `yarn build` builds the production app
- `yarn start` start a server running the latest build
- `yarn storybook` start up storybook

## CSS Modules with Sass

For CSS we're using locally scoped `.scss` files. These should be named the same as it's Typescript counterpart and live in the same directory.

For example:
- components
  - `Button.tsx`
  - `Button.scss`

```tsx
// Button.tsx
import styles from "./Button.scss";

const Button = () => (
  <button className={styles.button}>I'm a button!</button>
);
```

`styles.button` is a hashed classname for `.button` in `Button.scss`

```scss
// Button.scss
.button {
  color: red;
}
```

See [css-modules](https://github.com/css-modules/css-modules) for more.

## Storybook

Storybook allows us to quickly prototype and develop base components (components typically living inside the `/components` directory).

To view storybook run `yarn storybook`

To add a story to storybook you can create a `*.story.tsx` file with the name of your component, this file should be in the same directory as the component.

For example:
- components
  - `Button.tsx`
  - `Button.story.tsx`

For more documentation see [https://storybook.js.org/docs/guides/guide-react/](https://storybook.js.org/docs/guides/guide-react/)

## Directory structure

### Base components

Base components like `<Button>`, `<Checkbox>`, `<Input>`, etc. that are used throughout the entire app should live in the root `/components` directory. This way they are easily referenced and found. It is recommended that base components always have a story (see storybook) that shows most intended usages.

### Pages

Pages live in the root `/pages` directory. This is a NextJS convention. As this is related to routing. See [https://nextjs.org/](https://nextjs.org/) for more.

Try to keep components only used in a certain page or certain pages as close to the page component as possible, within the directory structure.

For example:

- `/pages`
  - `/about-us`
    - `/components`
      - `Employee.tsx`
      - `Employee.scss`
    - `index.tsx` // The page component
    - `styles.scss` // The page styles

## Helper functions

Sometimes you'd want to use some logic written for one component for another. These pieces of logic can easily be extracted into a helper function in the `/helpers` directory. It is recommended that all helper functions have a unit test `*.test.ts` associated with them.