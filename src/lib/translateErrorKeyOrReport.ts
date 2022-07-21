import * as Sentry from "@sentry/nextjs";

export function translateErrorKeyOrReport({
  t,
  key,
  info,
  options,
}: {
  t: (key: string, data?: unknown) => string;
  key: string;
  info?: unknown;
  options?: { alwaysReportError?: boolean };
}): string {
  const translated = t(key);

  if (translated === key) {
    Sentry.captureException(new Error(`Unknown error key: ${key}`), {
      extra: {
        data: {
          key,
          info,
        },
      },
    });

    return t("public:errors.unknown");
  }

  if (options?.alwaysReportError) {
    Sentry.captureException(new Error(key), {
      extra: {
        data: {
          key,
          info,
        },
      },
    });
  }

  return translated;
}
