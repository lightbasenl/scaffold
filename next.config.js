const { withPreset } = require("@lightbase/next-preset");
const { i18n } = require("./next-i18next.config");

// We used @lightbase/next-preset for shared Next.js configuration,
// you can override these setting if you have to.
module.exports = withPreset({
  preset: {
    sentry: {
      enabled: false, // Enable sentry here
    },
    transpileModules: ["yup"],
  },
  i18n,
});
