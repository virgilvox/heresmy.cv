import { ThemeConfig } from "../types";

export const nordic: ThemeConfig = {
  id: "nordic",
  name: "Nordic",
  description: "Cool whites and muted blues with generous whitespace. Scandinavian-inspired clarity.",
  preview: {
    bg: "#f7f8fa",
    fg: "#1e293b",
    accent: "#3b82f6",
  },
  variables: {
    "--cv-bg": "#f7f8fa",
    "--cv-surface": "#edf0f5",
    "--cv-card": "#f7f8fa",
    "--cv-border": "#d8dde6",
    "--cv-text": "#1e293b",
    "--cv-text-muted": "#64748b",
    "--cv-text-dim": "#94a3b8",
    "--cv-accent": "#3b82f6",
    "--cv-accent-glow": "rgba(59, 130, 246, 0.1)",
  },
  fonts: {
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },
  googleFontImports: [
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  ],
  customCSS: `
    /* Generous whitespace */
    [data-theme="nordic"] [data-block] {
      padding: 24px 0;
    }

    /* Clean subtle card borders */
    [data-theme="nordic"] [data-block] > div {
      border: 1px solid #d8dde6;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    }

    /* Thin accent left border on cards */
    [data-theme="nordic"] [data-block] > div {
      border-left: 3px solid transparent;
    }
    [data-theme="nordic"] [data-block] > div:hover {
      border-left-color: #3b82f6;
    }

    /* Light heading weight for airiness */
    [data-theme="nordic"] h1 {
      font-weight: 300;
      letter-spacing: -0.02em;
    }
    [data-theme="nordic"] h2 {
      font-weight: 600;
      font-size: 0.85em;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
    }

    /* Clean tags */
    [data-theme="nordic"] [data-tag] {
      border-radius: 6px;
      font-weight: 500;
      font-size: 0.8em;
    }
  `,
};
