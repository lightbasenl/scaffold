import type { TFunction } from "next-i18next";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

import { useTranslation } from "next-i18next";

import type { AppErrorResponse } from "generated/common/reactQuery";

import { translateErrorKeyOrReport } from "lib/translateErrorKeyOrReport";

import Alert from "components/Alert";

export function translateValidationErrors<TFieldValues extends FieldValues = FieldValues>(
  t: TFunction,
  error: AppErrorResponse,
  setError: UseFormSetError<TFieldValues>,
) {
  let isFormError = false;

  if (!error.response?.data?.key) {
    return isFormError;
  }

  for (const [key, errorObject] of Object.entries(
    (error.response?.data?.info ?? {}) as Record<
      string,
      {
        key: string;
        info?: {
          [key: string]: string | object;
        };
      }
    >,
  )) {
    const field = key.replace("$.", "") as Path<TFieldValues>;
    const message = translateErrorKeyOrReport({
      t,
      key: errorObject?.key,
      info: errorObject?.info,
    });
    setError(field, { message });
    isFormError = true;
  }

  return isFormError;
}

export default function FormErrorHandler<TFieldValues extends FieldValues = FieldValues>({
  error,
  setError,
}: {
  error?: AppErrorResponse | null;
  setError: UseFormSetError<TFieldValues>;
}) {
  const { t } = useTranslation();

  if (!error || translateValidationErrors(t, error, setError)) {
    return null;
  }

  let message = t("public:errors.unknown");

  if (error.response?.data?.key) {
    message = translateErrorKeyOrReport({
      t,
      key: error.response?.data?.key,
      info: error.response?.data?.info,
    });
  }

  return <Alert title={t("common.errorTitle")} message={message} variant="danger" />;
}
