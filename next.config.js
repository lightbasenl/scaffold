const withTM = require("next-transpile-modules")(["yup"]);
const { i18n } = require("./next-i18next.config");
const { withSentryConfig } = require("@sentry/nextjs");

const config = withTM({
  pageExtensions: ["api.ts", "page.tsx"],
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  i18n,
  headers: async () => {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "x-frame-options",
            value: "deny",
          },
          {
            key: "content-security-policy",
            value: "frame-ancestors 'none'",
          },
          {
            key: "x-content-type-options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "same-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000",
          },
          {
            key: "Permissions-Policy",
            value: "interest-cohort=()",
          },
        ],
      },
    ];
  },
});

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(config, SentryWebpackPluginOptions);
