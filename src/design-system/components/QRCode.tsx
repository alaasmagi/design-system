import type { CSSProperties } from "react";

type Status = "default" | "success" | "error";

const STATUS_COLOR: Record<Status, string> = {
  default: "var(--border-subtle)",
  success: "var(--status-success)",
  error: "var(--status-danger)",
};

const STATUS_BG: Record<Status, string> = {
  default: "var(--surface-card)",
  success: "var(--status-success-bg)",
  error: "var(--status-danger-bg)",
};

export interface QRCodeProps {
  /** Image src (data URI or URL) of the QR code itself. Renders a placeholder pattern if omitted. */
  src?: string;
  /** Overall square size in px, including the border/padding frame. Default 180. */
  size?: number;
  /** Border + background tint. "success"/"error" are for a scanned-and-validated result being displayed back. Default "default". */
  status?: Status;
  label?: string;
  style?: CSSProperties;
}

/** QR code frame with neutral / success / error border states. */
export function QRCode({ src, size = 180, status = "default", label, style }: QRCodeProps) {
  const border = STATUS_COLOR[status] || STATUS_COLOR.default;
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "10px", ...style }}>
      <div
        style={{
          width: size,
          height: size,
          padding: "14px",
          background: STATUS_BG[status] || STATUS_BG.default,
          border: `2px solid ${border}`,
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color var(--duration-normal) var(--ease-standard), background var(--duration-normal) var(--ease-standard)",
          boxSizing: "border-box",
        }}
      >
        {src ? (
          <img
            src={src}
            alt="QR code"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius-sm)",
              background: "repeating-conic-gradient(var(--neutral-6) 0% 25%, var(--surface-card) 0% 50%) 0 0 / 20% 20%",
              opacity: 0.5,
            }}
          />
        )}
      </div>
      {label && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-2xs)", color: "var(--text-secondary)" }}>
          {label}
        </span>
      )}
    </div>
  );
}
