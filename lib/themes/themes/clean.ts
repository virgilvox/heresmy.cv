import { ThemeConfig } from "../types";

export const clean: ThemeConfig = {
  id: "clean",
  name: "Clean",
  description: "Light, minimal, and professional. Maximum readability with zero distractions.",
  preview: {
    bg: "#ffffff",
    fg: "#111827",
    accent: "#2563eb",
  },
  variables: {
    "--cv-bg": "#ffffff",
    "--cv-surface": "#f8f9fa",
    "--cv-card": "#ffffff",
    "--cv-border": "#e5e7eb",
    "--cv-text": "#111827",
    "--cv-text-muted": "#6b7280",
    "--cv-text-dim": "#9ca3af",
    "--cv-accent": "#2563eb",
    "--cv-accent-glow": "rgba(37, 99, 235, 0.1)",
  },
  fonts: {
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', Menlo, monospace",
  },
  googleFontImports: [
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
  ],
  customCSS: `
    /* Ultra-clean: thin borders, no shadows */
    [data-theme="clean"] h1 {
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    /* Subtle blue left accent on cards */
    [data-theme="clean"] .bg-cv-surface {
      border-left: 2px solid transparent;
      transition: border-color 0.2s;
    }
    [data-theme="clean"] .bg-cv-surface:hover {
      border-left-color: var(--cv-accent);
    }
  `,
};
