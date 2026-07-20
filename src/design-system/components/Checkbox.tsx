import { useState } from "react";
import type { CSSProperties } from "react";
import { Icon } from "./Icon";

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: CSSProperties;
}

/** Checkbox with an accent-filled checked state. */
export function Checkbox({ label, checked, defaultChecked, onChange, disabled = false, style }: CheckboxProps) {
  const [internal, setInternal] = useState(defaultChecked || false);
  const isChecked = checked !== undefined ? checked : internal;

  function toggle() {
    if (disabled) return;
    if (checked === undefined) setInternal((c) => !c);
    onChange && onChange(!isChecked);
  }

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
      onClick={toggle}
    >
      <span
        style={{
          width: "16px",
          height: "16px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "var(--radius-sm)",
          border: isChecked ? "1px solid var(--accent-7)" : "1px solid var(--border-strong)",
          background: isChecked ? "var(--accent-7)" : "var(--surface-card)",
          transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
        }}
      >
        {isChecked && <Icon name="check" size={11} strokeWidth={2.5} color="var(--text-on-accent)" />}
      </span>
      {label}
    </label>
  );
}
