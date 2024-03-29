module.exports = {
  configs: {
    frontend: {
      extends: [
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "next",
        "plugin:prettier/recommended",
      ],
      plugins: ["unused-imports", "no-relative-import-paths"],
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
      rules: {
        "no-relative-import-paths/no-relative-import-paths": [
          "error",
          { allowSameFolder: true, rootDir: "src" },
        ],
        "import/order": [
          "error",
          {
            warnOnUnassignedImports: false,
            "newlines-between": "always",
            alphabetize: {
              order: "asc",
            },
            groups: ["type", "builtin", "external", "internal", "parent", "sibling", "index", "object"],
            pathGroups: [
              {
                pattern: "css/**",
                group: "builtin",
                position: "before",
              },
              {
                pattern: "react",
                group: "builtin",
                position: "before",
              },
              {
                pattern: "next/**",
                group: "builtin",
                position: "before",
              },
              {
                pattern: "generated/**",
                group: "internal",
                position: "before",
              },
              {
                pattern: "lib/**",
                group: "internal",
                position: "before",
              },
              {
                pattern: "cms/**",
                group: "internal",
                position: "before",
              },
              {
                pattern: "server/**",
                group: "internal",
                position: "before",
              },
              {
                pattern: "tenants/**",
                group: "internal",
                position: "before",
              },
              {
                pattern: "pages/**",
                group: "internal",
                position: "before",
              },
              {
                pattern: "hooks/**",
                group: "internal",
                position: "before",
              },
              {
                pattern: "components/**",
                group: "internal",
                position: "before",
              },
              {
                pattern: "{assets,locale}/**",
                group: "internal",
              },
            ],
            pathGroupsExcludedImportTypes: ["react", "next/**", "css/**"],
          },
        ],

        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/prefer-ts-expect-error": "error",
        "@typescript-eslint/ban-ts-comment": "off",

        "@next/next/no-img-element": "off",
        "react/react-in-jsx-scope": "off",
        "jsx-a11y/anchor-is-valid": "off",
        "unused-imports/no-unused-imports": "error",

        "default-case": "off",
        curly: "error",

        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
      },
    },
  },
  rules: {},
};
