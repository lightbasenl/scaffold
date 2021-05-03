const withTM = require("next-transpile-modules")(["yup"]);
const { i18n } = require("./next-i18next.config");

module.exports = withTM({
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
            value: "max-age=31536000"
          },
          {
            key: "Permissions-Policy",
            value: "interest-cohort=()"
          }
        ],
      },
    ]
  },
});
