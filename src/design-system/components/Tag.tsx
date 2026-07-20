import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./Icon";

export interface TagProps {
  children?: ReactNode;
  /** Shows an × that calls this when clicked (removable chip). */
  onRemove?: () => void;
  /** Accent-tinted "selected" look, e.g. active filter. */
  selected?: boolean;
  style?: CSSProperties;
}

/** Pill chip for categories / filters — optional removable ×. */
export function Tag({ children, onRemove, selected = false, style }: TagProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-xs)",
        fontWeight: "var(--weight-medium)",
        color: selected ? "var(--accent-9)" : "var(--text-primary)",
        background: selected ? "var(--accent-2)" : "var(--surface-hover)",
        border: `1px solid ${selected ? "var(--accent-3)" : "var(--border-subtle)"}`,
        borderRadius: "var(--radius-full)",
        padding: "4px 10px",
        ...style,
      }}
    >
      {children}
      {onRemove && (
        <span
          onClick={onRemove}
          style={{ display: "flex", cursor: "pointer", color: "inherit", opacity: 0.7 }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.7")}
        >
          <Icon name="x" size={11} />
        </span>
      )}
    </span>
  );
}
