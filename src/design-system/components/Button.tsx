import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./icons";
import { cx } from "./cx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Variant. Primary = one main action per screen. */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Figma: Show icon + Icon (leading, 18px). */
  icon?: IconName;
  fullWidth?: boolean;
  children?: ReactNode;
}

/** 44px button (touch target). */
export function Button({ variant = "primary", icon, fullWidth, className, children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={cx("ds-button", `ds-button--${variant}`, fullWidth && "ds-button--full", className)} {...rest}>
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  );
}

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: IconName;
  /** Required accessible name (also shown by a Tooltip if you wrap it). */
  label: string;
  /** Figma: Style. */
  variant?: "secondary" | "ghost";
}

export function IconButton({ icon, label, variant = "ghost", className, type = "button", ...rest }: IconButtonProps) {
  return (
    <button type={type} aria-label={label} className={cx("ds-icon-button", `ds-icon-button--${variant}`, className)} {...rest}>
      <Icon name={icon} size={20} />
    </button>
  );
}
