import type { CSSProperties, ReactNode, SVGProps } from "react";

/* Minimal geometric line-icon set: chevrons, check, x, plus/minus,
   search, info/alert/success glyphs, arrow, spinner, plus the extra
   product glyphs (lock, key, mail, person, …). Stroke-based, round
   caps/joins — matches the system's technical-geometric feel. */
export type IconName =
  | "chevron-down"
  | "chevron-right"
  | "chevron-up"
  | "check"
  | "x"
  | "plus"
  | "minus"
  | "search"
  | "info"
  | "alert-triangle"
  | "alert-circle"
  | "check-circle"
  | "arrow-right"
  | "spinner"
  | "lock"
  | "key"
  | "mail"
  | "person"
  | "bin"
  | "code"
  | "work"
  | "school"
  | "pincode"
  | "account-settings"
  | "visibility-on"
  | "visibility-off"
  | "zoom";

const PATHS: Record<IconName, ReactNode> = {
  "chevron-down": <polyline points="6 9 12 15 18 9" />,
  "chevron-right": <polyline points="9 18 15 12 9 6" />,
  "chevron-up": <polyline points="18 15 12 9 6 15" />,
  check: <polyline points="20 6 9 17 4 12" />,
  x: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  minus: <line x1="5" y1="12" x2="19" y2="12" />,
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="11" />
      <line x1="12" y1="8" x2="12" y2="8" />
    </>
  ),
  "alert-triangle": (
    <>
      <path d="M12 3 L21.5 20 H2.5 Z" />
      <line x1="12" y1="10" x2="12" y2="14" />
      <line x1="12" y1="17.5" x2="12" y2="17.5" />
    </>
  ),
  "alert-circle": (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12.5" />
      <line x1="12" y1="16" x2="12" y2="16" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="8 12.5 11 15.5 16 9" />
    </>
  ),
  "arrow-right": (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>
  ),
  spinner: (
    <>
      <circle cx="12" cy="12" r="9" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  key: (
    <>
      <circle cx="7" cy="17" r="4" />
      <line x1="10" y1="14" x2="21" y2="3" />
      <line x1="15" y1="9" x2="18" y2="12" />
      <line x1="18" y1="6" x2="21" y2="9" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <polyline points="3 7 12 13 21 7" />
    </>
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
    </>
  ),
  bin: (
    <>
      <path d="M9 7V4h6v3" />
      <path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" />
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </>
  ),
  code: (
    <>
      <polyline points="8 6 3 12 8 18" />
      <polyline points="16 6 21 12 16 18" />
    </>
  ),
  work: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="3" y1="13" x2="21" y2="13" />
    </>
  ),
  school: (
    <>
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" />
    </>
  ),
  pincode: (
    <>
      <circle cx="7" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="17" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="7" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="17" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="7" cy="18" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="17" cy="18" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  "account-settings": (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </>
  ),
  "visibility-on": (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  "visibility-off": (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
      <line x1="3" y1="3" x2="21" y2="21" />
    </>
  ),
  zoom: (
    <>
      <circle cx="10" cy="10" r="7" />
      <line x1="10" y1="7" x2="10" y2="13" />
      <line x1="7" y1="10" x2="13" y2="10" />
      <line x1="21" y1="21" x2="15.5" y2="15.5" />
    </>
  ),
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name" | "color"> {
  /** Which glyph to render. */
  name: IconName;
  /** Pixel size (square). Default 16. */
  size?: number;
  /** Stroke width. Default 2. */
  strokeWidth?: number;
  /** Stroke color. Default currentColor — set via parent's `color`. */
  color?: string;
  style?: CSSProperties;
}

/**
 * Small stroke-based icon set used across the system's components
 * (chevrons, check, x, status glyphs, spinner). An internal primitive
 * other components compose; also exported for direct use.
 */
export function Icon({ name, size = 16, strokeWidth = 2, color = "currentColor", style, ...rest }: IconProps) {
  const glyph = PATHS[name];
  if (!glyph) return null;
  const spin = name === "spinner";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        display: "block",
        flexShrink: 0,
        animation: spin ? "ds-icon-spin 0.8s linear infinite" : undefined,
        ...style,
      }}
      {...rest}
    >
      {glyph}
    </svg>
  );
}
