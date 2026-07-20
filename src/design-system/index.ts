/* ============================================================
   ALAASMAGI DESIGN SYSTEM — public entry point
   Import the stylesheet once (tokens + global keyframes), then
   pull components from here:

     import "./design-system/styles.css";
     import { Button, Card, Badge } from "./design-system";

   Every component is styled entirely with the design tokens in
   styles.css via CSS custom properties — no other dependency.
   ============================================================ */

import "./styles.css";

// Icons
export { Icon } from "./components/Icon";
export type { IconProps, IconName } from "./components/Icon";

// Forms
export { Button } from "./components/Button";
export type { ButtonProps } from "./components/Button";
export { Input } from "./components/Input";
export type { InputProps } from "./components/Input";
export { Select } from "./components/Select";
export type { SelectProps, SelectOption } from "./components/Select";
export { Checkbox } from "./components/Checkbox";
export type { CheckboxProps } from "./components/Checkbox";
export { Radio } from "./components/Radio";
export type { RadioProps } from "./components/Radio";
export { Switch } from "./components/Switch";
export type { SwitchProps } from "./components/Switch";

// Data display
export { Card } from "./components/Card";
export type { CardProps } from "./components/Card";
export { Badge } from "./components/Badge";
export type { BadgeProps } from "./components/Badge";
export { Tag } from "./components/Tag";
export type { TagProps } from "./components/Tag";
export { QRCode } from "./components/QRCode";
export type { QRCodeProps } from "./components/QRCode";

// Navigation
export { Tabs } from "./components/Tabs";
export type { TabsProps, TabItem } from "./components/Tabs";

// Feedback
export { Dialog } from "./components/Dialog";
export type { DialogProps } from "./components/Dialog";
export { Toast } from "./components/Toast";
export type { ToastProps } from "./components/Toast";
export { Tooltip } from "./components/Tooltip";
export type { TooltipProps } from "./components/Tooltip";
export { QRScanner } from "./components/QRScanner";
export type { QRScannerProps } from "./components/QRScanner";
