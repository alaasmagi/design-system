/* alaasmagi design system — public entry. Synced with Figma (alaasmagi-design-system).
   import { Button, Input } from "./design-system";  (styles.css is imported here once) */
import "./styles.css";

export { Icon } from "./components/Icon";
export { ICON_NAMES } from "./components/icons";
export type { IconProps } from "./components/Icon";
export type { IconName } from "./components/icons";
export { Button, IconButton } from "./components/Button";
export type { ButtonProps, IconButtonProps } from "./components/Button";
export { Input, Textarea, Select, DropdownMenu, MenuItem } from "./components/Fields";
export type { InputProps, TextareaProps, SelectProps, SelectOption, MenuItemProps } from "./components/Fields";
export { Checkbox, Radio, Switch } from "./components/Choice";
export { SegmentedControl, Tabs, NavItem, StepLabel } from "./components/Navigation";
export type { SegmentOption, NavItemProps } from "./components/Navigation";
export { Alert, Toast, Tooltip, Dialog } from "./components/Feedback";
export type { Tone, DialogProps } from "./components/Feedback";
export { Badge, Tag, CodeChip, Card, Divider, InfoRow } from "./components/Display";
export type { CardProps } from "./components/Display";
export { QRCode, QRScanner } from "./components/QR";
export type { QRCodeProps, QRScannerProps } from "./components/QR";
export { ACCENTS } from "./accents";
export type { AccentId } from "./accents";
export { useTheme } from "./theme";
export type { Theme } from "./theme";
