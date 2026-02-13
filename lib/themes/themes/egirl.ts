import { ThemeConfig } from "../types";

export const egirl: ThemeConfig = {
  id: "egirl",
  name: "E-Girl",
  description: "Pastel pink dreams with sparkle decorations. Soft, cute, and unapologetically kawaii.",
  preview: {
    bg: "#fff0f8",
    fg: "#4a2040",
    accent: "#ff69b4",
  },
  variables: {
    "--cv-bg": "#fff0f8",
    "--cv-surface": "#ffe8f4",
    "--cv-card": "#fff5fa",
    "--cv-border": "#f0d0e0",
    "--cv-text": "#4a2040",
    "--cv-text-muted": "#8a6080",
    "--cv-text-dim": "#b090a8",
    "--cv-accent": "#ff69b4",
    "--cv-accent-glow": "rgba(255, 105, 180, 0.15)",
  },
  fonts: {
    heading: "'Quicksand', 'Nunito', sans-serif",
    body: "'Quicksand', 'Nunito', sans-serif",
    mono: "'Fira Code', 'Fira Mono', monospace",
  },
  googleFontImports: [
    "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap",
  ],
  decorations: "sparkles",
  customCSS: `
    /* Soft rounded everything */
    [data-theme="egirl"] [data-block] > div {
      border-radius: 20px;
      box-shadow: 0 2px 16px rgba(255, 105, 180, 0.08);
    }

    /* Pastel gradient accent touches */
    [data-theme="egirl"] h1 {
      background: linear-gradient(135deg, #ff69b4, #b469ff, #69b4ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Soft pink border glow on hover */
    [data-theme="egirl"] [data-block] > div:hover {
      box-shadow:
        0 2px 16px rgba(255, 105, 180, 0.12),
        0 0 0 2px rgba(255, 105, 180, 0.1);
    }

    /* Rounded tags and badges */
    [data-theme="egirl"] [data-tag] {
      border-radius: 999px;
      padding-left: 12px;
      padding-right: 12px;
    }

    /* Cute bullet replacement */
    [data-theme="egirl"] ul li::marker {
      content: "~ ";
      color: #ff69b4;
    }
  `,
};
