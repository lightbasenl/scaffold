const path = require("path");

module.exports = {
  addons: [
    {
      name: "@storybook/preset-typescript",
      options: {
        tsLoaderOptions: {
          configFile: path.resolve(__dirname, "./tsconfig.json"),
        },
        forkTsCheckerWebpackPluginOptions: {
          colors: false,
        },
        include: [path.resolve(__dirname, "../src")],
        transpileManager: true,
      },
    },
    "@storybook/addon-docs",
    "@storybook/addon-knobs/register",
    "@storybook/addon-a11y/register",
  ],
};
