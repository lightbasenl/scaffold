import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // TODO(platform): update DSN
  dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
  tracesSampleRate: 1.0,
});
