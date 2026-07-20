import { useState } from "react";
import type { CSSProperties } from "react";
import { Icon } from "./Icon";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  style?: CSSProperties;
}

/** Custom dropdown select with a checkmark on the active option. */
export function Select({ label, options = [], value, defaultValue, onChange, placeholder = "Select…", disabled = false, style }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(defaultValue);
  const current = value !== undefined ? value : internal;
  const selected = options.find((o) => o.value === current);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", position: "relative", ...style }}>
      {label && (
        <label style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-medium)", color: "var(--text-secondary)" }}>
          {label}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          boxSizing: "border-box",
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-sm)",
          color: disabled ? "var(--text-disabled)" : selected ? "var(--text-primary)" : "var(--text-secondary)",
          background: disabled ? "var(--neutral-1)" : "var(--surface-card)",
          border: `1px solid ${open ? "var(--border-focus)" : "var(--border-subtle)"}`,
          borderRadius: "var(--radius-md)",
          padding: "9px 10px",
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: open ? "var(--shadow-focus-ring)" : "none",
        }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <Icon name="chevron-down" size={14} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform var(--duration-fast) var(--ease-standard)" }} />
      </button>
      {open && !disabled && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 10,
            background: "var(--surface-raised)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-md)",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {options.map((o) => (
            <div
              key={o.value}
              onClick={() => {
                setInternal(o.value);
                onChange && onChange(o.value);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                color: "var(--text-primary)",
                padding: "7px 8px",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                background: o.value === current ? "var(--surface-hover)" : "transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = o.value === current ? "var(--surface-hover)" : "transparent")}
            >
              <span>{o.label}</span>
              {o.value === current && <Icon name="check" size={13} color="var(--accent-7)" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
