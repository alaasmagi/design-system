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
  { value: "food-app", label: "food-app — Food App" },
  { value: "identity-hub", label: "identity-hub — Identity Hub" },
  { value: "invoice-service", label: "invoice-service — Invoice Service" },
  { value: "educode", label: "educode — EduCode" },
];

export default function App() {
  const { theme, setTheme, accent, setAccent } = useTheme();
  const [mode, setMode] = useState("offline");
  const [tab, setTab] = useState("overview");
  const [filters, setFilters] = useState(["Aktiivne"]);
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
          <Switch label="Tume teema" checked={theme === "dark"} onChange={(e) => setTheme(e.target.checked ? "dark" : "light")} />
        </div>
      </div>

      <div className="intro">
        <h1 className="ds-display">Üks süsteem kõigile minu rakendustele</h1>
        <p className="ds-body-lg">
          EduCode, Email Hub ja Invoice Service kasutavad samu tokeneid ja komponente. Väärtused on genereeritud Figma
          muutujatest: Figmas muudetud token jõuab koodi ühe käsuga.
        </p>
        <div className="swatches" role="group" aria-label="Accent-toon">
          {ACCENTS.map((a) => (
            <button key={a.id} type="button" className="swatch" title={a.name} aria-label={a.name} aria-pressed={accent === a.id}
              style={{ background: a.swatch }} onClick={() => setAccent(a.id)} />
          ))}
        </div>
      </div>

      <Section id="foundations" title="Foundations" lead="Semantilised värvitokenid muutuvad koos teemaga; primitiivid jäävad samaks.">
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
              <span className={cls}>Skänni tahvlil olev QR-kood</span>
            </div>
          ))}
        </div>
        <div className="grid">
          <Demo title="Spacing (4px samm)">
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

      <Section id="actions" title="Nupud" lead="44px kõrgus kõikjal. Üks Primary-nupp vaate kohta.">
        <div className="grid">
          <Demo title="Variant">
            <div className="row">
              <Button>Jätka</Button>
              <Button variant="secondary">Tühista</Button>
              <Button variant="ghost">Tagasi</Button>
              <Button variant="danger">Kustuta</Button>
            </div>
          </Demo>
          <Demo title="Ikooniga ja keelatud">
            <div className="row">
              <Button icon="plus">Lisa ainetund</Button>
              <Button variant="secondary" icon="upload">Impordi PDF</Button>
              <Button disabled>Jätka</Button>
            </div>
          </Demo>
          <Demo title="Ikoon-nupp + Tooltip">
            <div className="row">
              <Tooltip label="Muuda klienti"><IconButton icon="pencil" label="Muuda klienti" /></Tooltip>
              <Tooltip label="Kustuta klient"><IconButton icon="trash" label="Kustuta klient" /></Tooltip>
              <IconButton icon="settings" label="Seaded" variant="secondary" />
            </div>
          </Demo>
        </div>
      </Section>

      <Section id="forms" title="Vormid" lead="Väli, valik ja tekstiala jagavad sama raami, olekuid ja abiteksti.">
        <div className="grid">
          <div className="stack">
            <Input label="Üliõpilaskood" icon="user" placeholder="nt 253134IAPM" />
            <Input label="Parool" icon="lock" type="password" defaultValue="salasõna" helper="Vähemalt 8 märki" />
            <Input label="Ainetunni ID" icon="key" defaultValue="00001" error="Ainetunni ID on 6-kohaline number" />
            <Input label="Kood" icon="pin-code" disabled placeholder="Keelatud" />
          </div>
          <div className="stack">
            <Select label="Klient" options={CLIENTS} defaultValue="identity-hub" />
            <Select label="Keel" options={[{ value: "et", label: "Eesti" }, { value: "en", label: "English" }]} placeholder="Vali keel" />
            <Textarea label="Mall (Razor)" defaultValue={"<p>Tere, @Model.Name!</p>\n<p>Sinu kood on @Model.Code.</p>"} />
          </div>
          <div className="stack">
            <Demo title="Checkbox">
              <Checkbox label="Lisa töökoht" defaultChecked />
              <Checkbox label="Jäta mind meelde" />
            </Demo>
            <Demo title="Radio">
              <Radio name="role" label="Üliõpilane" defaultChecked />
              <Radio name="role" label="Õppejõud" />
            </Demo>
            <Demo title="Switch">
              <Switch label="Teavitused" defaultChecked />
            </Demo>
          </div>
        </div>
      </Section>

      <Section id="navigation" title="Navigatsioon" lead="Lehtede vahel NavItem, sama lehe sees Tabs, kahe režiimi vahel SegmentedControl.">
        <div className="grid">
          <Demo title="NavItem">
            <nav className="sidebar-demo" aria-label="Näidis">
              <NavItem icon="home" href="#navigation">Avaleht</NavItem>
              <NavItem icon="book" href="#navigation" active>Ainetunnid</NavItem>
              <NavItem icon="chart" href="#navigation">Statistika</NavItem>
            </nav>
          </Demo>
          <div className="stack">
            <Demo title="SegmentedControl">
              <SegmentedControl label="Režiim" value={mode} onChange={setMode} options={[{ value: "offline", label: "Offline" }, { value: "online", label: "Online" }]} />
            </Demo>
            <Demo title="Tabs">
              <Tabs label="Ainetunni vaated" value={tab} onChange={setTab} tabs={[{ value: "overview", label: "Ülevaade" }, { value: "history", label: "Ajalugu" }, { value: "settings", label: "Seaded" }]} />
            </Demo>
            <Demo title="StepLabel">
              <StepLabel step={1}>Skänni tahvlil olev QR-kood</StepLabel>
            </Demo>
          </div>
        </div>
      </Section>

      <Section id="feedback" title="Tagasiside" lead="Alert lehe tasemel, Toast pärast tegevust, Dialog kinnituseks.">
        <div className="grid">
          <div className="stack">
            <Alert tone="success">Kohalolek registreeritud.</Alert>
            <Alert tone="danger" title="Saatmine ebaõnnestus">Saaja aadress lükati serveri poolt tagasi.</Alert>
            <Alert tone="warning">Arenduskeskkonda ei tohi avalikus rakenduses sisse lülitada.</Alert>
            <Alert tone="info">Uus versioon on saadaval.</Alert>
          </div>
          <div className="stack">
            <Toast tone="success" title="Salvestatud" description="Klient „food-app” uuendati." onClose={() => undefined} />
            <div className="row">
              <Button variant="secondary" onClick={() => toast("success", "Salvestatud")}>Näita toasti</Button>
              <Button variant="secondary" onClick={() => setDialog("default")}>Ava dialoog</Button>
              <Button variant="danger" onClick={() => setDialog("danger")}>Kustuta klient</Button>
            </div>
          </div>
          <Demo title="Dropdown menu">
            <DropdownMenu>
              <MenuItem>food-app — Food App</MenuItem>
              <MenuItem selected>identity-hub — Identity Hub</MenuItem>
              <MenuItem>educode — EduCode</MenuItem>
            </DropdownMenu>
          </Demo>
        </div>
      </Section>

      <Section id="display" title="Andmed" lead="Staatused, filtrid, tehnilised väärtused ja kokkuvõtted.">
        <div className="grid">
          <Demo title="Badge">
            <div className="row">
              <Badge>Inactive</Badge><Badge tone="accent">Draft</Badge><Badge tone="success">Sent</Badge><Badge tone="warning">Pending</Badge><Badge tone="danger">Failed</Badge>
            </div>
          </Demo>
          <Demo title="Tag">
            <div className="row">
              {["Aktiivne", "Lõppenud", "Tulemas"].map((f) => <Tag key={f} selected={filters.includes(f)} onClick={() => toggleFilter(f)}>{f}</Tag>)}
              <Tag onRemove={() => undefined}>identity-hub</Tag>
            </div>
          </Demo>
          <Demo title="CodeChip ja InfoRow">
            <dl className="stack" style={{ margin: 0, gap: "var(--space-2)" }}>
              <InfoRow label="Teenus" value={<CodeChip>identity-hub</CodeChip>} />
              <InfoRow label="Ainetund" value="Tarkvaraarenduse alused · 13.10 10:00" />
            </dl>
          </Demo>
          <Card title="Kaart" description="Pinnakonteiner. Klikitav variant saab hover-oleku." />
          <Card interactive title="Ava ainetunnid" description="Klikitav kaart">
            <Icon name="arrow-right" size={20} />
          </Card>
          <Demo title="Divider">
            <Divider />
            <Divider label="Või sisesta ID käsitsi" />
          </Demo>
        </div>
      </Section>

      <Section id="qr" title="QR" lead="Kood on alati must valgel. Skänneri kaamerapilt on alati tume.">
        <div className="row" style={{ gap: "var(--space-10)", alignItems: "flex-start" }}>
          <QRCode src={qrSvg} size={180} label="Näita QR-koodi õppejõule" />
          <QRCode src={qrSvg} size={180} status="success" label="Registreeritud" />
          <QRScanner size={240} message="Suuna kaamera QR-koodile" />
          <QRScanner size={240} status="success" message="Kohalolek registreeritud" />
        </div>
      </Section>

      <Section id="icons" title="Ikoonid" lead={`${ICON_NAMES.length} ikooni, 24px ruudustik, 2px joon.`}>
        <div className="tokens">
          {ICON_NAMES.map((n) => (
            <div key={n} className="token"><Icon name={n} size={24} /><span className="token-name">{n}</span></div>
          ))}
        </div>
      </Section>

      <p className="footer">Sünkroonis Figma failiga „alaasmagi-design-system”. Tokenid: <CodeChip>scripts/gen-tokens.py</CodeChip></p>

      <Dialog open={dialog !== null} onClose={() => setDialog(null)} type={dialog === "danger" ? "danger" : "default"}
        title={dialog === "danger" ? "Kustutada see klient?" : "Muuda ainetundi"}
        confirmLabel={dialog === "danger" ? "Kustuta klient" : "Salvesta"}
        onConfirm={() => { toast(dialog === "danger" ? "danger" : "success", dialog === "danger" ? "Klient kustutatud" : "Salvestatud"); setDialog(null); }}>
        {dialog === "danger" ? "Saatjad tuleb enne kustutada. Seda tegevust ei saa tagasi võtta." : "Ainetunni andmete muutmine jõuab kohe üliõpilasteni."}
      </Dialog>

      <div className="toast-stack" aria-live="polite">
        {toasts.map((t) => <Toast key={t.id} tone={t.tone} title={t.title} onClose={() => setToasts((s) => s.filter((x) => x.id !== t.id))} />)}
      </div>
    </main>
  );
}
