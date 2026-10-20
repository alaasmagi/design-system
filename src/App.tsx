import { useState } from "react";
import type { ReactNode } from "react";
import {
  ACCENTS, Alert, Badge, Button, Card, Checkbox, CodeChip, Dialog, Divider, DropdownMenu, Icon, ICON_NAMES, IconButton,
  InfoRow, Input, MenuItem, NavItem, QRCode, QRScanner, Radio, SegmentedControl, Select, StepLabel, Switch, Tabs, Tag,
  Textarea, Toast, Tooltip, useTheme,
} from "./design-system";
import type { Tone } from "./design-system";
import qrSvg from "./qr-sample.svg";

function Section({ id, title, lead, children }: { id: string; title: string; lead: string; children: ReactNode }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-h`}>
      <header className="section-head">
        <h2 id={`${id}-h`} className="ds-h2">{title}</h2>
        <p>{lead}</p>
      </header>
      {children}
    </section>
  );
}
function Demo({ title, children }: { title: string; children: ReactNode }) {
  return <div className="demo"><p className="demo-title">{title}</p>{children}</div>;
}

const COLOR_TOKENS = ["bg-canvas", "bg-surface", "bg-raised", "bg-sunken", "border-default", "border-strong", "text-primary", "text-secondary", "text-muted", "accent-solid", "accent-subtle", "accent-text", "status-success-solid", "status-warning-solid", "status-danger-solid", "status-info-solid"];
const TYPE = [["ds-display", "Display"], ["ds-h1", "H1"], ["ds-h2", "H2"], ["ds-h3", "H3"], ["ds-body-lg", "Body / Large"], ["ds-body", "Body / Default"], ["ds-body-sm", "Body / Small"], ["ds-label", "Label / Default"], ["ds-label-sm", "Label / Small"], ["ds-caption", "Caption"], ["ds-mono", "Mono / Default"]];
const SPACES = ["1", "2", "3", "4", "5", "6", "8", "10", "12", "16"];
const RADII = ["xs", "sm", "md", "lg", "xl", "full"];
const CLIENTS = [
  { value: "web-app", label: "web-app — Web App" },
  { value: "auth-service", label: "auth-service — Auth Service" },
  { value: "billing-service", label: "billing-service — Billing Service" },
  { value: "mobile-app", label: "mobile-app — Mobile App" },
];

export default function App() {
  const { theme, setTheme, accent, setAccent } = useTheme();
  const [mode, setMode] = useState("offline");
  const [tab, setTab] = useState("overview");
  const [filters, setFilters] = useState(["Active"]);
  const [dialog, setDialog] = useState<null | "default" | "danger">(null);
  const [toasts, setToasts] = useState<{ id: number; tone: Tone; title: string }[]>([]);
  const toast = (tone: Tone, title: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, tone, title }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  };
  const toggleFilter = (f: string) => setFilters((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]));

  return (
    <main className="page">
      <div className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">a</span>
          <span className="ds-h3">alaasmagi design system</span>
        </div>
        <div className="controls">
          <Switch label="Dark theme" checked={theme === "dark"} onChange={(e) => setTheme(e.target.checked ? "dark" : "light")} />
        </div>
      </div>

      <div className="intro">
        <h1 className="ds-display">One system for all my apps</h1>
        <p className="ds-body-lg">
          Every app shares the same tokens and components. Values are generated from Figma
          variables: a token changed in Figma reaches the code with a single command.
        </p>
        <div className="swatches" role="group" aria-label="Accent colour">
          {ACCENTS.map((a) => (
            <button key={a.id} type="button" className="swatch" title={a.name} aria-label={a.name} aria-pressed={accent === a.id}
              style={{ background: a.swatch }} onClick={() => setAccent(a.id)} />
          ))}
        </div>
      </div>

      <Section id="foundations" title="Foundations" lead="Semantic colour tokens change with the theme; primitives stay the same.">
        <div className="tokens">
          {COLOR_TOKENS.map((t) => (
            <div key={t} className="token">
              <span className="token-chip" style={{ background: `var(--color-${t})` }} />
              <span className="token-name">--color-{t}</span>
            </div>
          ))}
        </div>
        <div className="stack">
          {TYPE.map(([cls, name]) => (
            <div key={cls} className="type-row">
              <span className="token-name">{name}</span>
              <span className={cls}>Scan the QR code on the board</span>
            </div>
          ))}
        </div>
        <div className="grid">
          <Demo title="Spacing (4px step)">
            <div className="scale">
              {SPACES.map((s) => (
                <div key={s} className="scale-item">
                  <span className="scale-bar" style={{ width: `var(--space-${s})`, height: `var(--space-${s})` }} />
                  <span className="token-name">{s}</span>
                </div>
              ))}
            </div>
          </Demo>
          <Demo title="Radius">
            <div className="scale">
              {RADII.map((r) => (
                <div key={r} className="scale-item">
                  <span className="scale-bar" style={{ width: 48, height: 48, borderRadius: `var(--radius-${r})` }} />
                  <span className="token-name">{r}</span>
                </div>
              ))}
            </div>
          </Demo>
        </div>
      </Section>

      <Section id="actions" title="Buttons" lead="44px tall everywhere. One primary button per view.">
        <div className="grid">
          <Demo title="Variant">
            <div className="row">
              <Button>Continue</Button>
              <Button variant="secondary">Cancel</Button>
              <Button variant="ghost">Back</Button>
              <Button variant="danger">Delete</Button>
            </div>
          </Demo>
          <Demo title="With icon and disabled">
            <div className="row">
              <Button icon="plus">Add lesson</Button>
              <Button variant="secondary" icon="upload">Import PDF</Button>
              <Button disabled>Continue</Button>
            </div>
          </Demo>
          <Demo title="Icon button + Tooltip">
            <div className="row">
              <Tooltip label="Edit client"><IconButton icon="pencil" label="Edit client" /></Tooltip>
              <Tooltip label="Delete client"><IconButton icon="trash" label="Delete client" /></Tooltip>
              <IconButton icon="settings" label="Settings" variant="secondary" />
            </div>
          </Demo>
        </div>
      </Section>

      <Section id="forms" title="Forms" lead="Input, select and textarea share the same frame, states and helper text.">
        <div className="grid">
          <div className="stack">
            <Input label="Student code" icon="user" placeholder="e.g. 253134IAPM" />
            <Input label="Password" icon="lock" type="password" defaultValue="password" helper="At least 8 characters" />
            <Input label="Lesson ID" icon="key" defaultValue="00001" error="Lesson ID is a 6-digit number" />
            <Input label="Code" icon="pin-code" disabled placeholder="Disabled" />
          </div>
          <div className="stack">
            <Select label="Client" options={CLIENTS} defaultValue="auth-service" />
            <Select label="Language" options={[{ value: "et", label: "Estonian" }, { value: "en", label: "English" }]} placeholder="Select language" />
            <Textarea label="Template (Razor)" defaultValue={"<p>Hello, @Model.Name!</p>\n<p>Your code is @Model.Code.</p>"} />
          </div>
          <div className="stack">
            <Demo title="Checkbox">
              <Checkbox label="Add workplace" defaultChecked />
              <Checkbox label="Remember me" />
            </Demo>
            <Demo title="Radio">
              <Radio name="role" label="Student" defaultChecked />
              <Radio name="role" label="Lecturer" />
            </Demo>
            <Demo title="Switch">
              <Switch label="Notifications" defaultChecked />
            </Demo>
          </div>
        </div>
      </Section>

      <Section id="navigation" title="Navigation" lead="NavItem between pages, Tabs within a page, SegmentedControl between two modes.">
        <div className="grid">
          <Demo title="NavItem">
            <nav className="sidebar-demo" aria-label="Example">
              <NavItem icon="home" href="#navigation">Home</NavItem>
              <NavItem icon="book" href="#navigation" active>Lessons</NavItem>
              <NavItem icon="chart" href="#navigation">Statistics</NavItem>
            </nav>
          </Demo>
          <div className="stack">
            <Demo title="SegmentedControl">
              <SegmentedControl label="Mode" value={mode} onChange={setMode} options={[{ value: "offline", label: "Offline" }, { value: "online", label: "Online" }]} />
            </Demo>
            <Demo title="Tabs">
              <Tabs label="Lesson views" value={tab} onChange={setTab} tabs={[{ value: "overview", label: "Overview" }, { value: "history", label: "History" }, { value: "settings", label: "Settings" }]} />
            </Demo>
            <Demo title="StepLabel">
              <StepLabel step={1}>Scan the QR code on the board</StepLabel>
            </Demo>
          </div>
        </div>
      </Section>

      <Section id="feedback" title="Feedback" lead="Alert at page level, Toast after an action, Dialog for confirmation.">
        <div className="grid">
          <div className="stack">
            <Alert tone="success">Attendance registered.</Alert>
            <Alert tone="danger" title="Sending failed">The recipient address was rejected by the server.</Alert>
            <Alert tone="warning">The development environment must not be enabled in a public app.</Alert>
            <Alert tone="info">A new version is available.</Alert>
          </div>
          <div className="stack">
            <Toast tone="success" title="Saved" description="Client “web-app” was updated." onClose={() => undefined} />
            <div className="row">
              <Button variant="secondary" onClick={() => toast("success", "Saved")}>Show toast</Button>
              <Button variant="secondary" onClick={() => setDialog("default")}>Open dialog</Button>
              <Button variant="danger" onClick={() => setDialog("danger")}>Delete client</Button>
            </div>
          </div>
          <Demo title="Dropdown menu">
            <DropdownMenu>
              <MenuItem>web-app — Web App</MenuItem>
              <MenuItem selected>auth-service — Auth Service</MenuItem>
              <MenuItem>mobile-app — Mobile App</MenuItem>
            </DropdownMenu>
          </Demo>
        </div>
      </Section>

      <Section id="display" title="Data display" lead="Statuses, filters, technical values and summaries.">
        <div className="grid">
          <Demo title="Badge">
            <div className="row">
              <Badge>Inactive</Badge><Badge tone="accent">Draft</Badge><Badge tone="success">Sent</Badge><Badge tone="warning">Pending</Badge><Badge tone="danger">Failed</Badge>
            </div>
          </Demo>
          <Demo title="Tag">
            <div className="row">
              {["Active", "Finished", "Upcoming"].map((f) => <Tag key={f} selected={filters.includes(f)} onClick={() => toggleFilter(f)}>{f}</Tag>)}
              <Tag onRemove={() => undefined}>auth-service</Tag>
            </div>
          </Demo>
          <Demo title="CodeChip and InfoRow">
            <dl className="stack" style={{ margin: 0, gap: "var(--space-2)" }}>
              <InfoRow label="Service" value={<CodeChip>auth-service</CodeChip>} />
              <InfoRow label="Lesson" value="Software Development Basics · 13.10 10:00" />
            </dl>
          </Demo>
          <Card title="Card" description="Surface container. The clickable variant gets a hover state." />
          <Card interactive title="Open lessons" description="Clickable card">
            <Icon name="arrow-right" size={20} />
          </Card>
          <Demo title="Divider">
            <Divider />
            <Divider label="Or enter the ID manually" />
          </Demo>
        </div>
      </Section>

      <Section id="qr" title="QR" lead="The code is always black on white. The scanner camera view is always dark.">
        <div className="row" style={{ gap: "var(--space-10)", alignItems: "flex-start" }}>
          <QRCode src={qrSvg} label="Show the QR code to the lecturer" />
          <QRCode src={qrSvg} status="success" label="Registered" />
          <QRScanner message="Point the camera at the QR code" />
          <QRScanner status="success" message="Attendance registered" />
        </div>
      </Section>

      <Section id="icons" title="Icons" lead={`${ICON_NAMES.length} icons, 24px grid, 2px stroke.`}>
        <div className="tokens">
          {ICON_NAMES.map((n) => (
            <div key={n} className="token"><Icon name={n} size={24} /><span className="token-name">{n}</span></div>
          ))}
        </div>
      </Section>

      <p className="footer">© {new Date().getFullYear()} Aleksander Laasmägi</p>

      <Dialog open={dialog !== null} onClose={() => setDialog(null)} type={dialog === "danger" ? "danger" : "default"}
        title={dialog === "danger" ? "Delete this client?" : "Edit lesson"}
        confirmLabel={dialog === "danger" ? "Delete client" : "Save"}
        onConfirm={() => { toast(dialog === "danger" ? "danger" : "success", dialog === "danger" ? "Client deleted" : "Saved"); setDialog(null); }}>
        {dialog === "danger" ? "Senders must be deleted first. This action cannot be undone." : "Changes to the lesson reach students immediately."}
      </Dialog>

      <div className="toast-stack" aria-live="polite">
        {toasts.map((t) => <Toast key={t.id} tone={t.tone} title={t.title} onClose={() => setToasts((s) => s.filter((x) => x.id !== t.id))} />)}
      </div>
    </main>
  );
}
