import type { CSSProperties } from "react";
import { Icon, type IconName } from "./Icon";

type Tone = "info" | "success" | "warning" | "danger";

const TONE: Record<Tone, { icon: IconName; color: string }> = {
  info: { icon: "info", color: "var(--accent-9)" },
  success: { icon: "check-circle", color: "var(--status-success)" },
  warning: { icon: "alert-triangle", color: "var(--status-warning)" },
  danger: { icon: "alert-circle", color: "var(--status-danger)" },
};

export interface ToastProps {
  title: string;
  description?: string;
  tone?: Tone;
  onClose?: () => void;
  style?: CSSProperties;
}

/** Notification card — icon, title, description, 4 tones. */
export function Toast({ title, description, tone = "info", onClose, style }: ToastProps) {
  const t = TONE[tone] || TONE.info;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        width: "320px",
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-md)",
        padding: "13px 14px",
        ...style,
      }}
    >
      <span style={{ color: t.color, display: "flex", marginTop: "1px" }}>
        <Icon name={t.icon} size={16} />
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)", color: "var(--text-primary)" }}>
          {title}
        </span>
        {description && (
          <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>{description}</span>
        )}
      </div>
      {onClose && (
        <span
          onClick={onClose}
          style={{ display: "flex", cursor: "pointer", color: "var(--text-secondary)", marginTop: "1px" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          <Icon name="x" size={13} />
        </span>
      )}
    </div>
  );
}
