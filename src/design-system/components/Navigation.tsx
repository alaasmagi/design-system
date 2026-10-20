import type { AnchorHTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./icons";
import { cx } from "./cx";

export interface SegmentOption { value: string; label: string }

/** Two-or-three-way switch (Offline/Online, Scan/Enter manually). */
export function SegmentedControl({ options, value, onChange, label, className }: { options: SegmentOption[]; value: string; onChange: (v: string) => void; label: string; className?: string }) {
  const move = (e: KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (d) { e.preventDefault(); onChange(options[(i + d + options.length) % options.length].value); }
  };
  return (
    <div role="radiogroup" aria-label={label} className={cx("ds-segmented", className)}>
      {options.map((o, i) => (
        <button key={o.value} type="button" role="radio" aria-checked={o.value === value} tabIndex={o.value === value ? 0 : -1}
          className="ds-segmented__item" onClick={() => onChange(o.value)} onKeyDown={(e) => move(e, i)}>{o.label}</button>
      ))}
    </div>
  );
}

/** In-page content switching. Use NavItem for page navigation. */
export function Tabs({ tabs, value, onChange, label, className }: { tabs: SegmentOption[]; value: string; onChange: (v: string) => void; label: string; className?: string }) {
  const move = (e: KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (d) { e.preventDefault(); onChange(tabs[(i + d + tabs.length) % tabs.length].value); }
  };
  return (
    <div role="tablist" aria-label={label} className={cx("ds-tabs", className)}>
      {tabs.map((t, i) => (
        <button key={t.value} type="button" role="tab" aria-selected={t.value === value} tabIndex={t.value === value ? 0 : -1}
          className="ds-tab" onClick={() => onChange(t.value)} onKeyDown={(e) => move(e, i)}>{t.label}</button>
      ))}
    </div>
  );
}

export interface NavItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> { icon: IconName; active?: boolean; children: ReactNode }

/** Sidebar navigation link (desktop). */
export function NavItem({ icon, active, children, className, ...rest }: NavItemProps) {
  return (
    <a className={cx("ds-nav-item", className)} aria-current={active ? "page" : undefined} {...rest}>
      <Icon name={icon} size={20} />
      {children}
    </a>
  );
}

export function StepLabel({ step, children }: { step: number | string; children: ReactNode }) {
  return (
    <span className="ds-step">
      <span className="ds-step__number">{step}</span>
      <span className="ds-step__label">{children}</span>
    </span>
  );
}
