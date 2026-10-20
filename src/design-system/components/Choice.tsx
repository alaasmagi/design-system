import type { InputHTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";
import { cx } from "./cx";

type Base = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: ReactNode };

export function Checkbox({ label, className, disabled, ...rest }: Base) {
  return (
    <label className={cx("ds-choice ds-checkbox", disabled && "ds-choice--disabled", className)}>
      <input type="checkbox" className="ds-choice__input" disabled={disabled} {...rest} />
      <span className="ds-choice__box"><Icon name="check" size={16} /></span>
      {label}
    </label>
  );
}

export function Radio({ label, className, disabled, ...rest }: Base) {
  return (
    <label className={cx("ds-choice ds-radio", disabled && "ds-choice--disabled", className)}>
      <input type="radio" className="ds-choice__input" disabled={disabled} {...rest} />
      <span className="ds-choice__box" />
      {label}
    </label>
  );
}

/** Immediate on/off setting (e.g. theme). Forms that need saving use Checkbox. */
export function Switch({ label, className, disabled, ...rest }: Base) {
  return (
    <label className={cx("ds-choice ds-switch", disabled && "ds-choice--disabled", className)}>
      <input type="checkbox" role="switch" className="ds-choice__input" disabled={disabled} {...rest} />
      <span className="ds-switch__track"><span className="ds-switch__thumb" /></span>
      {label}
    </label>
  );
}
