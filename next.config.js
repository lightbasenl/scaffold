const withTM = require("next-transpile-modules")(["yup"]);
const { i18n } = require("./next-i18next.config");

module.exports = withTM({
  pageExtensions: ["api.ts", "page.tsx"],
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  i18n,
});
