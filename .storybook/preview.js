import "../src/css/tailwind.css";
import { withNextRouter } from 'storybook-addon-next-router';
import {addDecorator} from "@storybook/react";

export const parameters = {
  options: {
    storySort: (a, b) => {
      // We want the Welcome story at the top
      if (b[1].kind === "Introduction") {
        return 1;
      }

      // Sort the other stories by ID
      // https://github.com/storybookjs/storybook/issues/548#issuecomment-530305279
      return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true });
    },
  },
};

addDecorator(
  withNextRouter({
    path: '/', // defaults to `/`
    asPath: '/', // defaults to `/`
    query: {}, // defaults to `{}`
    push() {}, // defaults to using addon actions integration, can override any method in the router
    locale: 'en'
  })
);
