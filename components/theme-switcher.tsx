"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "redcanvas-theme";

type Theme = "current" | "polished" | "mid-2000s";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.redcanvasTheme = theme;
}

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "current";
    }

    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    return storedTheme === "polished" ||
      storedTheme === "mid-2000s" ||
      storedTheme === "current"
      ? storedTheme
      : "current";
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function handleThemeChange(value: string) {
    const nextTheme: Theme =
      value === "polished" || value === "mid-2000s" ? value : "current";
    setTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <label className="theme-switcher">
      <span>Theme</span>
      <select
        aria-label="Theme auswaehlen"
        value={theme}
        onChange={(event) => handleThemeChange(event.target.value)}
      >
        <option value="current">Current</option>
        <option value="polished">Polished</option>
        <option value="mid-2000s">Mid-2000s</option>
      </select>
    </label>
  );
}
