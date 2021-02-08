const path = require("path");

module.exports = {
  stories: ["../stories/*.story.@(ts|tsx|js|jsx|mdx)"],
  addons: ["@storybook/addon-essentials"],
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules = [path.resolve(__dirname, "../src"), "node_modules"];

    return config;
  }
};