"use client";

import * as React from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium
                 bg-white/70 text-zinc-900 shadow-sm ring-1 ring-black/10 backdrop-blur
                 hover:bg-white/80
                 dark:bg-zinc-950/60 dark:text-zinc-50 dark:ring-white/15 dark:hover:bg-zinc-950/70"
      aria-label="Toggle theme"
    >
      <span className="text-base">{isDark ? "🌙" : "☀️"}</span>
      <span>{isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
