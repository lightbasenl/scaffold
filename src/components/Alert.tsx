import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

import classNames from "classnames";

type AlertProps = {
  title: ReactNode | string;
  message?: ReactNode | string;
  actions?: ReactNode;
  variant?: "success" | "info" | "warning" | "danger";
};

export default function Alert({
  title,
  variant = "info",
  message,
  actions,
  ...props
}: AlertProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      className={classNames("rounded-md border p-4", {
        "border-green-200 bg-emerald-50": variant === "success",
        "border-blue-200 bg-blue-50": variant === "info",
        "border-yellow-200 bg-amber-50": variant === "warning",
        "border-red-200 bg-red-50": variant === "danger",
      })}
      {...props}
    >
      <div className="flex">
        <div className="shrink-0">
          {variant === "success" && (
            <svg
              className="h-5 w-5 text-emerald-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {variant === "danger" && (
            <svg
              className="h-5 w-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {variant === "info" && (
            <svg
              className="h-5 w-5 text-blue-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {variant === "warning" && (
            <svg
              className="h-5 w-5 text-amber-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <p
            className={classNames("text-sm font-medium leading-5", {
              "text-emerald-800": variant === "success",
              "text-blue-800": variant === "info",
              "text-amber-800": variant === "warning",
              "text-red-800": variant === "danger",
            })}
          >
            {title}
          </p>
          {message && (
            <div
              className={classNames("mt-2 text-sm leading-5", {
                "text-emerald-700": variant === "success",
                "text-blue-700": variant === "info",
                "text-amber-700": variant === "warning",
                "text-red-700": variant === "danger",
              })}
            >
              {message}
            </div>
          )}
          {actions && actions}
        </div>
      </div>
    </div>
  );
}
