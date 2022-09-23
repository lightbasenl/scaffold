# @lightbase/eslint-plugin

Shared ESLint config and required dependencies.

## Usage

Add the following to your `.eslintrc`:

```json
{
  "extends": ["plugin:@lightbase/frontend"]
}
```

You can add custom rules or disable provided rules by using the `rules` object.

```json
{
  "extends": ["plugin:@lightbase/frontend"],
  "rules": {
    "react-hooks/rules-of-hooks": "off"
  }
}
```

See below for [what is included](#what-is-included)

## Custom rules

There are currently no custom `@lightbase` rules.

## What is included

The provided plugin wraps a few other plugins and configs to offer a complete setup out of the box. The
following plugins and/or configs are included;

- Prettier: Use Prettier via ESLint, removes the need for a separate Prettier invocation.
- Next: Include all custom rules provided by `@next/eslint-plugin-next`. This also includes `jsx-a11y` and
  `react-hooks` rules.
- Import: Custom import ordering and removal of unused imports

This plugin manages the necessary dependencies, including ESLint and Prettier, so you don't have to sort out
any version incompatibilities.

Any enabled rule is set to error. The perspective here is that warnings pile up and won't be dealt with, but
errors must be solved before a Pull Request can be merged.
