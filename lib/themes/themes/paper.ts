import { ThemeConfig } from "../types";

export const paper: ThemeConfig = {
  id: "paper",
  name: "Paper",
  description: "Warm cream tones with classic serif typography. Feels like reading a fine print publication.",
  preview: {
    bg: "#faf6ef",
    fg: "#2d2922",
    accent: "#c45d35",
  },
  variables: {
    "--cv-bg": "#faf6ef",
    "--cv-surface": "#f5f0e6",
    "--cv-card": "#faf6ef",
    "--cv-border": "#e0d9cc",
    "--cv-text": "#2d2922",
    "--cv-text-muted": "#6b6356",
    "--cv-text-dim": "#9c9488",
    "--cv-accent": "#c45d35",
    "--cv-accent-glow": "rgba(196, 93, 53, 0.12)",
  },
  fonts: {
    heading: "'Libre Baskerville', 'Georgia', 'Times New Roman', serif",
    body: "'Libre Baskerville', 'Georgia', 'Times New Roman', serif",
    mono: "'Courier Prime', 'Courier New', monospace",
  },
  googleFontImports: [
    "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap",
    "https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap",
  ],
  customCSS: `
    /* Elegant heading underline */
    [data-theme="paper"] h1 {
      border-bottom: 2px solid var(--cv-accent);
      display: inline-block;
      padding-bottom: 4px;
    }

    /* Section headings: small caps */
    [data-theme="paper"] h2 {
      font-variant: small-caps;
      letter-spacing: 0.06em;
    }

    /* Subtle warm card shadow */
    [data-theme="paper"] .bg-cv-surface {
      box-shadow: 0 1px 4px rgba(45, 41, 34, 0.06);
    }
  `,
};
