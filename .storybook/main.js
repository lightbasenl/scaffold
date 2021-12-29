const path = require("path");

module.exports = {
  stories: ["../stories/**/*.story.@(ts|tsx|js|jsx|mdx)"],
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
  "framework": "@storybook/react",
  "core": {
    "builder": "webpack5"
  },
  webpackFinal: async (config) => {
    config.resolve.modules = [path.resolve(__dirname, "../src"), "node_modules"];

    config.resolve = {
      ...config.resolve,
      fallback: {
        "fs": false,
        "path": false,
        "os": false,
      }
    };

    return config;
  },
};
