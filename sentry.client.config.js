import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // TODO(platform): update DSN
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
