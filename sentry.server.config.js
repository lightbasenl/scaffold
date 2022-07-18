import * as Sentry from "@sentry/nextjs";

const SENTRY_ENV = process.env.SENTRY_ENV || "unknown";

Sentry.init({
  // TODO(platform): update DSN
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  environment: SENTRY_ENV,
  tracesSampleRate: 1.0,
});
