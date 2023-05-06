const { withSentryConfig } = require("@sentry/nextjs");
const { withPreset } = require("@lightbase/next-preset");
const { i18n } = require("./next-i18next.config.js");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
  },
  output: "standalone",
  preset: {
    transpileModules: [],
    ignoreModules: [],
  },
  i18n,
  rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ];
  },
  sentry: {
    widenClientFileUpload: true,
    excludeServerRoutes: [/\/_health\/?$/],
  },
};

module.exports =
  process.env.WITH_SENTRY === "true" ? withSentryConfig(withPreset(nextConfig)) : withPreset(nextConfig);
