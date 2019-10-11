module.exports = ({ config, mode }) => {
  // TypeScript resolution
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [["react-app", { flow: false, typescript: true }]]
    }
  });

  // SCSS resolution
  config.module.rules.push({
    test: /\.scss$/,
    loaders: [
      require.resolve("style-loader"),
      {
        loader: require.resolve("css-loader"),
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: "[name]__[local]___[hash:base64:5]"
          }
        }
      },
      {
        loader: require.resolve("postcss-loader"),
        options: {
          sourceMap: true,
          config: {
            path: ".storybook/postcss.config.js"
          }
        }
      },
      require.resolve("sass-loader")
    ]
  });

  config.resolve.extensions.push(".ts", ".tsx", ".scss");

  return config;
};
