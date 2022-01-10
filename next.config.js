const { withPreset } = require("@lightbase/next-preset");
const { withSentryConfig } = require("@sentry/nextjs");
const { i18n } = require("./next-i18next.config");

const SENTRY_ENABLED = false;

// We used @lightbase/next-preset for shared Next.js configuration,
// you can override these setting if you have to.
const config = withPreset({
  preset: {
    transpileModules: ["yup", "framesync", "popmotion", "style-value-types"],
  },
  i18n,
});

module.exports = SENTRY_ENABLED ? withSentryConfig(config) : config;
