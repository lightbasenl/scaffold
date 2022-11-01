import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { forwardRef } from "react";
import { tw } from "twind";

const sizes = {
  medium: "px-4 py-2 rounded-md text-sm",
  large: "px-6 py-3 rounded-md text-base",
};

const variants = {
  primary: "border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
  default: "bg-gray-50",
};

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, disabled, className, variant = "primary", size = "medium", isLoading = false, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={tw(
        "relative inline-flex items-center overflow-hidden border font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
        variants[variant],
        sizes[size],
        className,
        { "cursor-not-allowed": isLoading },
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
