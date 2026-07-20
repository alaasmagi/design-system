import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Status = "default" | "success" | "error";

const STATUS_COLOR: Record<Status, string> = {
  default: "var(--accent-7)",
  success: "var(--status-success)",
  error: "var(--status-danger)",
};

const CORNER = 26;
const THICK = 3;

function Corner({ position, color }: { position: "tl" | "tr" | "bl" | "br"; color: string }) {
  const base: CSSProperties = { position: "absolute", width: CORNER, height: CORNER, transition: "border-color var(--duration-normal) var(--ease-standard)" };
  const sides: Record<"tl" | "tr" | "bl" | "br", CSSProperties> = {
    tl: { top: 0, left: 0, borderTop: `${THICK}px solid ${color}`, borderLeft: `${THICK}px solid ${color}`, borderTopLeftRadius: "var(--radius-md)" },
    tr: { top: 0, right: 0, borderTop: `${THICK}px solid ${color}`, borderRight: `${THICK}px solid ${color}`, borderTopRightRadius: "var(--radius-md)" },
    bl: { bottom: 0, left: 0, borderBottom: `${THICK}px solid ${color}`, borderLeft: `${THICK}px solid ${color}`, borderBottomLeftRadius: "var(--radius-md)" },
    br: { bottom: 0, right: 0, borderBottom: `${THICK}px solid ${color}`, borderRight: `${THICK}px solid ${color}`, borderBottomRightRadius: "var(--radius-md)" },
  };
  return <span style={{ ...base, ...sides[position] }} />;
}

export interface QRScannerProps {
  /** Camera feed / video element / anything to show inside the viewfinder. Shows a placeholder glyph if omitted. */
  children?: ReactNode;
  /** Square frame size in px. Default 220. */
  size?: number;
  /** Corner-bracket + overlay color. "success"/"error" show a full-frame confirmation overlay. Default "default". */
  status?: Status;
  /** Text below the frame, e.g. "Point camera at code" / "Code verified". */
  message?: string;
  style?: CSSProperties;
}

/** Camera viewfinder — corner brackets, success / error confirmation overlay. */
export function QRScanner({ children, size = 220, status = "default", message, style }: QRScannerProps) {
  const color = STATUS_COLOR[status] || STATUS_COLOR.default;
  const statusIcon: IconName | null = status === "success" ? "check-circle" : status === "error" ? "alert-circle" : null;

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "12px", ...style }}>
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          background: "var(--neutral-1)",
          border: "1px solid var(--border-subtle)",
          boxSizing: "border-box",
        }}
      >
        {children ? (
          children
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-disabled)",
            }}
          >
            <Icon name="search" size={28} />
          </div>
        )}
        <Corner position="tl" color={color} />
        <Corner position="tr" color={color} />
        <Corner position="bl" color={color} />
        <Corner position="br" color={color} />
        {statusIcon && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: status === "success" ? "var(--status-success-bg)" : "var(--status-danger-bg)",
              opacity: 0.94,
            }}
          >
            <Icon name={statusIcon} size={size * 0.28} color={color} />
          </span>
        )}
      </div>
      {message && (
        <span style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-medium)", color: status === "default" ? "var(--text-secondary)" : color }}>
          {message}
        </span>
      )}
    </div>
  );
}
