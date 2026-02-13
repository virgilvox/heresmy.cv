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
    heading:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    mono: "'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', Menlo, monospace",
  },
};
