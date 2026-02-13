import { ThemeConfig } from "../types";

export const forest: ThemeConfig = {
  id: "forest",
  name: "Forest",
  description: "Deep woodland greens and earthy tones. Quiet, grounded, and organic.",
  preview: {
    bg: "#0f1a0f",
    fg: "#d0e8c8",
    accent: "#7bc96a",
  },
  variables: {
    "--cv-bg": "#0f1a0f",
    "--cv-surface": "#1a2a1a",
    "--cv-card": "#152215",
    "--cv-border": "#2a3a2a",
    "--cv-text": "#d0e8c8",
    "--cv-text-muted": "#8aaa80",
    "--cv-text-dim": "#5a7a50",
    "--cv-accent": "#7bc96a",
    "--cv-accent-glow": "rgba(123, 201, 106, 0.15)",
  },
  fonts: {
    heading: "'Bitter', 'Georgia', serif",
    body: "'Bitter', 'Georgia', serif",
    mono: "'Fira Code', 'Fira Mono', monospace",
  },
  googleFontImports: [
    "https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
  ],
  decorations: "mushrooms",
  customCSS: `
    /* Subtle organic texture */
    [data-theme="forest"] {
      background-image:
        radial-gradient(ellipse at 20% 50%, rgba(123, 201, 106, 0.03) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(123, 201, 106, 0.02) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 80%, rgba(90, 122, 80, 0.04) 0%, transparent 40%);
    }

    /* Earthy card styling */
    [data-theme="forest"] [data-block] > div {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(123, 201, 106, 0.08);
    }

    /* Leaf-green accent glow */
    [data-theme="forest"] a:hover,
    [data-theme="forest"] [data-accent]:hover {
      text-shadow: 0 0 8px rgba(123, 201, 106, 0.4);
    }

    /* Natural list markers */
    [data-theme="forest"] ul li::marker {
      color: #7bc96a;
    }
  `,
};
