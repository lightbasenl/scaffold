import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  AnchorHTMLAttributes
} from "react";
import styles from "./Button.scss";
import classNames from "classnames";
import ucfirst from "helpers/ucfirst";

/**
 * Used for rendering a semantically correct button.
 */
export const Button: React.FC<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { variantColor?: "red" | "blue" | "dark" }
> = ({ children, className, variantColor, ...props }) => {
  const variant = variantColor
    ? styles[`is${ucfirst(variantColor)}`]
    : undefined;

  return (
    <button
      className={classNames(styles.button, variant, className)}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Used for rendering a semantically correct Anchor, while appearing as a button.
 * Supports Next's <Link> component.
 */
export const ButtonLink: React.FC<
  DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & { variantColor?: "red" | "blue" | "dark" }
> = React.forwardRef(({ children, variantColor, className, ...props }, ref) => {
  const variant = variantColor
    ? styles[`is${ucfirst(variantColor)}`]
    : undefined;

  return (
    <a
      ref={ref}
      className={classNames(styles.button, variant, className)}
      {...props}
    >
      {children}
    </a>
  );
});
