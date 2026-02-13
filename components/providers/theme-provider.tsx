"use client";

import { ReactNode, useMemo } from "react";
import { getTheme } from "@/lib/themes/registry";

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
    const vars: Record<string, string> = { ...theme.variables };
    if (customizations?.accentColor) {
      vars["--cv-accent"] = customizations.accentColor;
    }
    return vars;
  }, [theme, customizations]);

  const fontImports = theme.googleFontImports?.join("\n") || "";

  return (
    <div style={style}>
      {fontImports && (
        <style dangerouslySetInnerHTML={{
          __html: theme.googleFontImports?.map(url => `@import url('${url}');`).join("\n") || ""
        }} />
      )}
      {theme.customCSS && (
        <style dangerouslySetInnerHTML={{ __html: theme.customCSS }} />
      )}
      <div style={{
        fontFamily: customizations?.fontFamily || theme.fonts.body,
        minHeight: "100vh",
      }}>
        {children}
      </div>
    </div>
  );
}
