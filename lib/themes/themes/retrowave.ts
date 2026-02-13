import { ThemeConfig } from "../types";

export const retrowave: ThemeConfig = {
  id: "retrowave",
  name: "Retrowave",
  description: "Synthwave sunset gradients and neon chrome. A resume from an alternate 1986.",
  preview: {
    bg: "#1a0033",
    fg: "#f0e0ff",
    accent: "#ff6ec7",
  },
  variables: {
    "--cv-bg": "#1a0033",
    "--cv-surface": "#2a0050",
    "--cv-card": "#1a0033",
    "--cv-border": "#4a0080",
    "--cv-text": "#f0e0ff",
    "--cv-text-muted": "#c0a0e0",
    "--cv-text-dim": "#8060a0",
    "--cv-accent": "#ff6ec7",
    "--cv-accent-glow": "rgba(255, 110, 199, 0.2)",
  },
  fonts: {
    heading: "'Righteous', cursive",
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Fira Code', 'Fira Mono', monospace",
  },
  googleFontImports: [
    "https://fonts.googleapis.com/css2?family=Righteous&display=swap",
  ],
  decorations: "retrowave-grid",
  customCSS: `
    /* Sunset gradient header area */
    [data-theme="retrowave"] [data-block]:first-child > div {
      background: linear-gradient(
        180deg,
        rgba(255, 110, 199, 0.15) 0%,
        rgba(100, 50, 200, 0.1) 50%,
        transparent 100%
      );
      border: 1px solid rgba(255, 110, 199, 0.2);
    }

    /* Chrome text effect on name */
    [data-theme="retrowave"] h1 {
      background: linear-gradient(
        180deg,
        #ffffff 0%,
        #ff6ec7 30%,
        #ff6ec7 70%,
        #7b68ee 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: none;
    }

    /* Neon glow on accent elements */
    [data-theme="retrowave"] a,
    [data-theme="retrowave"] [data-accent] {
      text-shadow:
        0 0 7px rgba(255, 110, 199, 0.5),
        0 0 14px rgba(255, 110, 199, 0.25);
    }

    /* Purple glow on cards */
    [data-theme="retrowave"] [data-block] > div {
      box-shadow:
        0 0 20px rgba(100, 50, 200, 0.1),
        inset 0 0 20px rgba(100, 50, 200, 0.03);
      border: 1px solid rgba(74, 0, 128, 0.5);
    }

    /* Section heading styling */
    [data-theme="retrowave"] h2 {
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }
  `,
};
