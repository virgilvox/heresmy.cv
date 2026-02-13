import { ThemeConfig } from "../types";

export const midnight: ThemeConfig = {
  id: "midnight",
  name: "Midnight",
  description: "Dark mode with electric lime accents. The default heresmy.cv experience.",
  preview: {
    bg: "#0a0a0f",
    fg: "#e8e6f0",
    accent: "#c8ff00",
  },
  variables: {
    "--cv-bg": "#0a0a0f",
    "--cv-surface": "#12121a",
    "--cv-card": "#16161f",
    "--cv-border": "#2a2a3a",
    "--cv-text": "#e8e6f0",
    "--cv-text-muted": "#8888a0",
    "--cv-text-dim": "#5a5a70",
    "--cv-accent": "#c8ff00",
    "--cv-accent-glow": "rgba(200, 255, 0, 0.15)",
  },
  fonts: {
    heading: "'Space Mono', 'Courier New', monospace",
    body: "'Courier Prime', 'Courier New', monospace",
    mono: "'Space Mono', 'Courier New', monospace",
  },
  googleFontImports: [
    "https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&display=swap",
    "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap",
  ],
  customCSS: `
    /* Subtle grid background */
    [data-theme="midnight"] {
      background-image:
        linear-gradient(rgba(200, 255, 0, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(200, 255, 0, 0.02) 1px, transparent 1px);
      background-size: 60px 60px;
    }

    /* Electric glow on name */
    [data-theme="midnight"] h1 {
      text-shadow: 0 0 30px rgba(200, 255, 0, 0.15);
    }
  `,
};
