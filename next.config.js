const { withSentryConfig } = require("@sentry/nextjs");
const { withPreset } = require("@lightbase/next-preset");
const { i18n } = require("./next-i18next.config.js");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  preset: {
    transpileModules: [],
    ignoreModules: [],
  },
  i18n,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },

      use: {
        loader: "@svgr/webpack",
      },
    });

    return config;
  },
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
  },
};

module.exports =
  process.env.WITH_SENTRY === "true" ? withSentryConfig(withPreset(nextConfig)) : withPreset(nextConfig);
