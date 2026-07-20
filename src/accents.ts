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

/* A full trip around the hue wheel. The default cyan is first so it
   reads as the system's baseline; the rest walk the spectrum. Warm and
   yellow-green hues (~70–130) can't hold as much chroma in sRGB, so they
   carry a `chroma` multiplier to keep the clamp clean instead of muddy. */
export const ACCENTS: Accent[] = [
  // — Blues & the default —
  { id: "cyan", name: "Cyan", hue: 229 },
  { id: "sky", name: "Sky", hue: 215 },
  { id: "azure", name: "Azure", hue: 245 },
  { id: "sapphire", name: "Sapphire", hue: 258 },
  { id: "indigo", name: "Indigo", hue: 272 },
  { id: "blurple", name: "Blurple", hue: 285 },
  // — Purples & pinks —
  { id: "violet", name: "Violet", hue: 300 },
  { id: "amethyst", name: "Amethyst", hue: 312 },
  { id: "orchid", name: "Orchid", hue: 322 },
  { id: "magenta", name: "Magenta", hue: 334 },
  { id: "fuchsia", name: "Fuchsia", hue: 348 },
  { id: "rose", name: "Rose", hue: 6 },
  // — Reds & oranges —
  { id: "crimson", name: "Crimson", hue: 18 },
  { id: "scarlet", name: "Scarlet", hue: 30 },
  { id: "coral", name: "Coral", hue: 42, chroma: 0.96 },
  { id: "tangerine", name: "Tangerine", hue: 58, chroma: 0.9 },
  { id: "amber", name: "Amber", hue: 72, chroma: 0.82 },
  // — Yellows & greens —
  { id: "gold", name: "Gold", hue: 90, chroma: 0.7 },
  { id: "citron", name: "Citron", hue: 108, chroma: 0.66 },
  { id: "lime", name: "Lime", hue: 124, chroma: 0.72 },
  { id: "fern", name: "Fern", hue: 142, chroma: 0.9 },
  { id: "emerald", name: "Emerald", hue: 156 },
  { id: "jade", name: "Jade", hue: 168 },
  { id: "spring", name: "Spring", hue: 178 },
  { id: "teal", name: "Teal", hue: 192 },
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
