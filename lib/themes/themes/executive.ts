import { ThemeConfig } from "../types";

export const executive: ThemeConfig = {
  id: "executive",
  name: "Executive",
  description: "Navy and gold with refined serif typography. The resume your recruiter's recruiter would approve.",
  preview: {
    bg: "#faf9f6",
    fg: "#1a2332",
    accent: "#b8860b",
  },
  variables: {
    "--cv-bg": "#faf9f6",
    "--cv-surface": "#f0ede6",
    "--cv-card": "#faf9f6",
    "--cv-border": "#d4cfc2",
    "--cv-text": "#1a2332",
    "--cv-text-muted": "#4a5568",
    "--cv-text-dim": "#8a94a0",
    "--cv-accent": "#b8860b",
    "--cv-accent-glow": "rgba(184, 134, 11, 0.1)",
  },
  fonts: {
    heading: "'Playfair Display', 'Georgia', 'Times New Roman', serif",
    body: "'Georgia', 'Times New Roman', serif",
    mono: "'Courier New', Courier, monospace",
  },
  googleFontImports: [
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap",
  ],
  customCSS: `
    /* Refined top border accent */
    [data-theme="executive"] [data-block]:first-child > div {
      border-top: 3px solid #b8860b;
    }

    /* Elegant card styling */
    [data-theme="executive"] [data-block] > div {
      box-shadow: 0 1px 4px rgba(26, 35, 50, 0.06);
      border: 1px solid #d4cfc2;
    }

    /* Gold horizontal rules */
    [data-theme="executive"] hr {
      border-color: #b8860b;
      opacity: 0.3;
    }

    /* Decorative heading underlines */
    [data-theme="executive"] h2 {
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(184, 134, 11, 0.3);
    }

    /* Italic accent on job titles */
    [data-theme="executive"] [data-subtitle] {
      font-style: italic;
    }

    /* Small caps for section headings */
    [data-theme="executive"] h2 {
      font-variant: small-caps;
      letter-spacing: 0.05em;
    }
  `,
};
