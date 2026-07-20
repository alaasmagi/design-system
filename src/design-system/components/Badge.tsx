import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Tone = "neutral" | "accent" | "success" | "warning" | "danger";

const TONE: Record<Tone, { bg: string; fg: string }> = {
  neutral: { bg: "var(--neutral-3)", fg: "var(--text-primary)" },
  accent: { bg: "var(--accent-2)", fg: "var(--accent-9)" },
  success: { bg: "var(--status-success-bg)", fg: "var(--status-success)" },
  warning: { bg: "var(--status-warning-bg)", fg: "var(--status-warning)" },
  danger: { bg: "var(--status-danger-bg)", fg: "var(--status-danger)" },
};

export interface BadgeProps {
  children?: ReactNode;
  tone?: Tone;
  icon?: IconName;
  style?: CSSProperties;
}

/** Uppercase mono status label — 5 tones, for system/status state. */
export function Badge({ children, tone = "neutral", icon, style }: BadgeProps) {
  const t = TONE[tone] || TONE.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-2xs)",
        fontWeight: "var(--weight-medium)",
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
        color: t.fg,
        background: t.bg,
        borderRadius: "var(--radius-sm)",
        padding: "3px 7px",
        ...style,
      }}
    >
      {icon && <Icon name={icon} size={10} />}
      {children}
    </span>
  );
}
