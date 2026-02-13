import { ThemeConfig } from "../types";

export const hackbuild: ThemeConfig = {
  id: "hackbuild",
  name: "Hackbuild",
  description: "Scrapbook aesthetic with tape, markers, and paper textures. A resume that looks handmade.",
  preview: {
    bg: "#f5f0e6",
    fg: "#1a1a1a",
    accent: "#ff3366",
  },
  variables: {
    "--cv-bg": "#f5f0e6",
    "--cv-surface": "#ebe5d6",
    "--cv-card": "#f5f0e6",
    "--cv-border": "#d1c9b8",
    "--cv-text": "#1a1a1a",
    "--cv-text-muted": "#4a4a4a",
    "--cv-text-dim": "#7a7a7a",
    "--cv-accent": "#ff3366",
    "--cv-accent-glow": "rgba(255, 51, 102, 0.12)",
  },
  fonts: {
    heading: "'Permanent Marker', cursive",
    body: "'Special Elite', 'Courier New', monospace",
    mono: "'Special Elite', 'Courier New', monospace",
  },
  googleFontImports: [
    "https://fonts.googleapis.com/css2?family=Special+Elite&display=swap",
    "https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap",
  ],
  decorations: "tape",
  customCSS: `
    /* Paper texture background */
    [data-theme="hackbuild"] {
      background-image:
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 28px,
          rgba(209, 201, 184, 0.3) 28px,
          rgba(209, 201, 184, 0.3) 29px
        );
    }

    /* Slightly rotated card sections for scrapbook feel */
    [data-theme="hackbuild"] [data-block] {
      position: relative;
    }
    [data-theme="hackbuild"] [data-block]:nth-child(odd) {
      transform: rotate(-0.4deg);
    }
    [data-theme="hackbuild"] [data-block]:nth-child(even) {
      transform: rotate(0.3deg);
    }
    [data-theme="hackbuild"] [data-block]:nth-child(3n) {
      transform: rotate(-0.6deg);
    }
    [data-theme="hackbuild"] [data-block]:nth-child(5n) {
      transform: rotate(0.5deg);
    }

    /* Paper shadow on cards */
    [data-theme="hackbuild"] [data-block] > div {
      box-shadow:
        2px 2px 0 rgba(0, 0, 0, 0.06),
        4px 4px 8px rgba(0, 0, 0, 0.04);
    }
  `,
};
