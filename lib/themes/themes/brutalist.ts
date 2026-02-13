import { ThemeConfig } from "../types";

export const brutalist: ThemeConfig = {
  id: "brutalist",
  name: "Brutalist",
  description: "Raw, unpolished, confrontational. No border-radius, heavy borders, pure content.",
  preview: {
    bg: "#ffffff",
    fg: "#000000",
    accent: "#ff0000",
  },
  variables: {
    "--cv-bg": "#ffffff",
    "--cv-surface": "#ffffff",
    "--cv-card": "#ffffff",
    "--cv-border": "#000000",
    "--cv-text": "#000000",
    "--cv-text-muted": "#333333",
    "--cv-text-dim": "#666666",
    "--cv-accent": "#ff0000",
    "--cv-accent-glow": "rgba(255, 0, 0, 0.1)",
  },
  fonts: {
    heading:
      "'Arial Black', 'Arial Bold', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body: "Arial, Helvetica, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'Courier New', Courier, monospace",
  },
  customCSS: `
    /* Kill all border radius */
    [data-theme="brutalist"],
    [data-theme="brutalist"] * {
      border-radius: 0 !important;
    }

    /* Thick black borders on everything */
    [data-theme="brutalist"] [data-block] > div {
      border: 3px solid #000000;
      box-shadow: 4px 4px 0 #000000;
    }

    /* Uppercase headings */
    [data-theme="brutalist"] h1,
    [data-theme="brutalist"] h2,
    [data-theme="brutalist"] h3,
    [data-theme="brutalist"] h4 {
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Bold section dividers */
    [data-theme="brutalist"] [data-block] {
      border-bottom: 3px solid #000000;
      padding-bottom: 24px;
    }
    [data-theme="brutalist"] [data-block]:last-child {
      border-bottom: none;
    }

    /* Accent elements: stark red with no subtlety */
    [data-theme="brutalist"] a {
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 3px;
    }

    /* Tags: inverted */
    [data-theme="brutalist"] [data-tag] {
      background: #000000;
      color: #ffffff;
      border: none;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.75em;
      letter-spacing: 0.08em;
    }
  `,
};
