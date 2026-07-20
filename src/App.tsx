import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ACCENTS, accentSwatch, applyAccent } from "./accents";
import type { Accent } from "./accents";
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Dialog,
  Icon,
  Input,
  QRCode,
  QRScanner,
  Radio,
  Select,
  Switch,
  Tabs,
  Tag,
  Toast,
  Tooltip,
} from "./design-system";

type Theme = "dark" | "light";

/* ---- Showcase layout helpers (also token-driven, so they re-theme too) ---- */

function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle: string; children: ReactNode }) {
  return (
    <section id={id} style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-xl)",
            fontWeight: "var(--weight-bold)",
            letterSpacing: "var(--tracking-tight)",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h2>
        <p style={{ margin: 0, fontSize: "var(--text-sm)", color: "var(--text-secondary)" }}>{subtitle}</p>
      </div>
      <div
        style={{
          display: "grid",
          gap: "var(--space-4)",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {children}
      </div>
    </section>
  );
}

/* ---- Accent picker: swatch row that re-themes the whole system ---- */
function AccentPicker({ value, onChange }: { value: Accent; onChange: (a: Accent) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-2xs)",
            letterSpacing: "var(--tracking-wide)",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
          }}
        >
          Accent
        </span>
        <span style={{ fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", color: "var(--text-primary)" }}>
          {value.name}
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        {ACCENTS.map((a) => {
          const active = a.id === value.id;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => onChange(a)}
              title={a.name}
              aria-label={`Accent: ${a.name}`}
              aria-pressed={active}
              style={{
                width: 28,
                height: 28,
                padding: 0,
                cursor: "pointer",
                borderRadius: "var(--radius-full)",
                background: accentSwatch(a),
                border: active ? "2px solid var(--text-primary)" : "2px solid var(--border-subtle)",
                boxShadow: active ? "0 0 0 2px var(--surface-app)" : "none",
                outline: "none",
                transition: "transform var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
                transform: active ? "scale(1.08)" : "scale(1)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function Demo({ label, children, style }: { label: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <Card style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", ...style }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-2xs)",
          letterSpacing: "var(--tracking-wide)",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-3)" }}>{children}</div>
    </Card>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
    return "dark";
  });

  const [accent, setAccent] = useState<Accent>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("ds-accent");
      const match = ACCENTS.find((a) => a.id === saved);
      if (match) return match;
    }
    return ACCENTS[0];
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Re-generate the accent ramp whenever the accent OR the theme changes,
  // since the two ramps (dark/light) use different lightness/chroma values.
  useEffect(() => {
    applyAccent(accent, theme);
    window.localStorage.setItem("ds-accent", accent.id);
  }, [accent, theme]);

  // Interactive demo state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tags, setTags] = useState(["design", "systems", "tokens", "react"]);
  const [radio, setRadio] = useState("weekly");
  const [selectVal, setSelectVal] = useState<string>();

  return (
    <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 var(--space-6) var(--space-24)" }}>
      {/* ---- Header ---- */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          padding: "var(--space-5) 0",
          marginBottom: "var(--space-8)",
          background: "color-mix(in oklab, var(--surface-app) 88%, transparent)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)" }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-lg)",
              fontWeight: "var(--weight-extrabold)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--text-primary)",
            }}
          >
            alaasmagi
          </span>
          <Badge tone="accent">Design System</Badge>
        </div>
        <Switch
          label={theme === "light" ? "Light" : "Dark"}
          checked={theme === "light"}
          onChange={(on) => setTheme(on ? "light" : "dark")}
        />
      </header>

      {/* ---- Intro ---- */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginBottom: "var(--space-16)", maxWidth: "620px" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-4xl)",
            fontWeight: "var(--weight-extrabold)",
            letterSpacing: "var(--tracking-tight)",
            lineHeight: "var(--leading-tight)",
            color: "var(--text-primary)",
          }}
        >
          A dark-mode-first, minimal component set.
        </h1>
        <p style={{ margin: 0, fontSize: "var(--text-md)", color: "var(--text-secondary)", lineHeight: "var(--leading-relaxed)" }}>
          16 React primitives styled entirely with design tokens — a single accent hue, a cool neutral ramp,
          strict 4px spacing. Fully themeable: toggle light and dark in the top-right, and pick an accent below
          to re-theme every component live.
        </p>
        <div style={{ marginTop: "var(--space-3)" }}>
          <AccentPicker value={accent} onChange={setAccent} />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-20)" }}>
        {/* ================= FORMS ================= */}
        <Section id="forms" title="Forms" subtitle="Inputs, controls, and actions.">
          <Demo label="Button — variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger" icon="bin">Delete</Button>
          </Demo>
          <Demo label="Button — sizes & states">
            <Button size="sm">Small</Button>
            <Button size="md" icon="arrow-right" iconPosition="right">Medium</Button>
            <Button size="lg" loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </Demo>
          <Demo label="Input">
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", width: "100%" }}>
              <Input label="Email" icon="mail" placeholder="you@example.com" hint="We never share it." />
              <Input label="Password" icon="lock" type="password" error="Password is too short." defaultValue="123" />
            </div>
          </Demo>
          <Demo label="Select">
            <Select
              label="Frequency"
              placeholder="Choose one…"
              value={selectVal}
              onChange={setSelectVal}
              options={[
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
              ]}
            />
          </Demo>
          <Demo label="Checkbox & Switch">
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              <Checkbox label="Send me product updates" defaultChecked />
              <Checkbox label="Subscribe to newsletter" />
              <Checkbox label="Disabled option" disabled />
              <Switch label="Enable notifications" defaultChecked />
              <Switch label="Disabled" disabled />
            </div>
          </Demo>
          <Demo label="Radio group">
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {[
                { v: "daily", l: "Daily digest" },
                { v: "weekly", l: "Weekly summary" },
                { v: "never", l: "Never" },
              ].map((o) => (
                <Radio key={o.v} name="digest" value={o.v} label={o.l} checked={radio === o.v} onChange={setRadio} />
              ))}
            </div>
          </Demo>
        </Section>

        {/* ============== DATA DISPLAY ============== */}
        <Section id="data" title="Data display" subtitle="Surfaces, status, and codes.">
          <Demo label="Badge — tones">
            <Badge tone="neutral">Neutral</Badge>
            <Badge tone="accent">Accent</Badge>
            <Badge tone="success" icon="check">Passed</Badge>
            <Badge tone="warning" icon="alert-triangle">Review</Badge>
            <Badge tone="danger" icon="x">Failed</Badge>
          </Demo>
          <Demo label="Tag — removable / selected">
            <Tag selected>Active filter</Tag>
            {tags.map((t) => (
              <Tag key={t} onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>
                {t}
              </Tag>
            ))}
            {tags.length === 0 && (
              <Button size="sm" variant="ghost" icon="plus" onClick={() => setTags(["design", "systems", "tokens", "react"])}>
                Reset tags
              </Button>
            )}
          </Demo>
          <Demo label="Card — hoverable">
            <Card hoverable style={{ width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <span style={{ color: "var(--accent-9)", display: "flex" }}>
                  <Icon name="work" size={20} />
                </span>
                <div>
                  <div style={{ fontWeight: "var(--weight-semibold)", color: "var(--text-primary)" }}>Hover me</div>
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--text-secondary)" }}>Surface + border brighten.</div>
                </div>
              </div>
            </Card>
          </Demo>
          <Demo label="QRCode — states">
            <QRCode size={116} label="DEFAULT" />
            <QRCode size={116} status="success" label="VERIFIED" />
            <QRCode size={116} status="error" label="INVALID" />
          </Demo>
        </Section>

        {/* ============== NAVIGATION ============== */}
        <Section id="nav" title="Navigation" subtitle="Moving between views.">
          <Demo label="Tabs" style={{ gridColumn: "1 / -1" }}>
            <div style={{ width: "100%" }}>
              <Tabs
                defaultValue="overview"
                tabs={[
                  { value: "overview", label: "Overview" },
                  { value: "activity", label: "Activity" },
                  { value: "settings", label: "Settings" },
                ]}
              />
            </div>
          </Demo>
        </Section>

        {/* ============== FEEDBACK ============== */}
        <Section id="feedback" title="Feedback" subtitle="Overlays, alerts, and hints.">
          <Demo label="Toast — tones">
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", width: "100%" }}>
              <Toast tone="info" title="Heads up" description="A new version is available." />
              <Toast tone="success" title="Saved" description="Your changes are live." />
              <Toast tone="danger" title="Upload failed" description="Check your connection and retry." />
            </div>
          </Demo>
          <Demo label="Tooltip — hover">
            <Tooltip label="Copied to clipboard" side="top">
              <Button variant="secondary" icon="code">Top</Button>
            </Tooltip>
            <Tooltip label="Runs the build" side="bottom">
              <Button variant="secondary">Bottom</Button>
            </Tooltip>
            <Tooltip label="Aligns right" side="right">
              <Button variant="secondary" icon="info" />
            </Tooltip>
          </Demo>
          <Demo label="Dialog — modal">
            <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
          </Demo>
          <Demo label="QRScanner — states">
            <QRScanner size={120} message="Scanning…" />
            <QRScanner size={120} status="success" message="Verified" />
            <QRScanner size={120} status="error" message="No match" />
          </Demo>
        </Section>
      </div>

      {/* Modal lives in a full-viewport positioned layer so the overlay covers the page */}
      <div style={{ position: "fixed", inset: 0, zIndex: 200, pointerEvents: dialogOpen ? "auto" : "none" }}>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Delete project?"
          footer={
            <>
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setDialogOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          This can't be undone. All associated files and history will be removed permanently.
        </Dialog>
      </div>

      <footer style={{ marginTop: "var(--space-20)", paddingTop: "var(--space-6)", borderTop: "1px solid var(--border-subtle)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-2xs)", color: "var(--text-secondary)" }}>
          alaasmagi design system — 16 components · light + dark · token-driven
        </span>
      </footer>
    </div>
  );
}

export default App;
