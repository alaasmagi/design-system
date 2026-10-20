import type { ReactNode, HTMLAttributes } from "react";
import { Icon } from "./Icon";
import { cx } from "./cx";

/** Status label. The tone carries meaning; the text must repeat it. */
export function Badge({ tone = "neutral", children, className }: { tone?: "neutral" | "accent" | "success" | "warning" | "danger"; children: ReactNode; className?: string }) {
  return <span className={cx("ds-badge", `ds-badge--${tone}`, className)}>{children}</span>;
}

/** Category or filter chip. Pass onClick to make it a toggle, onRemove to add the × button. */
export function Tag({ children, selected, onClick, onRemove, removeLabel = "Eemalda" }: { children: ReactNode; selected?: boolean; onClick?: () => void; onRemove?: () => void; removeLabel?: string }) {
  const cls = cx("ds-tag", selected && "ds-tag--selected");
  const remove = onRemove && (
    <button type="button" className="ds-tag__remove" aria-label={removeLabel} onClick={(e) => { e.stopPropagation(); onRemove(); }}><Icon name="x" size={14} /></button>
  );
  if (onClick && !onRemove) return <button type="button" className={cls} aria-pressed={!!selected} onClick={onClick}>{children}</button>;
  return <span className={cls}>{children}{remove}</span>;
}

/** Technical identifier (service name, slug, address) inline or in a table. */
export function CodeChip({ children }: { children: ReactNode }) {
  return <code className="ds-code-chip">{children}</code>;
}

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  /** Clickable card (hover state). Renders a <button>. */
  interactive?: boolean;
  children?: ReactNode;
}

/** Surface container: surface + border/subtle, radius lg, padding 24. */
export function Card({ title, description, interactive, children, className, ...rest }: CardProps) {
  const body = (
    <>
      {title && <h3 className="ds-card__title">{title}</h3>}
      {description && <p className="ds-card__description">{description}</p>}
      {children}
    </>
  );
  if (interactive) return <button type="button" className={cx("ds-card ds-card--interactive", className)} {...(rest as HTMLAttributes<HTMLButtonElement>)}>{body}</button>;
  return <div className={cx("ds-card", className)} {...rest}>{body}</div>;
}

export function Divider({ label }: { label?: ReactNode }) {
  return <div role="separator" className={cx("ds-divider", !label && "ds-divider--plain")}>{label}</div>;
}

/** Key–value row for summaries. Put several inside a <dl>. */
export function InfoRow({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <div className="ds-info-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
