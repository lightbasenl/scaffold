import type { HTMLProps, ReactNode } from "react";
import React, { forwardRef } from "react";

import classNames from "classnames";

type InputProps = {
  name: string;
  description?: string;
  error?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps & HTMLProps<HTMLInputElement>>(function Input(
  {
    className,
    description,
    error,
    leftElement,
    rightElement,
    name,
    ...rest
  }: InputProps & HTMLProps<HTMLInputElement>,
  ref,
) {
  return (
    <>
      <div className={classNames("relative flex", className)}>
        {!!leftElement && leftElement}
        <input
          ref={ref}
          name={name}
          className={classNames("block w-full rounded-md sm:text-sm", {
            "border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500":
              error,
            "border-gray-300 focus:border-blue-500 focus:ring-blue-500": !error,
            "rounded-l-none": !!leftElement,
            "rounded-r-none": !!rightElement,
          })}
          aria-invalid={!!error ? "true" : undefined}
          aria-describedby={!!error ? `${name}-error` : undefined}
          data-error={!!error ? error : undefined}
          {...rest}
        />
        {!!rightElement && rightElement}
      </div>
      {!!description && <p className="mt-2 text-sm text-gray-600">{description}</p>}
      {!!error && (
        <p className="mt-2 text-sm text-red-500" id={`${name}-error`}>
          {error}
        </p>
      )}
    </>
  );
});

export default Input;
