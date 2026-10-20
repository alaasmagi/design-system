import type { CSSProperties } from "react";

import { PATHS, type IconName } from "./icons";

export interface IconProps {
  name: IconName;
  /** Pixel size (Figma default 24; components use 16–20). */
  size?: number;
  /** Accessible label. Without it the icon is decorative (aria-hidden). */
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export function Icon({ name, size = 24, label, className, style }: IconProps) {
  return (
    <svg
      className={["ds-icon", name === "loader" ? "ds-spin" : "", className].filter(Boolean).join(" ")}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={style}
      dangerouslySetInnerHTML={{ __html: PATHS[name] }}
    />
  );
}
