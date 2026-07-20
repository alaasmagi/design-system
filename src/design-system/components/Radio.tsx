import type { CSSProperties } from "react";

export interface RadioProps {
  label?: string;
  name?: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  style?: CSSProperties;
}

/** Single-select radio dot. Group several by sharing a `name`. */
export function Radio({ label, value, checked, onChange, disabled = false, style }: RadioProps) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-sm)",
        color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
        ...style,
      }}
      onClick={() => !disabled && onChange && onChange(value)}
    >
      <span
        style={{
          width: "16px",
          height: "16px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "var(--radius-full)",
          border: checked ? "1px solid var(--accent-7)" : "1px solid var(--border-strong)",
          background: "var(--surface-card)",
          transition: "border-color var(--duration-fast) var(--ease-standard)",
        }}
      >
        {checked && (
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "var(--radius-full)",
              background: "var(--accent-7)",
            }}
          />
        )}
      </span>
      {label}
    </label>
  );
}
