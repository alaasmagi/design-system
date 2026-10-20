import { useId, useState, useRef, useEffect } from "react";
import type { InputHTMLAttributes, TextareaHTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./icons";
import { cx } from "./cx";

interface FieldShell { label?: string; helper?: string; error?: string; className?: string }

function Shell({ id, label, helper, error, disabled, readOnly, className, children }: FieldShell & { id: string; disabled?: boolean; readOnly?: boolean; children: ReactNode }) {
  const message = error || helper;
  return (
    <div className={cx("ds-field", error && "ds-field--error", disabled && "ds-field--disabled", readOnly && "ds-field--readonly", className)}>
      {label && <label className="ds-field__label" htmlFor={id}>{label}</label>}
      {children}
      {message && <span id={`${id}-msg`} className="ds-field__helper" role={error ? "alert" : undefined}>{message}</span>}
    </div>
  );
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">, FieldShell {
  /** Figma: Icon (leading, 20px). */
  icon?: IconName;
}

/** Text field. States follow Figma: Default · Filled · Focus · Error · Disabled. */
export function Input({ label, helper, error, icon, className, id, disabled, readOnly, placeholder = " ", ...rest }: InputProps) {
  const autoId = useId(); const fid = id ?? autoId;
  return (
    <Shell id={fid} label={label} helper={helper} error={error} disabled={disabled} readOnly={readOnly} className={className}>
      <div className="ds-field__control">
        {icon && <Icon name={icon} size={20} className="ds-field__icon" />}
        <input id={fid} className="ds-field__input" disabled={disabled} readOnly={readOnly} placeholder={placeholder}
          aria-invalid={!!error || undefined} aria-describedby={error || helper ? `${fid}-msg` : undefined} {...rest} />
      </div>
    </Shell>
  );
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldShell {}

/** Multi-line field in the mono face (templates, Razor/HTML). */
export function Textarea({ label, helper, error, className, id, disabled, readOnly, rows = 4, ...rest }: TextareaProps) {
  const autoId = useId(); const fid = id ?? autoId;
  return (
    <Shell id={fid} label={label} helper={helper} error={error} disabled={disabled} readOnly={readOnly} className={className}>
      <div className="ds-field__control ds-field__control--multiline">
        <textarea id={fid} rows={rows} className="ds-field__input" disabled={disabled} readOnly={readOnly}
          aria-invalid={!!error || undefined} aria-describedby={error || helper ? `${fid}-msg` : undefined} {...rest} />
      </div>
    </Shell>
  );
}

export interface SelectOption { value: string; label: string }
export interface SelectProps extends FieldShell {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
}

/** Select with the Figma Dropdown menu as its listbox. */
export function Select({ label, helper, error, className, options, value, defaultValue, onChange, placeholder = "Vali…", disabled, name, id }: SelectProps) {
  const autoId = useId(); const fid = id ?? autoId;
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === current);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const pick = (v: string) => { setInternal(v); onChange?.(v); setOpen(false); };
  const openMenu = () => { setActive(Math.max(0, options.findIndex((o) => o.value === current))); setOpen(true); };
  const onKey = (e: KeyboardEvent) => {
    if (disabled) return;
    if (!open && (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ")) { e.preventDefault(); openMenu(); return; }
    if (!open) return;
    if (e.key === "Escape") { setOpen(false); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(options.length - 1, a + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(options[active].value); }
  };

  return (
    <Shell id={fid} label={label} helper={helper} error={error} disabled={disabled} className={cx(open && "ds-select--open", className)}>
      <div ref={root} className="ds-select">
        <button type="button" id={fid} className="ds-field__control ds-select__trigger" disabled={disabled}
          aria-haspopup="listbox" aria-expanded={open} aria-controls={`${fid}-list`} onClick={() => (open ? setOpen(false) : openMenu())} onKeyDown={onKey}>
          <span className={cx("ds-select__value", !selected && "ds-select__value--placeholder")}>{selected ? selected.label : placeholder}</span>
          <Icon name="chevron-down" size={20} className="ds-select__chevron" />
        </button>
        {name && <input type="hidden" name={name} value={current ?? ""} />}
        {open && (
          <div className="ds-select__menu">
            <DropdownMenu id={`${fid}-list`} role="listbox">
              {options.map((o, i) => (
                <MenuItem key={o.value} role="option" selected={o.value === current} active={i === active}
                  onMouseEnter={() => setActive(i)} onClick={() => pick(o.value)}>{o.label}</MenuItem>
              ))}
            </DropdownMenu>
          </div>
        )}
      </div>
    </Shell>
  );
}

export function DropdownMenu({ children, id, role = "menu" }: { children: ReactNode; id?: string; role?: "menu" | "listbox" }) {
  return <div id={id} role={role} className="ds-menu">{children}</div>;
}

export interface MenuItemProps { children: ReactNode; selected?: boolean; active?: boolean; role?: "menuitem" | "option"; onClick?: () => void; onMouseEnter?: () => void }

/** Figma: Menu item — Default · Hover · Selected (✓). */
export function MenuItem({ children, selected, active, role = "menuitem", onClick, onMouseEnter }: MenuItemProps) {
  return (
    <div role={role} aria-selected={role === "option" ? !!selected : undefined} data-selected={selected || undefined} tabIndex={-1}
      className={cx("ds-menu-item", active && "ds-menu-item--active")} onClick={onClick} onMouseEnter={onMouseEnter}>
      <span className="ds-menu-item__label">{children}</span>
      {selected && <Icon name="check" size={18} />}
    </div>
  );
}
