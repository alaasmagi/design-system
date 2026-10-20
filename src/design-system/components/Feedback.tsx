import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./icons";
import { Button, IconButton } from "./Button";
import { cx } from "./cx";

export type Tone = "success" | "warning" | "danger" | "info";
const TONE_ICON: Record<Tone, IconName> = { success: "circle-check", warning: "triangle-alert", danger: "circle-x", info: "info" };

/** Page-level message (e.g. TempData after a redirect). The text must carry the meaning, not just the color. */
export function Alert({ tone = "info", title, children, className }: { tone?: Tone; title?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={cx("ds-alert", `ds-tone--${tone}`, className)}>
      <Icon name={TONE_ICON[tone]} size={20} />
      <div className="ds-alert__body">
        {title && <span className="ds-alert__title">{title}</span>}
        <span className="ds-alert__message">{children}</span>
      </div>
    </div>
  );
}

/** Temporary notice after an action, shown in a screen corner. */
export function Toast({ tone = "success", title, description, onClose, className }: { tone?: Tone; title: ReactNode; description?: ReactNode; onClose?: () => void; className?: string }) {
  return (
    <div role="status" className={cx("ds-toast", `ds-tone--${tone}`, className)}>
      <Icon name={TONE_ICON[tone]} size={20} />
      <div className="ds-toast__body">
        <span className="ds-toast__title">{title}</span>
        {description && <span className="ds-toast__description">{description}</span>}
      </div>
      {onClose && <button type="button" className="ds-toast__close" aria-label="Sulge" onClick={onClose}><Icon name="x" size={16} /></button>}
    </div>
  );
}

/** Short hint on hover/focus. Never put essential info here (no hover on touch screens). */
export function Tooltip({ label, side = "top", children }: { label: string; side?: "top" | "bottom"; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span className="ds-tooltip-anchor" aria-describedby={open ? id : undefined}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      {children}
      {open && <span id={id} role="tooltip" className={cx("ds-tooltip", `ds-tooltip--${side}`)}>{label}</span>}
    </span>
  );
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children?: ReactNode;
  /** Figma: Type. Danger = irreversible action confirmation. */
  type?: "default" | "danger";
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  /** Replaces the default Cancel + Confirm buttons. */
  footer?: ReactNode;
}

/** Modal dialog over the overlay/scrim token. Esc and backdrop close it. */
export function Dialog({ open, onClose, title, children, type = "default", confirmLabel = "Salvesta", cancelLabel = "Tühista", onConfirm, footer }: DialogProps) {
  const id = useId();
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); prev?.focus(); };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="ds-dialog-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby={id} className="ds-dialog">
        <div className="ds-dialog__header">
          <h2 id={id} className="ds-dialog__title">{title}</h2>
          <IconButton icon="x" label="Sulge" onClick={onClose} />
        </div>
        {children && <div className="ds-dialog__body">{children}</div>}
        <div className="ds-dialog__footer">
          {footer ?? (
            <>
              <Button variant="ghost" onClick={onClose}>{cancelLabel}</Button>
              <Button variant={type === "danger" ? "danger" : "primary"} onClick={onConfirm}>{confirmLabel}</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
