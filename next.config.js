const withTM = require("next-transpile-modules")(["yup"]);

module.exports = withTM({
  pageExtensions: ["api.ts", "page.tsx"],
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
});
