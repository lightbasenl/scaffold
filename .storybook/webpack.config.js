const path = require("path");

module.exports = async ({ config, mode }) => {
  // SCSS (modules) support
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
          modules: {
            localIdentName: "[local]__[hash:base64:5]"
          }
        }
      },
      {
        loader: "sass-loader",
        options: {
          includePaths: [path.resolve(__dirname, "../src")]
        }
      },
      {
        loader: "postcss-loader",
        options: {
          config: {
            path: path.resolve(__dirname, "../")
          }
        }
      }
    ],
    include: path.resolve(__dirname, "../src")
  });

  // TypeScript support
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("babel-loader"),
    options: {
      presets: [["react-app", { flow: false, typescript: true }]]
    }
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
