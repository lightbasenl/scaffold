# Lightbase frontend Scaffold

Use via `yarn create next-app --example=https://github.com/lightbasenl/scaffold`

## TODO

- tenant setup
- locale files
- Playwright tests
- Next.js
- Tailwind
- Sentry
- Linting
- Typescript
- Public folder + mail images
- Robots.txt (public + private for acc)
- Compas code-gen
- Dockerfile
- i18n public + private translations
- headers
- lightbase preset

## Docs

- Github actions
- Public folder
- Mail assets
- src/assets -> svg loader
- css tailwind setup
- pages
  - /api/\_health
  - /api/robots -> /robots.txt -> process.env.ALLOW_ROBOTS=true
- \_lpcTenant and SSR
- React query and SSR
- Locale docs
- Helpers for getStaticPaths, getServerProps, etc in combination with locale and tenants
- TODO(platform): items
- Other packages that we use
- Error pages

# Local dev

**Local api**

Use the below configuration if you are also running the API locally (on it's default port `3001`).

```dotenv
# .env.local
TENANT_ORIGIN=scaffold.dev.lightbase.nl
TENANT_API_URL=http://localhost:3001
```

**Remote api**

Use this configuration if you want to use the API from the hosted development environment.

```dotenv
# .env.local
TENANT_ORIGIN=scaffold.dev.lightbase.nl
```
