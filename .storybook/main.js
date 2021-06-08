const path = require("path");

module.exports = {
  stories: ["../stories/*.story.@(ts|tsx|js|jsx|mdx)"],
  addons: ["@storybook/addon-links", '@storybook/addon-docs', "@storybook/addon-essentials", {
    name: "@storybook/addon-postcss",
    options: {
      styleLoaderOptions: {},
      cssLoaderOptions: {},
      postcssLoaderOptions: {
        implementation: require("postcss")
      },
    }
  }],
  webpackFinal: async (config) => {
    config.resolve.modules = [path.resolve(__dirname, "../src"), "node_modules"];

    return config;
  },
  typescript: {
    reactDocgen: 'none', // temporary work-around for TypeScript 4.3.x, see: https://github.com/styleguidist/react-docgen-typescript/issues/356
  },
};
