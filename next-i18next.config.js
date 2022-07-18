const path = require("path");

/** @type {import("next-i18next").UserConfig} */
module.exports = {
  i18n: {
    locales: ["nl", "en"],
    defaultLocale: "en",
  },
  localePath: path.resolve("./src/locales"),
  reloadOnPrerender: process.env.NODE_ENV === "development",
  defaultNS: "public",
};
