export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  preview: {
    bg: string;
    fg: string;
    accent: string;
  };
  variables: Record<string, string>;
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  googleFontImports?: string[];
  customCSS?: string;
  decorations?: "tape" | "scanlines" | "sparkles" | "mushrooms" | "grid" | "retrowave-grid" | null;
}
