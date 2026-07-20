import type { CSSProperties, ReactNode } from "react";

export interface CardProps {
  children?: ReactNode;
  padding?: string;
  /** Brightens surface + border on hover — use for clickable cards. */
  hoverable?: boolean;
  style?: CSSProperties;
}

/** Neutral surface container with a subtle border and optional hover lift. */
export function Card({ children, padding = "20px", hoverable = false, style }: CardProps) {
  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding,
        transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!hoverable) return;
        e.currentTarget.style.background = "var(--surface-hover)";
        e.currentTarget.style.borderColor = "var(--border-strong)";
      }}
      onMouseLeave={(e) => {
        if (!hoverable) return;
        e.currentTarget.style.background = "var(--surface-card)";
        e.currentTarget.style.borderColor = "var(--border-subtle)";
      }}
    >
      {children}
    </div>
  );
}
