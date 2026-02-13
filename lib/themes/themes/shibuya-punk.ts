import { ThemeConfig } from "../types";

export const shibuyaPunk: ThemeConfig = {
  id: "shibuya-punk",
  name: "Shibuya Punk",
  description: "Neon-drenched cyberpunk aesthetic. Tokyo at 2AM, rain on chrome.",
  preview: {
    bg: "#0a0014",
    fg: "#e0d0ff",
    accent: "#ff00aa",
  },
  variables: {
    "--cv-bg": "#0a0014",
    "--cv-surface": "#120020",
    "--cv-card": "#1a0030",
    "--cv-border": "#2a1050",
    "--cv-text": "#e0d0ff",
    "--cv-text-muted": "#9080b0",
    "--cv-text-dim": "#605080",
    "--cv-accent": "#ff00aa",
    "--cv-accent-glow": "rgba(255, 0, 170, 0.2)",
  },
  fonts: {
    heading: "'Orbitron', sans-serif",
    body: "'Share Tech Mono', 'Courier New', monospace",
    mono: "'Share Tech Mono', 'Courier New', monospace",
  },
  googleFontImports: [
    "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap",
    "https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap",
  ],
  decorations: "grid",
  customCSS: `
    /* Cyberpunk grid background */
    [data-theme="shibuya-punk"] {
      background-image:
        linear-gradient(rgba(255, 0, 170, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 0, 170, 0.03) 1px, transparent 1px);
      background-size: 40px 40px;
    }

    /* Neon glow on accent text */
    [data-theme="shibuya-punk"] a,
    [data-theme="shibuya-punk"] [data-accent] {
      text-shadow:
        0 0 7px rgba(255, 0, 170, 0.5),
        0 0 14px rgba(255, 0, 170, 0.3),
        0 0 28px rgba(255, 0, 170, 0.15);
    }

    /* Neon border glow on cards */
    [data-theme="shibuya-punk"] [data-block] > div {
      box-shadow:
        0 0 0 1px rgba(255, 0, 170, 0.1),
        0 0 20px rgba(255, 0, 170, 0.05),
        inset 0 0 20px rgba(255, 0, 170, 0.02);
    }

    /* Secondary neon color: cyan */
    [data-theme="shibuya-punk"] h2 {
      text-shadow:
        0 0 7px rgba(0, 255, 255, 0.4),
        0 0 14px rgba(0, 255, 255, 0.2);
    }

    /* Uppercase headings with letter spacing */
    [data-theme="shibuya-punk"] h1,
    [data-theme="shibuya-punk"] h2,
    [data-theme="shibuya-punk"] h3 {
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  `,
};
