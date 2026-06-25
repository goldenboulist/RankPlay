import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme-provider";
import { THEMES, type ThemeMode } from "@/lib/themes";
import { Check } from "@/lib/icons";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings" }] }),
  component: SettingsPage,
});

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
      />
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z"
      />
    </svg>
  );
}

function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const groups: { mode: ThemeMode; label: string; hint: string; icon: typeof SunIcon }[] = [
    { mode: "light", label: "Light", hint: "Bright, clean, daylight-friendly", icon: SunIcon },
    { mode: "dark", label: "Dark", hint: "Low-glare, focused, easy on the eyes", icon: MoonIcon },
  ];

  return (
    <div className="space-y-8">

      {/* ── Page header ── */}
      <div className="pb-6 border-b border-border/40">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 select-none mb-1.5">
          Preferences
        </p>
        <h1 className="text-4xl font-bold tracking-tight leading-none">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">Personalize your experience.</p>
      </div>

      {/* ── Theme section ── */}
      <section className="space-y-7">
        <div>
          <h2 className="text-sm font-semibold">Theme</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Pick a vibe. Your choice is remembered on this device.
          </p>
        </div>

        {groups.map((group, gi) => {
          const themesInGroup = THEMES.filter((t) => t.mode === group.mode);
          const Icon = group.icon;

          return (
            <div key={group.mode} className="space-y-3">
              {/* Sub-section header */}
              <div className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border/50 bg-muted/40 text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-[13px] font-semibold tracking-tight">{group.label}</h3>
                  <span className="text-[11px] text-muted-foreground/70">{group.hint}</span>
                </div>
                <span className="ml-auto text-[11px] tabular-nums text-muted-foreground/50">
                  {themesInGroup.length}
                </span>
              </div>

              {/* Divider line trailing the header */}
              <div className="h-px w-full bg-border/30" />

              {/* Swatch grid */}
              <div className="grid gap-2.5 sm:grid-cols-4 md:grid-cols-8">
                {themesInGroup.map((t, i) => {
                  const active = t.key === theme;
                  return (
                    <motion.button
                      key={t.key}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (gi * themesInGroup.length + i) * 0.04, duration: 0.25 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setTheme(t.key)}
                      className={[
                        "relative overflow-hidden rounded-xl border text-left transition-colors",
                        active
                          ? "border-primary/60 bg-primary/8 shadow-sm shadow-primary/10"
                          : "border-border/50 bg-card hover:bg-muted/40",
                      ].join(" ")}
                    >
                      {/* Swatch */}
                      <div
                        className="h-14 w-full rounded-t-xl"
                        style={{
                          background: `linear-gradient(135deg, ${t.swatch}, color-mix(in oklab, ${t.swatch} 35%, transparent))`,
                        }}
                      />

                      {/* Label row */}
                      <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                        <span className="text-[13px] font-medium leading-none">{t.label}</span>
                        {active && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"
                          >
                            <Check className="h-2.5 w-2.5" />
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}