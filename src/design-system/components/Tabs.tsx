import { useState } from "react";
import type { CSSProperties } from "react";

export interface TabItem {
  value: string;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  style?: CSSProperties;
}

/** Underline tabs with an accent indicator on the active item. */
export function Tabs({ tabs = [], defaultValue, value, onChange, style }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue || (tabs[0] && tabs[0].value));
  const current = value !== undefined ? value : internal;

  function select(v: string) {
    if (value === undefined) setInternal(v);
    onChange && onChange(v);
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        borderBottom: "1px solid var(--border-subtle)",
        ...style,
      }}
    >
      {tabs.map((t) => {
        const active = t.value === current;
        return (
          <button
            key={t.value}
            onClick={() => select(t.value)}
            style={{
              appearance: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-sm)",
              fontWeight: active ? "var(--weight-semibold)" : "var(--weight-medium)",
              color: active ? "var(--text-primary)" : "var(--text-secondary)",
              padding: "10px 4px",
              marginBottom: "-1px",
              borderBottom: active ? "2px solid var(--accent-7)" : "2px solid transparent",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "color var(--duration-fast) var(--ease-standard)",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
