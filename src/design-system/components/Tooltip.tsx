import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

export interface TooltipProps {
  children: ReactNode;
  label: string;
  side?: "top" | "bottom" | "left" | "right";
}

/** Hover label in mono type — anchors to one of 4 sides. */
export function Tooltip({ children, label, side = "top" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const positions: Record<NonNullable<TooltipProps["side"]>, CSSProperties> = {
    top: { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
  };
  const pos = positions[side];

  return (
    <span
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          style={{
            position: "absolute",
            ...pos,
            whiteSpace: "nowrap",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-2xs)",
            color: "var(--text-primary)",
            background: "var(--neutral-3)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            padding: "5px 8px",
            boxShadow: "var(--shadow-sm)",
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
