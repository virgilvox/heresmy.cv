"use client";

import { ReactNode, useMemo } from "react";
import { getTheme } from "@/lib/themes/registry";

function sanitizeFontFamily(font: string): string {
  // Strip anything that isn't alphanumeric, spaces, commas, quotes, or hyphens
  const cleaned = font.replace(/[^a-zA-Z0-9 ,'\-]/g, "");
  // Block CSS injection keywords
  if (/(?:expression|javascript|url)/i.test(cleaned)) return "";
  return cleaned;
}

interface ThemeProviderProps {
  themeId: string;
  customizations?: {
    accentColor?: string;
    fontFamily?: string;
  };
  children: ReactNode;
}

export function ThemeProvider({ themeId, customizations, children }: ThemeProviderProps) {
  const theme = getTheme(themeId) || getTheme("midnight")!;

  const style = useMemo(() => {
    const vars: Record<string, string> = {};

    // Set both --cv-* (for customCSS compatibility) and --color-cv-* (for Tailwind utilities)
    for (const [key, value] of Object.entries(theme.variables)) {
      vars[key] = value;
      // --cv-bg → --color-cv-bg
      vars[key.replace("--cv-", "--color-cv-")] = value;
    }

    if (customizations?.accentColor) {
      vars["--cv-accent"] = customizations.accentColor;
      vars["--color-cv-accent"] = customizations.accentColor;
    }

    // Set font variables for CSS targeting
    vars["--cv-font-heading"] = theme.fonts.heading;
    vars["--cv-font-body"] = theme.fonts.body;
    vars["--cv-font-mono"] = theme.fonts.mono;

    return vars;
  }, [theme, customizations]);

  return (
    <div data-theme={theme.id} style={style}>
      {theme.googleFontImports?.length && (
        <style dangerouslySetInnerHTML={{
          __html: theme.googleFontImports.map(url => `@import url('${url}');`).join("\n")
        }} />
      )}
      {theme.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: theme.customCSS }} />
      )}
      <div style={{
        fontFamily: customizations?.fontFamily
          ? sanitizeFontFamily(customizations.fontFamily)
          : theme.fonts.body,
      }}>
        {children}
      </div>
    </div>
  );
}
