import { useState } from "react";
import type { CSSProperties } from "react";

export interface SwitchProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: CSSProperties;
}

/** Toggle switch — accent track when on, thumb slides on change. */
export function Switch({ label, checked, defaultChecked, onChange, disabled = false, style }: SwitchProps) {
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
        gap: "10px",
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
          width: "34px",
          height: "20px",
          flexShrink: 0,
          borderRadius: "var(--radius-full)",
          background: disabled ? "var(--neutral-3)" : isChecked ? "var(--accent-7)" : "var(--neutral-4)",
          position: "relative",
          transition: "background var(--duration-normal) var(--ease-standard)",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "2px",
            left: isChecked ? "16px" : "2px",
            width: "16px",
            height: "16px",
            borderRadius: "var(--radius-full)",
            background: "var(--neutral-9)",
            transition: "left var(--duration-normal) var(--ease-standard)",
          }}
        />
      </span>
      {label}
    </label>
  );
}
