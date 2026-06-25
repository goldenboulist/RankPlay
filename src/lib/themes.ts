export type ThemeKey =
  | "light"
  | "dark"
  | "red"
  | "blue"
  | "purple"
  | "cyberpunk"
  | "neon"
  | "retro"
  | "emerald"
  | "sunset"
  | "ocean"
  | "dracula"
  | "luxury"
  | "sky"
  | "blush"
  | "lavender"
  | "mint"
  | "citrus"
  | "pearl";

export type ThemeMode = "light" | "dark";

export const THEMES: { key: ThemeKey; label: string; swatch: string; mode: ThemeMode }[] = [
  { key: "light", label: "Light", swatch: "oklch(0.97 0.01 250)", mode: "light" },
  { key: "sky", label: "Sky", swatch: "oklch(0.58 0.18 230)", mode: "light" },
  { key: "blush", label: "Blush", swatch: "oklch(0.62 0.20 10)", mode: "light" },
  { key: "lavender", label: "Lavender", swatch: "oklch(0.60 0.20 300)", mode: "light" },
  { key: "mint", label: "Mint", swatch: "oklch(0.58 0.16 160)", mode: "light" },
  { key: "citrus", label: "Citrus", swatch: "oklch(0.68 0.18 50)", mode: "light" },
  { key: "pearl", label: "Pearl", swatch: "oklch(0.62 0.13 80)", mode: "light" },

  { key: "dark", label: "Dark", swatch: "oklch(0.18 0.02 260)", mode: "dark" },
  { key: "red", label: "Crimson", swatch: "oklch(0.55 0.22 25)", mode: "dark" },
  { key: "blue", label: "Ocean", swatch: "oklch(0.55 0.20 240)", mode: "dark" },
  { key: "purple", label: "Royal", swatch: "oklch(0.55 0.24 300)", mode: "dark" },
  { key: "cyberpunk", label: "Cyberpunk", swatch: "oklch(0.70 0.28 330)", mode: "dark" },
  { key: "neon", label: "Neon", swatch: "oklch(0.80 0.28 140)", mode: "dark" },
  { key: "retro", label: "Retro", swatch: "oklch(0.70 0.18 60)", mode: "dark" },
  { key: "emerald", label: "Emerald", swatch: "oklch(0.75 0.20 160)", mode: "dark" },
  { key: "sunset", label: "Sunset", swatch: "oklch(0.75 0.22 35)", mode: "dark" },
  { key: "ocean", label: "Deep Ocean", swatch: "oklch(0.72 0.18 220)", mode: "dark" },
  { key: "dracula", label: "Dracula", swatch: "oklch(0.78 0.22 310)", mode: "dark" },
  { key: "luxury", label: "Luxury", swatch: "oklch(0.82 0.15 90)", mode: "dark" },
];