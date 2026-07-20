import { useState } from "react";
import type { ChangeEvent, CSSProperties, ElementType, InputHTMLAttributes } from "react";
import { Icon, type IconName } from "./Icon";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "size" | "style" | "type"> {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  icon?: IconName;
  error?: string;
  hint?: string;
  disabled?: boolean;
  size?: "sm" | "md";
  /** Renders a <textarea> instead of <input>. Default false. */
  multiline?: boolean;
  rows?: number;
  style?: CSSProperties;
}

/** Text field with label, optional leading icon, and hint / error states. */
export function Input({
  label,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = "text",
  icon,
  error,
  hint,
  disabled = false,
  size = "md",
  multiline = false,
  rows = 3,
  style,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const padY = size === "sm" ? "6px" : "9px";
  const fontSize = size === "sm" ? "var(--text-xs)" : "var(--text-sm)";
  const Tag = (multiline ? "textarea" : "input") as ElementType;

  const borderColor = error ? "var(--status-danger)" : focused ? "var(--border-focus)" : "var(--border-subtle)";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", ...style }}>
      {label && (
        <label
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-xs)",
            fontWeight: "var(--weight-medium)",
            color: "var(--text-secondary)",
          }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: multiline ? "flex-start" : "center",
        }}
      >
        {icon && !multiline && (
          <span style={{ position: "absolute", left: "10px", color: "var(--text-secondary)", display: "flex" }}>
            <Icon name={icon} size={14} />
          </span>
        )}
        <Tag
          type={multiline ? undefined : type}
          rows={multiline ? rows : undefined}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            fontFamily: "var(--font-body)",
            fontSize: fontSize,
            color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
            background: disabled ? "var(--neutral-1)" : "var(--surface-card)",
            border: `1px solid ${borderColor}`,
            borderRadius: "var(--radius-md)",
            padding: icon && !multiline ? `${padY} 10px ${padY} 32px` : `${padY} 10px`,
            outline: "none",
            resize: multiline ? "vertical" : "none",
            boxShadow: focused && !error ? "var(--shadow-focus-ring)" : "none",
            transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
          }}
          {...rest}
        />
      </div>
      {(error || hint) && (
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-2xs)",
            color: error ? "var(--status-danger)" : "var(--text-secondary)",
          }}
        >
          {error || hint}
        </span>
      )}
    </div>
  );
}
