import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { cx } from "./cx";

type Status = "default" | "success" | "error";

export interface QRCodeProps {
  /** QR image URL (PNG/SVG). Or pass an <svg> as children. */
  src?: string;
  children?: ReactNode;
  /** Outer size in px (frame included), same as QRScanner. Fixed for every status. Default 240. */
  size?: number;
  status?: Status;
  label?: ReactNode;
  alt?: string;
}

/** QR code — always black on white so it scans in both themes. Status only changes the frame and label. */
export function QRCode({ src, children, size = 240, status = "default", label, alt = "QR code" }: QRCodeProps) {
  return (
    <div className={cx("ds-qr", `ds-qr--${status}`)} style={{ width: size }}>
      <div className="ds-qr__frame" style={{ width: size, height: size }}>
        {src ? <img src={src} alt={alt} /> : children}
      </div>
      {label && <span className="ds-qr__label">{label}</span>}
    </div>
  );
}

export interface QRScannerProps {
  /** Camera feed, usually a <video>. */
  children?: ReactNode;
  /** Outer size in px, same as QRCode. Fixed for every status. Default 240. */
  size?: number;
  status?: Status;
  message?: ReactNode;
}

/** Camera viewfinder. The view is always dark; corners show state and success/error cover it with the result. */
export function QRScanner({ children, size = 240, status = "default", message }: QRScannerProps) {
  return (
    <div className={cx("ds-scanner", `ds-scanner--${status}`)} style={{ width: size }}>
      <div className="ds-scanner__view" style={{ width: size, height: size }}>
        {children ?? <span className="ds-scanner__placeholder"><Icon name="scan" size={40} /></span>}
        <span className="ds-scanner__corner ds-scanner__corner--tl" />
        <span className="ds-scanner__corner ds-scanner__corner--tr" />
        <span className="ds-scanner__corner ds-scanner__corner--br" />
        <span className="ds-scanner__corner ds-scanner__corner--bl" />
        {status !== "default" && (
          <span className="ds-scanner__overlay"><Icon name={status === "success" ? "circle-check" : "circle-x"} size={80} /></span>
        )}
      </div>
      {message && <span className="ds-scanner__message" role="status">{message}</span>}
    </div>
  );
}
