/* ============================================================
   ACCENT PRESETS (app-level theming layer)

   The design system ships one accent hue (cyan-blue, hue 229) in
   ./design-system/tokens/colors.css. Because every accent step is
   the SAME hue with only lightness/chroma varying — and every
   component references the --accent-* aliases — we can offer
   alternative accents by keeping the exact L/C recipe and swapping
   only the hue. This file is a demo/runtime layer; it never edits
   the design system itself.
   ============================================================ */

export type Theme = "dark" | "light";

export interface Accent {
  id: string;
  name: string;
  hue: number;
  /* Per-hue chroma multiplier. Warm/yellow hues can't hold as much
     chroma in sRGB, so we pull them back a touch for a cleaner clamp. */
  chroma?: number;
}

/* The default cyan is first so it reads as the system's baseline. */
export const ACCENTS: Accent[] = [
  { id: "cyan", name: "Cyan", hue: 229 },
  { id: "indigo", name: "Indigo", hue: 272 },
  { id: "violet", name: "Violet", hue: 300 },
  { id: "magenta", name: "Magenta", hue: 338 },
  { id: "rose", name: "Rose", hue: 16 },
  { id: "amber", name: "Amber", hue: 70, chroma: 0.92 },
  { id: "emerald", name: "Emerald", hue: 156 },
  { id: "teal", name: "Teal", hue: 195 },
];

/* [lightness %, chroma] pairs lifted verbatim from tokens/colors.css
   so a generated ramp is pixel-identical to the shipped one at hue 229. */
const RAMP: Record<Theme, Record<string, [number, number]>> = {
  dark: {
    "--accent-9": [78, 0.15],
    "--accent-7": [68, 0.16],
    "--accent-6": [60, 0.165],
    "--accent-5": [52, 0.16],
    "--accent-3": [30, 0.09],
    "--accent-2": [24, 0.06],
    "--text-on-accent": [14, 0.02],
    "--text-link-hover": [85, 0.13],
  },
  light: {
    "--accent-9": [45, 0.17],
    "--accent-7": [53, 0.17],
    "--accent-6": [48, 0.17],
    "--accent-5": [43, 0.165],
    "--accent-3": [90, 0.05],
    "--accent-2": [95, 0.03],
    "--text-on-accent": [99, 0.003],
    "--text-link-hover": [38, 0.17],
  },
};

/** CSS variables that recreate the accent ramp for a given hue + theme. */
export function accentVars(accent: Accent, theme: Theme): Record<string, string> {
  const cScale = accent.chroma ?? 1;
  const ramp = RAMP[theme];
  const vars: Record<string, string> = {};
  for (const [name, [l, c]] of Object.entries(ramp)) {
    const chroma = +(c * cScale).toFixed(4);
    vars[name] = `oklch(${l}% ${chroma} ${accent.hue})`;
  }
  // --text-link aliases the brightest accent step in both themes.
  vars["--text-link"] = vars["--accent-9"];
  return vars;
}

/** A single representative swatch color for the picker dots. */
export function accentSwatch(accent: Accent): string {
  const chroma = +(0.17 * (accent.chroma ?? 1)).toFixed(4);
  return `oklch(62% ${chroma} ${accent.hue})`;
}

/** Apply (or re-apply) an accent to the document root as inline overrides. */
export function applyAccent(accent: Accent, theme: Theme): void {
  const root = document.documentElement;
  for (const [name, value] of Object.entries(accentVars(accent, theme))) {
    root.style.setProperty(name, value);
  }
}
