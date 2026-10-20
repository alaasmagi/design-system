import { useCallback, useEffect, useState } from "react";
import type { AccentId } from "./accents";

export type Theme = "light" | "dark";
const KEY_THEME = "ds-theme";
const KEY_ACCENT = "ds-accent";

function initialTheme(): Theme {
  try { const s = localStorage.getItem(KEY_THEME); if (s === "light" || s === "dark") return s; } catch { /* storage unavailable */ }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function initialAccent(): AccentId {
  try { const s = localStorage.getItem(KEY_ACCENT); if (s) return s as AccentId; } catch { /* storage unavailable */ }
  return "cyan";
}

/** Theme + accent state, applied as data-theme / data-accent on <html> and remembered per browser. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [accent, setAccentState] = useState<AccentId>(initialAccent);
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem(KEY_THEME, theme); } catch { /* ignore */ } }, [theme]);
  useEffect(() => {
    if (accent === "cyan") delete document.documentElement.dataset.accent; else document.documentElement.dataset.accent = accent;
    try { localStorage.setItem(KEY_ACCENT, accent); } catch { /* ignore */ }
  }, [accent]);
  const setTheme = useCallback((t: Theme) => setThemeState(t), []);
  const setAccent = useCallback((a: AccentId) => setAccentState(a), []);
  return { theme, setTheme, accent, setAccent };
}
