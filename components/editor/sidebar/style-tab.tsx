"use client";

import { getAllThemes } from "@/lib/themes/registry";
import { cn } from "@/lib/utils";

interface StyleTabProps {
  currentThemeId: string;
  currentAccentColor?: string;
  currentFontFamily?: string;
  onUpdateTheme: (themeId: string) => void;
  onUpdateCustomizations: (c: {
    accentColor?: string;
    fontFamily?: string;
  }) => void;
}

const ACCENT_COLORS = [
  "#c8ff00",
  "#ff6b4a",
  "#4a9eff",
  "#a855f7",
  "#14b8a6",
  "#f59e0b",
  "#ec4899",
  "#6366f1",
];

const FONT_OPTIONS: { id: string; label: string; style: string }[] = [
  {
    id: "system",
    label: "System",
    style: "font-sans",
  },
  {
    id: "mono",
    label: "Mono",
    style: "font-mono",
  },
  {
    id: "serif",
    label: "Serif",
    style: "font-serif",
  },
  {
    id: "typewriter",
    label: "Typewriter",
    style: "font-mono tracking-wide",
  },
];

export function StyleTab({
  currentThemeId,
  currentAccentColor,
  currentFontFamily,
  onUpdateTheme,
  onUpdateCustomizations,
}: StyleTabProps) {
  const themes = getAllThemes();
  const activeFont = currentFontFamily || "system";

  return (
    <div className="flex-1 overflow-auto p-3 space-y-6">
      {/* Theme Picker */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-cv-text-dim mb-3 px-1">
          Theme
        </p>
        <div className="grid grid-cols-2 gap-2">
          {themes.map((theme) => {
            const isActive = currentThemeId === theme.id;

            return (
              <button
                key={theme.id}
                onClick={() => onUpdateTheme(theme.id)}
                className={cn(
                  "rounded-lg border p-2.5 text-left transition-all cursor-pointer group",
                  isActive
                    ? "border-cv-accent ring-1 ring-cv-accent/30"
                    : "border-cv-border hover:border-cv-text-dim"
                )}
              >
                {/* Preview swatch */}
                <div
                  className="w-full h-10 rounded-md mb-2 flex flex-col justify-center px-2 gap-1"
                  style={{ backgroundColor: theme.preview.bg }}
                >
                  <div
                    className="h-1.5 w-3/4 rounded-full"
                    style={{ backgroundColor: theme.preview.fg }}
                  />
                  <div
                    className="h-1 w-1/2 rounded-full opacity-50"
                    style={{ backgroundColor: theme.preview.accent }}
                  />
                </div>
                <p className="text-[11px] font-medium text-cv-text truncate">
                  {theme.name}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Accent Color */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-cv-text-dim mb-3 px-1">
          Accent color
        </p>
        <div className="flex flex-wrap gap-2 px-1">
          {ACCENT_COLORS.map((color) => {
            const isActive = currentAccentColor === color;

            return (
              <button
                key={color}
                onClick={() =>
                  onUpdateCustomizations({ accentColor: color })
                }
                className={cn(
                  "w-7 h-7 rounded-full transition-all cursor-pointer shrink-0",
                  isActive
                    ? "ring-2 ring-white ring-offset-2 ring-offset-cv-surface scale-110"
                    : "hover:scale-110"
                )}
                style={{ backgroundColor: color }}
                title={color}
              />
            );
          })}
        </div>
      </section>

      {/* Font Selector */}
      <section>
        <p className="text-[10px] uppercase tracking-wider text-cv-text-dim mb-3 px-1">
          Font
        </p>
        <div className="space-y-1">
          {FONT_OPTIONS.map((font) => {
            const isActive = activeFont === font.id;

            return (
              <button
                key={font.id}
                onClick={() =>
                  onUpdateCustomizations({ fontFamily: font.id })
                }
                className={cn(
                  "w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                  font.style,
                  isActive
                    ? "bg-cv-surface-hover border border-cv-accent/30 text-cv-text"
                    : "bg-transparent border border-transparent text-cv-text-muted hover:bg-cv-surface-hover hover:text-cv-text"
                )}
              >
                {font.label}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
