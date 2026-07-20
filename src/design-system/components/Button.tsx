import type { ButtonHTMLAttributes, CSSProperties, MouseEvent, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const SIZE: Record<Size, { padY: string; padX: string; fontSize: string; gap: string; iconSize: number; radius: string }> = {
  sm: { padY: "6px", padX: "10px", fontSize: "var(--text-xs)", gap: "6px", iconSize: 14, radius: "var(--radius-sm)" },
  md: { padY: "9px", padX: "14px", fontSize: "var(--text-sm)", gap: "7px", iconSize: 15, radius: "var(--radius-md)" },
  lg: { padY: "12px", padX: "18px", fontSize: "var(--text-base)", gap: "8px", iconSize: 16, radius: "var(--radius-md)" },
};

function variantStyle(variant: Variant) {
  switch (variant) {
    case "secondary":
      return {
        base: "var(--surface-card)",
        hover: "var(--surface-hover)",
        press: "var(--neutral-4)",
        text: "var(--text-primary)",
        border: "1px solid var(--border-subtle)",
      };
    case "ghost":
      return {
        base: "transparent",
        hover: "var(--surface-hover)",
        press: "var(--neutral-4)",
        text: "var(--text-primary)",
        border: "1px solid transparent",
      };
    case "danger":
      return {
        base: "var(--status-danger-bg)",
        hover: "var(--status-danger-bg)",
        press: "var(--status-danger-bg)",
        text: "var(--status-danger)",
        border: "1px solid var(--status-danger-bg)",
      };
    default:
      return {
        base: "var(--action-primary)",
        hover: "var(--action-primary-hover)",
        press: "var(--action-primary-press)",
        text: "var(--action-primary-text)",
        border: "1px solid transparent",
      };
  }
}

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick" | "style"> {
  children?: ReactNode;
  /** Visual style. Default "primary". */
  variant?: Variant;
  /** Default "md". */
  size?: Size;
  /** Optional leading/trailing icon glyph. */
  icon?: IconName;
  iconPosition?: "left" | "right";
  /** Shows spinner in place of icon, disables interaction. */
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (e: MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  style?: CSSProperties;
}

/** Primary action button — 4 variants × 3 sizes, optional icon + loading state. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = "button",
  style,
  ...rest
}: ButtonProps) {
  const s = SIZE[size] || SIZE.md;
  const v = variantStyle(variant);
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: fullWidth ? "100%" : undefined,
        gap: s.gap,
        padding: `${s.padY} ${s.padX}`,
        fontFamily: "var(--font-body)",
        fontSize: s.fontSize,
        fontWeight: "var(--weight-medium)",
        letterSpacing: "var(--tracking-normal)",
        color: isDisabled ? "var(--text-disabled)" : v.text,
        background: isDisabled ? "var(--neutral-2)" : v.base,
        border: isDisabled ? "1px solid var(--border-subtle)" : v.border,
        borderRadius: s.radius,
        cursor: isDisabled ? "not-allowed" : "pointer",
        transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (isDisabled) return;
        e.currentTarget.style.background = v.hover;
      }}
      onMouseLeave={(e) => {
        if (isDisabled) return;
        e.currentTarget.style.background = v.base;
      }}
      onMouseDown={(e) => {
        if (isDisabled) return;
        e.currentTarget.style.background = v.press;
      }}
      onMouseUp={(e) => {
        if (isDisabled) return;
        e.currentTarget.style.background = v.hover;
      }}
      {...rest}
    >
      {loading ? (
        <Icon name="spinner" size={s.iconSize} />
      ) : (
        icon && iconPosition === "left" && <Icon name={icon} size={s.iconSize} />
      )}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === "right" && <Icon name={icon} size={s.iconSize} />}
    </button>
  );
}
