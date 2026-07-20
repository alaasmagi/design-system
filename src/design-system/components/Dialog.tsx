import type { ReactNode } from "react";
import { Icon } from "./Icon";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  /** Right-aligned action row, e.g. `<Button>Cancel</Button><Button variant="primary">Confirm</Button>`. */
  footer?: ReactNode;
  width?: string;
}

/**
 * Modal dialog — overlay, title, body, footer actions.
 * Positioned within the nearest positioned ancestor (`position: absolute`),
 * so wrap it in a `position: relative` container to scope the overlay.
 */
export function Dialog({ open, onClose, title, children, footer, width = "420px" }: DialogProps) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "var(--surface-overlay)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          maxWidth: "90%",
          background: "var(--surface-raised)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-semibold)", color: "var(--text-primary)" }}>
            {title}
          </span>
          <span
            onClick={onClose}
            style={{ display: "flex", cursor: "pointer", color: "var(--text-secondary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <Icon name="x" size={16} />
          </span>
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: "var(--leading-normal)" }}>
          {children}
        </div>
        {footer && <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "4px" }}>{footer}</div>}
      </div>
    </div>
  );
}
