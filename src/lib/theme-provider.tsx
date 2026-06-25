import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { ThemeKey } from "@/lib/themes";

type Ctx = {
  theme: ThemeKey;
  setTheme: (t: ThemeKey) => void;
};

const ThemeContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "vg-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeKey>("dark");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem(STORAGE_KEY) as ThemeKey)) || "dark";
    setThemeState(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle("dark", theme !== "light");
  }, [theme]);

  const setTheme = (t: ThemeKey) => {
    setThemeState(t);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, t);
  };

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme outside provider");
  return ctx;
}
